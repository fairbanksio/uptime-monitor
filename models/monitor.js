const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");
const axios = require("axios");
const axiosRetry = require("axios-retry");
const now = require("performance-now");

let Heartbeat = require("../models/heartbeat");
let Event = require("../models/event");
let Notification = require("../models/notification");
let msToTime = require("../util/msToTime");

axiosRetry(axios, { retries: 1 });

var MonitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "DOWN",
  },
  config: {
    httpUrl: { type: String },
    httpKeyword: { type: String },
  },
  interval: {
    type: Number,
    default: 300,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  heartbeats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Heartbeat",
    },
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notification",
      required: true,
    },
  ],
});

MonitorSchema.methods.start = async function () {
  // startup
  // load last heartbeat
  let startBeat = await Heartbeat.findOne({ monitor: this._id })
    .sort({ field: "asc", _id: -1 })
    .limit(1);
  const beat = async () => {
    console.log("beat-" + this.name);

    // get current event
    let currentEvent = await Event.findOne({ monitor: this._id })
      .sort({ field: "asc", _id: -1 })
      .limit(1);

    // create hearbeat
    if (startBeat) {
      this.previousHeartbeat = startBeat;
      startBeat = null;
    }

    let heartbeat = new Heartbeat({
      monitor: this._id,
    });

    const startTime = now();
    switch (this.type) {
      // HTTP MONITOR
      case "http":
        try {
          // Check heartbeat
          let rand_numb = Math.random().toString(36).slice(2);
          console.time(
            "Request to " + this.config.httpUrl + " [" + rand_numb + "]"
          );

          let res = await axios.head(this.config.httpUrl, {
            timeout: 5000, // Hardcode timeout to 5s; if your site hasn't responded by then you got problems
            headers: {
              Accept: "*/*",
              "User-Agent": "Uptime-Monitor/",
            },
          });

          console.timeEnd(
            "Request to " + this.config.httpUrl + " [" + rand_numb + "]"
          );
          // set heartbeat status
          heartbeat.status = "UP";
          heartbeat.statusMessage = res.status + " - " + res.statusText;
        } catch (error) {
          // set heartbeat status
          heartbeat.status = "DOWN";
          heartbeat.statusMessage = error;
        }
        break;
      // HTTP MONITOR WITH KEYWORD SEARCH
      case "keyword":
        try {
          // Check heartbeat
          let rand_numb = Math.random().toString(36).slice(2);
          console.time(
            "Request to " + this.config.httpUrl + " [" + rand_numb + "]"
          );

          let res = await axios.get(this.config.httpUrl, {
            timeout: 5000, // Hardcode timeout to 5s; if your site hasn't responded by then you got problems
            headers: {
              Accept: "*/*",
              "User-Agent": "Uptime-Monitor/",
            },
          });

          console.timeEnd(
            "Request to " + this.config.httpUrl + " [" + rand_numb + "]"
          );

          // check if response contains keyword
          if (JSON.stringify(res.data).includes(this.config.httpKeyword)) {
            heartbeat.status = "UP";
            heartbeat.statusMessage =
              "Keyword " + '"' + this.config.httpKeyword + '"' + " found";
          } else {
            heartbeat.status = "DOWN";
            heartbeat.statusMessage =
              "Keyword " + '"' + this.config.httpKeyword + '"' + " not found";
          }
        } catch (error) {
          // set heartbeat status
          heartbeat.status = "DOWN";
          heartbeat.statusMessage = error;
        }
        break;
      default:
        console.log("Invalid heartbeat");
    }

    const endTime = now();
    heartbeat.responseTime = Math.round(endTime - startTime);

    let event = new Event({
      monitor: this,
      message: "",
      type: "",
    });

    let newEventNeeded = false;
    // Check if current beat is different from last beat
    if (currentEvent) {
      if (currentEvent.type !== heartbeat.status) {
        // Status changed, trigger an event
        // create hearbeat
        newEventNeeded = true;
        if (
          this.previousHeartbeat.status === "UP" &&
          heartbeat.status === "DOWN"
        ) {
          event.type = "DOWN";
        } else if (
          this.previousHeartbeat.status === "DOWN" &&
          heartbeat.status === "UP"
        ) {
          event.type = "UP";
        }
      }
    } else if (this.previousHeartbeat) {
      if (this.previousHeartbeat.status !== heartbeat.status) {
        // Status changed, trigger an event
        // create hearbeat
        newEventNeeded = true;
        if (
          this.previousHeartbeat.status === "UP" &&
          heartbeat.status === "DOWN"
        ) {
          event.type = "DOWN";
        } else if (
          this.previousHeartbeat.status === "DOWN" &&
          heartbeat.status === "UP"
        ) {
          event.type = "UP";
        }
      }
    } else {
      newEventNeeded = true;
      // No prior heartbeats but status is down
      if (heartbeat.status === "DOWN") {
        heartbeat.status === "DOWN";
        event.type = "DOWN";
        event.message.status === heartbeat.status;
      } else if (heartbeat.status === "UP") {
        heartbeat.status === "UP";
        event.type = "UP";
        event.message.status === heartbeat.status;
      }
    }

    // save heartbeat
    await heartbeat.save();
    this.previousHeartbeat = heartbeat;

    if (newEventNeeded) {
      // save the new event
      event.message = heartbeat.statusMessage;
      event.duration = msToTime(Date.now() - heartbeat.createdAt);
      // save event
      await event.save();
      this.events.push(event._id);

      // send event to each notification configuration on the monitor
      if (this.notifications.length > 0) {
        this.notifications.forEach((notificationId) => {
          Notification.findOne({ _id: notificationId }).then((notification) => {
            notification.notify(event);
          });
        });
      }
      // update existing event
      if (currentEvent) {
        currentEvent.duration = msToTime(Date.now() - currentEvent.createdAt);
        currentEvent.save();
      }
    } else {
      // update existing event
      if (currentEvent) {
        currentEvent.duration = msToTime(Date.now() - currentEvent.createdAt);
        currentEvent.save();
      }
    }

    this.heartbeats.push(heartbeat._id);

    //update the latest model
    this.status = heartbeat.status;
    this.save();
  };

  beat();
  this.heartbeat = setInterval(beat, this.interval * 1000);
};

MonitorSchema.methods.stop = function () {
  clearInterval(this.heartbeat);
};

// Configure plugins
MonitorSchema.plugin(timestamps); // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model("Monitor", MonitorSchema);

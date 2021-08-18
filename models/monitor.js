let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp');
const axios = require("axios");
let Heartbeat = require('../models/heartbeat');
let Event = require('../models/event');
let Notification = require('../models/notification');

var MonitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    interval:{
        type: Number,
        default: 300
    },
    enabled: {
        type: Boolean,
        default: true
    },
    heartbeats : [{
        type: Schema.Types.ObjectId,
        ref: 'Heartbeat'
    }],
    events : [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    owner :{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    notifications :[{
        type: Schema.Types.ObjectId, 
        ref: 'Notification',
        required: true
    }]
});

MonitorSchema.methods.start = function() {
    const beat = async () => {

        // create hearbeat
        let heartbeat = new Heartbeat({
            monitor: this._id
        });

        try {
            
            // Check heartbeat 
            let res = await axios.get(this.url, { 
                timeout: this.interval * 1000 * 0.8,  
                headers: {
                    "Accept": "*/*",
                    "User-Agent": "Uptime-Monitor/",
                },
            });

            console.log(this.name + "("+this.url+"): " + res.status + " - "+ res.statusText)

            // set heartbeat status
            heartbeat.status = "UP"
            heartbeat.statusMessage = res.status + " - "+ res.statusText
            

        } catch (error) {
            //console.log(error)

            // set heartbeat status
            heartbeat.status = "DOWN"
            heartbeat.statusMessage = error
        }

        // Check if current beat is different from last beat
        if(this.previousHeartbeat){
            if(this.previousHeartbeat.status !== heartbeat.status){

                // Status changed, trigger an event
                // create hearbeat

                let eventType = ""
                if(this.previousHeartbeat.status === "UP" && heartbeat.status === "DOWN"){
                    eventType = "DOWN"
                } else if (this.previousHeartbeat.status === "DOWN" && heartbeat.status === "UP"){
                    eventType = "UP"
                }

                let event = new Event({
                    monitor: this,
                    message: heartbeat.statusMessage,
                    type: eventType
                });

                // save event
                event.save()
                this.events.push(event)

                // send event to each notification configuration on the monitor
                if(this.notifications.length > 0){
                    this.notifications.forEach(notificationId => {
                        Notification.findOne({_id: notificationId})
                        .then(notification => {
                            notification.notify(event)
                        })
                    })
                }

                console.log(this.name + ": " + eventType + " - " + heartbeat.statusMessage)
            }
        }

        // save heartbeat
        await heartbeat.save();
        this.heartbeats.push(heartbeat)
        
        this.previousHeartbeat = heartbeat
        this.save()
    }

    beat();
    this.heartbeat = setInterval(beat, this.interval * 1000);
}

MonitorSchema.methods.stop = function() {
    clearInterval(this.heartbeat)
}

// Configure plugins
MonitorSchema.plugin(timestamps); // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Monitor', MonitorSchema)
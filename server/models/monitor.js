let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp');
const axios = require("axios");
let Heartbeat = require('../models/heartbeat');

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
    owner :{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});

MonitorSchema.methods.start = function() {
    const beat = async () => {
        try {
            
            // Use Custom agent to disable session reuse
            // https://github.com/nodejs/node/issues/3940
            let res = await axios.get(this.url, { 
                timeout: this.interval * 1000 * 0.8,  
                headers: {
                    "Accept": "*/*",
                    "User-Agent": "Uptime-Monitor/",
                },
            });

            console.log(this.name + "("+this.url+"): " + res.status + " - "+ res.statusText)

            //save heartbeat
            const heartbeat = await Heartbeat.create({
                status: "UP",
                statusMessage:  res.status + " - "+ res.statusText,
                monitor: this._id
            });
            await heartbeat.save();
            //console.log(heartbeat)
            this.heartbeats.push(heartbeat)
            this.save()

        } catch (error) {
            console.log(error)

             //save heartbeat
             const heartbeat = await Heartbeat.create({
                status: "DOWN",
                message:  error,
                monitor: this._id
            });
            this.heartbeats.push(heartbeat)
            this.save()
        }

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
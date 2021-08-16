let mongoose = require('mongoose')
let timestamps = require('mongoose-timestamp');
const axios = require("axios");

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
        default: 10
    },
    status: {
        type: String,
    },
    enabled: {
        type: Boolean,
        default: true
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
            this.status = `${res.status} - ${res.statusText}`
            this.save() 

        } catch (error) {
            console.log(error)
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
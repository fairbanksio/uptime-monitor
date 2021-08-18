let Monitor = require('../models/monitor');

const runningMonitors=[]

function startAllMonitors() {
    // get all monitors
    Monitor.find()
    .then(monitors => {
        monitors.forEach(monitor=>{
            // add each monitor to global tracker
            runningMonitors[monitor.id] = monitor

            // start the monitor
            runningMonitors[monitor.id].start()
        })
    })
    .catch(err => {
        console.log(err);
    });
}

function stopAllMonitors() {
    runningMonitors.forEach(monitor=>{
        monitor.stop()
    })
    runningMonitors=[]
}

function startMonitor(monitorId) {
    // get all monitors
    Monitor.findOne({_id: monitorId})
		.then(monitor => {
            if(monitor.enabled){
                runningMonitors[monitor.id] = monitor
                runningMonitors[monitor.id].start()
            }
		})
        .catch(err => {
            console.log(err);
        });
}

function updateMonitor(monitorId) {
    //stop existing monitor
    if(runningMonitors[monitorId]){
        runningMonitors[monitorId].stop()
        runningMonitors[monitorId] = null
    }

    // update the monitor, and start it if enabled
    Monitor.findOne({_id: monitorId})
		.then(monitor => {
            if(monitor.enabled){
                runningMonitors[monitor.id] = monitor
                runningMonitors[monitor.id].start()
            }
		})
        .catch(err => {
            console.log(err);
        });
}

function stopMonitor(monitorId) {
    if(runningMonitors[monitorId]){
        runningMonitors[monitorId].stop()
        runningMonitors[monitorId] = null
    }
}


module.exports = {startAllMonitors, stopAllMonitors, startMonitor, stopMonitor, updateMonitor, runningMonitors}
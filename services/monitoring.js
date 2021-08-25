let Monitor = require('../models/monitor')

const runningMonitors = []

function startAllMonitors() {
  // get all monitors
  Monitor.find()
    .then((monitors) => {
      monitors.forEach((monitor) => {
        // add each monitor to global tracker
        runningMonitors[monitor.id] = monitor

        // start the monitor
        runningMonitors[monitor.id].start()
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

function stopAllMonitors() {
  runningMonitors.forEach((monitor) => {
    monitor.stop()
  })
  runningMonitors = []
}

function startMonitor(monitor) {
  if (monitor.enabled) {
    runningMonitors[monitor.id] = monitor
    runningMonitors[monitor.id].start()
  }
}

function updateMonitor(monitor) {
  //stop existing monitor
  if (runningMonitors[monitor.id]) {
    runningMonitors[monitor.id].stop()
    runningMonitors[monitor.id] = null
  }

  // update the monitor, and start it if enabled
  if (monitor.enabled) {
    runningMonitors[monitor.id] = monitor
    runningMonitors[monitor.id].start()
  }

}

function stopMonitor(monitor) {
  if (runningMonitors[monitor.id]) {
    runningMonitors[monitor.id].stop()
    runningMonitors[monitor.id] = null
  }
}

module.exports = {
  startAllMonitors,
  stopAllMonitors,
  startMonitor,
  stopMonitor,
  updateMonitor,
  runningMonitors,
}

let Heartbeat = require('../models/heartbeat')
let Monitor = require('../models/monitor')

// Get all heartbeats
exports.getAll = (req, res, next) => {
  Heartbeat.find({ owner: req.user._id })
    .then((heartbeats) => {
      res.json(heartbeats)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Create heartbeat
exports.create = (req, res, next) => {
  const { monitorId, status, statusMessage } = req.body
  var newHeartbeat = new Heartbeat({
    monitor: monitorId,
    status: status,
    statusMessage: statusMessage,
  })
  newHeartbeat
    .save()
    .then((heartbeat) => {
      res.json(heartbeat)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Read one heartbeat
exports.getOne = (req, res, next) => {
  Heartbeat.findOne({ _id: req.params.heartbeatId })
    .then((heartbeat) => {
      res.json(heartbeat)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Update one heartbeat
exports.update = (req, res, next) => {
  Heartbeat.findByIdAndUpdate({ _id: req.params.heartbeatId }, req.body, {
    new: true,
  })
    .then((heartbeat) => {
      res.json(heartbeat)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Delete one heartbeat
exports.delete = (req, res, next) => {
  // delete heartbeat
  Heartbeat.deleteOne({ _id: req.params.heartbeatId })
    .then((deleteResult) => {
      res.json(deleteResult)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Get all events for a provided monitor id
exports.getByMonitor = (req, res, next) => {
  // get the specified monitor and make sure the requestor is the owner
  Monitor.findOne({ _id: req.params.monitorId, owner: req.user._id })
    .then((monitor) => {
      // then get all heartbeats for monitor
      Heartbeat.find({ monitor: monitor._id })
        .then((heartbeats) => {
          // return heartbeats
          res.json(heartbeats)
        })
        .catch((err) => {
          res.status(422).send(err.errors)
        })
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

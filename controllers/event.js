let Monitor = require('../models/monitor')
let Event = require('../models/event')

// Get all events

exports.getAll = (req, res, next) => {
  Event.find({ owner: req.user._id })
    .then((events) => {
      res.json(events)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Create event

exports.create = (req, res, next) => {
  const { monitorId, message, type } = req.body
  var newEvent = new Event({
    monitor: monitorId,
    message: message,
    type: type,
  })
  newEvent
    .save()
    .then((event) => {
      res.json(event)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Read one event
exports.getOne = (req, res, next) => {
  Event.findOne({ _id: req.params.eventId })
    .then((event) => {
      res.json(event)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Update one event
exports.update = (req, res, next) => {
  Event.findByIdAndUpdate({ _id: req.params.eventId }, req.body, { new: true })
    .then((event) => {
      res.json(event)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Delete one event
exports.delete = (req, res, next) => {
  // delete event
  Event.deleteOne({ _id: req.params.eventId })
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
      // then get all events for the monitor
      Event.find({ monitor: monitor._id })
        .then((events) => {
          // return events
          res.json(events)
        })
        .catch((err) => {
          res.status(422).send(err.errors)
        })
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

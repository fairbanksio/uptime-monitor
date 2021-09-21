let Monitor = require("../models/monitor");
var monitoringService = require("../services/monitoring");

// Get all monitors
exports.getAll = (req, res, next) => {
  Monitor.find({ owner: req.user._id })
    .collation({ locale: "en" })
    .sort({ name: 1 })
    .populate({
      path: "events heartbeats",
      options: { sort: { createdAt: -1 } },
    })
    .slice("heartbeats", -20)
    .then((monitors) => {
      res.json(monitors);
    })
    .catch((err) => {
      res.status(422).send(err.errors);
    });
};

// Create monitor
exports.create = (req, res, next) => {
  const { name, interval, enabled, type, config, notifications } = req.body;
  const { user } = req;
  var newMonitor = new Monitor({
    name: name,
    interval: interval,
    enabled: enabled,
    type: type,
    config: config,
    owner: user._id,
    notifications: notifications,
  });
  newMonitor
    .save()
    .then((monitor) => {
      monitoringService.startMonitor(monitor);
      res.json(monitor);
    })
    .catch((err) => {
      res.status(422).send(err.errors);
    });
};

// Read one monitor
exports.getOne = (req, res, next) => {
  Monitor.findOne({ _id: req.params.monitorId, owner: req.user._id })
    .then((monitor) => {
      res.json(monitor);
    })
    .catch((err) => {
      res.status(422).send(err.errors);
    });
};

// Update one monitor
exports.update = (req, res, next) => {
  const updatedMonitor = (query) => ({
    ...(query.hasOwnProperty("name") && { name: query.name }),
    ...(query.hasOwnProperty("interval") && { interval: query.interval }),
    ...(query.hasOwnProperty("enabled") && { enabled: query.enabled }),
    ...(query.hasOwnProperty("config") && { config: query.config }),
    ...(query.hasOwnProperty("owner") && { owner: query.owner }),
    ...(query.hasOwnProperty("notifications") && {
      notifications: query.notifications,
    }),
  });

  Monitor.findByIdAndUpdate(
    { _id: req.params.monitorId, owner: req.user._id },
    updatedMonitor(req.body),
    { new: true }
  )
    .populate({
      path: "events heartbeats",
      options: { sort: { createdAt: -1 } },
    })
    .slice("heartbeats", -20)
    .then((monitor) => {
      monitoringService.updateMonitor(monitor);
      res.json(monitor);
    })
    .catch((err) => {
      res.status(422).send(err.errors);
    });
};

// Delete one monitor
exports.delete = (req, res, next) => {
  // delete doesn't return an object id and we need it to stop monitor
  Monitor.findOne({ _id: req.params.monitorId, owner: req.user._id })
    .then((monitor) => {
      monitoringService.stopMonitor(monitor);
    })
    .catch((err) => {
      res.status(422).send(err.errors);
    });

  // delete monitor
  Monitor.deleteOne({ _id: req.params.monitorId })
    .then((deleteResult) => {
      res.json(deleteResult);
    })
    .catch((err) => {
      res.status(422).send(err.errors);
    });
};

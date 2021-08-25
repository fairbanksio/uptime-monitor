let Page = require('../models/page')

// Get all pages
exports.getAll = (req, res, next) => {
  Page.find({ owner: req.user._id })
    .then((pages) => {
      res.json(pages)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Create page
exports.create = (req, res, next) => {
  const { name, type, monitors, slug } = req.body
  const { user } = req
  var newPage = new Page({
    name: name,
    type: type,
    owner: user._id,
    slug: slug,
    monitors: monitors,
  })
  newPage
    .save()
    .then((page) => {
      res.json(page)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Read one page
exports.getOne = (req, res, next) => {
  Page.findOne({ slug: req.params.page-slug, owner: req.user._id })
    .then((page) => {
      res.json(page)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Update one page
exports.update = (req, res, next) => {

  const updatedPage = (query) => ({
    ...query.name && { name: query.name },
    ...query.type && { type: query.type },
    ...query.owner && { owner: query.owner },
    ...query.monitors && { monitors: query.monitors },
  })

  Page.findByIdAndUpdate({_id: req.params.pageId, owner: req.user._id}, updatedPage(req.body), {new: true})
    .then((page) => {
      res.json(page)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Delete one page
exports.delete = (req, res, next) => {
  // delete page
  Page.deleteOne({ _id: req.params.pageId })
    .then((deleteResult) => {
      res.json(deleteResult)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}


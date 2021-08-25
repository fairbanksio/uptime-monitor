let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timestamps = require('mongoose-timestamp')

var PageSchema = new mongoose.Schema({
    monitors: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Monitor',
        },
      ],
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        default: "standard"
      },
      slug: {
        type: String,
        required: true,
        unique: true
      },

})

PageSchema.plugin(timestamps) // Automatically adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Page', PageSchema)

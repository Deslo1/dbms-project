const mongoose = require('mongoose');
const validator = require('validator');

const activeCallsSchema = new mongoose.Schema(
  {

      name: {
      type: String,
      trim: true,
      maxlength: [20, 'Name cannot be more than 20 characters'],
      minlength: [3, 'A name must be more than 3 characters'],
      validate: [validator.isAlpha, 'Name must only contain characters']
    },
     jurisdiction: {
      type: String,
      trim: true,
      minlength: [5, 'An address must be present'],
    },
    type: {
      type: String,
      enum: {
        values: ['Domestic Abuse', 'Armed Assault', 'Public Nuisance'],
        message: ''
      }
    },
    number: {
      type: Number,
    },
    description: {
      type: String,
      trim: true
    },
    latitude:Number,
    longitude:Number
  }
);

const activeCalls = mongoose.model('activeCalls', activeCallsSchema);

module.exports = activeCalls;
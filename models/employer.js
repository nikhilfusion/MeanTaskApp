var mongoose = require('mongoose');

module.exports = mongoose.model('employer', {
  name:{
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    is_verified: {
      type: Boolean,
      required: true
    },
    del_flg: {
      type: Boolean,
      required: true
    }
})
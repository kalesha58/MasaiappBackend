const mongoose = require("mongoose");
const jobschema = new mongoose.Schema({
    companyname: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    unique: true,
  },
  contract: {
    type: String,
    required: true,
    minLength: 6,
  },
  
  Location: {
    type: String,
    required: true,
    minLength: 6,
  },
  
});

module.exports = mongoose.model("job", jobschema);

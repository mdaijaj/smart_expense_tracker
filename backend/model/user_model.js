const mongoose = require('mongoose');

let user_schema = new mongoose.Schema({
   name: {
      type: String, 
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
   },
   currency: {
      type: String,
      default: 'INR', 
      trim: true,
   },
   monthly_budget: {
      type: Number,
   },
   password: {
      type: String,
      required: true
   }
}, { timestamps: true });     

module.exports = mongoose.model('User_details', user_schema);
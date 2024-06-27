 const mongoose =require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description:{
      type: String, 
      required: true, 
      trim: true
    },
    status :{
        type: String,
        enum: ["Pending", "Progress","Review" , "Done"],
        default: "Pending"
    },

  },
  { timestamps : true , versionKey: false }
);

module.exports = mongoose.model("Todo", todoSchema);

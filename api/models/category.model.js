import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
  

  name: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique : true,
    trim: true
  },

});


const category = mongoose.model('Category', categorySchema,'categories')
export default category
                      
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  
 
  title: {
    type: String,
   
    required: true,
     
  },

 

  link: {
    type: String,

  },

  description: {
    type: String,
  },

  price: {
    type: String,
  },

  unidaddeprecio: {
    type: String,
  },

  oferta: {
    type: String,
  },
 
 
   
  telefono: {
    type: String,

  },
  
   

  images: {
    type: Array,
    required: true
  },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
  user: { type: mongoose.Types.ObjectId, ref: 'user' }
}, {
  timestamps: true
})

module.exports = mongoose.model('post', postSchema)
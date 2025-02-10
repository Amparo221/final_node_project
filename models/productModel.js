import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
});


const Product = mongoose.model('Product', productSchema);

export {Product};

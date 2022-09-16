import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  items: [{ images: [], price: Number, name: '' }],
});

const Product = mongoose.model('products', Schema);

export default Product;

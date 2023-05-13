import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 2,
      max: 100
    },
    price: Number,
    rating: Number,
    supply: Number,
    category: String,
    description: String
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;

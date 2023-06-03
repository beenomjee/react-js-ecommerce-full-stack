import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
    quantity: { type: Number, required: true },
    view: { type: Number, default: 0 },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
export default Product;

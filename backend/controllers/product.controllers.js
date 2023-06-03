import { Product } from "../db/index.js";
import { deleteImage, uploadImage } from "../utils/index.js";

export const createProduct = async (req, res) => {
  try {
    const img = await uploadImage(req.body.img, "react-js-ecommerce/products");
    await Product.create({ ...req.body, img });
    res.status(201).json({ message: "Product created!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.view += 1;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else if (product.img !== req.body.img) {
      await deleteImage(product.img, "react-js-ecommerce/products");
      req.body.img = await uploadImage(
        req.body.img,
        "react-js-ecommerce/products"
      );
    }
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Product updated!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await deleteImage(product.img, "react-js-ecommerce/products");
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    const totalPages = Math.ceil(totalProducts / limit);

    const response = {
      products,
      currentPage: parseInt(page),
      totalPages,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getProductsForHomePage = async (req, res) => {
  try {
    const newProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
    const popularProducts = await Product.find().sort({ view: -1 }).limit(4);
    res.json({ newProducts, popularProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    const response = {
      products,
      currentPage: parseInt(page),
      totalPages,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

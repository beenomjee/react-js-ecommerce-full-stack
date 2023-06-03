import { Order, Product } from "../db/index.js";
import Stripe from "stripe";

export const initiatePayment = async (req, res) => {
  try {
    const { products } = req.body;
    const temp = [];

    for (const { _id, quantity } of products) {
      const product = await Product.findById(_id);
      if (!product || product.quantity < quantity) {
        return res
          .status(404)
          .json({ message: `${product.name} isn't available!` });
      }

      temp.push({
        name: product.name,
        description: product.description,
        unit_amount: product.price * quantity * 100,
        quantity,
        id: product._id,
      });
    }

    const tempData = JSON.stringify(
      temp.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }))
    );

    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    const { url } = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: temp.map((product) => ({
        price_data: {
          currency: "gbp",
          unit_amount: product.unit_amount,
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
        quantity: product.quantity,
      })),
      metadata: {
        products: tempData,
      },
      mode: "payment",
      success_url: `${process.env.CLIENT_SIDE}/success-payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_SIDE}/cart`,
    });

    res.json({ url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const checkValidityOfPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const products = JSON.parse(session.metadata.products);

    const bulkOperations = products.map((product) => ({
      updateOne: {
        filter: { _id: product.id },
        update: { $inc: { quantity: -product.quantity } },
      },
    }));

    // Update multiple documents with different values
    await Product.bulkWrite(bulkOperations);
    const orders = products.map((product) => ({
      userId: req.user._id,
      product: product.id,
      quantity: product.quantity,
    }));

    await Order.insertMany(orders);

    res.send("Payment success");
  } catch (error) {
    console.error("Error retrieving session from Stripe:", error);
    res.status(500).send("An error occurred");
  }
};

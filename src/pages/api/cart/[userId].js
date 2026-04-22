import { connectDB } from "../../../lib/mongodb";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await connectDB();

  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      let cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart) {
        cart = new Cart({ userId, items: [], totalPrice: 0 });
        await cart.save();
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { productId, quantity } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [], totalPrice: 0 });
      }

      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          quantity,
          price: product.price,
        });
      }

      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { productId, quantity } = req.body;

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        if (quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        } else {
          cart.items[itemIndex].quantity = quantity;
        }
      }

      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { productId } = req.body;

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId,
      );

      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

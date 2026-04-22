import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { category } = req.query;
      let filter = {};
      if (category && category !== "all") {
        filter = { category };
      }

      const products = await Product.find(filter);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { title, price, category, description, thumbnail, quantity } =
        req.body;

      const product = new Product({
        title,
        price,
        category,
        description,
        thumbnail,
        quantity,
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

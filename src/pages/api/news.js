import { connectDB } from "../../../lib/mongodb";
import News from "../../../models/News";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const news = await News.find().sort({ createdAt: -1 });
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description, content } = req.body;

      const newsItem = new News({
        title,
        description,
        content,
      });

      await newsItem.save();
      res.status(201).json(newsItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.models.News || mongoose.model("News", newsSchema);

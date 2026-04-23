import mongoose from "mongoose";
import Product from "./models/Product.js";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/nextapp";

const products = [
  {
    title: "Wireless Headphones",
    price: 79.99,
    category: "electronics",
    description:
      "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
    thumbnail: "https://via.placeholder.com/300?text=Wireless+Headphones",
    quantity: 50,
  },
  {
    title: "Smart Watch",
    price: 199.99,
    category: "electronics",
    description:
      "Feature-rich smartwatch with fitness tracking, heart rate monitor, and 7-day battery.",
    thumbnail: "https://via.placeholder.com/300?text=Smart+Watch",
    quantity: 30,
  },
  {
    title: "4K Webcam",
    price: 129.99,
    category: "electronics",
    description:
      "Professional 4K webcam with auto-focus and built-in microphone for streaming.",
    thumbnail: "https://via.placeholder.com/300?text=4K+Webcam",
    quantity: 25,
  },
  {
    title: "Bluetooth Speaker",
    price: 59.99,
    category: "electronics",
    description:
      "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    thumbnail: "https://via.placeholder.com/300?text=Bluetooth+Speaker",
    quantity: 40,
  },
  {
    title: "USB-C Hub",
    price: 34.99,
    category: "electronics",
    description: "7-in-1 USB-C hub with multiple ports for connectivity.",
    thumbnail: "https://via.placeholder.com/300?text=USB-C+Hub",
    quantity: 60,
  },
  {
    title: "Premium Skincare Set",
    price: 89.99,
    category: "beauty",
    description:
      "Complete skincare routine with cleanser, toner, moisturizer, and serum.",
    thumbnail: "https://via.placeholder.com/300?text=Skincare+Set",
    quantity: 35,
  },
  {
    title: "Luxury Face Mask",
    price: 24.99,
    category: "beauty",
    description:
      "Korean-inspired hydrating face mask with natural ingredients.",
    thumbnail: "https://via.placeholder.com/300?text=Face+Mask",
    quantity: 100,
  },
  {
    title: "Hair Growth Serum",
    price: 44.99,
    category: "beauty",
    description: "Natural hair growth serum with biotin and keratin complex.",
    thumbnail: "https://via.placeholder.com/300?text=Hair+Serum",
    quantity: 45,
  },
  {
    title: "Eye Cream",
    price: 32.99,
    category: "beauty",
    description: "Anti-aging eye cream with retinol and hyaluronic acid.",
    thumbnail: "https://via.placeholder.com/300?text=Eye+Cream",
    quantity: 50,
  },
  {
    title: "Perfume Collection",
    price: 99.99,
    category: "fragrances",
    description: "Set of 3 premium fragrances from famous brands.",
    thumbnail: "https://via.placeholder.com/300?text=Perfume+Collection",
    quantity: 20,
  },
  {
    title: "Eau de Toilette",
    price: 54.99,
    category: "fragrances",
    description: "Fresh and elegant eau de toilette with fruity notes.",
    thumbnail: "https://via.placeholder.com/300?text=Eau+de+Toilette",
    quantity: 30,
  },
  {
    title: "Cologne for Men",
    price: 64.99,
    category: "fragrances",
    description: "Classic men's cologne with woody and spicy notes.",
    thumbnail: "https://via.placeholder.com/300?text=Cologne",
    quantity: 25,
  },
  {
    title: "Body Mist",
    price: 19.99,
    category: "fragrances",
    description: "Light and refreshing body mist for everyday wear.",
    thumbnail: "https://via.placeholder.com/300?text=Body+Mist",
    quantity: 70,
  },
  {
    title: "Modern Dining Chair",
    price: 149.99,
    category: "furniture",
    description:
      "Contemporary dining chair with ergonomic design and durable materials.",
    thumbnail: "https://via.placeholder.com/300?text=Dining+Chair",
    quantity: 15,
  },
  {
    title: "Wooden Desk",
    price: 249.99,
    category: "furniture",
    description: "Spacious wooden desk with 2 drawers and cable management.",
    thumbnail: "https://via.placeholder.com/300?text=Wooden+Desk",
    quantity: 10,
  },
  {
    title: "Office Chair Pro",
    price: 299.99,
    category: "furniture",
    description:
      "Premium office chair with lumbar support and adjustable armrests.",
    thumbnail: "https://via.placeholder.com/300?text=Office+Chair",
    quantity: 12,
  },
  {
    title: "Bookshelf",
    price: 119.99,
    category: "furniture",
    description: "5-tier wooden bookshelf with modern design.",
    thumbnail: "https://via.placeholder.com/300?text=Bookshelf",
    quantity: 18,
  },
  {
    title: "Organic Coffee Beans",
    price: 12.99,
    category: "groceries",
    description:
      "Premium organic coffee beans from South American plantations.",
    thumbnail: "https://via.placeholder.com/300?text=Coffee+Beans",
    quantity: 200,
  },
  {
    title: "Green Tea Set",
    price: 8.99,
    category: "groceries",
    description: "Traditional green tea with antioxidants and health benefits.",
    thumbnail: "https://via.placeholder.com/300?text=Green+Tea",
    quantity: 150,
  },
  {
    title: "Honey Jar",
    price: 14.99,
    category: "groceries",
    description: "Pure raw honey with natural sweetness and health benefits.",
    thumbnail: "https://via.placeholder.com/300?text=Honey+Jar",
    quantity: 80,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`Successfully seeded ${result.length} products`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

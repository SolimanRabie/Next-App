const http = require("http");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "db.json");

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/products" && req.method === "GET") {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Internal server error" }));
        return;
      }
      const db = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(db.products));
    });
  } else if (req.url.startsWith("/products/") && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Internal server error" }));
        return;
      }
      const db = JSON.parse(data);
      const filteredProducts = db.products.filter((p) => p.id !== id);
      db.products = filteredProducts;
      fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: "Internal server error" }));
          return;
        }
        res.writeHead(200);
        res.end();
      });
    });
  } else if (req.url === "/products" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const newProduct = JSON.parse(body);
        fs.readFile(dbPath, "utf8", (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Internal server error" }));
            return;
          }
          const db = JSON.parse(data);
          newProduct.id = Date.now().toString();
          db.products.push(newProduct);
          fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
            if (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: "Internal server error" }));
              return;
            }
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newProduct));
          });
        });
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else if (
    req.url.startsWith("/products?category=") &&
    req.method === "GET"
  ) {
    const category = req.url.split("=")[1];
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Internal server error" }));
        return;
      }
      const db = JSON.parse(data);
      const filteredProducts =
        category === "all"
          ? db.products
          : db.products.filter((p) => p.category === category);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(filteredProducts));
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(4000, () => {
  console.log("Mock API server running on http://localhost:4000");
});

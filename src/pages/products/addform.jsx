import React, { useState } from "react";
import { useRouter } from "next/router";

const AddProduct = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "beauty",
    description: "",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      if (res.ok) {
        alert("Product Added Successfully!");
        router.push("/products");
      }
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-5 border-0 rounded-4 bg-light">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary mb-3">➕ Add New Product</h2>
              <p className="text-muted">
                Fill in the details to add a new product to our store.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Product Title</label>
                  <input
                    type="text"
                    className="form-control rounded-pill border-primary"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Price ($)</label>
                  <input
                    type="number"
                    className="form-control rounded-pill border-primary"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Category</label>
                  <select
                    className="form-select rounded-pill border-primary"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="beauty">Beauty</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Thumbnail URL</label>
                  <input
                    type="url"
                    className="form-control rounded-pill border-primary"
                    value={formData.thumbnail}
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail: e.target.value })
                    }
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control rounded-3 border-primary"
                    rows="4"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-success btn-lg rounded-pill px-5 fw-bold"
                >
                  💾 Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

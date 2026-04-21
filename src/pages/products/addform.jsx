import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AddProduct = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: 'beauty',
        description: '',
        thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch('http://localhost:4000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price), 
                    id: Date.now().toString()
                })
            });

            if (res.ok) {
                alert('Product Added Successfully!');
                router.push('/products');
            }
        } catch (error) {
            console.error("Add failed:", error);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4 border-0">
                        <h2 className="fw-bold mb-4">Add New Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Product Title</label>
                                <input type="text" className="form-control" required
                                    onChange={(e) => setFormData({...formData, title: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price ($)</label>
                                <input type="number" className="form-control" required
                                    onChange={(e) => setFormData({...formData, price: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-select" 
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                    <option value="beauty">Beauty</option>
                                    <option value="fragrances">Fragrances</option>
                                    <option value="furniture">Furniture</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" rows="3" required
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                                Save Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
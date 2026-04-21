import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

const ProductsComponent = ({ products }) => {
    const [items, setItems] = useState(products || []);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setItems(products);
    }, [products]);


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await fetch(`http://localhost:4000/products/${id}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setItems(items.filter(item => item.id !== id));
                }
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    const handleFilter = async (category) => {
        let url = "http://localhost:4000/products";
        if (category !== "all") {
            url += `?category=${category}`;
        }

        try {
            const res = await fetch(url);
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Filtering failed:", error);
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container py-5">
            <div className="row mb-5 align-items-center">
                <div className="col-lg-4">
                    <h2 className="fw-bold text-uppercase border-start border-4 border-primary ps-3 mb-0">
                        Our Collection
                    </h2>
                </div>

                <div className="col-lg-8">
                    <div className="d-flex gap-3 mt-3 mt-lg-0">
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Search products..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <select
                            className="form-select rounded-pill w-50"
                            onChange={(e) => handleFilter(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="beauty">Beauty</option>
                            <option value="fragrances">Fragrances</option>
                            <option value="furniture">Furniture</option>
                            <option value="groceries">Groceries</option>
                        </select>

                        <Link href="/products/addform" className="btn btn-primary rounded-pill px-4">
                            Add_New
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {filteredItems.length > 0 ? (
                    filteredItems.map((p, index) => {
                        return (
                            <div key={p.id} className="col-md-6 col-lg-4 col-xl-3">
                                <div className="card h-100 shadow-sm border-0 transition-hover">
                                    <div className="position-relative overflow-hidden bg-light rounded-top"
                                        style={{ height: '250px', width: '100%' }}>

                                        <Image
                                            src={p.thumbnail}
                                            alt={p.title}
                                            fill
                                            priority={index < 4}
                                            className="p-2 card-img-top"
                                            style={{ objectFit: 'contain' }}
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />

                                        <div className="position-absolute top-0 end-0 p-2" style={{ zIndex: 1 }}>
                                            <span className="badge bg-dark rounded-pill shadow-sm">${p.price}</span>
                                        </div>
                                    </div>

                                    <div className="card-body d-flex flex-column p-4">
                                        <span className="text-uppercase text-primary fw-bold mb-1" style={{ fontSize: '0.75rem' }}>
                                            {p.category}
                                        </span>
                                        <h5 className="card-title fw-bold text-dark mb-2 text-truncate">
                                            {p.title}
                                        </h5>
                                        <p className="card-text text-muted small mb-4 flex-grow-1" style={{ height: '4.5rem', overflow: 'hidden' }}>
                                            {p.description}
                                        </p>

                                        <div className="d-flex gap-2">
                                            <Link href={`/products/${p.id}`} className="btn btn-outline-dark flex-grow-1 fw-bold rounded-pill">
                                                Details
                                            </Link>

                                            {/* زرار المسح */}
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="btn btn-outline-danger rounded-circle"
                                                title="Delete Product"
                                            >
                                                <i className="bi bi-trash"></i> 🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 text-center py-5">
                        <h3 className="text-muted">No products found...</h3>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProductsComponent;
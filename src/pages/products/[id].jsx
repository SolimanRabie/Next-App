import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProductDetail = ({ product }) => {
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <Link href="/products" className="btn btn-primary mt-3">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link href="/products" className="btn btn-outline-secondary mb-4">
        ← Back to Products
      </Link>

      <div className="row">
        <div className="col-md-6">
          <div
            className="bg-light rounded-4 p-4 text-center"
            style={{
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product.thumbnail && (
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={300}
                height={300}
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">{product.title}</h1>

          <div className="mb-3">
            <span className="badge bg-success rounded-pill px-3 py-2 fs-6">
              {product.category}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-primary fw-bold">${product.price}</h3>
          </div>

          <p className="text-muted mb-4">{product.description}</p>

          <div className="d-flex gap-2 mb-4">
            <button className="btn btn-primary btn-lg rounded-pill flex-grow-1">
              🛒 Add to Cart
            </button>
            <button className="btn btn-outline-primary btn-lg rounded-pill">
              ❤️
            </button>
          </div>

          <div className="bg-light p-3 rounded-3">
            <p className="mb-2">
              <strong>SKU:</strong> {product._id}
            </p>
            <p className="mb-0">
              <strong>In Stock:</strong>{" "}
              <span className="text-success">Available</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { notFound: true };
    }

    const product = await res.json();

    return {
      props: {
        product,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const products = await res.json();

    const paths = products.map((product) => ({
      params: { id: product._id },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching products for paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

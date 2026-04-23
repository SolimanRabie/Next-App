import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Cart = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.email || "guest-user";

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`/api/cart/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setCart(data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const res = await fetch(`/api/cart/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(`/api/cart/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async () => {
    alert("✅ Order placed successfully! Thank you for your purchase.");
    // Reset cart
    setCart({ ...cart, items: [], totalPrice: 0 });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1 className="display-5 fw-bold text-primary mb-2">
          🛒 Shopping Cart
        </h1>
        <p className="text-muted">
          {session
            ? `Welcome, ${session.user.name}! Here's your cart.`
            : "Sign in to save your cart."}
        </p>
      </div>

      {!cart || cart.items.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-lg rounded-4 p-5 text-center">
              <h3 className="text-muted mb-3">😔 Your cart is empty</h3>
              <p className="text-muted mb-4">
                Add some products to get started!
              </p>
              <Link
                href="/products"
                className="btn btn-primary btn-lg rounded-pill px-5"
              >
                🛍️ Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 p-4">
              <h5 className="fw-bold mb-4">Items ({cart.items.length})</h5>

              {cart.items.map((item) => (
                <div key={item._id} className="border-bottom pb-4 mb-4">
                  <div className="row align-items-center">
                    <div className="col-md-3 text-center">
                      {item.productId?.thumbnail && (
                        <Image
                          src={item.productId.thumbnail}
                          alt={item.productId?.title}
                          width={100}
                          height={100}
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </div>
                    <div className="col-md-4">
                      <h6 className="fw-bold">{item.productId?.title}</h6>
                      <p className="text-muted small mb-0">
                        Category: {item.productId?.category}
                      </p>
                      <p className="text-primary fw-bold mt-2">${item.price}</p>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId._id,
                              item.quantity - 1,
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId._id,
                              item.quantity + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="fw-bold text-success">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="btn btn-sm btn-danger rounded-circle"
                        onClick={() => handleRemoveItem(item.productId._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="btn btn-outline-primary btn-lg rounded-pill mt-4"
            >
              ← Continue Shopping
            </Link>
          </div>

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-lg rounded-4 p-4 sticky-top"
              style={{ top: "100px" }}
            >
              <h5 className="fw-bold mb-4">Order Summary</h5>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${cart.totalPrice?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (10%):</span>
                  <span>${(cart.totalPrice * 0.1)?.toFixed(2) || "0.00"}</span>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h6 className="fw-bold">Total:</h6>
                <h6 className="fw-bold text-primary">
                  ${(cart.totalPrice * 1.1)?.toFixed(2) || "0.00"}
                </h6>
              </div>

              <button
                className="btn btn-success btn-lg w-100 rounded-pill fw-bold mb-3"
                onClick={handleCheckout}
              >
                ✅ Checkout
              </button>

              <button
                className="btn btn-outline-secondary w-100 rounded-pill fw-bold"
                onClick={() => router.push("/products")}
              >
                Continue Shopping
              </button>

              <div className="mt-4 p-3 bg-light rounded-3">
                <small className="text-muted">
                  <strong>✓</strong> Free shipping on orders over $50
                  <br />
                  <strong>✓</strong> 30-day return policy
                  <br />
                  <strong>✓</strong> 100% money-back guarantee
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

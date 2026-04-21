import Link from "next/link";

const HomePage = () => {
  return (
    <div className="hero-section bg-gradient-primary text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-3 fw-bold mb-4">Welcome to My Store</h1>
            <p className="lead mb-4">
              Discover amazing products at unbeatable prices. Shop now and
              experience the difference!
            </p>
            <div className="d-flex gap-3">
              <Link
                href="/products"
                className="btn btn-light btn-lg px-4 fw-bold"
              >
                🛒 Shop Now
              </Link>
              <Link
                href="/contactus"
                className="btn btn-outline-light btn-lg px-4 fw-bold"
              >
                📞 Contact Us
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <div className="hero-image">
              <div
                className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "300px", height: "300px" }}
              >
                <span className="display-1 text-primary">🛍️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

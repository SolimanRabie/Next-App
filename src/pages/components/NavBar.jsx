import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" href="/">
          🛍️ My Store
        </Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link text-dark fw-semibold" href="/">
            Home
          </Link>
          <Link className="nav-link text-dark fw-semibold" href="/products">
            Products
          </Link>
          <Link className="nav-link text-dark fw-semibold" href="/news">
            📰 News
          </Link>
          <Link className="nav-link text-dark fw-semibold" href="/contactus">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

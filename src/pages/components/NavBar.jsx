import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" href="/">
          🛍️ My Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-center gap-3">
            <Link className="nav-link text-dark fw-semibold" href="/">
              Home
            </Link>
            <Link className="nav-link text-dark fw-semibold" href="/products">
              Products
            </Link>
            <Link className="nav-link text-dark fw-semibold" href="/news">
              📰 News
            </Link>
            <Link className="nav-link text-dark fw-semibold" href="/cart">
              🛒 Cart
            </Link>
            <Link
              className="nav-link text-dark fw-semibold"
              href="/products/addform"
            >
              ➕ Post
            </Link>
            <Link className="nav-link text-dark fw-semibold" href="/contactus">
              Contact Us
            </Link>

            {session ? (
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-outline-primary rounded-pill d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={24}
                      height={24}
                      className="rounded-circle"
                    />
                  )}
                  <span className="d-none d-md-inline">
                    {session.user.name}
                  </span>
                  <span>▼</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text fw-bold">
                      {session.user.email}
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger fw-bold"
                      onClick={() =>
                        signOut({ redirect: true, callbackUrl: "/" })
                      }
                    >
                      🚪 Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => signIn(undefined, { callbackUrl: "/products" })}
                className="btn btn-sm btn-primary rounded-pill fw-bold"
              >
                🔐 Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

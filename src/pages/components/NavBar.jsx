import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold" href="/">My Store</Link>
                <div className="navbar-nav ms-auto">
                    <Link className="nav-link active" href="/">Home</Link>
                    <Link className="nav-link" href="/products">Products</Link>
                    <Link className="nav-link" href="/contactus">Contact Us</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        📚 <span>Book</span>Haven
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/borrow">Borrow</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
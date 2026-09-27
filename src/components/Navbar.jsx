import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>📚 Book Library</h2>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/borrow">Borrow</Link>
        <Link to="/history">Borrow History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
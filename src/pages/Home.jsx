import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <h1>Welcome to the Book Library</h1>
      <p>Browse our collection of books, fetched live from our database.</p>
      <Link to="/books" className="home-button">
        View Books
      </Link>
    </main>
  );
}
export default Home;
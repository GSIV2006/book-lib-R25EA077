import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <div>
        <h1>Your next great read starts here.</h1>

        <p>
          Discover our collection of books, explore new ideas,
          and borrow your next favorite story — all powered by
          a live Supabase database.
        </p>

        <Link to="/books" className="home-button">
          Explore Collection →
        </Link>
      </div>
    </main>
  );
}

export default Home;
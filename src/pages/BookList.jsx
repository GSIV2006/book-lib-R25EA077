import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    setLoading(true);

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("id");

    if (error) {
      console.error(error);
      alert("Failed to load books");
      setLoading(false);
      return;
    }

    setBooks(data || []);
    setLoading(false);
  }

  const categories = [
    "All",
    ...new Set(books.map((book) => book.genre)),
  ];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || book.genre === category;

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" && book.available) ||
        (availability === "Borrowed" && !book.available);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability
      );
    });
  }, [books, search, category, availability]);

  const availableCount = books.filter((book) => book.available).length;

  if (loading) {
    return (
      <main className="library-page">
        <div className="loading-state">
          <div className="neon-dot"></div>
          <p>Loading the library...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="library-page">

      {/* HERO */}
      <section className="library-hero">
        <div>
          <div className="eyebrow">
            ✦ DIGITAL LIBRARY
          </div>

          <h1>
            Find your next
            <span> obsession.</span>
          </h1>

          <p>
            From timeless classics to manga legends and
            Marvel heroes — explore the collection.
          </p>
        </div>

        <div className="library-stats">
          <div className="stat-card">
            <strong>{books.length}</strong>
            <span>Total Books</span>
          </div>

          <div className="stat-card neon-stat">
            <strong>{availableCount}</strong>
            <span>Available Now</span>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="library-controls">

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search books or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="availability-filter">
          {["All", "Available", "Borrowed"].map((option) => (
            <button
              key={option}
              className={
                availability === option ? "active-filter" : ""
              }
              onClick={() => setAvailability(option)}
            >
              {option}
            </button>
          ))}
        </div>

      </section>

      {/* CATEGORY FILTERS */}
      <section className="category-row">
        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item
                ? "category-pill active-category"
                : "category-pill"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </section>

      {/* BOOK GRID */}
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <div>📚</div>
          <h2>No books found</h2>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <section className="modern-book-grid">

          {filteredBooks.map((book, index) => (

            <article
              className={`modern-book-card ${book.genre
                .toLowerCase()
                .replace(" ", "-")}`}
              key={book.id}
            >

              <div className="book-number">
                #{String(index + 1).padStart(2, "0")}
              </div>

              <div className="book-icon">
                {book.genre === "Manga"
                  ? "☠"
                  : book.genre === "Marvel"
                  ? "✦"
                  : "📖"}
              </div>

              <div className="book-content">

                <span className="genre-badge">
                  {book.genre}
                </span>

                <h2>{book.title}</h2>

                <p className="author">
                  {book.author}
                </p>

                <div className="book-footer">

                  <span
                    className={
                      book.available
                        ? "availability available"
                        : "availability borrowed"
                    }
                  >
                    <span className="status-dot"></span>

                    {book.available
                      ? "Available"
                      : "Borrowed"}
                  </span>

                </div>

              </div>

            </article>

          ))}

        </section>
      )}

      <p className="result-count">
        Showing {filteredBooks.length} of {books.length} books
      </p>

    </main>
  );
}

export default BookList;
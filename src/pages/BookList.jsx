import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function BookList() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {

    const { data, error } = await supabase
      .from("books")
      .select("*");

    if (error) {
      console.error(error);
      alert("Failed to load books");
      return;
    }

    setBooks(data);
  }

  return (
    <main className="book-list-page">

      <h1>Book Library</h1>

      <div className="book-grid">

        {books.map((book) => (

          <div className="book-card" key={book.id}>

            <h2>{book.title}</h2>

            <p>✍️ {book.author}</p>

            <p>📚 {book.genre}</p>

            <p>{book.available ? "✅ Available" : "❌ Not Available"}</p>

          </div>

        ))}

      </div>

    </main>
  );
}

export default BookList;
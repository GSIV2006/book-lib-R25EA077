import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Borrow() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("available", true);

    if (error) {
      console.error(error);
      alert("Failed to load available books");
      return;
    }

    setBooks(data || []);
  }

  async function handleBorrow(e) {
    e.preventDefault();

    if (!name.trim() || !selectedBook) {
      alert("Please fill all the details");
      return;
    }

    const book = books.find(
      (item) => String(item.id) === String(selectedBook)
    );

    if (!book) {
      alert("Please select a valid book");
      return;
    }

    const { error: insertError } = await supabase
      .from("borrowings")
      .insert([
        {
          borrower_name: name.trim(),
          book_title: book.title,
        },
      ]);

    if (insertError) {
      console.error(insertError);
      alert("Borrowing failed");
      return;
    }

    const { error: updateError } = await supabase
      .from("books")
      .update({ available: false })
      .eq("id", book.id);

    if (updateError) {
      console.error(updateError);
      alert("Failed to update book status");
      return;
    }

    alert(`"${book.title}" borrowed successfully!`);

    setName("");
    setSelectedBook("");

    getBooks();
  }

  return (
    <main className="borrow-page">
      <h1>Borrow a Book</h1>

      <form className="borrow-form" onSubmit={handleBorrow}>
        <label htmlFor="name">Your Name</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label htmlFor="book">Select Book</label>

        <select
          id="book"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          <option value="">-- Select a Book --</option>

          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} — {book.author}
            </option>
          ))}
        </select>

        <button type="submit">
          Borrow Book
        </button>
      </form>
    </main>
  );
}

export default Borrow;
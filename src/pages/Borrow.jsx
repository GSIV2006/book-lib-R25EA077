import { useState, useEffect } from "react";
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
      return;
    }

    setBooks(data);
  }

  async function handleBorrow() {
    if (!name || !selectedBook) {
      alert("Please fill all the details");
      return;
    }

    const { error: insertError } = await supabase
      .from("borrowings")
      .insert([
        {
          borrower_name: name,
          book_title: selectedBook
        }
      ]);

    if (insertError) {
      console.error(insertError);
      alert("Borrowing failed");
      return;
    }

    const { error: updateError } = await supabase
      .from("books")
      .update({ available: false })
      .eq("title", selectedBook);

    if (updateError) {
      console.error(updateError);
      alert("Failed to update book status");
      return;
    }

    alert("Book borrowed successfully!");
    setName("");
    setSelectedBook("");
    getBooks();
  }

  return (
    <main className="borrow-page">

      <h1>Borrow a Book</h1>

      <div className="borrow-form">

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
            <option key={book.id} value={book.title}>
              {book.title}
            </option>
          ))}
        </select>

        <button onClick={handleBorrow}>
          Borrow Book
        </button>

      </div>

    </main>
  );
}

export default Borrow;
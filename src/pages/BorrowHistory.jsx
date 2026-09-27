import { useState } from "react";
import { supabase } from "../supabase";

function BorrowHistory() {

  const [borrowings, setBorrowings] = useState([]);

  async function getBorrowings() {
    const { data, error } = await supabase
      .from("borrowings")
      .select("*");

    if (error) {
      console.error(error);
      alert("Failed to load borrow history");
      return;
    }

    setBorrowings(data);
  }

  return (
    <main className="borrow-history-page">

      <h1>Borrow History</h1>

      <button className="history-button" onClick={getBorrowings}>
        View Borrowings
      </button>

      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Borrower</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((b) => (
              <tr key={b.id}>
                <td>{b.borrower_name}</td>
                <td>{b.book_title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  );
}

export default BorrowHistory;
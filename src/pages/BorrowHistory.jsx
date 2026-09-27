import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function BorrowHistory() {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBorrowings();
  }, []);

  async function getBorrowings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("borrowings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Failed to load borrow history");
      setLoading(false);
      return;
    }

    setBorrowings(data || []);
    setLoading(false);
  }

  return (
    <main className="borrow-history-page">
      <h1>Borrow History</h1>

      {loading ? (
        <p>Loading borrowing records...</p>
      ) : (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Book</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {borrowings.map((b) => (
                <tr key={b.id}>
                  <td>{b.borrower_name}</td>
                  <td>{b.book_title}</td>
                  <td>
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default BorrowHistory;
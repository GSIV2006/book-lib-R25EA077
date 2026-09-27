import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import Borrow from "./pages/Borrow";
import BorrowHistory from "./pages/BorrowHistory";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/history" element={<BorrowHistory />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
# 📚 BookHaven

> A modern digital library built with React, Vite and Supabase.

BookHaven is a modern web-based library application that allows users to explore a collection of books, search and filter titles, borrow available books, and view borrowing history.

The application uses **Supabase as the backend database**, with the React frontend communicating with the database through the Supabase JavaScript client.

---

## ✨ Features

- 📚 Browse the complete book collection
- 🔎 Search books by title or author
- 🏷️ Filter books by genre
- ✅ Filter books by availability
- 📖 Borrow available books
- 🔄 Automatically update book availability
- 🕘 View borrowing history
- ☁️ Live data fetched from Supabase
- 📱 Responsive interface
- 💜 Modern neon glassmorphism-inspired UI

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| JavaScript | Application logic |
| CSS | Styling and responsive design |
| React Router | Page navigation |
| Supabase | Backend and database |
| PostgreSQL | Database |
| Vite | Development and build tool |

---

## 🗂️ Project Structure

```text
book-library/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── BookList.jsx
│   │   ├── Borrow.jsx
│   │   └── BorrowHistory.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── supabase.js
│
├── package.json
├── vite.config.js
└── README.md
🗄️ Supabase Database

The application uses two main tables:

books

Stores information about the library collection.

id
title
author
genre
available
borrowings

Stores borrowing records.

id
borrower_name
book_title
created_at
🔄 Application Flow
User
 ↓
React Frontend
 ↓
Supabase JavaScript Client
 ↓
Supabase PostgreSQL Database
 ↓
Books / Borrowings
 ↓
React State
 ↓
Updated UI

Books are fetched dynamically from Supabase rather than being hardcoded into the React application.

🚀 Getting Started
1. Clone the repository
git clone https://github.com/GSIV2006/book-lib-R25EA077.git
2. Navigate into the project
cd book-lib-R25EA077
3. Install dependencies
npm install
4. Configure Supabase

Create a .env file in the project root:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_publishable_key
5. Start the development server
npm run dev

The application will be available at the local Vite development URL shown in the terminal.

📌 Academic Assignment

This project demonstrates:

Setting up a Supabase backend
Creating database tables
Connecting a React application to Supabase
Fetching live database records
Inserting records into Supabase
Updating database records
Displaying database data dynamically in React
👨‍💻 Author

G.S.I. Venkat

Built as part of a Web Application Development assignment.


### Then save it and push:

```bash
git add README.md
git commit -m "Add project documentation"
git push origin main
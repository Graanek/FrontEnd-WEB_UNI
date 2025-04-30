import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BooksList from './pages/BooksList';
import BookDetails from './pages/BookDetails';
import AddEditBook from './pages/AddEditBook';
import UserReviews from './pages/UserReviews';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route
              path="/books/new"
              element={
                <ProtectedRoute>
                  <AddEditBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/edit/:id"
              element={
                <ProtectedRoute>
                  <AddEditBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <ProtectedRoute>
                  <UserReviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
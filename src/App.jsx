import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/Landing Page/LandingPage';
import About from './Pages/About/About';
import Books from './Pages/Books/Books';
import SignUp from './Pages/SignUp/SignUp';
import LogIn from './Pages/LogIn/LogIn';
import Navbar from './Components/Navbar';
import Admin from './Pages/Admin/Admin';
import { BookProvider } from './Pages/BookContext/BookContext'; // Import BookProvider
import AdminPage from './Pages/Admin/AdminPage';
import { AuthProvider } from './Components/AuthContext';
import Cart from './Pages/Cart/Cart';

import { CartProvider } from "./Components/CartContext";


function App() {
  return (
    <AuthProvider> 
      <BookProvider>
        <CartProvider> 
          <BrowserRouter>
            <main>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:bookId" element={<Books />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/adminpage" element={<AdminPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/cart" element={<Cart/>} />
              </Routes>
            </main>
          </BrowserRouter>
        </CartProvider>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;

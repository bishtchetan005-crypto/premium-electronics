// File Path: src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import { useShop } from './context/ShopContext';

export default function App() {
  const { toast } = useShop();

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F17] text-slate-100 selection:bg-sky-500 selection:text-white">
      
      {/* Live Toast Notification Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-sky-600 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
          {toast}
        </div>
      )}

      {/* Global Persistent Header */}
      <Navbar />

      {/* Main Pages Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Global Persistent Footer */}
      <Footer />
    </div>
  );
}
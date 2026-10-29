// File Path: src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Truck, ShieldCheck, RotateCcw, HeadphonesIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F17] border-t border-slate-800 text-slate-400 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-sm">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-sky-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Insured Shipping</p>
              <p className="text-xs text-slate-400">Fast delivery worldwide</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-sky-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">2-Year Warranty</p>
              <p className="text-xs text-slate-400">100% Genuine products</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-sky-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">30 Days Return</p>
              <p className="text-xs text-slate-400">No questions asked</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HeadphonesIcon className="w-6 h-6 text-sky-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">24/7 Expert Help</p>
              <p className="text-xs text-slate-400">Dedicated sound engineers</p>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-wider">APEX ELECTRONICS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Architecting precision high-fidelity audio gear and flagship computing electronics for professionals and tech creators worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-4 tracking-wider uppercase">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products?category=headphones" className="hover:text-sky-400 transition">Headphones</Link></li>
              <li><Link to="/products?category=earbuds" className="hover:text-sky-400 transition">Wireless Earbuds</Link></li>
              <li><Link to="/products?category=laptops" className="hover:text-sky-400 transition">Laptops & Workstations</Link></li>
              <li><Link to="/products?category=smartphones" className="hover:text-sky-400 transition">Flagship Phones</Link></li>
              <li><Link to="/products?category=gaming" className="hover:text-sky-400 transition">Gaming Consoles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-4 tracking-wider uppercase">Direct Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/reviews" className="hover:text-sky-400 transition">Customer Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition">Contact Engineers</Link></li>
              <li><Link to="/wishlist" className="hover:text-sky-400 transition">Saved Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-sky-400 transition">View Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-4 tracking-wider uppercase">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-3">Join our newsletter for exclusive sound engineering drop alerts.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-[#111827] border border-slate-700 text-xs px-3 py-2 rounded-l text-white focus:outline-none focus:border-sky-500 w-full"
              />
              <button className="bg-sky-500 hover:bg-sky-600 px-3 text-xs font-semibold text-white rounded-r transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} APEX ELECTRONICS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
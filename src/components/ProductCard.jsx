// File Path: src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="bg-[#111827]/90 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between group hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300">
      <div>
        
        {/* 🌟 Sleek Studio Pedestal Stage for Cutout Product */}
        <div className="w-full aspect-square bg-gradient-to-br from-slate-900/90 via-[#0B0F17] to-slate-950 rounded-xl overflow-hidden flex items-center justify-center p-6 relative mb-4 border border-slate-800 shadow-inner group-hover:border-sky-500/30 transition-colors">
          
          {/* Subtle Ambient Radial Lighting under Cutout */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 w-28 h-4 bg-sky-500/15 rounded-full blur-md group-hover:scale-125 transition-transform duration-300" />

          {product.isBestSeller && (
            <span className="absolute top-2 left-2 z-20 bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              TOP PICK
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute top-2 right-2 z-20 p-2 rounded-full bg-[#111827]/80 hover:bg-slate-800 text-slate-300 hover:text-rose-500 transition shadow"
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* 3D Studio Cutout Model */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] filter"
          />
        </div>

        {/* Brand & Name */}
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{product.brand}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition line-clamp-1 mt-0.5">
            {product.name}
          </h3>
        </Link>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 mt-2 text-amber-400 text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="font-semibold text-white">{product.rating}</span>
          <span className="text-slate-500">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Pricing & CTA Controls */}
      <div className="mt-5 pt-3 border-t border-slate-700/50 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-white font-mono">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-slate-500 line-through ml-2 font-mono">${product.originalPrice}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to={`/products/${product.id}`}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>

          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition active:scale-95 shadow-md shadow-sky-500/20"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
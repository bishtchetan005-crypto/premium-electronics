// File Path: src/components/HeroWithSharedImage.jsx
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, ShoppingCart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PRODUCTS } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';

gsap.registerPlugin(ScrollTrigger);

// Pure Transparent 3D Studio Headphone Cutout
const HEADPHONE_MODEL_PNG = 'https://pngimg.com/uploads/headphones/headphones_PNG7658.png';

export default function HeroWithSharedImage() {
  const containerRef = useRef(null);
  const heroSlotRef = useRef(null);
  const destCardSlotRef = useRef(null);
  const singleMovingHeadphoneRef = useRef(null);

  const { addToCart } = useShop();

  const bestSellers = [
    PRODUCTS.find((p) => p.id === 'hp-01'), // Sony WH-1000XM5 (Target Card)
    PRODUCTS.find((p) => p.id === 'eb-01'), // AirPods Pro 2
    PRODUCTS.find((p) => p.id === 'sw-01'), // Apple Watch Ultra
    PRODUCTS.find((p) => p.id === 'sp-01')  // iPhone 15 Pro Max
  ];

  useGSAP(
    () => {
      const setupPerfectDocking = () => {
        if (!heroSlotRef.current || !destCardSlotRef.current || !singleMovingHeadphoneRef.current || !containerRef.current) return;

        // Container ke relative me exact positions calculate karo (Scroll safe)
        const containerRect = containerRef.current.getBoundingClientRect();
        const heroRect = heroSlotRef.current.getBoundingClientRect();
        const destRect = destCardSlotRef.current.getBoundingClientRect();

        // Start position (Hero Slot me)
        const startX = heroRect.left - containerRect.left;
        const startY = heroRect.top - containerRect.top;
        const startWidth = heroRect.width;
        const startHeight = heroRect.height;

        // Destination center vs Start center
        const startCenterX = startX + startWidth / 2;
        const startCenterY = startY + startHeight / 2;

        const destX = destRect.left - containerRect.left;
        const destY = destRect.top - containerRect.top;
        const destCenterX = destX + destRect.width / 2;
        const destCenterY = destY + destRect.height / 2;

        const deltaX = destCenterX - startCenterX;
        const deltaY = destCenterY - startCenterY;
        const scaleRatio = (destRect.width * 0.82) / startWidth;

        // Kill any previous trigger
        ScrollTrigger.getById('dock-single-headphone')?.kill();

        // Headphone ko Hero Slot ke upar perfectly align karke visible karo
        gsap.set(singleMovingHeadphoneRef.current, {
          left: startX,
          top: startY,
          width: startWidth,
          height: startHeight,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          transformOrigin: 'center center'
        });

        // 1:1 Smooth Scrubbed Animation (Seedha Best Seller me jakar set hoga)
        gsap.to(singleMovingHeadphoneRef.current, {
          x: deltaX,
          y: deltaY,
          scale: scaleRatio,
          ease: 'none', // Smooth linear scroll mapping, no overshooting!
          scrollTrigger: {
            id: 'dock-single-headphone',
            trigger: containerRef.current,
            start: 'top top',
            endTrigger: destCardSlotRef.current,
            end: 'center center',
            scrub: 0.8, // Instant response, zero lag
            invalidateOnRefresh: true
          }
        });
      };

      const timer = setTimeout(setupPerfectDocking, 150);
      window.addEventListener('resize', setupPerfectDocking);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', setupPerfectDocking);
        ScrollTrigger.getById('dock-single-headphone')?.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      
      {/* 🎯 THE ONLY MOVING HEADPHONE (No image swapping, pure seamless motion) */}
      <img
        ref={singleMovingHeadphoneRef}
        src={HEADPHONE_MODEL_PNG}
        alt="Active Headphone Hardware"
        className="absolute z-30 pointer-events-none object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] opacity-0"
      />

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen Acoustic Silicon
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                Technology That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400">
                  Moves You.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Experience pure lossless high-fidelity sound. Dual acoustic processors dynamically silence external frequencies while 30mm carbon drivers articulate every micro-detail.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-7 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
                >
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#best-sellers"
                  className="px-7 py-3.5 rounded-full bg-[#111827] hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition"
                >
                  Shop Best Sellers
                </a>
              </div>

              
            </div>

            {/* Hero Headphone Slot (Anchor Area) */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div
                ref={heroSlotRef}
                className="w-72 sm:w-88 md:w-[420px] aspect-square relative flex items-center justify-center"
              >
                {/* Radial Glow underneath */}
                <div className="absolute w-72 h-72 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== BEST SELLERS SECTION ===================== */}
      <section id="best-sellers" className="py-20 bg-[#0B0F17]/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-sky-400 text-xs font-bold uppercase tracking-widest">Handcrafted Picks</span>
              <h2 className="text-3xl font-bold text-white mt-1">Best Selling Electronics</h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-sky-400 hover:text-white mt-2 md:mt-0">
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 1: DOCKING DESTINATION CARD */}
            <div className="bg-[#111827]/90 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between group hover:border-sky-500/40 transition-all duration-300">
              <div>
                
                {/* 🎯 Destination Pedestal: Waiting for the headphone to arrive */}
                <div
                  ref={destCardSlotRef}
                  className="w-full aspect-square bg-gradient-to-br from-slate-900 via-[#0B0F17] to-slate-950 rounded-xl overflow-hidden flex items-center justify-center p-4 relative mb-4 border border-slate-800 shadow-inner group-hover:border-sky-500/30 transition-colors"
                >
                  <span className="absolute top-2 left-2 z-20 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    HOT
                  </span>

                  {/* Sleek Studio Pedestal Lighting */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 w-32 h-6 bg-sky-500/15 rounded-full blur-md" />
                </div>

                <div className="text-xs text-slate-400 mb-1">{bestSellers[0].brand}</div>
                <h3 className="text-sm font-bold text-white group-hover:text-sky-400 transition line-clamp-1">
                  {bestSellers[0].name}
                </h3>

                <div className="flex items-center gap-1 mt-2 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-semibold">{bestSellers[0].rating}</span>
                  <span className="text-slate-500">({bestSellers[0].reviewsCount})</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-white font-mono">${bestSellers[0].price}</span>
                  <span className="text-xs text-slate-500 line-through ml-2 font-mono">${bestSellers[0].originalPrice}</span>
                </div>
                <button
                  onClick={() => addToCart(bestSellers[0])}
                  className="p-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition active:scale-95 shadow-md shadow-sky-500/20"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Other 3 Best Seller Cards */}
            {bestSellers.slice(1).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}
// File Path: src/components/OfferCarousel.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { PROMOTIONAL_OFFERS } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function OfferCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PROMOTIONAL_OFFERS.length);
    }, 2000); // 2 seconds continuous horizontal auto-advance

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="py-12 bg-[#0B0F17] border-t border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 shadow-2xl h-[340px] md:h-[280px]">
          
          {PROMOTIONAL_OFFERS.map((offer, idx) => (
            <div
              key={offer.id}
              className={`absolute inset-0 bg-gradient-to-r ${offer.bg} p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between transition-transform duration-700 ease-in-out`}
              style={{
                transform: `translateX(${(idx - current) * 100}%)`,
                visibility: Math.abs(idx - current) <= 1 ? 'visible' : 'hidden'
              }}
            >
              <div className="space-y-3 z-10 max-w-xl text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-[11px] font-bold tracking-wider">
                  <Tag className="w-3.5 h-3.5" /> {offer.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {offer.desc}
                </p>
                <div className="pt-2">
                  <Link
                    to="/products"
                    className="inline-block px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition shadow-lg shadow-sky-500/30"
                  >
                    {offer.cta} &rarr;
                  </Link>
                </div>
              </div>

              <div className="w-48 sm:w-60 h-40 sm:h-52 relative shrink-0 mt-4 md:mt-0">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>
          ))}

          {/* Previous / Next buttons */}
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + PROMOTIONAL_OFFERS.length) % PROMOTIONAL_OFFERS.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0B0F17]/60 hover:bg-[#0B0F17] text-white transition backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % PROMOTIONAL_OFFERS.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0B0F17]/60 hover:bg-[#0B0F17] text-white transition backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {PROMOTIONAL_OFFERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-1.5 rounded-full transition-all ${
                  current === i ? 'w-6 bg-sky-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
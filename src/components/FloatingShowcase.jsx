// File Path: src/components/FloatingShowcase.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Sparkles, ArrowLeftRight } from 'lucide-react';
import gsap from 'gsap';

// High-Res Studio Cutout Models with verified pricing & ratings
const ORBIT_PRODUCTS = [
  {
    id: 'hp-01',
    name: 'Sony WH-1000XM5',
    category: 'Headphones',
    price: 398,
    rating: 4.9,
    img: 'https://pngimg.com/uploads/headphones/headphones_PNG7658.png'
  },
  {
    id: 'sw-01',
    name: 'Apple Watch Ultra 2',
    category: 'Smartwatch',
    price: 799,
    rating: 4.9,
    img: 'https://pngimg.com/uploads/apple_watch/apple_watch_PNG71.png'
  },
  {
    id: 'sp-01',
    name: 'iPhone 15 Pro Max',
    category: 'Smartphone',
    price: 1199,
    rating: 4.9,
    img: 'https://pngimg.com/uploads/iphone16/iphone16_PNG13.png'
  },
  {
    id: 'lp-01',
    name: 'MacBook Pro 16" M3',
    category: 'Laptop',
    price: 3499,
    rating: 4.9,
    img: 'https://pngimg.com/uploads/macbook/macbook_PNG9.png'
  },
  {
    id: 'eb-01',
    name: 'AirPods Pro (2nd Gen)',
    category: 'Earbuds',
    price: 249,
    rating: 4.9,
    img: 'https://pngimg.com/uploads/earphones/earphones_PNG38.png'
  },
  {
    id: 'gm-01',
    name: 'PlayStation 5 Slim',
    category: 'Gaming',
    price: 499,
    rating: 4.9,
    img: 'https://pngimg.com/uploads/sony_playstation/sony_playstation_PNG101478.png'
  },
  {
    id: 'hp-02',
    name: 'AirPods Max Space Grey',
    category: 'Headphones',
    price: 549,
    rating: 4.8,
    img: 'https://pngimg.com/uploads/headphones/headphones_PNG7629.png'
  },
  {
    id: 'tb-01',
    name: 'iPad Pro 12.9" M2',
    category: 'Tablet',
    price: 1099,
    rating: 4.9,
    img: 'https://pngimg.com/uploads/tablet/tablet_PNG8565.png'
  },
  {
    id: 'sw-02',
    name: 'Galaxy Watch 6 Classic',
    category: 'Smartwatch',
    price: 369,
    rating: 4.7,
    img: 'https://pngimg.com/uploads/watches/watches_PNG9903.png'
  },
  {
    id: 'acc-01',
    name: 'Logitech MX Master 3S',
    category: 'Accessories',
    price: 99,
    rating: 4.9,
    img: 'https://pngimg.com/uploads/computer_mouse/computer_mouse_PNG7675.png'
  },
  {
    id: 'gm-05',
    name: 'DualSense Edge Controller',
    category: 'Gaming',
    price: 199,
    rating: 4.7,
    img: 'https://pngimg.com/uploads/joystick/joystick_PNG11255.png'
  },
  {
    id: 'hp-03',
    name: 'Bose QuietComfort 45',
    category: 'Headphones',
    price: 329,
    rating: 4.7,
    img: 'https://pngimg.com/uploads/headphones/headphones_PNG7622.png'
  }
];

export default function FloatingShowcase() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // Animation & Interactive Physics States
  const angleRef = useRef(0);
  const targetSpeedRef = useRef(0.0022); // Default forward speed
  const currentSpeedRef = useRef(0.0022);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  useEffect(() => {
    const total = ORBIT_PRODUCTS.length;
    let reqId;

    // Responsive ellipse horizontal & vertical radii
    const getRadii = () => {
      const width = window.innerWidth;
      return {
        radiusX: Math.min(width * 0.44, 520),
        radiusY: Math.min(width * 0.1, 95)
      };
    };

    let { radiusX, radiusY } = getRadii();

    const handleResize = () => {
      const updated = getRadii();
      radiusX = updated.radiusX;
      radiusY = updated.radiusY;
    };
    window.addEventListener('resize', handleResize);

    // Continuous Frame Loop
    const tick = () => {
      // Smooth inertia between current speed and target mouse-controlled speed
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.06;
      angleRef.current += currentSpeedRef.current;

      const items = cardRefs.current.filter(Boolean);

      items.forEach((card, index) => {
        // Individual angle along the oval path
        const angle = (index / total) * Math.PI * 2 + angleRef.current;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;

        // Depth perspective (cards in front are larger, brighter, higher z-index)
        const depth = (Math.sin(angle) + 1) / 2; // Range 0 to 1
        const scale = 0.65 + depth * 0.42;
        const opacity = 0.35 + depth * 0.65;
        const zIndex = Math.round(depth * 100);

        gsap.set(card, {
          x,
          y,
          scale,
          opacity,
          zIndex
        });
      });

      reqId = requestAnimationFrame(tick);
    };

    reqId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mouse Move: Controls speed & direction smoothly
  const handleMouseMove = (e) => {
    if (isDraggingRef.current) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    // Normalized offset from -1 (extreme left) to +1 (extreme right)
    const normalized = (e.clientX - centerX) / (rect.width / 2);

    // Right of center = fast right rotation; Left of center = fast left/reverse rotation
    targetSpeedRef.current = normalized * 0.0075;
  };

  // Mouse Leave: Restores gentle default rotation speed
  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    targetSpeedRef.current = 0.0022; // Back to natural forward rotation
  };

  // Drag Support (Mouse click & drag or touch drag)
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const delta = clientX - startXRef.current;
    // Directly scrub orbit by drag distance
    angleRef.current += delta * 0.004;
    startXRef.current = clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="py-24 bg-[#0B0F17] border-t border-slate-800/60 overflow-hidden relative select-none">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Modernized Heading Section */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" /> 360° Studio Showcase
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Flagship Hardware Orbit
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto mt-2.5 flex items-center justify-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-sky-400" />
          Move cursor left or right to steer orbit speed & direction
        </p>
      </div>

      {/* Orbit Motion Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMoveCapture={handleDragMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleDragMove}
        onTouchEnd={handleMouseUp}
        className="relative h-[380px] md:h-[400px] flex items-center justify-center cursor-ew-resize active:cursor-grabbing"
      >
        {ORBIT_PRODUCTS.map((gadget, i) => (
          <div
            key={gadget.name}
            ref={(el) => (cardRefs.current[i] = el)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 md:w-52 h-[260px] md:h-[275px] bg-gradient-to-b from-slate-900/95 via-[#111827] to-[#0B0F17] border border-slate-700/70 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col justify-between group hover:border-sky-500/60 transition-colors"
          >
            {/* Cutout Studio Image with Glow Pedestal (Perfect Fit) */}
            <div className="w-full h-32 relative flex items-center justify-center overflow-hidden rounded-xl bg-slate-950/60 border border-slate-800/80 p-3">
              {/* Soft Pedestal Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 w-20 h-3 bg-sky-500/20 rounded-full blur-sm" />

              <img
                src={gadget.img}
                alt={gadget.name}
                className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_12px_20px_rgba(0,0,0,0.85)] filter"
                draggable={false}
              />
            </div>

            {/* Product Meta Details */}
            <div className="pt-2 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                {gadget.category}
              </span>
              <h3 className="text-xs font-bold text-white group-hover:text-sky-400 transition line-clamp-1">
                {gadget.name}
              </h3>

              {/* Rating & Price */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-semibold text-slate-200">{gadget.rating}</span>
                </div>
                <span className="text-sm font-extrabold text-sky-400 font-mono">
                  ${gadget.price}
                </span>
              </div>
            </div>

            {/* View Details Link */}
            <Link
              to={`/products/${gadget.id}`}
              className="mt-1 w-full py-1.5 rounded-lg bg-slate-800/90 hover:bg-sky-500 text-slate-200 hover:text-white text-[11px] font-semibold text-center transition block shadow"
            >
              Inspect Device
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
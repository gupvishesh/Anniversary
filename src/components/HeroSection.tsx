import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Calendar } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number; // percentage width
  size: number; // size in px
  delay: number; // offset delay in s
  duration: number; // speed in s
  color: string;
}

export default function HeroSection() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate floating hearts with random shapes, paths and durations
    const newHearts = Array.from({ length: 25 }, (_, i) => {
      const colors = [
        'text-red-500', 
        'text-amber-500', 
        'text-rose-400', 
        'text-yellow-400', 
        'text-red-600'
      ];
      return {
        id: i,
        x: Math.random() * 90 + 5, // Avoid edge clipping
        size: Math.random() * 20 + 15, // 15px to 35px
        delay: Math.random() * 6,
        duration: Math.random() * 6 + 6, // 6s to 12s
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setHearts(newHearts);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-amber-900 text-white min-h-[85vh] flex items-center justify-center px-4 py-16 text-center border-b-8 border-amber-500">
      {/* Golden Mandala Ornamental Background overlays */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent"></div>
      
      {/* CSS Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className={`absolute bottom-0 animate-float-heart ${heart.color}`}
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            <Heart fill="currentColor" className="opacity-75" />
          </div>
        ))}
      </div>

      {/* Decorative Traditional Indian Marigold Genda Flower Garlands */}
      <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none opacity-80 z-10 overflow-hidden h-14">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center animate-sway" style={{ animationDelay: `${i * 0.3}s` }}>
            {/* Orange-Yellow dots representing marigolds */}
            <div className="w-4 h-4 bg-amber-500 rounded-full border border-yellow-300 shadow-sm animate-pulse"></div>
            <div className="w-3 h-3 bg-red-600 rounded-full border border-orange-400 -mt-0.5"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full border border-yellow-200 -mt-0.5"></div>
            <div className="w-2 h-4 bg-amber-200 rounded-full -mt-0.5 opacity-50"></div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-20">
        {/* Years Medallion badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-400/50 mb-8 animate-sway">
          <Calendar className="w-5 h-5 text-amber-300" />
          <span className="font-display font-semibold text-amber-100 tracking-wider text-sm md:text-base">
            JUNE 23, 2004 — JUNE 23, 2026
          </span>
        </div>

        {/* Beautiful Main Heading */}
        <h1 className="font-display font-extrabold tracking-tight text-white mb-6 leading-tight">
          <span className="block text-3xl sm:text-4xl md:text-5xl text-amber-400 mb-2 font-serif italic">
            शादी की 22वीं सालगिरह मुबारक!
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent filter drop-shadow-md">
            Tarun & Lekha
          </span>
        </h1>

        {/* Celebrating Badge */}
        <div className="flex justify-center items-center gap-3 my-6">
          <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
          <div className="p-3 bg-amber-500 text-red-950 rounded-full shadow-lg border-2 border-yellow-200 rotate-12 hover:rotate-0 transition-transform duration-300 cursor-pointer">
            <Heart className="w-8 h-8 fill-red-950 stroke-none animate-pulse" />
          </div>
          <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
        </div>

        {/* Hindi Loving Subtitle */}
        <p className="font-serif italic text-2xl sm:text-3xl text-amber-200 mb-4 tracking-wide font-medium">
          "22 saal, ek pyaari kahani ❤️"
        </p>
        
        {/* English descriptive line */}
        <p className="font-sans text-base sm:text-xl text-red-100 max-w-2xl mx-auto leading-relaxed mb-10">
          22 Years of sharing laughter, fighting over remote buttons, sipping evening tea together, and building our beautiful world. We love you, Mumma & Papa! 🎉
        </p>

        {/* Call to action to scroll down recursively */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
          <a
            href="#cake"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-red-950 rounded-full font-display font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group border-2 border-yellow-200"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Cake Kaato! 🎂
          </a>
          <a
            href="#gallery"
            className="px-6 py-3 bg-red-900/40 hover:bg-red-950/60 text-amber-300 hover:text-amber-100 rounded-full font-display border border-amber-500/50 transition-all"
          >
            Hamari Yaadein 📸
          </a>
        </div>
      </div>

      {/* Decorative Gold Ribbon Wave at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-amber-500/30 to-transparent pointer-events-none"></div>
    </section>
  );
}

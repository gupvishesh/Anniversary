/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Stars } from 'lucide-react';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import CakeSection from './components/CakeSection';
import KidsMessage from './components/KidsMessage';
import FunFacts from './components/FunFacts';
import IntroAnimation from './components/IntroAnimation';
import FullscreenCake from './components/FullscreenCake';
import GalleryBurst from './components/GalleryBurst';

type AppState = 'intro' | 'fullscreen-cake' | 'gallery-burst' | 'site';

export default function App() {
  const [appState, setAppState] = useState<AppState>('intro');

  return (
    <div className="bg-amber-50/20 text-red-950 min-h-screen relative font-sans selection:bg-red-200 selection:text-red-900 leading-normal scroll-smooth">

      {/* ── INTRO ANIMATION ─────────────────────────────────── */}
      {appState === 'intro' && (
        <IntroAnimation onEnter={() => setAppState('fullscreen-cake')} />
      )}

      {/* ── FULLSCREEN CAKE ──────────────────────────────────── */}
      {appState === 'fullscreen-cake' && (
        <FullscreenCake onDone={() => setAppState('gallery-burst')} />
      )}

      {/* ── GALLERY BURST ────────────────────────────────────── */}
      {appState === 'gallery-burst' && (
        <GalleryBurst onComplete={() => setAppState('site')} />
      )}

      {/* ── MAIN SITE ────────────────────────────────────────── */}
      {appState === 'site' && (
        <>
          {/* Sticky Nav */}
          <nav className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-amber-200 z-50 px-4 py-3.5 select-none transition-all">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              {/* Brand */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center font-bold tracking-tight text-sm shadow-md">
                  22
                </div>
                <div>
                  <span className="font-display font-extrabold text-red-950 text-sm md:text-base leading-none block">
                    Tarun & Lekha
                  </span>
                  <span className="text-[10px] md:text-xs font-serif text-amber-600 italic font-bold">
                    Shubh Vivah Varshganth 💐
                  </span>
                </div>
              </div>

              {/* Nav links */}
              <div className="flex items-center gap-3">
                <a
                  href="#cake"
                  className="px-4 py-1.5 rounded-full font-display font-bold text-xs shadow-md border border-amber-300 bg-amber-50 text-red-800 hover:bg-amber-100 transition-all"
                >
                  🎂 Cake
                </a>
                <a
                  href="#gallery"
                  className="px-4 py-1.5 rounded-full font-display font-bold text-xs shadow-md border border-red-300 bg-red-50 text-red-800 hover:bg-red-100 transition-all"
                >
                  📸 Gallery
                </a>
              </div>
            </div>
          </nav>

          {/* Main Sections */}
          <main>
            <HeroSection />
            <GallerySection />
            <CakeSection />
            <KidsMessage />
            <FunFacts />
          </main>

          {/* Footer */}
          <footer className="bg-red-950 text-white text-center py-16 px-4 border-t-8 border-amber-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
              <div className="p-4 bg-amber-500 text-red-950 rounded-full shadow-2xl border-4 border-yellow-200 rotate-12 mb-6 hover:rotate-0 transition-transform cursor-pointer">
                <Heart fill="currentColor" className="w-8 h-8 fill-red-950 stroke-none animate-pulse" />
              </div>

              <p className="font-serif font-bold italic text-3xl sm:text-4xl text-amber-300 tracking-wide mb-2">
                Tarun ❤️ Lekha
              </p>
              <p className="font-display font-black text-amber-400 uppercase tracking-widest text-xs md:text-sm mb-4">
                Forever & Always
              </p>

              <p className="font-sans text-xs sm:text-sm text-red-200 uppercase tracking-widest font-semibold border-t border-dashed border-red-700/60 pt-4 w-4/5">
                June 23rd, 2026 — Married 22 Glorious Years
              </p>

              <p className="text-[10px] text-neutral-400 mt-10 uppercase tracking-wider select-none font-semibold">
                Handcrafted with maximum devotion, smiles & bickering by Vishesh & Mitul 💛
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

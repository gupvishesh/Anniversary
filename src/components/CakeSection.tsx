import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, Volume2, Wind } from 'lucide-react';

interface CandleState {
  id: number;
  lit: boolean;
  angle: number; // visual placement offset
  height: number; // random height for visual variety
  color: string;
}

// Light local audio synth synthesizer using Web Audio API to play playful bells or wind
const playSoundLeval = (freq: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine', duration = 0.1) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Smooth ramp down to prevent popping noises
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    // Graceful fallback for browsers that block auto audio
  }
};

export default function CakeSection() {
  const [candles, setCandles] = useState<CandleState[]>([]);
  const [isBlowing, setIsBlowing] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [poofParticles, setPoofParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Initialize 22 Candles arranged on top of the cake in stable positions
  useEffect(() => {
    resetCake();
  }, []);

  const resetCake = () => {
    const colors = [
      'bg-red-500', 'bg-yellow-400', 'bg-pink-500', 'bg-blue-400', 
      'bg-emerald-400', 'bg-indigo-400', 'bg-orange-400', 'bg-purple-400'
    ];
    const initial: CandleState[] = Array.from({ length: 22 }, (_, idx) => {
      // Calculate a semi-circular distribution on the cake top
      // 0 to 22 candles spread nicely
      const angle = (idx / 21) * 180; // 0 to 180 degrees
      const height = Math.random() * 8 + 32; // visually interesting heights
      return {
        id: idx + 1,
        lit: true,
        angle,
        height,
        color: colors[idx % colors.length],
      };
    });
    setCandles(initial);
    setCelebrate(false);
    setIsBlowing(false);
    setPoofParticles([]);
  };

  // Blow out a single specific candle
  const blowCandle = (id: number, indexOffset: number) => {
    let playedLeval = false;
    setCandles(prev => prev.map(c => {
      if (c.id === id && c.lit) {
        // Trigger puff sound & visual sparkle particles
        playSoundLeval(600 + (id * 15), 'sine', 0.15);
        playedLeval = true;
        
        // Spawn simple position-based poof cloud
        const xPos = 15 + (indexOffset * 3.2); // map sequence to percentage across the cake
        setPoofParticles(curr => [...curr, { id: Date.now() + Math.random(), x: xPos, y: 15 }]);
        
        return { ...c, lit: false };
      }
      return c;
    }));

    // Briefly clean up particle sparks
    setTimeout(() => {
      setPoofParticles(curr => curr.slice(1));
    }, 700);
  };

  // Check if all are blown out and celebrate!
  useEffect(() => {
    if (candles.length > 0 && candles.every(c => !c.lit) && !celebrate) {
      setCelebrate(true);
      setIsBlowing(false);
      // Play cheerful celebratory wedding fanfare tune synthesizer
      const notes = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.15 }, // G5
        { f: 1046.50, d: 0.4 }, // C6!
        { f: 783.99, d: 0.15 }, // G5
        { f: 1046.50, d: 0.6 } // C6!
      ];
      notes.forEach((note, index) => {
        setTimeout(() => {
          playSoundLeval(note.f, 'triangle', note.d);
        }, index * 180);
      });
    }
  }, [candles]);

  // Grand Blow Out Button Handler
  const startBlowingSequence = () => {
    if (isBlowing || celebrate) return;
    setIsBlowing(true);
    
    // Play blowing sound (low white-noise or low wave)
    playSoundLeval(200, 'sawtooth', 0.4);

    let delay = 0;
    // Walk through candles and blow them out with a staggered delay from left to right
    candles.forEach((c, idx) => {
      setTimeout(() => {
        blowCandle(c.id, idx);
      }, delay);
      delay += 140; // 140ms intervals creates a beautiful sweeping wave effect
    });
  };

  const activeCandleCount = candles.filter(c => c.lit).length;

  return (
    <section id="cake" className="py-24 px-4 bg-gradient-to-br from-red-50 to-amber-100/50 border-b border-amber-200 scroll-mt-6 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Title */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest font-black text-amber-600 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300 font-display">
            Interactive Fun 🎂
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-red-950 mt-3 mb-2">
            The Virtual Anniversary Cake
          </h2>
          <p className="font-handwritten text-2xl text-amber-600 font-bold max-w-xl mx-auto">
            "Anniversary cake, made with digital love — Mumma & Papa phooko!"
          </p>
          <div className="text-sm font-semibold text-neutral-500 mt-2">
            Remaining Lit Candles: <span className="text-red-650 font-black text-base">{activeCandleCount} / 22 🔥</span>
          </div>
        </div>

        {/* Outer Cake Container Frame */}
        <div className="relative w-full max-w-lg mx-auto py-8">
          
          {/* Temporary puff animations overlay */}
          {poofParticles.map(p => (
            <div 
              key={p.id}
              className="absolute pointer-events-none text-2xl animate-ping opacity-75 z-40 text-neutral-400"
              style={{ left: `${p.x}%`, top: '15%' }}
            >
              ☁️💨
            </div>
          ))}

          {/* Candle Arranged Rack on Cake Top Layer */}
          <div className="w-full relative h-32 flex items-end justify-center px-12 pb-1 bg-transparent select-none">
            {candles.map((candle, idx) => {
              // Calculate positioning horizontally
              const horizontalOffset = 15 + (idx * 3.2); // evenly spaced 15% to 85%
              // Generate vertical curve so candles stand beautifully on top profile of circular cake rim
              const depthFactor = Math.sin((idx / 21) * Math.PI); // 0 at ends, 1 in center
              const bottomPositionOffset = depthFactor * 14; // depth curve up to 14px skewing

              return (
                <div 
                  key={candle.id}
                  className="absolute cursor-pointer flex flex-col items-center group transition-transform duration-200"
                  style={{
                    left: `${horizontalOffset}%`,
                    bottom: `${bottomPositionOffset}px`,
                    height: `${candle.height}px`,
                    zIndex: 30 + Math.floor(depthFactor * 5) // layers taller candles behind
                  }}
                  onClick={() => blowCandle(candle.id, idx)}
                >
                  {/* Flicker Flame */}
                  {candle.lit ? (
                    <div className="absolute -top-7 flex flex-col items-center">
                      {/* Active glowing fire */}
                      <div className="w-3.5 h-6 bg-gradient-to-t from-red-500 via-amber-400 to-yellow-200 rounded-full animate-bounce [animation-duration:0.6s] shadow-[0_0_12px_rgba(245,158,11,0.6)] relative">
                        {/* Core flame spark */}
                        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white rounded-full opacity-80"></div>
                      </div>
                      {/* Subtle heat glow ring */}
                      <div className="w-4 h-4 -mt-3.5 bg-yellow-300/30 rounded-full blur-xs animate-ping"></div>
                    </div>
                  ) : (
                    /* Sweet grey smoking trail */
                    <div className="absolute -top-4 w-1 bg-zinc-300 h-3 rounded-full animate-pulse opacity-50"></div>
                  )}

                  {/* Candle Stick */}
                  <div className={`w-1.5 md:w-2 h-full ${candle.color} rounded-t-sm shadow-md border-x border-black/10 relative overflow-hidden`}>
                    {/* Retro spiral striping on candles */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] bg-[size:10px_10px]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* LAYERED WEDDING CAKE STYLED VISUALLY WITH SVG/CSS */}
          <div className="w-full relative bg-transparent px-4">
            {/* Top Cake icing decorations */}
            <div className="h-6 w-full bg-yellow-300 rounded-t-full border-x-4 border-amber-400 shadow-md flex items-center justify-between px-8 relative z-20">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-red-600 rounded-full border border-yellow-200 shadow-xs"></div>
              ))}
            </div>

            {/* Layer 1 - Sweet Vanilla Sponge with Strawberry filling (Red/Gold patterns) */}
            <div className="h-20 w-[96%] mx-auto bg-amber-50 border-4 border-amber-400 rounded-b-xl relative z-10 shadow-lg flex flex-col justify-between overflow-hidden">
              {/* Ornamental Gold piping ribbons */}
              <div className="w-full h-2 bg-gradient-to-r from-red-600 via-amber-400 to-red-600"></div>
              <div className="flex justify-around items-center px-4 w-full h-full text-red-950 font-serif font-black text-sm tracking-widest tracking-widest uppercase py-2">
                <span>🎂</span>
                <span>SWEET 22 YEARS</span>
                <span>🎂</span>
              </div>
              <div className="w-[102%] h-4 bg-red-600 -ml-1 flex relative">
                {/* Visual cream scallops */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-yellow-300 rounded-full -mt-2 shadow-xs border border-amber-400/50"></div>
                ))}
              </div>
            </div>

            {/* Layer 2 - Rich Golden Base Stand (Thicker, grand Red & Royal gold base) */}
            <div className="h-24 w-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 border-4 border-amber-500 rounded-b-2xl relative z-0 -mt-1.5 shadow-xl flex flex-col justify-between overflow-hidden">
              <div className="w-full h-1 bg-amber-400"></div>
              {/* Heart and rose decorations on bottom cake layer */}
              <div className="flex justify-around items-center text-amber-300 text-base md:text-xl font-bold py-6 font-display opacity-90">
                <span>✦ Mom ✦</span>
                <span className="text-yellow-300 text-3xl font-serif">❤️</span>
                <span>✦ Dad ✦</span>
              </div>
              
              {/* Golden metallic base tray */}
              <div className="w-full h-4 bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 border-t border-yellow-200 flex items-center justify-center">
                <div className="w-full h-1 border-b border-yellow-400"></div>
              </div>
            </div>

            {/* Grand Wooden Golden serving platter plate */}
            <div className="w-[108%] h-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 rounded-xl -ml-[4%] mt-1 shadow-2xl relative flex items-center justify-center">
              <div className="absolute inset-1 border border-amber-300/30 rounded-lg"></div>
              <span className="text-[10px] text-amber-100 font-extrabold tracking-widest uppercase">
                MADE BY KIDS WITH MAXIMUM LOVE ❤️
              </span>
            </div>
          </div>

        </div>

        {/* Buttons / Controls Section */}
        <div className="flex flex-col items-center justify-center gap-4 mt-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={startBlowingSequence}
              disabled={isBlowing || celebrate}
              className={`px-8 py-4 rounded-full font-display font-black text-lg shadow-xl cursor-pointer transition-all border-2 border-yellow-200 flex items-center gap-3 select-none ${
                isBlowing || celebrate 
                  ? 'bg-neutral-300 text-neutral-500 border-neutral-400 cursor-not-allowed transform-none' 
                  : 'bg-red-600 hover:bg-red-700 text-white hover:scale-105 active:scale-95'
              }`}
            >
              <Wind className="w-6 h-6 animate-pulse" />
              Candles Phooko! 🌬️🎂
            </button>

            {(celebrate || activeCandleCount === 0) && (
              <button
                onClick={resetCake}
                className="px-6 py-4 bg-amber-500 hover:bg-amber-600 text-red-950 font-display font-black rounded-full border-2 border-yellow-200 shadow-xl flex items-center gap-2 select-none hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
              >
                <RefreshCw className="w-5 h-5" />
                Saari Candles Fir Sey Jalao! 🔥
              </button>
            )}
          </div>
          
          <p className="text-xs text-neutral-500 font-medium max-w-sm">
            💡 *Tip: Hover & tap individual candles or click the big red button to blow them all out wave-by-wave!*
          </p>
        </div>

        {/* ---------------- CELEBRATION MODAL OVERLAY ---------------- */}
        {celebrate && (
          <div className="fixed inset-0 bg-red-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-500 animate-fade-in">
            {/* Spinning Golden Confetti particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
              {Array.from({ length: 40 }).map((_, i) => {
                const colors = ['bg-yellow-400', 'bg-red-500', 'bg-amber-300', 'bg-rose-400', 'bg-yellow-200'];
                return (
                  <div
                    key={i}
                    className={`absolute rounded-xs shadow-xs animate-bounce opacity-75 ${colors[i % colors.length]}`}
                    style={{
                      left: `${Math.random() * 95}%`,
                      top: `${Math.random() * 95}%`,
                      width: `${Math.random() * 12 + 6}px`,
                      height: `${Math.random() * 12 + 6}px`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      animationDuration: `${Math.random() * 3 + 2}s`
                    }}
                  ></div>
                );
              })}
            </div>

            <div className="bg-gradient-to-b from-white to-amber-50 rounded-2xl border-4 border-amber-400 p-8 md:p-12 max-w-xl w-full text-center shadow-2xl relative transform scale-100 transition-transform duration-300">
              {/* Double traditional flowers ornament */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-amber-400 rounded-full p-4 border-4 border-white shadow-xl">
                <span className="text-4xl">🎉</span>
              </div>

              <h3 className="font-serif font-black text-4xl text-red-950 mb-3 mt-4">
                Salgirah Mubarak Ho!
              </h3>
              <p className="font-display font-extrabold text-amber-500 text-xl tracking-wider mb-6">
                MOM & DAD — TOGETHER FOREVER ❤️
              </p>
              
              <div className="p-4 bg-red-100/50 rounded-xl border border-red-200 mb-8 max-w-md mx-auto">
                <span className="text-3xl block mb-2">🥂✨</span>
                <p className="font-sans text-sm text-red-950 leading-relaxed font-semibold">
                  Congratulations Mumma and Papa for finishing 22 marvelous chapters of marriage! Thank you for showing us what real commitment, patience, and love look like.
                </p>
              </div>

              <button
                onClick={() => setCelebrate(false)}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-display font-extrabold rounded-full shadow-lg border-2 border-yellow-200 uppercase tracking-widest cursor-pointer transition-transform hover:scale-105"
              >
                Pyaar Barsao! 💖
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

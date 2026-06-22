import React, { useEffect, useRef, useState } from 'react';
import { Wind, RefreshCw } from 'lucide-react';

interface CandleState {
  id: number;
  lit: boolean;
  color: string;
  height: number;
}

interface Props {
  onDone: () => void; // called when all candles are blown and celebration is shown
}

const playSoundBell = (freq: number, duration = 0.12) => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (_) {}
};

export default function FullscreenCake({ onDone }: Props) {
  const [candles, setCandles] = useState<CandleState[]>([]);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [btnPos, setBtnPos] = useState({ x: 50, y: 75 }); // % position
  const [isBlowing, setIsBlowing] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [poofParticles, setPoofParticles] = useState<{ id: number; x: number }[]>([]);
  const celebrateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const CANDLE_COLORS = [
    'bg-red-500', 'bg-yellow-400', 'bg-pink-500', 'bg-blue-400',
    'bg-emerald-400', 'bg-indigo-400', 'bg-orange-400', 'bg-purple-400'
  ];

  const initCandles = () => {
    setCandles(Array.from({ length: 22 }, (_, i) => ({
      id: i + 1,
      lit: true,
      color: CANDLE_COLORS[i % CANDLE_COLORS.length],
      height: 32 + Math.floor((i * 7 + 13) % 9),
    })));
    setCelebrate(false);
    setIsBlowing(false);
    setPoofParticles([]);
    setDodgeCount(0);
    setBtnPos({ x: 50, y: 75 });
    setShowConfetti(false);
  };

  useEffect(() => {
    initCandles();
    return () => {
      if (celebrateTimerRef.current) clearTimeout(celebrateTimerRef.current);
    };
  }, []);

  // Check all blown
  useEffect(() => {
    if (candles.length > 0 && candles.every(c => !c.lit) && !celebrate) {
      setCelebrate(true);
      setShowConfetti(true);
      // Play fanfare
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => playSoundBell(f, 0.3), i * 160);
      });
    }
  }, [candles]);

  const blowOneCandle = (id: number, idx: number) => {
    setCandles(prev => prev.map(c => {
      if (c.id === id && c.lit) {
        playSoundBell(500 + id * 12, 0.14);
        const xPos = 15 + idx * 3.2;
        setPoofParticles(curr => [...curr, { id: Date.now() + Math.random(), x: xPos }]);
        setTimeout(() => setPoofParticles(curr => curr.slice(1)), 700);
        return { ...c, lit: false };
      }
      return c;
    }));
  };

  const startBlow = () => {
    if (isBlowing || celebrate) return;
    setIsBlowing(true);
    playSoundBell(200, 0.4);
    candles.forEach((c, idx) => {
      setTimeout(() => blowOneCandle(c.id, idx), idx * 130);
    });
  };

  // The dodging button logic — button moves away on hover/click
  const handleCutClick = () => {
    if (dodgeCount >= 3) {
      // After 3 dodges, it gives up and starts blowing
      startBlow();
      return;
    }
    // Dodge to a random position (stay within 20–80% range)
    const newX = 20 + Math.random() * 55;
    const newY = 60 + Math.random() * 20;
    setBtnPos({ x: newX, y: newY });
    setDodgeCount(prev => prev + 1);
    playSoundBell(880, 0.08);
  };

  const activeLit = candles.filter(c => c.lit).length;

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at top, #1a0000 0%, #0a0000 60%, #000 100%)' }}
    >
      {/* Stars bg */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${(i * 41 + 3) % 100}%`,
              top: `${(i * 67 + 11) % 100}%`,
              width: `${1 + (i % 2)}px`,
              height: `${1 + (i % 2)}px`,
              background: i % 4 === 0 ? '#fde68a' : '#fff',
              opacity: 0.2 + (i % 5) * 0.08,
              animationDelay: `${(i * 0.2) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-6 px-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 mb-3">
          <span className="text-amber-200 font-display font-semibold text-sm tracking-widest uppercase">
            22nd Anniversary Cake 🎂
          </span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-amber-300 leading-tight">
          Happy Anniversary,<br />
          <span className="text-red-400">Mumma & Papa!</span>
        </h1>
        <p className="font-handwritten text-xl text-amber-400/80 mt-2">
          "Phooko candles, make a wish! 🕯️"
        </p>
        {!isBlowing && !celebrate && (
          <p className="text-amber-300/60 text-sm mt-1 font-display">
            {dodgeCount === 0
              ? 'Try clicking the button below... 😏'
              : dodgeCount === 1
              ? 'Hehe, come catch me! 😂'
              : dodgeCount === 2
              ? 'Almost there, one more try! 🏃'
              : ''}
          </p>
        )}
        {isBlowing && (
          <p className="text-amber-300 text-sm mt-1 font-display animate-pulse">
            🌬️ Blowing candles... {activeLit} left!
          </p>
        )}
      </div>

      {/* Cake + Candles */}
      <div className="relative z-10 w-full max-w-lg px-4 mx-auto">

        {/* Poof particles */}
        <div className="relative h-0">
          {poofParticles.map(p => (
            <div
              key={p.id}
              className="absolute pointer-events-none text-xl animate-ping opacity-70 z-40"
              style={{ left: `${p.x}%`, top: '-40px' }}
            >
              💨
            </div>
          ))}
        </div>

        {/* Candles Row */}
        <div className="w-full relative h-28 flex items-end justify-center px-8 pb-0.5">
          {candles.map((candle, idx) => {
            const xPos = 15 + idx * 3.2;
            const depthFactor = Math.sin((idx / 21) * Math.PI);
            const bottomOff = depthFactor * 12;
            return (
              <div
                key={candle.id}
                className="absolute cursor-pointer flex flex-col items-center transition-transform duration-150 hover:scale-110"
                style={{
                  left: `${xPos}%`,
                  bottom: `${bottomOff}px`,
                  height: `${candle.height}px`,
                  zIndex: 30 + Math.floor(depthFactor * 5),
                }}
                onClick={() => blowOneCandle(candle.id, idx)}
              >
                {candle.lit ? (
                  <div className="absolute -top-7 flex flex-col items-center">
                    <div className="w-3.5 h-6 bg-gradient-to-t from-red-500 via-amber-400 to-yellow-200 rounded-full animate-bounce shadow-[0_0_10px_rgba(245,158,11,0.7)]" style={{ animationDuration: '0.55s' }}>
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white rounded-full opacity-70" />
                    </div>
                    <div className="w-4 h-4 -mt-3.5 bg-yellow-300/30 rounded-full blur-sm animate-ping" />
                  </div>
                ) : (
                  <div className="absolute -top-3 w-1 bg-zinc-400 h-2.5 rounded-full animate-pulse opacity-40" />
                )}
                <div className={`w-2 h-full ${candle.color} rounded-t-sm shadow border-x border-black/10 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.35)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0.35)_75%,transparent_75%)] bg-[size:8px_8px]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cake layers */}
        <div className="w-full relative px-2">
          {/* Icing top */}
          <div className="h-6 w-full bg-yellow-300 rounded-t-full border-x-4 border-amber-400 shadow-md flex items-center justify-between px-6 z-20 relative">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-red-600 rounded-full border border-yellow-100 shadow-sm" />
            ))}
          </div>
          {/* Sponge */}
          <div className="h-20 w-[96%] mx-auto bg-amber-50 border-4 border-amber-400 rounded-b-xl z-10 shadow-lg flex flex-col justify-between overflow-hidden relative">
            <div className="w-full h-2 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />
            <div className="flex justify-around items-center px-4 py-2 text-red-950 font-serif font-black text-sm tracking-widest uppercase">
              <span>🎂</span>
              <span>SWEET 22 YEARS</span>
              <span>🎂</span>
            </div>
            <div className="w-full h-4 bg-red-600 flex">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="w-6 h-6 bg-yellow-300 rounded-full -mt-2 border border-amber-400/40" />
              ))}
            </div>
          </div>
          {/* Base */}
          <div className="h-24 w-full bg-gradient-to-br from-red-700 via-red-800 to-red-900 border-4 border-amber-500 rounded-b-2xl z-0 -mt-1.5 shadow-xl flex flex-col justify-between overflow-hidden relative">
            <div className="w-full h-1 bg-amber-400" />
            <div className="flex justify-around items-center text-amber-300 text-lg font-bold py-4 font-display">
              <span>✦ Mom ✦</span>
              <span className="text-yellow-300 text-3xl">❤️</span>
              <span>✦ Dad ✦</span>
            </div>
            <div className="w-full h-4 bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 border-t border-yellow-200" />
          </div>
          {/* Tray */}
          <div className="w-[110%] h-5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 rounded-xl -ml-[5%] mt-1 shadow-2xl flex items-center justify-center">
            <span className="text-[9px] text-amber-100 font-extrabold tracking-widest uppercase">MADE WITH MAXIMUM LOVE BY VISHESH & MITUL ❤️</span>
          </div>
        </div>

        {/* Candle count */}
        <div className="text-center mt-3 text-amber-300/70 text-sm font-display">
          🕯️ {activeLit} / 22 candles still lit
        </div>
      </div>

      {/* THE DODGING BUTTON */}
      {!isBlowing && !celebrate && (
        <button
          onClick={handleCutClick}
          className="fixed font-display font-black text-base px-8 py-4 rounded-full text-red-950 shadow-2xl border-2 border-yellow-200 z-50"
          style={{
            left: `${btnPos.x}%`,
            top: `${btnPos.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            transition: 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 0 25px rgba(251,191,36,0.7)',
          }}
        >
          {dodgeCount === 0 ? '🎂 Cut the Cake!' : dodgeCount === 1 ? '😜 Catch me!' : dodgeCount === 2 ? '😂 One more try...' : '🌬️ Okay okay, phooko!'}
        </button>
      )}

      {/* Manual blow button after dodges */}
      {isBlowing && !celebrate && (
        <div className="relative z-10 mt-6">
          <div className="px-8 py-3 rounded-full bg-neutral-700/50 text-neutral-400 font-display font-black text-base border-2 border-neutral-600 flex items-center gap-2">
            <Wind className="w-5 h-5 animate-pulse" />
            Blowing... 🌬️
          </div>
        </div>
      )}

      {/* Reset button */}
      {celebrate && (
        <div className="relative z-10 mt-4">
          <button
            onClick={initCandles}
            className="px-5 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-display font-bold rounded-full border border-amber-500/40 flex items-center gap-2 text-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Redo
          </button>
        </div>
      )}

      {/* Confetti particles */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-sm opacity-80 animate-bounce`}
              style={{
                left: `${(i * 37 + 5) % 95}%`,
                top: `${(i * 53 + 3) % 90}%`,
                width: `${6 + (i % 8)}px`,
                height: `${6 + (i % 8)}px`,
                background: ['#f59e0b', '#ef4444', '#ec4899', '#fde68a', '#10b981'][i % 5],
                transform: `rotate(${(i * 47) % 360}deg)`,
                animationDuration: `${1.5 + (i % 3) * 0.5}s`,
                animationDelay: `${(i * 0.07) % 1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Celebration Overlay */}
      {celebrate && (
        <div className="fixed inset-0 bg-red-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-white to-amber-50 rounded-2xl border-4 border-amber-400 p-8 md:p-12 max-w-lg w-full text-center shadow-2xl relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-amber-400 rounded-full p-4 border-4 border-white shadow-xl">
              <span className="text-4xl">🎉</span>
            </div>
            <h3 className="font-serif font-black text-4xl text-red-950 mb-2 mt-4">
              Salgirah Mubarak Ho!
            </h3>
            <p className="font-display font-extrabold text-amber-500 text-lg tracking-wider mb-4">
              MOM & DAD — TOGETHER FOREVER ❤️
            </p>
            <div className="p-4 bg-red-100/60 rounded-xl border border-red-200 mb-6 max-w-md mx-auto">
              <span className="text-3xl block mb-2">🥂✨</span>
              <p className="font-sans text-sm text-red-950 leading-relaxed font-semibold">
                22 marvelous chapters of marriage! Thank you for showing us what real commitment, patience, and love look like. Here's to forever! ❤️
              </p>
            </div>
            <button
              onClick={() => {
                setCelebrate(false);
                setShowConfetti(false);
                setTimeout(onDone, 300);
              }}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-display font-extrabold rounded-full shadow-lg border-2 border-yellow-200 uppercase tracking-widest cursor-pointer transition-transform hover:scale-105"
            >
              See Our Memories 📸
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

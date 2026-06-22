import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Music } from 'lucide-react';

// Images from public/images/
const dadImg = '/images/dad-solo.jpeg';
const momImg = '/images/couple-night-out.jpeg'; // The actual mom-solo photo
// The mom-solo.jpeg is actually the formal together shot
const coupleImg = '/images/mom-solo.jpeg';

// Audio from public/audio/
const AUDIO = {
  dad: '/audio/batameez-dil.mp3',
  mom: '/audio/london-thumakda.mp3',
  couple: '/audio/raabta.mp3',
};

type Phase =
  | 'initial'    // blank, loading
  | 'dad-in'     // Dad slides in from left, Batameez Dil plays
  | 'mom-in'     // Mom slides in from right, London Thumakda plays
  | 'merged'     // both meet in center, flash burst
  | 'couple'     // couple photo enlarges, Raabta plays
  | 'done';      // CTA button appears

interface Props {
  onEnter: () => void;
}

export default function IntroAnimation({ onEnter }: Props) {
  const [phase, setPhase] = useState<Phase>('initial');
  const [audioEnabled, setAudioEnabled] = useState(false);

  const dadAudioRef = useRef<HTMLAudioElement | null>(null);
  const momAudioRef = useRef<HTMLAudioElement | null>(null);
  const coupleAudioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio refs
  useEffect(() => {
    dadAudioRef.current = new Audio(AUDIO.dad);
    momAudioRef.current = new Audio(AUDIO.mom);
    
    // Store Raabta in window so it survives unmounting and continues playing
    if (!(window as any).raabtaAudio) {
      (window as any).raabtaAudio = new Audio(AUDIO.couple);
      (window as any).raabtaAudio.loop = true; // Loop it so it doesn't end if the user takes their time
    }
    coupleAudioRef.current = (window as any).raabtaAudio;

    // Set volume on all
    [dadAudioRef, momAudioRef, coupleAudioRef].forEach(ref => {
      if (ref.current) {
        ref.current.volume = 0.85;
        ref.current.preload = 'auto';
      }
    });

    return () => {
      // ONLY pause dad and mom audio on unmount. Raabta keeps playing into the next sections!
      [dadAudioRef, momAudioRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.src = '';
        }
      });
    };
  }, []);

  const fadeOutAudio = (audioRef: React.RefObject<HTMLAudioElement | null>, duration = 600) => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    const startVol = audio.volume;
    const steps = 20;
    const interval = duration / steps;
    let step = 0;
    const fade = setInterval(() => {
      step++;
      if (audio && step <= steps) {
        audio.volume = Math.max(0, startVol * (1 - step / steps));
      } else {
        clearInterval(fade);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = startVol;
        }
      }
    }, interval);
  };

  const startSequence = () => {
    setAudioEnabled(true);

    // Phase 1: Dad slides in — play Batameez Dil
    setPhase('dad-in');
    dadAudioRef.current?.play().catch(() => {});

    // Phase 2: Mom slides in — fade out Batameez Dil, play London Thumakda
    const t2 = setTimeout(() => {
      fadeOutAudio(dadAudioRef, 600);
      setTimeout(() => {
        setPhase('mom-in');
        momAudioRef.current?.play().catch(() => {});
      }, 500);
    }, 8000); // Wait 8s for Dad's song

    // Phase 3: Merge — fade mom audio
    const t3 = setTimeout(() => {
      fadeOutAudio(momAudioRef, 800);
      setPhase('merged');
    }, 16000); // 8s for Mom's song

    // Phase 4: Couple photo + Raabta
    const t4 = setTimeout(() => {
      setPhase('couple');
      coupleAudioRef.current?.play().catch(() => {});
    }, 17500); // Allow merge animation to complete

    // Phase 5: Show CTA
    const t5 = setTimeout(() => {
      setPhase('done');
    }, 22500); // Give Raabta 5s before showing CTA

    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  };

  // Dad CSS
  const dadStyle: React.CSSProperties = {
    transition: 'transform 1.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
    transform:
      phase === 'initial'
        ? 'translateX(-120vw)'
        : phase === 'dad-in'
        ? 'translateX(-36%) rotate(-6deg)'
        : phase === 'mom-in'
        ? 'translateX(-36%) rotate(-6deg)'
        : phase === 'merged'
        ? 'translateX(-46%) scale(0.8) rotate(-10deg)'
        : 'translateX(-200vw)',
    opacity:
      phase === 'initial'
        ? 0
        : phase === 'couple' || phase === 'done'
        ? 0
        : 1,
  };

  // Mom CSS — hidden until mom-in phase
  const momStyle: React.CSSProperties = {
    transition: 'transform 1.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
    transform:
      phase === 'initial' || phase === 'dad-in'
        ? 'translateX(120vw)'
        : phase === 'mom-in'
        ? 'translateX(36%) rotate(8deg)'
        : phase === 'merged'
        ? 'translateX(46%) scale(0.8) rotate(12deg)'
        : 'translateX(200vw)',
    opacity:
      phase === 'initial' || phase === 'dad-in'
        ? 0
        : phase === 'couple' || phase === 'done'
        ? 0
        : 1,
  };

  // Couple photo
  const coupleStyle: React.CSSProperties = {
    transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s ease',
    transform: phase === 'couple' || phase === 'done' ? 'scale(1.2)' : 'scale(0.1)',
    opacity: phase === 'couple' || phase === 'done' ? 1 : 0,
  };

  // Flash on merge
  const flashStyle: React.CSSProperties = {
    transition: 'opacity 0.4s ease',
    opacity: phase === 'merged' ? 1 : 0,
    pointerEvents: 'none',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: 'radial-gradient(ellipse at center, #1a0800 0%, #0d0000 55%, #000 100%)' }}
    >
      {/* Sparkle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse rounded-full"
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              background: i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#ef4444' : '#fde68a',
              opacity: 0.3 + (i % 4) * 0.1,
              animationDelay: `${(i * 0.3) % 3}s`,
              animationDuration: `${1.5 + (i % 3) * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Top label — shown once sequence starts */}
      <div
        className="relative z-10 text-center mb-8"
        style={{ transition: 'opacity 0.8s ease', opacity: phase !== 'initial' ? 1 : 0 }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 mb-3">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-amber-200 font-display font-semibold text-sm tracking-widest uppercase">
            Happy 22nd Anniversary
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>
        <p className="font-serif italic text-amber-400/80 text-base">
          {phase === 'dad-in'
            ? '🎵 Batameez Dil... 💛'
            : phase === 'mom-in'
            ? '🎵 London Thumakda... 💃'
            : phase === 'merged' || phase === 'couple' || phase === 'done'
            ? '🎵 Raabta... ❤️'
            : 'Watch as two hearts meet... ❤️'}
        </p>
      </div>

      {/* Photo Arena */}
      <div className="relative z-10 flex items-center justify-center w-full" style={{ height: '360px' }}>

        {/* Dad — slides from LEFT */}
        <div className="absolute" style={dadStyle}>
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400"
            style={{ width: '280px', height: '360px', boxShadow: '0 0 40px rgba(251,191,36,0.5)' }}
          >
            <img src={dadImg} alt="Papa" className="w-full h-full object-cover object-top" />
          </div>
          <p className="text-center text-amber-300 font-display font-bold text-sm mt-2 tracking-wide">
            Papa 👨
          </p>
          {phase === 'dad-in' && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-amber-400/80 text-xs font-display whitespace-nowrap animate-pulse">
              <Music className="w-3 h-3" /> Batameez Dil
            </div>
          )}
        </div>

        {/* Mom — slides from RIGHT */}
        <div className="absolute" style={momStyle}>
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border-4 border-rose-400"
            style={{ width: '280px', height: '360px', boxShadow: '0 0 40px rgba(251,113,133,0.5)' }}
          >
            <img src={momImg} alt="Mummy" className="w-full h-full object-cover object-top" />
          </div>
          <p className="text-center text-rose-300 font-display font-bold text-sm mt-2 tracking-wide">
            Mummy 👩
          </p>
          {phase === 'mom-in' && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-rose-400/80 text-xs font-display whitespace-nowrap animate-pulse">
              <Music className="w-3 h-3" /> London Thumakda
            </div>
          )}
        </div>

        {/* Flash burst on merge */}
        <div
          className="absolute rounded-full"
          style={{
            ...flashStyle,
            background: 'radial-gradient(circle, rgba(255,220,100,0.95) 0%, rgba(255,100,50,0.5) 40%, transparent 70%)',
            width: '420px',
            height: '420px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Heart burst on merge */}
        {phase === 'merged' && (
          <div className="absolute z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <Heart className="w-20 h-20 text-red-500 fill-red-500 animate-ping" />
          </div>
        )}

        {/* Couple Photo — bursts in center */}
        <div className="absolute z-30" style={coupleStyle}>
          <div
            className="rounded-2xl overflow-hidden border-4 border-amber-400"
            style={{
              width: '300px',
              height: '380px',
              boxShadow: '0 0 80px rgba(251,191,36,0.8), 0 0 30px rgba(239,68,68,0.5)',
            }}
          >
            <img
              src={coupleImg}
              alt="Mom & Dad Together"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-center mt-3">
            <p className="text-amber-300 font-serif italic text-xl font-bold tracking-wide">
              Mummy & Papa ❤️
            </p>
            <p className="text-amber-400/70 font-display text-xs tracking-widest uppercase mt-1">
              22 Glorious Years Together
            </p>
            {(phase === 'couple' || phase === 'done') && (
              <div className="flex items-center justify-center gap-1 text-amber-400/70 text-xs font-display mt-1 animate-pulse">
                <Music className="w-3 h-3" /> Raabta...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* START button — only shown on initial */}
      {phase === 'initial' && (
        <div className="relative z-10 mt-16 text-center">
          <button
            onClick={startSequence}
            className="group relative px-10 py-4 rounded-full font-display font-extrabold text-base text-red-950 overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #f59e0b 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 2s ease infinite',
              boxShadow: '0 0 30px rgba(251,191,36,0.6)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-red-950 animate-pulse" />
              Play Our Story ▶
              <Music className="w-5 h-5" />
            </span>
          </button>
          <p className="text-amber-400/50 text-xs mt-3 font-sans tracking-wider">
            ~ tap to begin the anniversary celebration ~
          </p>
        </div>
      )}

      {/* CTA — after animation done */}
      <div
        className="relative z-10 mt-10"
        style={{
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: phase === 'done' ? 1 : 0,
          transform: phase === 'done' ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          pointerEvents: phase === 'done' ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => {
            fadeOutAudio(coupleAudioRef, 800);
            setTimeout(onEnter, 600);
          }}
          className="group relative px-10 py-4 rounded-full font-display font-extrabold text-base text-red-950 overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #f59e0b 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 2s ease infinite',
            boxShadow: '0 0 30px rgba(251,191,36,0.6)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Heart className="w-5 h-5 fill-red-950 animate-pulse" />
            Let's Cut the Cake! 🎂
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </span>
        </button>
        <p className="text-center text-amber-400/60 text-xs mt-4 font-sans tracking-wider">
          ~ with love, Vishesh & Mitul ~
        </p>
      </div>

      {/* Bottom garland */}
      <div className="absolute bottom-0 inset-x-0 flex justify-around pointer-events-none opacity-40 overflow-hidden h-12">
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center animate-pulse" style={{ animationDelay: `${i * 0.14}s` }}>
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full -mt-0.5" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

// Key photos for the burst — most cinematic selection
const burstPhotos = [
  { src: '/images/couple-dressed-up.jpeg', caption: 'Mom & Dad 💑', rotate: '-rotate-2', objectPosition: 'object-top' },
  { src: '/images/mom-solo.jpeg', caption: 'Date Night! 🌙', rotate: 'rotate-3', objectPosition: 'object-top' },
  { src: '/images/couple-hills-selfie.jpeg', caption: 'Adventures Together 🏔️', rotate: '-rotate-1', objectPosition: 'object-top' },
  { src: '/images/ganesh-puja.jpeg', caption: 'Blessed Always 🙏', rotate: 'rotate-2', objectPosition: 'object-top' },
  { src: '/images/couple-sharing-drink.jpeg', caption: '22 Years of Us 🥂', rotate: '-rotate-3', objectPosition: 'object-center' },
  { src: '/images/family-pizza.jpeg', caption: 'Our Family ❤️', rotate: 'rotate-1', objectPosition: 'object-center' },
];

interface Props {
  onComplete: () => void;
}

export default function GalleryBurst({ onComplete }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show photos one by one, staggered
    const timers: ReturnType<typeof setTimeout>[] = [];

    burstPhotos.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleCount(i + 1);
        }, i * 420)
      );
    });

    // After all shown, hold briefly then fade out
    const holdTimer = setTimeout(() => {
      setFadeOut(true);
    }, burstPhotos.length * 420 + 800);

    // After fade, call onComplete
    const doneTimer = setTimeout(() => {
      // Fade out and stop global raabta audio if it exists
      if ((window as any).raabtaAudio) {
        const audio = (window as any).raabtaAudio;
        const fade = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume -= 0.05;
          } else {
            clearInterval(fade);
            audio.pause();
          }
        }, 100);
      }
      onComplete();
    }, burstPhotos.length * 420 + 1500);

    timers.push(holdTimer, doneTimer);
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden"
      style={{
        background: '#000',
        transition: 'opacity 0.8s ease',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* Burst photos scattered across screen */}
      <div className="relative w-full h-full">

        {/* Flash overlay at start */}
        <div
          className="absolute inset-0 bg-white z-50 pointer-events-none"
          style={{
            animation: 'burstFlash 0.4s ease-out forwards',
          }}
        />

        {/* Centered photos stacking up */}
        {burstPhotos.slice(0, visibleCount).map((photo, i) => {
          const positions = [
            { left: '10%', top: '15%' },
            { left: '65%', top: '8%' },
            { left: '35%', top: '20%' },
            { left: '5%', top: '50%' },
            { left: '70%', top: '45%' },
            { left: '38%', top: '55%' },
          ];
          const pos = positions[i] || { left: '40%', top: '40%' };

          return (
            <div
              key={i}
              className={`absolute transform ${photo.rotate}`}
              style={{
                ...pos,
                animation: `photoPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                opacity: 0,
                zIndex: 10 + i,
              }}
            >
              <div className="bg-white p-3 shadow-2xl" style={{ width: '200px' }}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className={`w-full object-cover ${photo.objectPosition || 'object-top'}`}
                  style={{ height: '160px' }}
                />
                <p className="text-center font-handwritten text-base text-red-950 font-bold mt-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          );
        })}

        {/* Central glowing text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{
            transition: 'opacity 0.5s ease',
            opacity: visibleCount >= burstPhotos.length ? 1 : 0,
          }}
        >
          <div className="text-center">
            <p
              className="font-serif font-black text-5xl sm:text-7xl"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #ef4444, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 30px rgba(251,191,36,0.8))',
              }}
            >
              22 Years ❤️
            </p>
            <p className="font-handwritten text-2xl text-amber-300 mt-2 animate-pulse">
              of beautiful memories...
            </p>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes burstFlash {
          0% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        @keyframes photoPopIn {
          0% { transform: scale(0.1) rotate(0deg); opacity: 0; }
          60% { opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import { Calendar, Coffee, Car, MessageSquare, Star, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { FunFact } from '../types';

export default function FunFacts() {
  const [activeFact, setActiveFact] = useState<string | null>(null);

  const facts: FunFact[] = [
    {
      id: 'days',
      icon: '📅',
      stat: '8,035 Days',
      hindiTitle: '8,035 दिनों का प्यार',
      englishTitle: 'Days of Togetherness',
      description: 'Of pure affection, laughter, sweet hugs, and a few minor, healthy dramatic discussions.'
    },

    {
      id: 'cooking',
      icon: '🍛',
      stat: '5 Stars ⭐️',
      hindiTitle: 'मम्मी के हाथ का स्वाद',
      englishTitle: 'Lekha\'s 5-Star Cooking',
      description: 'Papa\'s automatic rating for Mummy\'s famous delicious kheer, paneer recipes, and traditional chai.'
    },
    {
      id: 'love',
      icon: '❤️',
      stat: 'Infinite',
      hindiTitle: 'अटूट प्यार और विश्वास',
      englishTitle: 'Continuous Love Quotient',
      description: 'An endless loop of showing everyone how beautifully two contrasting souls can build a perfect world.'
    }
  ];

  return (
    <section id="facts" className="py-24 px-4 bg-amber-50/40 border-b border-amber-200 scroll-mt-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-red-600 bg-red-100 px-3.5 py-1.5 rounded-full font-display">
            Mummy-Papa Love Analytics 📈
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-red-950 mt-3 mb-2">
            Fun Facts & Playful Stats
          </h2>
          <p className="font-handwritten text-2xl text-amber-600 font-bold max-w-xl mx-auto">
            "22 saal ka sweet data, visual format mein!"
          </p>
          <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Playful Bento Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facts.map((fact) => {
            const isActive = activeFact === fact.id;
            
            return (
              <div
                key={fact.id}
                onMouseEnter={() => setActiveFact(fact.id)}
                onMouseLeave={() => setActiveFact(null)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-br from-red-600 to-amber-600 text-white border-yellow-300 shadow-2xl scale-102 -translate-y-1' 
                    : 'bg-white text-red-950 border-amber-300/60 shadow-lg'
                }`}
              >
                {/* Decorative glowing backdrops */}
                {isActive && (
                  <div className="absolute -right-8 -bottom-8 text-white/5 text-8xl font-black pointer-events-none select-none">
                    {fact.icon}
                  </div>
                )}

                <div>
                  {/* Icon Badge */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm border ${
                    isActive ? 'bg-white/20 border-white/30' : 'bg-red-50 border-red-100'
                  }`}>
                    {fact.icon}
                  </div>

                  {/* Hindi Label Header */}
                  <span className={`text-xs uppercase tracking-widest font-black ${
                    isActive ? 'text-yellow-200' : 'text-red-650'
                  }`}>
                    {fact.hindiTitle}
                  </span>

                  {/* English Label Helper */}
                  <p className={`text-[10px] uppercase font-bold tracking-tight mb-2 ${
                    isActive ? 'text-neutral-100/70' : 'text-neutral-400'
                  }`}>
                    {fact.englishTitle}
                  </p>

                  {/* Gigantic Stat Label */}
                  <div className={`font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-3 ${
                    isActive ? 'text-yellow-300' : 'text-red-950'
                  }`}>
                    {fact.stat}
                  </div>
                </div>

                {/* Narrative block */}
                <p className={`text-xs sm:text-sm leading-relaxed mt-2 border-t pt-3 ${
                  isActive ? 'text-red-50 border-white/20' : 'text-neutral-600 border-neutral-100'
                }`}>
                  {fact.description}
                </p>

                {/* Micro ornament */}
                {!isActive && (
                  <div className="absolute top-4 right-4 flex gap-1 items-center bg-amber-150 text-amber-800 text-[9px] px-2 py-0.5 rounded-full font-bold select-none">
                    <TrendingUp className="w-3 h-3" />
                    Verified
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Calculation Badge */}
        <div className="mt-12 bg-gradient-to-r from-red-900 to-amber-900 text-amber-100 rounded-2xl border-2 border-amber-300 p-6 shadow-xl flex flex-col md:flex-row items-center justify-between text-left gap-4 max-w-3xl mx-auto">
          <div className="flex gap-4 items-center">
            <span className="text-4xl">🔮</span>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                Our Love Calculator Verdict:
              </h4>
              <p className="text-xs text-red-200 max-w-md leading-relaxed mt-0.5">
                Calculated to 100% pure gold jodi standards. Under Section 22 of the Cute Family Act, Tarun and Lekha are permanently declared as "Super Parents of the Decade"!
              </p>
            </div>
          </div>
          <div className="px-6 py-2 bg-amber-500 text-red-950 font-display font-black text-xs md:text-sm tracking-wider uppercase rounded-full shadow-inner border border-yellow-200 shrink-0">
            ✦ Rank #1 Family ✦
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { Heart } from 'lucide-react';

const KID_ONE = 'Vishesh';
const KID_TWO = 'Mitul';

export default function KidsMessage() {
  return (
    <section className="py-24 px-4 bg-gradient-to-tr from-rose-950 via-red-900 to-amber-950 text-white relative overflow-hidden border-b-8 border-amber-500">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest bg-amber-500 text-red-950 px-3.5 py-1.5 rounded-full border border-yellow-300">
            Pyaar Bhari Chitthi 💌
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-amber-400 mt-2">
            Message from the Kids
          </h2>
          <p className="font-sans text-xs sm:text-sm text-red-200 mt-2">
            "A mix of sweet and teasing, crafted exclusively by the sibling defense force"
          </p>
        </div>

        {/* POSTCARD */}
        <div className="bg-amber-50 rounded-sm border-4 border-amber-400 p-6 md:p-10 shadow-2xl text-red-950 relative overflow-hidden rotate-1 transform-gpu max-w-3xl mx-auto">

          {/* Stamp */}
          <div className="absolute top-4 right-4 w-20 h-24 bg-red-50 border-2 border-dashed border-red-500 rounded-sm p-1.5 flex flex-col items-center justify-between text-center select-none rotate-3">
            <div className="text-[7px] font-bold text-red-500/80 uppercase tracking-wide leading-none">
              Love Stamp
            </div>
            <Heart fill="#dc2626" className="w-6 h-6 text-red-600 animate-pulse my-1" />
            <div className="text-[7px] font-sans font-bold text-neutral-600 uppercase leading-none">
              22 YRS PURE
            </div>
            <div className="text-[6px] tracking-tight text-neutral-400 leading-none">
              June 23, 2026
            </div>
          </div>

          {/* Content */}
          <div className="font-handwritten text-xl text-red-900 text-left space-y-4 md:pr-24">

            <div className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-1 text-red-950">
              <span>Dear Mumma & Papa,</span>
            </div>

            <p className="text-xl md:text-2xl leading-relaxed text-red-900/95 font-medium">
              "22 years of morning walks, doing yoga together, and still choosing each other every single day! 💛"
            </p>

            <p className="text-xl md:text-2xl leading-relaxed text-red-900/95">
              Thank you for being the perfect anchors of our family. Thank you to Mom for putting up with Dad's snores, to Dad for putting up with Mom cancelling movie plans, and most importantly... to both of you for tolerating US! 🤪
            </p>

            <p className="text-xl md:text-2xl leading-relaxed text-red-900/95 italic font-bold">
              Here's to another 100 years of holding hands during evening walks, sharing news gossip, and showing everyone how real partnership is done. You are our absolute favourite couple!
            </p>

            {/* Signature */}
            <div className="pt-8 text-right font-handwritten text-2xl md:text-3xl font-black text-rose-700 flex flex-col items-end">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-400 select-none pb-1">
                Signed with infinite love,
              </span>
              <span className="flex items-center gap-2">
                <span className="underline decoration-wavy decoration-amber-500">{KID_ONE}</span>
                <span className="text-neutral-500 text-sm font-sans font-bold">&</span>
                <span className="underline decoration-wavy decoration-amber-500">{KID_TWO}</span>
              </span>
              <span className="text-xs font-sans text-neutral-400 mt-1">
                (The Proud Trouble-Makers)
              </span>
            </div>
          </div>

          {/* Floral decoration */}
          <div className="absolute bottom-2 left-4 text-amber-500/20 text-5xl pointer-events-none select-none">
            💮✿💮
          </div>
        </div>

      </div>
    </section>
  );
}

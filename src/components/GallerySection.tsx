import React from 'react';
import { Heart, Stars } from 'lucide-react';

// All real family photos mapped to meaningful captions
const photos = [
  {
    id: 'couple-night-out',
    src: '/images/mom-solo.jpeg', // Actually the couple night out photo
    title: 'Date Night Vibes! 🌙',
    subtitle: 'Mom & Dad painting the town red together',
    caption: 'Mom & Dad out on the town — still so cool! 😎',
    colorType: 'rose-velvet',
    rotate: '-rotate-2 hover:rotate-0',
    objectPosition: 'object-top',
  },
  {
    id: 'couple-hills-selfie',
    src: '/images/couple-hills-selfie.jpeg',
    title: 'Hill Station Happiness 🏔️',
    subtitle: 'That perfect vacation selfie!',
    caption: 'Mom & Dad goofing off in the hills — love this energy!',
    colorType: 'vintage-gold',
    rotate: 'rotate-2 hover:rotate-0',
    objectPosition: 'object-top',
  },
  {
    id: 'couple-dressed-up',
    src: '/images/couple-dressed-up.jpeg',
    title: 'All Dressed Up! ✨',
    subtitle: 'Mom in her stunning white anarkali, Dad in kurta',
    caption: 'Mom & Dad looking absolutely royal at a wedding! 👑',
    colorType: 'warm-amber',
    rotate: '-rotate-1 hover:rotate-0',
    objectPosition: 'object-top',
  },
  {
    id: 'couple-sharing-drink',
    src: '/images/couple-sharing-drink.jpeg',
    title: 'Sharing is Caring 🥤',
    subtitle: 'One glass, two straws, infinite love',
    caption: 'Mom & Dad sharing a drink — the sweetest thing! 💑',
    colorType: 'festive-red',
    rotate: 'rotate-3 hover:rotate-0',
    objectPosition: 'object-center',
  },
  {
    id: 'ganesh-puja',
    src: '/images/ganesh-puja.jpeg',
    title: 'Ganesh Puja 🙏',
    subtitle: 'Together in devotion & faith',
    caption: 'Mom & Dad offering prayers together — ❤️ blessings always',
    colorType: 'vintage-gold',
    rotate: '-rotate-3 hover:rotate-0',
    objectPosition: 'object-top',
  },
  {
    id: 'family-pizza',
    src: '/images/family-pizza.jpeg',
    title: 'Pizza Night Squad 🍕',
    subtitle: 'The whole family loves a good pizza night!',
    caption: 'Mom, Dad & us kids — the best pizza crew ever!',
    colorType: 'rose-velvet',
    rotate: 'rotate-1 hover:rotate-0',
    objectPosition: 'object-center',
  },
  {
    id: 'dads-side-family',
    src: '/images/photo-1.jpeg',
    title: 'Dad\'s Side Family 🌟',
    subtitle: 'Three generations of pure joy',
    caption: 'Dad with his parents and us — a full house of love!',
    colorType: 'vintage-gold',
    rotate: '-rotate-2 hover:rotate-0',
    objectPosition: 'object-center',
  },
  {
    id: 'moms-side-family',
    src: '/images/photo-2.jpeg',
    title: 'Mom\'s Side Family ✨',
    subtitle: 'A beautiful evening together',
    caption: 'Mom and Dad with Mom\'s parents — so many smiles!',
    colorType: 'warm-amber',
    rotate: 'rotate-2 hover:rotate-0',
    objectPosition: 'object-center',
  },
  {
    id: 'family-event',
    src: '/images/family-event.jpeg',
    title: 'The Dream Team 👨‍👩‍👧‍👦',
    subtitle: 'All four of us, picture perfect!',
    caption: 'Mom, Dad & us — family forever! 🏡',
    colorType: 'festive-red',
    rotate: '-rotate-2 hover:rotate-0',
    objectPosition: 'object-top',
  },
  {
    id: 'dad-solo',
    src: '/images/dad-solo.jpeg',
    title: 'Papa Looking Dapper! 🕺',
    subtitle: 'Dad at his stylish best at a wedding',
    caption: 'Dad being the most charming guy at any venue 😄',
    colorType: 'warm-amber',
    rotate: 'rotate-2 hover:rotate-0',
    objectPosition: 'object-top',
  },
  {
    id: 'mom-solo',
    src: '/images/couple-night-out.jpeg', // Actually the mom solo photo
    title: 'Mummy Glowing! ☀️',
    subtitle: 'Mom effortlessly chic at a hotel lounge',
    caption: 'Mom always the most beautiful in the room! 💖',
    colorType: 'rose-velvet',
    rotate: '-rotate-1 hover:rotate-0',
    objectPosition: 'object-top',
  },
  {
    id: 'vintage-family',
    src: '/images/vintage-family.jpeg',
    title: 'Vintage Treasure 📸',
    subtitle: 'A throwback to our earliest days as a family',
    caption: 'Mom, Dad & baby — where it all began! 👶',
    colorType: 'vintage-gold',
    rotate: 'rotate-3 hover:rotate-0',
    objectPosition: 'object-top',
  },
  {
    id: 'vintage-dad-kid',
    src: '/images/vintage-dad-kid.jpeg',
    title: 'Old School Love 🕰️',
    subtitle: 'Dad with his little one — priceless memory',
    caption: 'Dad and his kiddo — some things never change! 🥹',
    colorType: 'festive-red',
    rotate: '-rotate-2 hover:rotate-0',
    objectPosition: 'object-center',
  },
];

const tapeColorMap: Record<string, string> = {
  'vintage-gold': 'bg-amber-300/80',
  'rose-velvet': 'bg-rose-400/80',
  'festive-red': 'bg-red-400/80',
  'warm-amber': 'bg-yellow-400/80',
};

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 px-4 bg-amber-50/70 border-b border-amber-200 scroll-mt-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full font-display">
            Yaadon Ke Jharokhe Se 💖
          </span>
          <h2 className="font-serif font-extrabold text-3xl sm:text-5xl text-red-950 mt-3 mb-4">
            Our Polaroid Gallery
          </h2>
          <p className="font-handwritten text-2xl text-amber-600 font-bold max-w-xl mx-auto">
            "Mom & Dad ki sweet &amp; funny yaadein"
          </p>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Masonry polaroid grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
          {photos.map((photo) => {
            const tapeColor = tapeColorMap[photo.colorType || 'vintage-gold'];

            return (
              <div
                key={photo.id}
                className={`break-inside-avoid transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 p-4 bg-white shadow-xl rounded-sm border border-neutral-200/60 relative flex flex-col justify-between mb-8 ${photo.rotate}`}
              >
                {/* Washi Tape */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 ${tapeColor} transform rotate-2 z-10 shadow-sm border border-white/40 flex items-center justify-center`}>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-red-950/60">
                    Mom ❤️ Dad
                  </span>
                </div>

                {/* Photo */}
                <div
                  className="w-full overflow-hidden rounded-xs bg-neutral-100 relative group"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className={`w-full h-auto object-cover ${photo.objectPosition} group-hover:scale-105 transition-transform duration-500`}
                    loading="lazy"
                  />
                  {/* Hover overlay caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-red-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white font-handwritten text-base leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="mt-4 pt-3 pb-1 text-center border-t border-neutral-100 w-full">
                  <h3 className="font-display font-extrabold text-base text-red-950 tracking-tight leading-none mb-1">
                    {photo.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-500 font-medium">
                    {photo.subtitle}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom heart decoration */}
        <div className="flex justify-center mt-12 gap-3 items-center">
          <div className="h-px w-24 bg-amber-300"></div>
          <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
          <Stars className="w-5 h-5 text-amber-500" />
          <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
          <div className="h-px w-24 bg-amber-300"></div>
        </div>

      </div>
    </section>
  );
}

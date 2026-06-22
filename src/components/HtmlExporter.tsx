import React, { useState } from 'react';
import { Download, Check, Sparkles } from 'lucide-react';

interface ExporterProps {
  kidOne: string;
  kidTwo: string;
}

export default function HtmlExporter({ kidOne, kidTwo }: ExporterProps) {
  const [downloaded, setDownloaded] = useState(false);

  const generateHtmlContent = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy 22nd Anniversary Tarun & Lekha! 🎉</title>
    <!-- Tailwind CSS Play CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Outfit:wght@400..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            scroll-behavior: smooth;
        }
        .font-display {
            font-family: 'Outfit', sans-serif;
        }
        .font-serif {
            font-family: 'Playfair Display', serif;
        }
        .font-handwritten {
            font-family: 'Caveat', cursive;
        }
        @keyframes float-heart {
            0% { transform: translateY(100vh) scale(0.5) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-20vh) scale(1.2) rotate(360deg); opacity: 0; }
        }
        .animate-float-heart {
            animation: float-heart 8s linear infinite;
        }
        @keyframes sway {
            0%, 100% { transform: translateY(0px) rotate(-1deg); }
            50% { transform: translateY(-8px) rotate(1deg); }
        }
        .animate-sway {
            animation: sway 5s ease-in-out infinite;
        }
        /* Custom scrollbar to match red & gold theme */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #fef2f2;
        }
        ::-webkit-scrollbar-thumb {
            background: #eab308;
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #dc2626;
        }
    </style>
</head>
<body class="bg-amber-50/20 text-red-950 overflow-x-hidden">

    <!-- FLOATING HEARTS BACKGROUND BACKGROUND overlays -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0" id="hearts-container"></div>

    <!-- HEADER MARIGOLD GARLANDS -->
    <div class="absolute top-0 inset-x-0 flex justify-around pointer-events-none opacity-80 z-10 overflow-hidden h-14">
        <div class="flex flex-col items-center animate-sway"><div class="w-4 h-4 bg-amber-500 rounded-full border border-yellow-300"></div><div class="w-3 h-3 bg-red-600 rounded-full border border-orange-400"></div></div>
        <div class="flex flex-col items-center animate-sway" style="animation-delay: 0.3s"><div class="w-4 h-4 bg-amber-500 rounded-full border border-yellow-300"></div><div class="w-3 h-3 bg-red-600 rounded-full border border-orange-400 font-bold"></div></div>
        <div class="flex flex-col items-center animate-sway" style="animation-delay: 0.6s"><div class="w-4 h-4 bg-amber-500 rounded-full border border-yellow-300"></div><div class="w-3 h-3 bg-red-600 rounded-full border border-orange-400 font-bold"></div></div>
        <div class="flex flex-col items-center animate-sway" style="animation-delay: 0.9s"><div class="w-4 h-4 bg-amber-500 rounded-full border border-yellow-300"></div><div class="w-3 h-3 bg-red-600 rounded-full border border-orange-400 font-bold"></div></div>
        <div class="flex flex-col items-center animate-sway" style="animation-delay: 1.2s"><div class="w-4 h-4 bg-amber-500 rounded-full border border-yellow-300"></div><div class="w-3 h-3 bg-red-600 rounded-full border border-orange-400 font-bold"></div></div>
        <div class="flex flex-col items-center animate-sway" style="animation-delay: 1.5s"><div class="w-4 h-4 bg-amber-500 rounded-full border border-yellow-300"></div><div class="w-3 h-3 bg-red-600 rounded-full border border-orange-400 font-bold"></div></div>
        <div class="flex flex-col items-center animate-sway" style="animation-delay: 1.8s"><div class="w-4 h-4 bg-amber-500 rounded-full border border-yellow-300"></div><div class="w-3 h-3 bg-red-600 rounded-full border border-orange-400 font-bold"></div></div>
    </div>

    <!-- 1. HERO SECTION -->
    <header class="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-amber-900 text-white min-h-[80vh] flex items-center justify-center px-4 py-20 text-center border-b-8 border-amber-500">
        <div class="max-w-4xl mx-auto relative z-10">
            <div class="inline-flex items-center gap-2 px-6 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-400/50 mb-8 animate-bounce">
                <span class="font-display font-semibold text-amber-200 text-xs md:text-sm tracking-wider">
                    JUNE 23, 2004 — JUNE 23, 2026
                </span>
            </div>
            
            <h1 class="font-display font-extrabold tracking-tight text-white mb-6 leading-tight">
                <span class="block text-3xl sm:text-4xl text-amber-400 mb-2 font-serif italic">
                    शादी की 22वीं सालगिरह मुबारक!
                </span>
                <span class="block text-4xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent">
                    Tarun & Lekha
                </span>
            </h1>

            <div class="flex justify-center items-center gap-3 my-6">
                <div class="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
                <div class="p-3 bg-amber-500 text-red-950 rounded-full shadow-lg border border-yellow-200 rotate-12">
                    <span class="text-2xl">❤️</span>
                </div>
                <div class="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>

            <p class="font-serif italic text-2xl sm:text-3xl text-amber-200 mb-4 tracking-wide font-medium">
                "22 saal, ek pyaari kahani ❤️"
            </p>
            
            <p class="font-sans text-base sm:text-lg text-red-100 max-w-2xl mx-auto leading-relaxed mb-10">
                22 Years of sharing laughter, fighting over remote buttons, sipping evening tea together, and building our beautiful world. We love you, Mumma & Papa! 🎉
            </p>

            <div class="flex flex-wrap justify-center gap-4 text-sm font-semibold">
                <a href="#cake" class="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-red-950 rounded-full font-display font-bold shadow-lg hover:scale-105 transition-all">
                    Cake Kaato! 🎂
                </a>
                <a href="#gallery" class="px-6 py-3 bg-red-900/40 text-amber-300 rounded-full font-display border border-amber-500/50 hover:bg-red-950/60 transition-all">
                    Hamari Yaadein 📸
                </a>
            </div>
        </div>
    </header>

    <!-- 2. PHOTO GALLERY -->
    <section id="gallery" class="py-20 px-4 bg-amber-50/70 border-b border-amber-200">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16">
                <span class="text-xs uppercase tracking-widest font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full font-display">
                    Yaadon Ke Jharokhe Se 💖
                </span>
                <h2 class="font-serif font-extrabold text-3xl sm:text-4xl text-red-950 mt-3 mb-2">
                    Our Polaroid Gallery
                </h2>
                <p class="font-handwritten text-2xl text-amber-600 font-bold">
                    "Mummy Papa ki sweet & funny yaadein"
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Frame 1 -->
                <div class="bg-white p-4 shadow-xl border border-neutral-200 rounded-sm -rotate-2 transform hover:scale-103 transition-transform">
                    <div class="aspect-[4/5] bg-neutral-50 border-2 border-dashed border-red-300 flex flex-col items-center justify-center p-4 text-center text-red-900/60 relative">
                        <span class="text-2xl mb-2">📸</span>
                        <div class="font-bold text-xs">The Big Day! 💍</div>
                        <p class="text-[10px] text-neutral-400 mt-1">June 23, 2004 — Shubh Vivah</p>
                        <span class="text-[8px] bg-red-600 text-white rounded px-2 py-0.5 mt-3 font-mono">Insert custom photo</span>
                    </div>
                </div>

                <!-- Frame 2 vector chai -->
                <div class="bg-white p-4 shadow-xl border border-neutral-200 rounded-sm rotate-3 transform hover:scale-103 transition-transform">
                    <div class="aspect-[4/5] bg-amber-50 border border-amber-200 flex flex-col items-center justify-center p-4 text-center">
                        <span class="text-4xl mb-2">☕❤️</span>
                        <div class="font-serif font-black text-xs text-red-900 uppercase">Hamari Wali Chai</div>
                        <p class="font-handwritten text-base text-amber-700 mt-1">"approx. 66,000 cups of tea shared!"</p>
                    </div>
                </div>

                <!-- Frame 3 -->
                <div class="bg-white p-4 shadow-xl border border-neutral-200 rounded-sm rotate-1 transform hover:scale-103 transition-transform">
                    <div class="aspect-[4/5] bg-neutral-50 border-2 border-dashed border-red-300 flex flex-col items-center justify-center p-4 text-center text-red-900/60 relative">
                        <span class="text-2xl mb-2">📸</span>
                        <div class="font-bold text-xs">Everyday Partners 🏡</div>
                        <p class="text-[10px] text-neutral-400 mt-1">Living & Laughing Together</p>
                        <span class="text-[8px] bg-red-600 text-white rounded px-2 py-0.5 mt-3 font-mono">Insert custom photo</span>
                    </div>
                </div>

                <!-- Frame 4 vector TV -->
                <div class="bg-white p-4 shadow-xl border border-neutral-200 rounded-sm -rotate-1 transform hover:scale-103 transition-transform">
                    <div class="aspect-[4/5] bg-amber-50 border border-amber-200 flex flex-col items-center justify-center p-4 text-center">
                        <span class="text-4xl mb-2">📺🍿</span>
                        <div class="font-serif font-black text-xs text-red-900 uppercase">Remote Treaty</div>
                        <p class="font-handwritten text-base text-amber-700 mt-1">"22 years of negotiation & adjustments"</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. VIRTUAL BIRTHDAY CAKE -->
    <section id="cake" class="py-24 px-4 bg-gradient-to-br from-red-50 to-amber-100/50 border-b border-amber-200 relative select-none">
        <div class="max-w-4xl mx-auto text-center">
            <span class="text-xs uppercase tracking-widest font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Interactive Fun 🎂
            </span>
            <h2 class="font-serif font-black text-3xl sm:text-4xl text-red-950 mt-3 mb-2">
                The Virtual Birthday Cake
            </h2>
            <p class="font-handwritten text-2xl text-amber-600 font-bold mb-8">
                "Mumma & Papa phooko candles!"
            </p>

            <!-- 22 Candles arranged on top of the cake -->
            <div class="relative max-w-md mx-auto mb-10 h-28 flex items-end justify-center pb-1" id="candles-shelf">
                <!-- Generating candles dynamically using JS -->
            </div>

            <!-- Cake visual layers -->
            <div class="w-full max-w-sm mx-auto relative px-4">
                <div class="h-6 w-full bg-yellow-300 rounded-t-full border-x-4 border-amber-400 shadow-md flex items-center justify-between px-8 z-20 relative">
                    <div class="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    <div class="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
                    <div class="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    <div class="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
                    <div class="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    <div class="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
                </div>
                <!-- Sponge layer -->
                <div class="h-20 w-[96%] mx-auto bg-amber-50 border-4 border-amber-400 rounded-b-xl relative z-10 shadow-lg flex items-center justify-center text-red-950 font-serif font-bold tracking-widest text-xs">
                    🎂 SWEET 22 YEARS 🎂
                </div>
                <!-- Base stand -->
                <div class="h-24 w-full bg-gradient-to-br from-red-650 to-red-850 border-4 border-amber-500 rounded-b-2xl relative z-0 -mt-1 shadow-xl flex items-center justify-center font-display text-amber-300 font-bold">
                    Tarun ❤️ Lekha
                </div>
                <!-- Wooden tray plate -->
                <div class="w-[106%] h-5 bg-amber-800 rounded-lg -ml-[3%] mt-1 shadow-2xl"></div>
            </div>

            <div class="mt-12">
                <button onclick="blowAllCandles()" id="blow-btn" class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-display font-black text-lg rounded-full shadow-xl border-2 border-yellow-250 transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                    Candles Phooko! 🌬️🎂
                </button>
                <div id="candle-count-display" class="font-semibold text-xs text-neutral-500 mt-4">
                    Remaining lit candles: <span class="text-red-650 font-black text-sm" id="candle-counter">22 / 22 🔥</span>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. MESSAGE FROM THE KIDS -->
    <section class="py-24 px-4 bg-gradient-to-tr from-rose-950 to-amber-950 text-white border-b-8 border-amber-500 relative">
        <div class="max-w-4xl mx-auto text-center">
            <span class="text-xs font-bold uppercase tracking-widest bg-amber-505 bg-amber-500 text-red-950 px-4 py-1.5 rounded-full border border-yellow-300">
                Pyaar Bhari Chitthi 💌
              </span>
              <h2 class="font-serif font-black text-3xl sm:text-4xl text-amber-400 mt-3 mb-10">
                Message from the Kids
              </h2>

              <div class="bg-amber-50 rounded-xs border-4 border-amber-400 p-6 md:p-8 shadow-2xl text-red-950 relative overflow-hidden text-left max-w-2xl mx-auto">
                    <div class="absolute top-4 right-4 w-16 h-20 bg-red-50 border-2 border-dashed border-red-500 rounded-sm p-1.5 flex flex-col items-center justify-center rotate-3">
                        <span class="text-red-500 text-xl">❤️</span>
                        <div class="text-[6px] font-bold text-center mt-1">JUNE 23, 2026</div>
                    </div>

                    <div class="font-handwritten text-lg md:text-xl text-red-900 space-y-4">
                        <div class="text-2xl font-bold text-red-950 font-sans">Dear Mumma & Papa,</div>
                        <p class="font-semibold">
                            "22 years of arguing about the remote and still choosing each other every day 💛"
                        </p>
                        <p>
                            Thank you for being the perfect anchors of our family. Thank you for tolerating each other's minor snores, constant tea addictions, and most importantly... tolerating US! 🤪
                        </p>
                        <p class="italic font-bold">
                            Here's to another 100 years of holding hands during evening walks, sharing news gossip, and showing everyone how real partnership is done.
                        </p>
                        <div class="pt-6 text-right font-handwritten text-xl md:text-2xl font-black text-rose-700">
                            <span class="text-[10px] font-sans font-bold text-neutral-400 block">Signed with infinite love,</span>
                            <span>${kidOne} & ${kidTwo}</span>
                        </div>
                    </div>
              </div>
        </div>
    </section>

    <!-- 5. FUN FACTS -->
    <section class="py-24 px-4 bg-amber-50/40">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16">
                <span class="text-xs uppercase tracking-widest font-semibold text-red-600 bg-red-100 px-3.5 py-1 rounded-full font-display">
                    Kya Aapko Pata Hai? 📈
                </span>
                <h2 class="font-serif font-black text-3xl sm:text-4xl text-red-950 mt-3 mb-2">
                    Love Facts & Playful Stats
                </h2>
                <div class="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Fact 1 -->
                <div class="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-md">
                    <span class="text-3xl">📅</span>
                    <h3 class="font-bold text-xs uppercase text-red-600 mt-3">8,035 Days</h3>
                    <div class="font-display font-bold text-lg text-red-950 mt-1">Days of Love</div>
                    <p class="text-xs text-neutral-500 mt-2">Shared affection, family happiness, and some minor debates!</p>
                </div>

                <!-- Fact 2 -->
                <div class="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-md">
                    <span class="text-3xl">☕</span>
                    <h3 class="font-bold text-xs uppercase text-red-600 mt-3">66,000 Cups</h3>
                    <div class="font-display font-bold text-lg text-red-950 mt-1">Cups of Chai Shared</div>
                    <p class="text-xs text-neutral-500 mt-2">Mummy special adrak chai, enjoyed on the table together every evening.</p>
                </div>

                <!-- Fact 3 -->
                <div class="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-md">
                    <span class="text-3xl">🍛</span>
                    <h3 class="font-bold text-xs uppercase text-red-600 mt-3">5 Stars ⭐</h3>
                    <div class="font-display font-bold text-lg text-red-950 mt-1">Lekha's Cooking Reviews</div>
                    <p class="text-xs text-neutral-500 mt-2">Papa ratings are always 100% verified maximum level delicious!</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. FOOTER -->
    <footer class="py-12 bg-red-905 bg-red-950 text-white text-center border-t-8 border-amber-500">
        <span class="text-3xl block mb-2">❤️</span>
        <p class="font-serif italic text-2xl text-amber-300">Tarun ❤️ Lekha — Forever & Always</p>
        <p class="text-xs text-neutral-400 mt-1">June 23rd — Married 22 Glorious Years</p>
        <p class="text-[9px] text-neutral-500 mt-6 uppercase tracking-wider">Handcrafted with love by their siblings team</p>
    </footer>

    <!-- SUCCESS MODAL POPUP -->
    <div id="success-modal" class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 hidden">
        <div class="bg-white rounded-xl border-4 border-amber-400 p-8 text-center max-w-md w-full relative">
            <span class="text-4xl block mb-2">🎉💐</span>
            <h3 class="font-serif font-black text-3xl text-neutral-900">Salgirah Mubarak!</h3>
            <p class="text-sm text-neutral-600 uppercase tracking-widest font-bold text-amber-500 mt-1">Tarun & Lekha 22 Years</p>
            <p class="text-xs text-neutral-700 leading-relaxed font-semibold bg-red-50 p-3 rounded mt-4">
                "May your journey continue to shine brighter and warmer as the years progress. We love you incredibly!"
            </p>
            <button onclick="closeSuccessModal()" class="px-6 py-2.5 bg-red-600 text-white font-bold rounded-full mt-6 shadow hover:bg-red-700">
                Pyaar Barsao! 💖
            </button>
        </div>
    </div>

    <!-- MAIN INTERACTIVE SCRIPTS -->
    <script>
        // Generate falling hearts background
        const container = document.getElementById('hearts-container');
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'absolute bg-red-500/10 text-red-500 text-lg animate-float-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 95 + '%';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            container.appendChild(heart);
        }

        // Initialize 22 Candles
        const candlesShelf = document.getElementById('candles-shelf');
        const candleColors = ['#ef4444', '#f59e0b', '#ec4899', '#60a5fa', '#34d399', '#818cf8', '#fb923c', '#c084fc'];
        let litCandleCount = 22;

        for (let i = 0; i < 22; i++) {
            const candleId = i + 1;
            const horizontalOffset = 10 + (i * 3.6);
            const depthFactor = Math.sin((i / 21) * Math.PI);
            const bottomPositionOffset = depthFactor * 12;
            const height = Math.random() * 8 + 32;
            const candleBaseColor = candleColors[i % candleColors.length];

            const candleDiv = document.createElement('div');
            candleDiv.id = 'candle-' + candleId;
            candleDiv.className = 'absolute cursor-pointer flex flex-col items-center group transition-all duration-200';
            candleDiv.style.left = horizontalOffset + '%';
            candleDiv.style.bottom = bottomPositionOffset + 'px';
            candleDiv.style.height = height + 'px';
            candleDiv.style.zIndex = 30 + Math.floor(depthFactor * 5);
            candleDiv.setAttribute('onclick', 'extinguishCandle(' + candleId + ')');

            candleDiv.innerHTML = \`
                <!-- Flame -->
                <div class="absolute -top-7 flex flex-col items-center flame-icon" id="flame-\${candleId}">
                    <div class="w-3.5 h-6 bg-gradient-to-t from-red-500 via-amber-400 to-yellow-250 rounded-full animate-bounce shadow"></div>
                </div>
                <!-- Stick -->
                <div class="w-1.5 h-full rounded-t-sm shadow-md border-x border-black/10 relative overflow-hidden" style="background-color: \${candleBaseColor};">
                    <div class="absolute inset-0 bg-white/20" style="background-size: 10px 10px; background-image: linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%)"></div>
                </div>
            \`;
            candlesShelf.appendChild(candleDiv);
        }

        // Play audio local beep synthesizer
        function beep(freq, type="sine", duration=0.1) {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return;
                const ctx = new AudioCtx();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, ctx.currentTime);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + duration);
            } catch(e){}
        }

        function extinguishCandle(id) {
            const flame = document.getElementById('flame-' + id);
            if (flame && !flame.classList.contains('hidden')) {
                flame.classList.add('hidden');
                beep(600 + id * 10, "sine");
                litCandleCount--;
                document.getElementById('candle-counter').innerText = litCandleCount + " / 22 🔥";
                
                // Add tiny grey smoking thread
                const candleDiv = document.getElementById('candle-' + id);
                const smoke = document.createElement('div');
                smoke.className = 'absolute -top-3 w-1 bg-zinc-400 h-2 rounded opacity-50';
                candleDiv.appendChild(smoke);

                if (litCandleCount === 0) {
                    showCelebrate();
                }
            }
        }

        function blowAllCandles() {
            let delay = 0;
            for (let i = 0; i < 22; i++) {
                setTimeout(() => {
                    extinguishCandle(i + 1);
                }, delay);
                delay += 120;
            }
        }

        function showCelebrate() {
            document.getElementById('success-modal').classList.remove('hidden');
            beep(523.25, "triangle", 0.15);
            setTimeout(() => beep(659.25, "triangle", 0.15), 150);
            setTimeout(() => beep(783.99, "triangle", 0.15), 300);
            setTimeout(() => beep(1046.5, "triangle", 0.5), 450);
        }

        function closeSuccessModal() {
            document.getElementById('success-modal').classList.add('hidden');
        }
    </script>
</body>
</html>`;
  };

  const handleDownload = () => {
    try {
        const text = generateHtmlContent();
        const blob = new Blob([text], { type: 'text/html;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'tarun_lekha_22nd_anniversary.html');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // synthesized success bell sound
        playSoundLocal(880, 'sine', 0.2);

        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 4000);
    } catch (err) {
        // Fallback log
    }
  };

  const playSoundLocal = (freq: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine', duration = 0.15) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  return (
    <div className="py-12 bg-amber-50 border-t border-amber-200">
      <div className="max-w-2xl mx-auto text-center px-4">
        
        {/* Playful design container explaining they requested an HTML and here it is */}
        <div className="bg-white rounded-2xl border border-amber-300 p-6 md:p-8 shadow-md">
          <span className="text-3xl block mb-2">🎁📲</span>
          <h4 className="font-serif font-black text-lg sm:text-xl text-red-950">
            Download Standalone Anniversary HTML File!
          </h4>
          <p className="text-xs text-neutral-600 mt-2 mb-6 leading-relaxed">
            You requested a single HTML file with all script and css embedded — click the button below to instantly save and generate a beautiful, offline-perfect copy that you can WhatsApp, email, or host on any server for Mumma and Papa!
          </p>

          <button
            onClick={handleDownload}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-display font-black tracking-wide text-sm md:text-base border-2 shadow-lg transition-all transform hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2 mx-auto ${
              downloaded 
                ? 'bg-emerald-500 border-emerald-400 text-white' 
                : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white border-yellow-200'
            }`}
          >
            {downloaded ? (
              <>
                <Check className="w-5 h-5 animate-pulse" />
                Saved: tarun_lekha_22nd_anniversary.html! 🎉
              </>
            ) : (
              <>
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                Download Single HTML Archive 📂
              </>
            )}
          </button>

          {downloaded && (
            <div className="mt-4 text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1.5 animate-bounce">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Perfect! Check your Downloads folder for the single-file bundle!</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

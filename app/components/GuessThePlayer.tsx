'use client';

import { useState, useEffect } from "react";
interface GuessThePlayerProps {
  setActiveTab: (tab: string) => void;
}
// The complete player database mapped directly from your screenshot
const playerDatabase = [
  { id: "lionel-messi", name: "LIONEL MESSI", image: "/players/lionel-messi.png" },
  { id: "kylian-mbappe", name: "KYLIAN MBAPPE", image: "/players/kylian-mbappe.png" },
  { id: "harry-kane", name: "HARRY KANE", image: "/players/harry-kane.png" },
  { id: "vinicius-jr", name: "VINICIUS JR", image: "/players/vinicius-jr.png" },
  { id: "erling-haaland", name: "ERLING HAALAND", image: "/players/erling-haaland.png" },
  { id: "jude-bellingham", name: "JUDE BELLINGHAM", image: "/players/jude-bellingham.png" },
  { id: "cristiano-ronaldo", name: "CRISTIANO RONALDO", image: "/players/cristiano-ronaldo.png" },
  { id: "oussman-dembele", name: "OUSSMAN DEMBELE", image: "/players/oussman-dembele.png" },
  { id: "julian-quinones", name: "JULIAN QUINONES", image: "/players/julian-quinones.png" },
  { id: "deniz-undav", name: "DENIZ UNDAV", image: "/players/deniz-undav.png" },
  { id: "cody-gakpo", name: "CODY GAKPO", image: "/players/cody-gakpo.png" },
  { id: "matheus-cunha", name: "MATHEUS CUNHA", image: "/players/matheus-cunha.png" },
  { id: "kai-havertz", name: "KAI HAVERTZ", image: "/players/kai-havertz.png" },
  { id: "jonathan-david", name: "JONATHAN DAVID", image: "/players/jonathan-david.png" },
  { id: "breel-embolo", name: "BREEL EMBOLO", image: "/players/breel-embolo.png" },
  { id: "nicolas-pepe", name: "NICOLAS PEPE", image: "/players/nicolas-pepe.png" },
  { id: "charles-de-ketelaere", name: "CHARLES DE KETELAERE", image: "/players/charles-de-ketelaere.png" },
  { id: "ruben-vargas", name: "RUBEN VARGAS", image: "/players/ruben-vargas.png" },
  { id: "mostafa-zico", name: "MOSTAFA ZICO", image: "/players/mostafa-zico.png" },
  { id: "amad-diallo", name: "AMAD DIALLO", image: "/players/amad-diallo.png" },
  { id: "malik-tillman", name: "MALIK TILLMAN", image: "/players/malik-tillman.png" },
  { id: "habib-diarra", name: "HABIB DIARRA", image: "/players/habib-diarra.png" },
  { id: "anthony-elanga", name: "ANTHONY ELANGA", image: "/players/anthony-elanga.png" },
  { id: "ayase-ueda", name: "AYASE UEDA", image: "/players/ayase-ueda.png" },
  { id: "bradley-barcola", name: "BRADLEY BARCOLA", image: "/players/bradley-barcola.png" },
  { id: "maxi-araujo", name: "MAXI ARAUJO", image: "/players/maxi-araujo.png" },
  { id: "soufiane-rahimi", name: "SOUFIANE RAHIMI", image: "/players/soufiane-rahimi.png" },
  { id: "crysencio-summerville", name: "CRYSENCIO SUMMERVILLE", image: "/players/crysencio-summerville.png" },
  { id: "ismael-saibari", name: "ISMAEL SAIBARI", image: "/players/ismael-saibari.png" },
  { id: "raul-jimenez", name: "RAUL JIMENEZ", image: "/players/raul-jimenez.png" },
  { id: "elijah-just", name: "ELIJAH JUST", image: "/players/elijah-just.png" },
  { id: "romelu-lukaku", name: "ROMELU LUKAKU", image: "/players/romelu-lukaku.png" },
  { id: "mikel-oyarzabal", name: "MIKEL OYARZABAL", image: "/players/mikel-oyarzabal.png" },
  { id: "marko-arnautovic", name: "MARKO ARNAUTOVIC", image: "/players/marko-arnautovic.png" },
  { id: "daniel-munoz", name: "DANIEL MUNOZ", image: "/players/daniel-munoz.png" },
  { id: "ramin-rezaeian", name: "RAMIN REZAEIAN", image: "/players/ramin-rezaeian.png" },
  { id: "riyad-mahrez", name: "RIYAD MAHREZ", image: "/players/riyad-mahrez.png" },
  { id: "pape-gueye", name: "PAPE GUEYE", image: "/players/pape-gueye.png" },
  { id: "leonardo-trossard", name: "LEONARDO TROSSARD", image: "/players/leonardo-trossard.png" },
  { id: "yoane-wissa", name: "YOANE WISSA", image: "/players/yoane-wissa.png" },
  { id: "folarin-balogun", name: "FOLARIN BALOGUN", image: "/players/folarin-balogun.png" },
  { id: "brian-brobbey", name: "BRIAN BROBBEY", image: "/players/brian-brobbey.png" },
  { id: "johan-manzambi", name: "JOHAN MANZAMBI", image: "/players/johan-manzambi.png" },
  { id: "ismaila-sarr", name: "ISMAILA SARR", image: "/players/ismaila-sarr.png" }
];

export default function GuessThePlayer({ setActiveTab }: GuessThePlayerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  const [targetName, setTargetName] = useState("");
  const [guessSlots, setGuessSlots] = useState<{ char: string | null; bankId: number | null; isSpace: boolean; expectedChar: string }[]>([]);
  const [letterBank, setLetterBank] = useState<{ id: number; char: string; used: boolean }[]>([]);
  
  // State to track which button needs to vibrate
  const [vibratingBankId, setVibratingBankId] = useState<number | null>(null);

  // States for the Pop-up Logic
  const [showPaywall, setShowPaywall] = useState(false);
  const [hasUnlockedMore, setHasUnlockedMore] = useState(false);

  useEffect(() => {
    loadPlayer(0);
  }, []);

  const loadPlayer = (index: number) => {
    const player = playerDatabase[index];
    const name = player.name.toUpperCase();
    setTargetName(name);

    // 1. Setup empty slots AND store the expected character
    const slots = name.split('').map((char) => ({
      char: char === " " ? " " : null,
      bankId: null,
      isSpace: char === " ",
      expectedChar: char
    }));
    setGuessSlots(slots);

    // 2. Generate 20 scrambled letters (Actual Name + Random Letters)
    const nameLetters = name.replace(/ /g, "").split("");
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const pool = [...nameLetters];

    while (pool.length < 20) {
      pool.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }

    // Shuffle the array
    const shuffled = pool.sort(() => Math.random() - 0.5).map((char, i) => ({
      id: i,
      char: char,
      used: false
    }));

    setLetterBank(shuffled);
    setLives(3);
    setGameStatus("playing");
    setVibratingBankId(null);
  };

  const handleBankClick = (bankItem: { id: number; char: string; used: boolean }) => {
    if (bankItem.used || gameStatus !== "playing") return;

    // Find the very first empty slot that needs to be filled (ignoring spaces)
    const nextRequiredSlotIndex = guessSlots.findIndex(slot => slot.char === null && !slot.isSpace);
    
    if (nextRequiredSlotIndex !== -1) {
      const requiredChar = guessSlots[nextRequiredSlotIndex].expectedChar;

      // CHRONOLOGICAL CHECK: Does the clicked letter match the exact next letter needed?
      if (bankItem.char === requiredChar) {
        // CORRECT LETTER: Place it in the slot
        const newSlots = [...guessSlots];
        newSlots[nextRequiredSlotIndex] = { char: bankItem.char, bankId: bankItem.id, isSpace: false, expectedChar: requiredChar };
        setGuessSlots(newSlots);

        const newBank = letterBank.map(item => item.id === bankItem.id ? { ...item, used: true } : item);
        setLetterBank(newBank);

        // Check win condition if this was the final letter
        if (!newSlots.some(slot => slot.char === null && !slot.isSpace)) {
          setGameStatus("won");
        }
      } else {
        // INCORRECT LETTER FOR THIS POSITION: Trigger vibration and lose a life
        
        // Trigger the shake animation for 500ms
        setVibratingBankId(bankItem.id);
        setTimeout(() => setVibratingBankId(null), 500); 

        // Lose a life logic (using absolute previous state to prevent click-spam bugs)
        setLives((prevLives) => {
          const updatedLives = prevLives - 1;
          if (updatedLives <= 0) {
            setGameStatus("lost");
          }
          return updatedLives;
        });
      }
    }
  };

  const handleWatchAd = () => {
    alert("Simulating Ad Video playing... Thanks for watching!");
    setHasUnlockedMore(true);
    setShowPaywall(false);
    setCurrentIndex(5);
    loadPlayer(5);
  };

  const nextPlayer = () => {
    const nextIndex = currentIndex + 1;
    
    // Intercept and show paywall right after the 5th player (index 4)
    if (nextIndex === 5 && !hasUnlockedMore) {
      setShowPaywall(true);
      return;
    }

    if (nextIndex < playerDatabase.length) {
      setCurrentIndex(nextIndex);
      loadPlayer(nextIndex);
    } else {
      setIsGameOver(true);
    }
  };

  if (isGameOver) {
    return <div className="text-center py-12 text-emerald-400 font-bold text-2xl">You Guessed Everyone!</div>;
  }

  if (!hasStarted) {
    return (
      <div className="w-full flex flex-col items-center mt-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-3xl font-black text-white tracking-tight">Guess the Player</h2>
          <p className="text-slate-400">Identify the footballer and spell their name chronologically. You have 3 lives before it's game over!</p>
          <button onClick={() => setHasStarted(true)} className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all">
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Game Header / Lives */}
      <div className="w-full flex justify-between px-4 py-2 bg-slate-800 rounded-xl mb-4">
        <div className="text-slate-300 font-bold">Player {currentIndex + 1}/{playerDatabase.length}</div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <span key={i} className={`text-xl transition-all duration-300 ${i < lives ? 'scale-100' : 'scale-75 opacity-40 grayscale'}`}>
              {i < lives ? '❤️' : '🖤'}
            </span>
          ))}
        </div>
      </div>

      {/* Player Image Container (Optimized for Mobile) */}
      <div className="w-36 h-36 sm:w-48 sm:h-48 bg-slate-800 rounded-2xl overflow-hidden border-2 border-slate-700 mb-4 shrink-0 flex items-center justify-center relative">
         <img 
            src={playerDatabase[currentIndex].image} 
            alt="Guess this player" 
            className="object-cover w-full h-full"
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Missing+Image' }}
          />
      </div>

      {/* The Guess Slots (Grouped by Word) */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-5 px-1">
        {targetName.split(" ").map((word, wordIndex, array) => {
          const previousWordsLength = array.slice(0, wordIndex).join(" ").length;
          const startIndex = wordIndex === 0 ? 0 : previousWordsLength + 1;

          return (
            <div key={wordIndex} className="flex gap-1 sm:gap-2">
              {word.split("").map((_, letterIndex) => {
                const slotIndex = startIndex + letterIndex;
                const slot = guessSlots[slotIndex];

                if (!slot) return null;

                return (
                  <div
                    key={slotIndex}
                    className={`w-7 h-9 sm:w-10 sm:h-12 flex items-center justify-center text-base sm:text-xl font-bold rounded-lg border-b-4 transition-all ${
                      slot.char ? 'bg-emerald-500 border-emerald-700 text-slate-900 shadow-lg' : 'bg-slate-800 border-slate-700 text-transparent'
                    }`}
                  >
                    {slot.char || "_"}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Win / Loss Messages */}
      {gameStatus === "won" && (
        <div className="mb-6 text-center animate-in zoom-in">
          <div className="text-2xl font-bold text-emerald-400 mb-2">Correct!</div>
          <button onClick={nextPlayer} className="px-6 py-2 bg-emerald-500 text-slate-900 font-bold rounded-xl shadow-lg">Next Player ➡️</button>
        </div>
      )}
      
      {gameStatus === "lost" && (
        <div className="mb-6 text-center animate-in zoom-in">
          <div className="text-xl font-bold text-red-500 mb-2">Out of lives! The answer was {targetName}.</div>
          <button onClick={nextPlayer} className="px-6 py-2 bg-slate-700 text-white font-bold rounded-xl shadow-lg">Skip to Next ➡️</button>
        </div>
      )}

      {/* The 20-Letter Bank */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 w-full max-w-md px-1 mb-2">
        {letterBank.map((item) => {
          // Check if this specific button should be vibrating
          const isVibrating = vibratingBankId === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleBankClick(item)}
              disabled={item.used || gameStatus !== "playing"}
              className={`w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl font-bold rounded-lg border-b-4 flex items-center justify-center transition-all ${
                item.used 
                  ? 'bg-slate-800/50 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed' 
                  : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600 active:border-b-0 active:translate-y-1'
              } ${isVibrating ? 'vibrate-error bg-red-500 border-red-700 text-white' : ''}`}
            >
              {item.char}
            </button>
          );
        })}
      </div>

      {/* THE POP-UP PAYWALL MODAL */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-800 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl w-full max-w-sm space-y-6 text-center animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-white">Great Job!</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              You've completed the 5 free players. How would you like to unlock the rest of the game?
            </p>
            
            <div className="space-y-3 pt-2">
              <button 
                onClick={handleWatchAd}
                className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all border border-slate-500 flex items-center justify-center gap-2"
              >
                <span>▶</span> Watch Ad to Continue
              </button>
              
              <button 
  onClick={() => setActiveTab("download")}
  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
>
  Download App to Unlock All
</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
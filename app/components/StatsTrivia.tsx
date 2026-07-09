'use client';

import { useState, useEffect } from "react";
interface StatsTriviaProps {
  setActiveTab: (tab: string) => void;
}

// Updated World Cup 2026 Round of 16 Stats Quiz
const quizData = [
  { question: "As of the Round of 16, which two teams lead the tournament with 14 goals each?", options: ["France and Argentina", "Belgium and Norway", "USA and England", "Germany and Netherlands"], answer: "France and Argentina" },
  { question: "As of the Round of 16, which team has registered the most overall attempts at goal with 107?", options: ["France", "Spain", "Belgium", "Argentina"], answer: "Belgium" },
  { question: "As of the Round of 16, France has generated 12 assists. How many assists does Argentina have?", options: ["6", "8", "10", "12"], answer: "8" },
  { question: "Which two teams are tied for 11 goals and 10 assists each?", options: ["Germany and Netherlands", "USA and Mexico", "Brazil and Senegal", "Japan and Portugal"], answer: "Germany and Netherlands" },
  { question: "As of the Round of 16, Argentina leads the tournament in expected goals (xG). What is their total xG?", options: ["11.91", "10.59", "9.79", "10.28"], answer: "11.91" },
  { question: "As of the Round of 16, how many of England's 80 attempts at goal were on target?", options: ["28", "32", "34", "39"], answer: "32" },
  { question: "Which team has the highest goal conversion rate in the tournament at a massive 25%?", options: ["Netherlands", "Norway", "Japan", "USA"], answer: "Japan" },
  { question: "As of the Round of 16, Spain has taken 93 shots. How many of those were from outside the penalty area?", options: ["24", "30", "38", "40"], answer: "38" },
  { question: "As of the Round of 16, which team has the highest number of headed attempts at goal (22)?", options: ["England", "Belgium", "Spain", "Argentina"], answer: "England" },
  { question: "Which team has exactly 8 goals and 8 assists?", options: ["Portugal", "Egypt", "Japan", "Sweden"], answer: "Egypt" },
  { question: "As of the Round of 16, what is Morocco's goal conversion rate?", options: ["12%", "14%", "16%", "18%"], answer: "16%" },
  { question: "How many goals has the USA scored from their 59 attempts?", options: ["9", "10", "11", "12"], answer: "11" },
  { question: "Which team has accumulated an xG of 5.00 but managed to score 11 goals?", options: ["Germany", "Netherlands", "USA", "Senegal"], answer: "Netherlands" },
  { question: "As of the Round of 16, Norway has scored 12 goals. What is their expected goals (xG) figure?", options: ["9.07", "10.28", "8.64", "6.37"], answer: "9.07" },
  { question: "Which team has exactly 7 goals and 6 assists?", options: ["Croatia", "Austria", "Sweden", "Portugal"], answer: "Sweden" },
  { question: "As of the Round of 16, Belgium has 107 attempts. How many of those were from inside the penalty area?", options: ["48", "55", "63", "70"], answer: "70" },
  { question: "Canada has scored 9 goals. How many total assists do they have?", options: ["3", "5", "7", "8"], answer: "3" },
  { question: "Brazil has taken 73 attempts at goal. How many of those were on target?", options: ["22", "25", "29", "32"], answer: "29" },
  { question: "As of the Round of 16, Switzerland has scored 9 goals. How many headed attempts do they have?", options: ["5", "8", "10", "14"], answer: "5" },
  { question: "Which team has an xG of 3.41 but has managed to score 6 goals?", options: ["Austria", "Croatia", "Algeria", "Congo DR"], answer: "Croatia" },
  { question: "Mexico has scored 10 goals. How many of their 70 attempts were off-target?", options: ["24", "29", "32", "41"], answer: "32" },
  { question: "Senegal has generated 9 assists. How many goals have they scored?", options: ["8", "9", "10", "11"], answer: "10" },
  { question: "As of the Round of 16, France leads the tournament in attempts from outside the penalty area with how many?", options: ["30", "37", "38", "40"], answer: "40" },
  { question: "As of the Round of 16, Morocco has an xG of 6.4. How many goals have they actually scored?", options: ["8", "9", "10", "11"], answer: "10" },
  { question: "Which of these teams has exactly 5 goals and 3 assists?", options: ["Croatia", "Congo DR", "Sweden", "Austria"], answer: "Congo DR" },

  // --- PLAYER STATS QUESTIONS ---
  { question: "As of the Round of 16, how many goals has Argentine forward Lionel Messi scored?", options: ["6", "7", "8", "9"], answer: "8" },
  { question: "As of the Round of 16, Kylian Mbappe has 7 goals and how many assists?", options: ["0", "1", "2", "3"], answer: "2" },
  { question: "As of the Round of 16, Erling Haaland has 7 goals. How many minutes has he played?", options: ["391", "416", "468", "482"], answer: "416" },
  { question: "As of the Round of 16, which English player has scored 6 goals and 1 assist?", options: ["Jude Bellingham", "Harry Kane", "Phil Foden", "Bukayo Saka"], answer: "Harry Kane" },
  { question: "As of the Round of 16, Ousmane Dembele has 4 goals and 2 assists. How many minutes has he played?", options: ["391", "419", "435", "482"], answer: "391" },
  { question: "Ismaila Sarr has 4 goals and 1 assist. Which country does he represent?", options: ["Morocco", "Senegal", "Algeria", "Congo DR"], answer: "Senegal" },
  { question: "As of the Round of 16, Mikel Oyarzabal has played 435 minutes. How many goals has he scored for Spain?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "Julian Quinones has 4 goals and 1 assist in 440 minutes. Which country does he play for?", options: ["USA", "Brazil", "Mexico", "Canada"], answer: "Mexico" },
  { question: "As of the Round of 16, which English midfielder has 4 goals in 447 minutes?", options: ["Jude Bellingham", "Declan Rice", "Mason Mount", "Conor Gallagher"], answer: "Jude Bellingham" },
  { question: "Vinicius Junior has played 505 minutes for Brazil. How many assists does he have alongside his 4 goals?", options: ["0", "1", "2", "3"], answer: "1" },
  { question: "Which German player has recorded 3 goals and 2 assists in just 174 minutes?", options: ["Kai Havertz", "Deniz Undav", "Jamal Musiala", "Leroy Sane"], answer: "Deniz Undav" },
  { question: "As of the Round of 16, which Swiss midfielder has 3 goals and 2 assists in 220 minutes?", options: ["Granit Xhaka", "Remo Freuler", "Johan Manzambi", "Xherdan Shaqiri"], answer: "Johan Manzambi" },
  { question: "As of the Round of 16, Romelu Lukaku has scored 3 goals. How many assists does he have?", options: ["0", "1", "2", "3"], answer: "1" },
  { question: "Cody Gakpo has 3 goals and 1 assist. How many minutes has he played for the Netherlands?", options: ["245", "324", "394", "411"], answer: "394" },
  { question: "Which Netherlands forward has 3 goals and 0 assists in just 245 minutes?", options: ["Cody Gakpo", "Brian Brobbey", "Memphis Depay", "Donyell Malen"], answer: "Brian Brobbey" },
  { question: "Elijah Just has 3 goals in 291 minutes. Which country does he play for?", options: ["USA", "Canada", "New Zealand", "Australia"], answer: "New Zealand" },
  { question: "Matheus Cunha has scored 3 goals for Brazil. How many assists does he have?", options: ["0", "1", "2", "3"], answer: "0" },
  { question: "Folarin Balogun has 3 goals in 348 minutes. What position is he listed as?", options: ["MF", "FW", "DF", "GK"], answer: "FW" },
  { question: "Raul Jimenez has exactly 3 goals and 0 assists. How many minutes has he played for Mexico?", options: ["291", "324", "348", "409"], answer: "348" },
  { question: "Kai Havertz has 3 goals for Germany. How many minutes has he spent on the pitch?", options: ["174", "348", "392", "475"], answer: "392" },
  { question: "Yoane Wissa has 3 goals in 409 minutes. Which country does he represent?", options: ["Senegal", "Congo DR", "Morocco", "Algeria"], answer: "Congo DR" },
  { question: "As of the Round of 16, Ismael Saibari has played 411 minutes. How many goals does he have for Morocco?", options: ["2", "3", "4", "5"], answer: "3" },
  { question: "Jonathan David has 3 goals and 0 assists. How many minutes has he played for Canada?", options: ["394", "411", "440", "475"], answer: "475" },
  { question: "As of the Round of 16, how many total minutes has Lionel Messi played to secure his 8 goals?", options: ["416", "435", "468", "505"], answer: "468" },
  { question: "As of the Round of 16, which French player has played the most minutes (482) between Mbappe and Dembele?", options: ["Kylian Mbappe", "Ousmane Dembele", "They are tied", "Neither"], answer: "Kylian Mbappe" }
];

export default function StatsTrivia({ setActiveTab }: StatsTriviaProps) {
  // Quiz Gameplay States
  const [hasStartedTrivia, setHasStartedTrivia] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  // States for Timer and Turn Logic
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextButton, setShowNextButton] = useState(false); 
  
  // States for the Pop-up Logic
  const [showPaywall, setShowPaywall] = useState(false);
   

  // Timer Countdown Logic
  useEffect(() => {
    if (isGameOver || showPaywall || showNextButton || !hasStartedTrivia) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer("TIMEOUT");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, isGameOver, showPaywall, showNextButton, hasStartedTrivia]);

  const handleAnswer = (selectedOption: string) => {
    if (selectedAnswer || showNextButton) return; 
    
    setSelectedAnswer(selectedOption);

    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;

    // Trigger paywall if the next question is a multiple of 5 AND it's not the end of the quiz
    if (nextQuestion % 5 === 0 && nextQuestion < quizData.length) {
      setShowPaywall(true);
    } else if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else {
      setIsGameOver(true);
    }
    
    setSelectedAnswer(null);
    setShowNextButton(false);
  };

  const handleWatchAd = () => {
    alert("Simulating Ad Video playing... Thanks for watching!");
    setShowPaywall(false);
    setCurrentQuestion(currentQuestion + 1); // Dynamically advance to the next question
    setTimeLeft(30);
  };

  const restartGame = () => {
    setScore(0);
    setStreak(0);
    setCurrentQuestion(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setShowPaywall(false);
    setSelectedAnswer(null);
    setShowNextButton(false);
  };

  const getButtonColor = (option: string) => {
    const baseClass = "w-full py-3.5 px-5 border rounded-xl text-left transition-all duration-200 text-sm font-medium focus:outline-none ";
    
    if (!selectedAnswer) {
      return baseClass + "bg-slate-700/40 hover:bg-emerald-600/20 active:bg-emerald-600/30 border-slate-600/30 hover:border-emerald-500/50";
    }

    const isCorrectAnswer = option === quizData[currentQuestion].answer;
    const isSelected = option === selectedAnswer;

    if (isCorrectAnswer) {
      return baseClass + "bg-emerald-500/50 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]";
    }
    
    if (isSelected && !isCorrectAnswer) {
      return baseClass + "bg-red-500/50 border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]";
    }

    return baseClass + "bg-slate-800/40 border-slate-700/30 text-slate-500 opacity-40";
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4">
      
      {/* Start Screen */}
      {!hasStartedTrivia ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-3xl font-black text-white tracking-tight">Stats Trivia</h2>
          <p className="text-slate-400">Test your knowledge of the tournament statistics. You have exactly 30 seconds per question.</p>
          <button onClick={() => setHasStartedTrivia(true)} className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all">
            Start Game
          </button>
        </div>
      ) : (
        <>
          {/* Trivia Game Top Bar Status */}
          <div className="w-full flex justify-between items-center py-2 mb-2 px-1">
            <div className={`text-sm font-bold px-3 py-1.5 rounded-lg border ${timeLeft <= 5 && !showNextButton ? 'text-red-400 bg-red-500/10 border-red-500/30 animate-pulse' : 'text-slate-300 bg-slate-900 border-slate-800'}`}>
              ⏱ {timeLeft}s
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-sm font-medium text-slate-300">Score: <span className="font-mono text-emerald-400 font-bold text-lg ml-1">{score}</span></div>
              {streak > 1 && (
                <div className="text-sm bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30 animate-pulse font-bold">
                  🔥 {streak}
                </div>
              )}
            </div>
          </div>

          {/* Trivia Board */}
          <div className="w-full flex-1 flex flex-col justify-center mt-2">
            {!isGameOver ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 relative">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                    Question {currentQuestion + 1}
                  </div>
                  <div className="text-xs font-bold tracking-widest text-slate-600">
                    {quizData.length} TOTAL
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-slate-100 leading-snug min-h-[5rem]">
                  {quizData[currentQuestion].question}
                </h2>
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {quizData[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedAnswer || showNextButton} 
                      className={getButtonColor(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Next Question Bar */}
                {showNextButton && (
                  <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <button 
                        onClick={handleNextQuestion}
                        className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-blue-400 transition-all"
                      >
                        Next Question ➡️
                      </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl text-center space-y-6">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-black text-emerald-400 tracking-tight">Quiz Complete!</h2>
                <p className="text-lg text-slate-400">Your Final Score</p>
                <div className="text-5xl font-black text-white">{score} <span className="text-2xl text-slate-500">/ {quizData.length}</span></div>
                <button onClick={() => { restartGame(); setHasStartedTrivia(true); }} className="mt-6 w-full px-6 py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-lg">
                  Play Again
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* THE POP-UP PAYWALL MODAL */}
      {showPaywall && (
        <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-8 shadow-2xl w-full max-w-sm space-y-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
              <span className="text-2xl">⭐</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Great Job!</h2>
            <p className="text-slate-400 leading-relaxed">
              You've completed another 5 questions! Watch a quick ad to keep your streak alive and play the next set.
            </p>
            
            <div className="space-y-3 pt-4">
              <button 
                onClick={handleWatchAd}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 group"
              >
                <span className="group-hover:scale-110 transition-transform">▶️</span> Watch Ad to Continue
              </button>
              
              <button 
  onClick={() => setActiveTab("download")}
  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all"
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
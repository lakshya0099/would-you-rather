import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skull, Flame, Zap, Crown, Swords, Target, Trophy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Savage QuestionCard Component
const SavageQuestionCard = ({ question, optionA, optionB, onVote }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [battleMode, setBattleMode] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    setBattleMode(true);
    
    // Create battle particles
    const particleArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      type: Math.random() > 0.5 ? 'fire' : 'lightning'
    }));
    setParticles(particleArray);

    setTimeout(() => setBattleMode(false), 1000);
  }, [question]);

  const handleSavageVote = (option) => {
    // Epic battle sound effect simulation
    setBattleMode(true);
    setTimeout(() => {
      onVote(option);
      setBattleMode(false);
    }, 800);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Battle particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-3 h-3 ${
            particle.type === 'fire' ? 'text-orange-500' : 'text-yellow-400'
          } animate-float-savage opacity-80`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.type === 'fire' ? <Flame className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
        </div>
      ))}

      {/* Main battle arena */}
      <div className={`relative p-2 rounded-3xl bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-pulse-glow transition-all duration-700 ${
        battleMode ? 'shadow-2xl shadow-red-500/80 scale-105' : 'shadow-xl'
      }`}>
        
        <div className={`bg-black/90 backdrop-blur-sm rounded-3xl p-10 space-y-10 border-2 border-red-500/50 transition-all duration-700 ${
          isLoaded ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'
        }`}>
          
          {/* Savage header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Skull className="w-10 h-10 text-red-500 animate-bounce" />
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full shadow-lg animate-spin-slow border-4 border-yellow-400">
                <Swords className="w-10 h-10 text-white" />
              </div>
              <Skull className="w-10 h-10 text-red-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 leading-tight tracking-wide uppercase animate-text-glow">
              {question}
            </h2>
            
            <div className="flex justify-center">
              <div className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-white font-bold text-sm uppercase tracking-widest animate-pulse border-2 border-yellow-400">
                ⚔️ CHOOSE YOUR DESTINY ⚔️
              </div>
            </div>
          </div>

          {/* Battle arena divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-pulse"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-4 bg-black">
                <Target className="w-8 h-8 text-orange-500 animate-spin" />
              </div>
            </div>
          </div>

          {/* Savage battle options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Option A - Left warrior */}
            <div 
              className="group relative"
              onMouseEnter={() => setHoveredOption('A')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className={`absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-50 transition-all duration-500 ${
                hoveredOption === 'A' ? 'opacity-80 scale-110 animate-pulse' : ''
              }`}></div>
              
              <Button 
                className={`relative w-full text-xl px-10 py-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:to-purple-800 text-white font-black rounded-3xl shadow-2xl transition-all duration-300 transform border-4 border-cyan-400/50 ${
                  hoveredOption === 'A' ? 'scale-105 shadow-cyan-500/50 border-cyan-400' : 'hover:scale-102'
                } ${battleMode ? 'animate-shake' : ''}`}
                onClick={() => handleSavageVote("A")}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-black bg-cyan-400 text-black rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                      A
                    </div>
                    <Crown className="w-8 h-8 text-cyan-400 animate-bounce" />
                  </div>
                  
                  <span className="text-center leading-relaxed uppercase tracking-wide">
                    {optionA}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-2 h-8 bg-cyan-400 rounded animate-equalizer" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                </div>
                
                {/* Lightning effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform -skew-x-12 translate-x-full group-hover:animate-lightning rounded-3xl"></div>
              </Button>
            </div>

            {/* VS Battle indicator */}
            <div className="flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-lg animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-red-600 to-orange-600 text-white font-black text-2xl px-8 py-4 rounded-full shadow-2xl border-4 border-yellow-400 animate-bounce-battle">
                  ⚔️ VS ⚔️
                </div>
              </div>
            </div>

            {/* Option B - Right warrior */}
            <div 
              className="group relative"
              onMouseEnter={() => setHoveredOption('B')}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <div className={`absolute -inset-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl blur-xl opacity-50 transition-all duration-500 ${
                hoveredOption === 'B' ? 'opacity-80 scale-110 animate-pulse' : ''
              }`}></div>
              
              <Button 
                className={`relative w-full text-xl px-10 py-8 bg-gradient-to-br from-red-600 via-pink-600 to-rose-700 hover:from-red-700 hover:to-pink-800 text-white font-black rounded-3xl shadow-2xl transition-all duration-300 transform border-4 border-pink-400/50 ${
                  hoveredOption === 'B' ? 'scale-105 shadow-pink-500/50 border-pink-400' : 'hover:scale-102'
                } ${battleMode ? 'animate-shake' : ''}`}
                onClick={() => handleSavageVote("B")}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-black bg-pink-400 text-black rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                      B
                    </div>
                    <Flame className="w-8 h-8 text-pink-400 animate-bounce" />
                  </div>
                  
                  <span className="text-center leading-relaxed uppercase tracking-wide">
                    {optionB}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-2 h-8 bg-pink-400 rounded animate-equalizer" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                </div>
                
                {/* Fire effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent transform -skew-x-12 translate-x-full group-hover:animate-lightning rounded-3xl"></div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Savage App
function App() {
  const [questionData, setQuestionData] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create background battle particles
    const particles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1
    }));
    setBackgroundParticles(particles);

    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/question/generate");
      setQuestionData(res.data);
    } catch (err) {
      console.error("❌ Error fetching question:", err);
      setError("Failed to load battle question. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (option) => {
    setShowExplosion(true);
    setError(null);
    
    try {
      const res = await axios.post(
        `http://localhost:5000/api/question/vote/${questionData._id}`,
        { option }
      );
      
      // Simulate epic battle results with API data
      setTimeout(() => {
        setResults(res.data.percentages);
        setShowExplosion(false);
      }, 1500);
    } catch (err) {
      console.error("❌ Vote error:", err);
      setError("Battle failed! Could not register your vote.");
      setShowExplosion(false);
    }
  };

  const resetBattle = () => {
    setResults(null);
    setQuestionData(null);
    fetchQuestion();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-red-900 to-black relative overflow-hidden">
        <div className="text-center space-y-8">
          <div className="animate-spin-slow">
            <Swords className="w-24 h-24 text-red-500 mx-auto" />
          </div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse">
            LOADING BATTLE...
          </h1>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/50 to-black relative overflow-hidden">
      {/* Background battle particles */}
      {backgroundParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-red-500/20 animate-float-savage"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            fontSize: `${particle.size}rem`
          }}
        >
          ⚔️
        </div>
      ))}

      {/* Explosion overlay */}
      {showExplosion && (
        <div className="fixed inset-0 bg-gradient-to-r from-red-500/80 via-orange-500/80 to-yellow-500/80 animate-pulse z-50 flex items-center justify-center">
          <div className="text-8xl font-black text-white animate-bounce">💥 EPIC! 💥</div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-900/90 text-white px-6 py-3 rounded-xl shadow-2xl border-2 border-red-500 animate-shake">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5" />
              <span className="font-bold">{error}</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-6">
        {/* Savage header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Flame className="w-12 h-12 text-orange-500 animate-bounce" />
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-text-glow tracking-wider">
              WOULD YOU RATHER
            </h1>
            <Zap className="w-12 h-12 text-yellow-500 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
          <p className="text-2xl font-bold text-red-400 uppercase tracking-widest">
            ⚔️ BATTLE OF CHOICES ⚔️
          </p>
        </div>

        {/* Question or Results */}
        {questionData && !results && (
          <SavageQuestionCard
            question={questionData.question}
            optionA={questionData.optionA}
            optionB={questionData.optionB}
            onVote={handleVote}
          />
        )}

        {/* Epic Results */}
        {results && (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="p-8 bg-black/80 backdrop-blur-sm rounded-3xl border-4 border-yellow-400 shadow-2xl shadow-yellow-500/50">
              <div className="flex justify-center mb-6">
                <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
              </div>
              
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-8 uppercase">
                BATTLE RESULTS!
              </h2>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl border-2 border-cyan-400">
                  <div className="text-3xl font-black text-cyan-400 mb-2">OPTION A</div>
                  <div className="text-6xl font-black text-white">{results.optionA}</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl border-2 border-pink-400">
                  <div className="text-3xl font-black text-pink-400 mb-2">OPTION B</div>
                  <div className="text-6xl font-black text-white">{results.optionB}</div>
                </div>
              </div>
              
              <Button 
                onClick={resetBattle}
                className="mt-8 text-2xl px-12 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-4 border-green-400"
              >
                <RefreshCw className="w-6 h-6 mr-3" />
                NEW BATTLE!
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-savage {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px #ef4444, 0 0 40px #f97316, 0 0 60px #eab308; }
          50% { text-shadow: 0 0 10px #ef4444, 0 0 20px #f97316, 0 0 30px #eab308; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px #ef4444, 0 0 40px #f97316; }
          50% { box-shadow: 0 0 40px #ef4444, 0 0 80px #f97316; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-1deg); }
          75% { transform: translateX(5px) rotate(1deg); }
        }
        
        @keyframes lightning {
          0% { transform: translateX(-100%) skewX(-12deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%) skewX(-12deg); opacity: 0; }
        }
        
        @keyframes bounce-battle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes equalizer {
          0%, 100% { height: 2rem; }
          50% { height: 1rem; }
        }
        
        .animate-float-savage { animation: float-savage 4s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out infinite; }
        .animate-lightning { animation: lightning 1s ease-in-out; }
        .animate-bounce-battle { animation: bounce-battle 1s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-equalizer { animation: equalizer 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default App;
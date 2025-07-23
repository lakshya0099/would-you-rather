import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, Trophy, Timer, ArrowRight } from 'lucide-react';

const QuestionCard = ({ question, optionA, optionB, onVote }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Create floating sparkles
    const sparkleArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
    setSparkles(sparkleArray);

    // Periodic pulse effect
    const pulseInterval = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 600);
    }, 4000);

    return () => clearInterval(pulseInterval);
  }, [question]);

  const handleVote = (option) => {
    // Create ripple effect before voting
    const ripple = document.createElement('div');
    ripple.className = 'absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-30 animate-ping';
    
    setTimeout(() => {
      onVote(option);
    }, 200);
  };

  return (
    <div className="relative max-w-2xl mx-auto p-1 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient-x">
      {/* Floating sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-70 animate-float"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`
          }}
        >
          <Sparkles className="w-2 h-2" />
        </div>
      ))}

      <div className={`relative bg-white rounded-3xl p-8 space-y-8 transition-all duration-700 ${
        isLoaded ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'
      } ${pulseEffect ? 'shadow-2xl shadow-purple-500/50' : 'shadow-xl'}`}>
        
        {/* Header with icon */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg animate-bounce-slow">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          
          <h2 className={`text-3xl font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent leading-tight transition-all duration-500 ${
            isLoaded ? 'transform translate-y-0' : 'transform translate-y-4'
          }`}>
            {question}
          </h2>
        </div>

        {/* Animated divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white">
              <Zap className="w-6 h-6 text-purple-500 animate-pulse" />
            </span>
          </div>
        </div>

        {/* Interactive options */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* Option A */}
          <div 
            className="group relative"
            onMouseEnter={() => setHoveredOption('A')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-30 transition-all duration-300 ${
              hoveredOption === 'A' ? 'opacity-70 scale-110' : ''
            }`}></div>
            
            <Button 
              className={`relative text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform ${
                hoveredOption === 'A' ? 'scale-105 shadow-2xl' : 'hover:scale-102'
              } group-hover:animate-wiggle`}
              onClick={() => handleVote("A")}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl font-bold bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">A</span>
                {optionA}
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                  hoveredOption === 'A' ? 'translate-x-1' : ''
                }`} />
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:animate-shimmer rounded-2xl"></div>
            </Button>
          </div>

          {/* VS indicator */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg animate-pulse">
              VS
            </div>
          </div>

          {/* Option B */}
          <div 
            className="group relative"
            onMouseEnter={() => setHoveredOption('B')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl blur-lg opacity-30 transition-all duration-300 ${
              hoveredOption === 'B' ? 'opacity-70 scale-110' : ''
            }`}></div>
            
            <Button 
              className={`relative text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform ${
                hoveredOption === 'B' ? 'scale-105 shadow-2xl' : 'hover:scale-102'
              } group-hover:animate-wiggle`}
              onClick={() => handleVote("B")}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl font-bold bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">B</span>
                {optionB}
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                  hoveredOption === 'B' ? 'translate-x-1' : ''
                }`} />
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:animate-shimmer rounded-2xl"></div>
            </Button>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center pt-4">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 0.3s ease-in-out;
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QuestionCard;
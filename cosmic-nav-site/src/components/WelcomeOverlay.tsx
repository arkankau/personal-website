import { useState, useEffect } from "react";

export const WelcomeOverlay = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071e57]/95 backdrop-blur-sm animate-fade-in pointer-events-none">
      <div className="text-center space-y-6 animate-float">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full animate-twinkle" style={{ backgroundColor: '#f0cd55' }} />
          <div className="w-2 h-2 rounded-full animate-twinkle" style={{ backgroundColor: '#c9900b', animationDelay: "0.5s" }} />
          <div className="w-3 h-3 rounded-full animate-twinkle" style={{ backgroundColor: '#f0cd55', animationDelay: "1s" }} />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold" style={{ color: '#f0cd55' }}>
          Welcome to Arkan's Universe
        </h1>
        <p className="text-xl animate-fade-in" style={{ color: '#c9900b', animationDelay: "0.5s" }}>
          Click the stars to explore my journey
        </p>
      </div>
    </div>
  );
};

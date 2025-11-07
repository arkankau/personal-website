import { useState } from "react";
import { StarCanvas } from "@/components/StarCanvas";
import { StarModal } from "@/components/StarModal";
import { Navigation } from "@/components/Navigation";
import { WelcomeOverlay } from "@/components/WelcomeOverlay";
import { ConstellationData, StarData } from "@/components/constellations";

const Index = () => {
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null);
  const [selectedConstellation, setSelectedConstellation] = useState<ConstellationData | null>(null);

  const handleStarClick = (star: StarData, constellation: ConstellationData) => {
    setSelectedStar(star);
    setSelectedConstellation(constellation);
  };

  const handleClose = () => {
    setSelectedStar(null);
    setSelectedConstellation(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WelcomeOverlay />
      <Navigation />
      <StarCanvas onStarClick={handleStarClick} />
      <StarModal star={selectedStar} constellation={selectedConstellation} onClose={handleClose} />
      
      {/* Controls hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-full px-6 py-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Click</span> stars to explore • <span className="font-medium text-foreground">Drag</span> to pan • <span className="font-medium text-foreground">Scroll</span> to zoom
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useEffect, useRef, useState } from "react";
import { ConstellationData, constellations, StarData } from "./constellations";

interface StarCanvasProps {
  onStarClick: (star: StarData, constellation: ConstellationData) => void;
}

interface BackgroundStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Camera {
  x: number;
  y: number;
  zoom: number;
  rotation: number;
}

// Add twinkle properties to StarData
interface TwinklingStarData extends StarData {
  twinkleInterval: number;
  lastTwinkle: number;
  isVisible: boolean;
}

// Add movement properties to ConstellationData
interface MovingConstellationData extends Omit<ConstellationData, "stars"> {
  stars: TwinklingStarData[];
  oscillationAngle: number;
  oscillationAmplitude: number;
  oscillationSpeed: number;
  oscillationPhase: number;
}

export const StarCanvas = ({ onStarClick }: StarCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [backgroundStars, setBackgroundStars] = useState<BackgroundStar[]>([]);
  const [processedConstellations, setProcessedConstellations] = useState<MovingConstellationData[]>([]);
  const hoveredStarRef = useRef<{ constellation: ConstellationData; star: StarData } | null>(null);
  const cameraRef = useRef<Camera>({ x: 0, y: 0, zoom: 1, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const targetCameraRef = useRef<Camera>({ x: 0, y: 0, zoom: 1, rotation: 0 });
  const constellationOffsetsRef = useRef<Map<string, { x: number; y: number }>>(new Map());
  const constellationStateRef = useRef<MovingConstellationData[]>([]);

  useEffect(() => {
    // Process constellations to add random twinkle and movement data
    const constellationsWithEffects = constellations.map((constellation) => ({
      ...constellation,
      stars: constellation.stars.map((star) => ({
        ...star,
        twinkleInterval: Math.random() * 100 + 50, // Random blip interval (50-150 frames)
        lastTwinkle: Math.random() * 100, // Random start time
        isVisible: true, // Track if star is visible
      })),
      oscillationAngle: Math.random() * Math.PI * 2, // Random direction
      oscillationAmplitude: Math.random() * 0.03 + 0.02, // Oscillation range (0.02-0.05 = 2%-5% of screen)
      oscillationSpeed: Math.random() * 0.003 + 0.002, // Slow oscillation speed (0.002-0.005)
      oscillationPhase: Math.random() * Math.PI * 2, // Random starting phase
    }));
    setProcessedConstellations(constellationsWithEffects);
    constellationStateRef.current = constellationsWithEffects;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle keyboard rotation
    const handleKeyDown = (e: KeyboardEvent) => {
      const rotationSpeed = 0.05; // radians per key press
      
      if (e.key === 'q' || e.key === 'Q') {
        // Rotate counter-clockwise
        targetCameraRef.current = {
          ...targetCameraRef.current,
          rotation: targetCameraRef.current.rotation - rotationSpeed,
        };
      } else if (e.key === 'e' || e.key === 'E') {
        // Rotate clockwise
        targetCameraRef.current = {
          ...targetCameraRef.current,
          rotation: targetCameraRef.current.rotation + rotationSpeed,
        };
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Add wheel event listener with passive: false to allow preventDefault
    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      targetCameraRef.current = {
        ...targetCameraRef.current,
        zoom: Math.max(0.5, Math.min(3, targetCameraRef.current.zoom * zoomFactor)),
      };
    };
    canvas.addEventListener('wheel', handleWheelEvent, { passive: false });

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeBackgroundStars();
    };

    const initializeBackgroundStars = () => {
      const stars: BackgroundStar[] = [];
      for (let i = 0; i < 300; i++) {
        stars.push({
          x: Math.random() * 2 - 0.5,
          y: Math.random() * 2 - 0.5,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
      setBackgroundStars(stars);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('wheel', handleWheelEvent);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || backgroundStars.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;

    const lerp = (start: number, end: number, t: number) => {
      return start + (end - start) * t;
    };

    const animate = () => {
      // Smooth camera interpolation using ref (NO setState!)
      cameraRef.current = {
        x: lerp(cameraRef.current.x, targetCameraRef.current.x, 0.1),
        y: lerp(cameraRef.current.y, targetCameraRef.current.y, 0.1),
        zoom: lerp(cameraRef.current.zoom, targetCameraRef.current.zoom, 0.1),
        rotation: lerp(cameraRef.current.rotation, targetCameraRef.current.rotation, 0.1),
      };

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      ctx.save();
      
      // Apply camera transforms
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(cameraRef.current.rotation);
      ctx.scale(cameraRef.current.zoom, cameraRef.current.zoom);
      ctx.translate(-canvas.width / 2 + cameraRef.current.x, -canvas.height / 2 + cameraRef.current.y);

      // Draw background stars
      backgroundStars.forEach((star) => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;

        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;

        const x = star.x * canvas.width;
        const y = star.y * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Update constellation positions (OSCILLATING around equilibrium) ---
      constellationStateRef.current = constellationStateRef.current.map(constellation => {
        // Calculate oscillation offset (swaying back and forth)
        const oscillationValue = Math.sin(frame * constellation.oscillationSpeed + constellation.oscillationPhase) * constellation.oscillationAmplitude;
        const offsetX = Math.cos(constellation.oscillationAngle) * oscillationValue;
        const offsetY = Math.sin(constellation.oscillationAngle) * oscillationValue;
        
        // Update star visibility for random twinkle (BLIP ON/OFF)
        const updatedStars = constellation.stars.map(star => {
          if (frame - star.lastTwinkle > star.twinkleInterval) {
            const newIsVisible = (frame - star.lastTwinkle - star.twinkleInterval) > 3;
            const shouldReset = (frame - star.lastTwinkle - star.twinkleInterval) > 5;
            
            return {
              ...star,
              isVisible: newIsVisible,
              lastTwinkle: shouldReset ? frame : star.lastTwinkle,
            };
          }
          return star;
        });
        
        constellationOffsetsRef.current.set(constellation.id, { x: offsetX, y: offsetY });
        
        return {
          ...constellation,
          stars: updatedStars,
        };
      });

      // Draw constellation lines (use ref for current state)
      constellationStateRef.current.forEach((constellation) => {
        const offset = constellationOffsetsRef.current.get(constellation.id) || { x: 0, y: 0 };
        const isHovered = hoveredStarRef.current?.constellation.id === constellation.id;
        ctx.strokeStyle = isHovered ? "#f0cd55" : "#c9900b";
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.shadowBlur = 0;

        constellation.connections.forEach(([from, to]) => {
          const starFrom = constellation.stars[from];
          const starTo = constellation.stars[to];

          ctx.beginPath();
          ctx.moveTo((starFrom.x + offset.x) * canvas.width, (starFrom.y + offset.y) * canvas.height);
          ctx.lineTo((starTo.x + offset.x) * canvas.width, (starTo.y + offset.y) * canvas.height);
          ctx.stroke();
        });
      });

      // Draw constellation stars (use ref for current state)
      constellationStateRef.current.forEach((constellation) => {
        const offset = constellationOffsetsRef.current.get(constellation.id) || { x: 0, y: 0 };
        const isConstellationHovered = hoveredStarRef.current?.constellation.id === constellation.id;

        constellation.stars.forEach((star) => {
          // SKIP rendering if star is twinkling (BLIPPED OFF)
          if (!star.isVisible) return;
          
          const isStarHovered = hoveredStarRef.current?.star === star;

          // Luminance (glow) only when constellation is hovered
          if (isConstellationHovered) {
            ctx.shadowBlur = isStarHovered ? 30 : 18;
            ctx.shadowColor = `hsl(${constellation.color})`;
          } else {
            ctx.shadowBlur = 0;
          }

          // Stars are colored by constellation, full brightness
          ctx.fillStyle = `hsl(${constellation.color})`;

          const x = (star.x + offset.x) * canvas.width;
          const y = (star.y + offset.y) * canvas.height;
          const size = star.magnitude * (isStarHovered ? 1.5 : 1);

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Draw star name on hover
          if (isStarHovered) {
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#ffffff";
            ctx.font = "14px Poppins, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(star.name, x, y - size - 10);
          }
        });
      });

      // Draw constellation category labels (use ref for current state)
      constellationStateRef.current.forEach((constellation) => {
        const offset = constellationOffsetsRef.current.get(constellation.id) || { x: 0, y: 0 };
        const centerX = constellation.stars.reduce((sum, star) => sum + star.x, 0) / constellation.stars.length;
        const centerY = constellation.stars.reduce((sum, star) => sum + star.y, 0) / constellation.stars.length;

        const labelX = (centerX + offset.x) * canvas.width;
        const labelY = (centerY + offset.y) * canvas.height + 60; // Offset below constellation center

        ctx.font = "bold 20px Poppins, sans-serif";
        ctx.fillStyle = "#f0cd55";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowBlur = 0;

        ctx.fillText(constellation.category.toUpperCase(), labelX, labelY);
      });

      ctx.restore();
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [backgroundStars, processedConstellations]);

  const worldToScreen = (worldX: number, worldY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Match the transform chain from rendering:
    // ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.rotate(camera.rotation);
    // ctx.scale(camera.zoom, camera.zoom);
    // ctx.translate(-canvas.width / 2 + camera.x, -canvas.height / 2 + camera.y);

    let x = worldX;
    let y = worldY;

    // Apply translation
    x = x + cameraRef.current.x;
    y = y + cameraRef.current.y;

    // Center for rotation
    x -= centerX;
    y -= centerY;

    // Apply rotation
    const cos = Math.cos(cameraRef.current.rotation);
    const sin = Math.sin(cameraRef.current.rotation);
    const rotatedX = x * cos - y * sin;
    const rotatedY = x * sin + y * cos;

    // Apply zoom
    x = rotatedX * cameraRef.current.zoom;
    y = rotatedY * cameraRef.current.zoom;

    // Translate back to screen
    x += centerX;
    y += centerY;

    return { x, y };
  };

  const screenToWorld = (screenX: number, screenY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let x = screenX;
    let y = screenY;

    // Reverse the transform chain (inverse of rendering)
    // 1. Undo screen translation
    x -= centerX;
    y -= centerY;

    // 2. Undo zoom
    x /= cameraRef.current.zoom;
    y /= cameraRef.current.zoom;

    // 3. Undo rotation
    const cos = Math.cos(-cameraRef.current.rotation);
    const sin = Math.sin(-cameraRef.current.rotation);
    const rotatedX = x * cos - y * sin;
    const rotatedY = x * sin + y * cos;

    x = rotatedX;
    y = rotatedY;

    // 4. Recenter
    x += centerX;
    y += centerY;

    // 5. Undo camera translation
    x -= cameraRef.current.x;
    y -= cameraRef.current.y;

    return { x, y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      // Rotate the delta by the inverse of camera rotation to match visual direction
      const cos = Math.cos(-cameraRef.current.rotation);
      const sin = Math.sin(-cameraRef.current.rotation);
      const rotatedDeltaX = deltaX * cos - deltaY * sin;
      const rotatedDeltaY = deltaX * sin + deltaY * cos;
      
      targetCameraRef.current = {
        ...targetCameraRef.current,
        x: targetCameraRef.current.x + rotatedDeltaX,
        y: targetCameraRef.current.y + rotatedDeltaY,
      };
      
      setDragStart({ x: e.clientX, y: e.clientY });
      return;
    }

    const worldPos = screenToWorld(canvasX, canvasY);
    const worldX = worldPos.x / canvas.width;
    const worldY = worldPos.y / canvas.height;

    let found: { constellation: ConstellationData; star: StarData } | null = null;

    for (const constellation of constellationStateRef.current) {
      const offset = constellationOffsetsRef.current.get(constellation.id) || { x: 0, y: 0 };
      for (const star of constellation.stars) {
        const starWorldX = star.x + offset.x;
        const starWorldY = star.y + offset.y;
        const dx = Math.abs(starWorldX - worldX);
        const dy = Math.abs(starWorldY - worldY);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 0.02 / cameraRef.current.zoom) {
          found = { constellation, star };
          break;
        }
      }
      if (found) break;
    }

    hoveredStarRef.current = found;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!hoveredStarRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Smooth camera movement to star (center it, keep current rotation)
    targetCameraRef.current = {
      x: -(hoveredStarRef.current.star.x * canvas.width - centerX),
      y: -(hoveredStarRef.current.star.y * canvas.height - centerY),
      zoom: 1.5,
      rotation: targetCameraRef.current.rotation, // Keep current rotation!
    };

    onStarClick(hoveredStarRef.current.star, hoveredStarRef.current.constellation);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      className="fixed inset-0 cursor-grab active:cursor-grabbing"
    />
  );
};

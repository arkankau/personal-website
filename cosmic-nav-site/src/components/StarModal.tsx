import { X, Image as ImageIcon } from "lucide-react";
import { ConstellationData, StarData } from "./constellations";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface StarModalProps {
  star: StarData | null;
  constellation: ConstellationData | null;
  onClose: () => void;
}

export const StarModal = ({ star, constellation, onClose }: StarModalProps) => {
  if (!star || !constellation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071e57]/80 backdrop-blur-sm animate-fade-in">
      <Card
        className="w-full max-w-2xl border-2 relative animate-fade-in text-[#ffffff] bg-[#071e57]"
        style={{
          borderColor: "#c9900b",
          boxShadow: `0 0 30px #c9900b55`,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#ffffff] hover:bg-[#ffffff]/10 z-10"
        >
          <X className="h-5 w-5" />
        </Button>

        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#f0cd55" }}
            />
            <CardDescription className="text-sm font-medium tracking-wide uppercase" style={{ color: '#c9900b' }}>
              {constellation.name} • {constellation.category}
            </CardDescription>
          </div>
          <div className="flex items-baseline gap-3">
            <CardTitle className="text-4xl font-bold text-[#f0cd55]">{star.name}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg bg-[#ffffff]/5" style={{ borderColor: '#c9900b' }}>
              <div className="text-center text-[#ffffff]/50">
                <ImageIcon className="mx-auto h-12 w-12" />
                <p className="mt-2 text-sm font-semibold">Image Placeholder</p>
              </div>
            </div>
            <div className="space-y-4">
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: `#f0cd5533`,
                  color: `#f0cd55`,
                }}
              >
                {star.content.title}
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: '#f0cd55' }}>
                {star.content.subtitle}
              </h3>
              <p className="text-lg text-[#ffffff] leading-relaxed">
                {star.content.description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: "#c9900b" }}>
            <p className="text-sm" style={{ color: '#c9900b' }}>
              Part of the <span className="font-semibold" style={{ color: '#ffffff' }}>{constellation.name}</span> constellation in the{" "}
              <span className="font-semibold" style={{ color: '#ffffff' }}>{constellation.category}</span> sector
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

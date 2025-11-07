import { X, Image as ImageIcon, Mail, Linkedin, Instagram, Phone, ExternalLink } from "lucide-react";
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

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'mail':
        return <Mail className="h-16 w-16" />;
      case 'linkedin':
        return <Linkedin className="h-16 w-16" />;
      case 'instagram':
        return <Instagram className="h-16 w-16" />;
      case 'phone':
        return <Phone className="h-16 w-16" />;
      default:
        return <ImageIcon className="h-12 w-12" />;
    }
  };

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
          <div className={`grid gap-6 ${star.hideImage ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
            {!star.hideImage && (
              <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg bg-[#ffffff]/5" style={{ borderColor: '#c9900b' }}>
                <div className="text-center" style={{ color: star.icon ? '#f0cd55' : '#ffffff50' }}>
                  {getIcon(star.icon)}
                  {!star.icon && <p className="mt-2 text-sm font-semibold">Image Placeholder</p>}
                </div>
              </div>
            )}
            <div className={`space-y-4 ${star.hideImage ? 'flex flex-col items-center text-center' : ''}`}>
              {star.icon && (
                <div className="flex justify-center mb-4" style={{ color: '#f0cd55' }}>
                  {getIcon(star.icon)}
                </div>
              )}
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
              {star.link && (
                <a
                  href={star.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{
                    backgroundColor: '#c9900b',
                    color: '#ffffff',
                  }}
                >
                  <span>Connect Now</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
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

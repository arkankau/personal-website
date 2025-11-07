import { constellations } from "./constellations";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 p-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold pointer-events-auto" style={{ color: '#f0cd55' }}>
          Arkan Fadhil Kautsar
        </h1>
        <div className="flex gap-6 pointer-events-auto">
          {constellations.map((constellation) => (
            <div
              key={constellation.id}
              className="group relative flex items-center gap-2"
            >
              <div
                className="w-2 h-2 rounded-full animate-twinkle"
                style={{ backgroundColor: "#c9900b" }}
              />
              <span className="text-sm font-medium" style={{ color: '#ffffff' }}>
                {constellation.category}
              </span>
              <div
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
                style={{
                  backgroundColor: `rgba(240, 205, 85, 0.2)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

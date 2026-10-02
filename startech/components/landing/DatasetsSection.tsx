import React from "react";
import { Database, Radio, Satellite, ShieldCheck } from "lucide-react";

export const DatasetsSection: React.FC = () => {
  const missions = [
    {
      mission: "CHANDRAYAAN-2",
      agency: "ISRO // INDIA",
      instruments: [
        {
          name: "OHRC",
          desc: "Orbiter High Resolution Camera",
          res: "0.25 m/pixel",
          type: "Panchromatic (Sub-meter)",
        },
        {
          name: "TMC-2",
          desc: "Terrain Mapping Camera-2",
          res: "5.0 m/pixel",
          type: "Stereo 3D Topography",
        },
        {
          name: "IIRS",
          desc: "Imaging Infrared Spectrometer",
          res: "20.0 m/pixel",
          type: "Hyperspectral Mineralogy",
        },
      ],
      color: "border-cyan/40",
      accent: "text-cyan",
    },
    {
      mission: "LUNAR RECONNAISSANCE ORBITER",
      agency: "NASA // USA",
      instruments: [
        {
          name: "LRO NAC",
          desc: "Narrow Angle Camera",
          res: "0.50 m/pixel",
          type: "Panchromatic Pushbroom",
        },
        {
          name: "LRO WAC",
          desc: "Wide Angle Camera",
          res: "100 m/pixel",
          type: "Global Multispectral",
        },
      ],
      color: "border-orbital/40",
      accent: "text-orbital",
    },
    {
      mission: "SELENE (KAGUYA)",
      agency: "JAXA // JAPAN",
      instruments: [
        {
          name: "SELENE TC",
          desc: "Terrain Camera",
          res: "10.0 m/pixel",
          type: "Stereo Panchromatic",
        },
        {
          name: "MI",
          desc: "Multiband Imager",
          res: "20.0 m/pixel",
          type: "Visible & Near-IR",
        },
      ],
      color: "border-success/40",
      accent: "text-success",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-panel-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orbital/10 text-orbital border border-orbital/30 font-mono text-xs mb-4">
            <Satellite className="w-3.5 h-3.5" />
            <span>CROSS-MISSION DATASET COMPATIBILITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold text-foreground tracking-tight mb-4">
            SUPPORTED LUNAR MISSIONS
          </h2>
          <p className="text-muted text-base sm:text-lg">
            Engineered to bridge observational discrepancies across primary orbital missions and scientific payloads.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missions.map((m, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg bg-panel border ${m.color} relative reticle-corner shadow-lg flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-muted tracking-widest">{m.agency}</span>
                  <Radio className={`w-4 h-4 ${m.accent}`} />
                </div>
                <h3 className="font-mono text-lg font-bold text-foreground mb-4">
                  {m.mission}
                </h3>

                <div className="space-y-3">
                  {m.instruments.map((inst, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3 rounded bg-surface-dark/90 border border-panel-border/80"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-sm font-semibold ${m.accent}`}>
                          {inst.name}
                        </span>
                        <span className="font-mono text-xs text-foreground bg-panel px-2 py-0.5 rounded border border-panel-border">
                          {inst.res}
                        </span>
                      </div>
                      <div className="text-xs text-muted mt-1">{inst.desc}</div>
                      <div className="text-[10px] font-mono text-cyan/70 mt-1">{inst.type}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-panel-border flex items-center justify-between text-[11px] font-mono text-muted">
                <span>FORMAT: PDS4 / GeoTIFF</span>
                <span className="text-success">READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

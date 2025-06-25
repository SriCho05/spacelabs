"use client";

import Navbar from "../../components/Navbar";
import DotGrid from "../../components/DotGrid";
import LetterGlitch from "../../components/LetterGlitch";
import CircularHierarchy from "../../components/CircularHierarchy";

export default function SpectraAIPage() {
  // Custom nav handler for correct homepage hash navigation
  const handleNavLinkClick = (id: string) => {
    if (id === "hero") {
      window.location.href = "/#hero";
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Labs background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <DotGrid
          dotSize={14}
          gap={12}
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      <Navbar
        theme="dark"
        toggleTheme={() => {}}
        onNavLinkClick={handleNavLinkClick}
      />
      <main className="flex flex-col items-center justify-center py-24 px-4 relative z-10">
        <img src="/images/AI.png" alt="SpectraAI" className="w-32 h-32 mb-6" />
        <h1 className="font-orbitron text-4xl mb-4 text-techblue">
          SpectraAI
        </h1>
        <p className="font-spacegrotesk text-lg max-w-2xl text-center mb-8">
          AI-powered multisensor insights.
        </p>
        <section className="w-full max-w-3xl bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
          <h2 className="font-orbitron text-2xl text-neongreen mb-2">
            SpectraAI – The Core Intelligence Behind SAFE
          </h2>
          <div className="flex flex-col items-center justify-center mb-8">
            <CircularHierarchy />
          </div>
          <p className="font-spacegrotesk text-base text-light/90 mb-4">
            SpectraAI fuses multisensor inputs with domain-specific AI to power
            real-time insights across infrastructure, energy, and agriculture.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="font-rajdhani text-xl text-techblue mb-2">
                Capabilities:
              </h3>
              <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                <li>Fusion of RGB, thermal, multispectral, hyperspectral data</li>
                <li>Real-time object, anomaly, and defect detection</li>
                <li>ESG-compliant MRV reporting (Verra, Gold Standard)</li>
                <li>Deployable via edge devices or cloud AI</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="font-rajdhani text-xl text-techblue mb-2">
                Use Cases:
              </h3>
              <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                <li>Vegetation and carbon monitoring</li>
                <li>Infrastructure defect analytics</li>
                <li>Remote equipment and process validation</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Add more detailed content here as needed */}
      </main>
    </div>
  );
}

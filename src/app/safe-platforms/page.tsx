"use client";

import Navbar from "../../components/Navbar";
import DotGrid from "../../components/DotGrid";
import LetterGlitch from "../../components/LetterGlitch";

export default function SafePlatformsPage() {
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
        <img
          src="/images/aero.png"
          alt="SAFE Platforms"
          className="w-32 h-32 mb-6"
        />
        <h1 className="font-orbitron text-4xl mb-4 text-techblue">
          SAFE Platforms
        </h1>
        <p className="font-spacegrotesk text-lg max-w-2xl text-center mb-8">
          Infra, Agri, and Energy solutions.
        </p>
        <section className="w-full max-w-3xl bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
          <h2 className="font-orbitron text-2xl text-neongreen mb-2">
            The SAFE Platform Suite
          </h2>
          <p className="font-spacegrotesk text-base text-light/90 mb-4">
            The SAFE Platform Suite delivers specialized solutions for three
            mission-critical domains: Infrastructure, Agriculture, and Energy.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="font-rajdhani text-xl text-techblue mb-2">
                BuildSafe – Infrastructure Monitoring
              </h3>
              <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                <li>Drone + SLAM-based progress analytics</li>
                <li>Gantt chart integration</li>
                <li>Digital twin generation</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="font-rajdhani text-xl text-techblue mb-2">
                PlantSafe – Precision Agriculture
              </h3>
              <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                <li>Multispectral/hyperspectral crop analysis</li>
                <li>ESG carbon reporting and soil analytics</li>
                <li>Plantation growth stage mapping</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="font-rajdhani text-xl text-techblue mb-2">
                PowerSafe – Energy Asset Intelligence
              </h3>
              <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                <li>
                  Inspection of solar panels, wind turbines, and powerlines
                </li>
                <li>AI-based fault and defect detection</li>
                <li>Predictive maintenance and asset lifecycle management</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="#safe-suite-details"
              className="font-bold font-rajdhani text-lg text-neongreen hover:text-white transition-colors"
            >
              Learn More About the SAFE Suite →
            </a>
          </div>
        </section>
        {/* Add more detailed content here as needed */}
      </main>
    </div>
  );
}

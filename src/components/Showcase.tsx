"use client";
import React from 'react';
import StarBorder from './StarBorder'; // Import StarBorder

const showcaseData = [
  {
    id: "safe-platforms",
    title: "SAFE Platforms",
    overview: "The SAFE Platform Suite delivers specialized solutions for three mission-critical domains: Infrastructure, Agriculture, and Energy.",
    subSections: [
      {
        title: "BuildSafe – Infrastructure Monitoring",
        points: ["Drone + SLAM-based progress analytics", "Gantt chart integration", "Digital twin generation"],
      },
      {
        title: "PlantSafe – Precision Agriculture",
        points: ["Multispectral/hyperspectral crop analysis", "ESG carbon reporting and soil analytics", "Plantation growth stage mapping"],
      },
      {
        title: "PowerSafe – Energy Asset Intelligence",
        points: ["Inspection of solar panels, wind turbines, and powerlines", "AI-based fault and defect detection", "Predictive maintenance and asset lifecycle management"],
      },
    ],
    cta: { text: "Learn More About the SAFE Suite →", href: "#safe-suite-details" }
  },
  {
    id: "spectra-ai",
    title: "SpectraAI",
    headline: "SpectraAI – The Core Intelligence Behind SAFE",
    subtext: "SpectraAI fuses multisensor inputs with domain-specific AI to power real-time insights across infrastructure, energy, and agriculture.",
    capabilities: [
      "Fusion of RGB, thermal, multispectral, hyperspectral data",
      "Real-time object, anomaly, and defect detection",
      "ESG-compliant MRV reporting (Verra, Gold Standard)",
      "Deployable via edge devices or cloud AI"
    ],
    useCases: [
      "Vegetation and carbon monitoring",
      "Infrastructure defect analytics",
      "Remote equipment and process validation"
    ],
  },
  {
    id: "avian-pilot",
    title: "AvianPilot",
    headline: "AvianPilot – Drone Workforce Platform",
    subtext: "Match the right drone pilot to the right job — based on skill, location, and asset type.",
    features: [
      "Global pilot network with rating and certification filters",
      "Mission assignment and tracking dashboard",
      "Built-in service and equipment asset pooling"
    ],
    forWhom: [
      "Drone service providers",
      "EPC contractors and OEMs",
      "Industrial clients with repeat drone needs"
    ],
    cta: { text: "Join the AvianPilot Network →", href: "#join-avian-pilot" }
  }
];

const Showcase = () => {
  return (
    <section
      id="showcase"
      className="snap-center flex-shrink-0 w-screen bg-[#0a0a0a] text-light relative pt-24 pb-8 px-8"
    >
      <div className="max-w-6xl mx-auto">
        {showcaseData.map((section) => (
          <div key={section.id} className="mb-12 bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl group hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-neongreen)] transition-transform duration-300">
            <h2 className="font-orbitron text-3xl mb-4 text-neongreen drop-shadow text-center">{section.title || section.headline}</h2>
            {section.overview && <p className="font-spacegrotesk text-lg text-light/90 mb-4 text-center">{section.overview}</p>}
            {section.subtext && <p className="font-spacegrotesk text-lg text-light/90 mb-4 text-center">{section.subtext}</p>}

            {section.subSections && (
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {section.subSections.map(sub => (
                  <div key={sub.title} className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="font-rajdhani text-xl text-techblue mb-2">{sub.title}</h3>
                    <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                      {sub.points.map(point => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {(section.capabilities || section.useCases || section.features || section.forWhom) && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {section.capabilities && (
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="font-rajdhani text-xl text-techblue mb-2">Capabilities:</h3>
                    <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                      {section.capabilities.map(cap => <li key={cap}>{cap}</li>)}
                    </ul>
                  </div>
                )}
                {section.useCases && (
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="font-rajdhani text-xl text-techblue mb-2">Use Cases:</h3>
                    <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                      {section.useCases.map(useCase => <li key={useCase}>{useCase}</li>)}
                    </ul>
                  </div>
                )}
                {section.features && (
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="font-rajdhani text-xl text-techblue mb-2">Features:</h3>
                    <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                      {section.features.map(feat => <li key={feat}>{feat}</li>)}
                    </ul>
                  </div>
                )}
                {section.forWhom && (
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="font-rajdhani text-xl text-techblue mb-2">For:</h3>
                    <ul className="list-disc list-inside font-spacegrotesk text-base text-light/80 space-y-1">
                      {section.forWhom.map(fw => <li key={fw}>{fw}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {section.cta && (
              <div className="text-center mt-8">
                <StarBorder
                  href={section.cta.href}
                  as="a"
                  color="var(--color-techblue)" // Or your preferred color hex code
                  speed="5s"
                  className="group" // For potential inner hover effects
                >
                  <span className="font-bold font-rajdhani text-lg text-neongreen group-hover:text-white transition-colors">
                    {section.cta.text}
                  </span>
                </StarBorder>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Showcase;

import React from 'react';
import Beams from './Beams';

const About = () => (
  <section id="about" className="snap-center flex-shrink-0 w-full h-screen flex items-center justify-center bg-[#10101a] text-light relative overflow-hidden">
    {/* Beams background - now fills the section */}
    <div className="absolute inset-0 w-full h-full z-0">
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={12}
        lightColor="#87ceeb"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={45}
      />
    </div>
    <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row gap-8 px-6 text-center">
      <div className="flex-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 shadow-xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_var(--color-neongreen)]">
        <h2 className="font-rajdhani text-3xl md:text-4xl mb-4 text-neongreen drop-shadow font-bold">Who We Are:</h2>
        <p className="font-spacegrotesk text-lg md:text-xl text-light/80 leading-relaxed">
          Spacelabs is the AI and software innovation division of BirdScale Technologies. We build
          platforms that help teams across sectors act on geospatial and real-world data — faster,
          smarter, and more sustainably.
        </p>
      </div>
      <div className="flex-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 shadow-xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_var(--color-neongreen)]">
        <h2 className="font-rajdhani text-3xl md:text-4xl mb-4 text-neongreen drop-shadow font-bold">Our Mission:</h2>
        <p className="font-spacegrotesk text-lg md:text-xl text-light/80 leading-relaxed">
          To bring edge-ready intelligence into everyday operations — from farms to factories.
        </p>
      </div>
    </div>
  </section>
);

export default About;

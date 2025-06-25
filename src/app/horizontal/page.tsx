"use client";

import React from "react";
import HorizontalLayout, { Section } from "@/components/HorizontalLayout";
import SpaceBg from "@/components/SpaceBg";
import SpectraAI from "@/components/CircularHierarchy";
import GradientText from "@/components/GradientText";

// Define section IDs
const sectionIds = ["home", "about", "spectra", "products", "contact"];

export default function HomePage() {
  return (
    <>
      <SpaceBg />
      
      <HorizontalLayout sectionIds={sectionIds}>
        {/* Home Section */}
        <Section id="home" className="bg-gradient-to-r from-black to-black/80">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-6xl md:text-8xl font-orbitron tracking-widest mb-6 text-white">
              SPACE<span className="text-techblue">LABS</span>
            </h1>
            <p className="text-xl font-spacegrotesk text-white/70 max-w-2xl mb-12">
              Where innovation meets orbit. Pushing the boundaries of what's possible in space technology.
            </p>
            <div className="flex gap-6">
              <button className="px-8 py-3 border-2 border-techblue text-techblue font-orbitron tracking-wider rounded-md hover:bg-techblue/10 transition-all duration-300">
                EXPLORE
              </button>
              <button className="px-8 py-3 bg-deepviolet text-white font-orbitron tracking-wider rounded-md hover:bg-deepviolet/80 transition-all duration-300">
                CONTACT
              </button>
            </div>
          </div>
        </Section>
        
        {/* About Section */}
        <Section id="about">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-orbitron text-white mb-6">
                <GradientText>Our Mission</GradientText>
              </h2>
              <p className="text-white/80 font-spacegrotesk mb-6">
                SpaceLabs is dedicated to revolutionizing space technology through innovation, research, and cutting-edge engineering. We believe in creating sustainable solutions for space exploration and Earth observation.
              </p>
              <p className="text-white/80 font-spacegrotesk">
                Our team of experts combines decades of aerospace experience with modern technology to develop solutions that are both groundbreaking and practical.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-techblue/30 h-[400px] flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Placeholder for future animation/image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-techblue font-orbitron">ANIMATION PLACEHOLDER</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Spectra AI Section */}
        <Section id="spectra">
          <div className="w-full">
            <h2 className="text-4xl font-orbitron text-white mb-10 text-center">
              <GradientText>SPECTRA AI</GradientText>
            </h2>
            <SpectraAI />
          </div>
        </Section>
        
        {/* Products Section */}
        <Section id="products">
          <h2 className="text-4xl font-orbitron text-white mb-12 text-center">
            <GradientText>Our Products</GradientText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-deepviolet/30 hover:border-deepviolet/70 transition-all duration-300 group">
              <div className="h-48 mb-6 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-deepviolet/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl text-deepviolet">🛰️</span>
                </div>
              </div>
              <h3 className="text-2xl font-orbitron text-deepviolet mb-3">OrbitView</h3>
              <p className="text-white/70 font-spacegrotesk">Advanced satellite imaging platform for detailed Earth observation and analysis.</p>
            </div>
            
            {/* Product 2 */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-techblue/30 hover:border-techblue/70 transition-all duration-300 group">
              <div className="h-48 mb-6 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-techblue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl text-techblue">🚀</span>
                </div>
              </div>
              <h3 className="text-2xl font-orbitron text-techblue mb-3">LaunchAssist</h3>
              <p className="text-white/70 font-spacegrotesk">Comprehensive launch planning and optimization system for space missions.</p>
            </div>
            
            {/* Product 3 */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-neongreen/30 hover:border-neongreen/70 transition-all duration-300 group">
              <div className="h-48 mb-6 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-neongreen/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl text-neongreen">⚙️</span>
                </div>
              </div>
              <h3 className="text-2xl font-orbitron text-neongreen mb-3">SpaceMesh</h3>
              <p className="text-white/70 font-spacegrotesk">Decentralized communication network for reliable satellite data transmission.</p>
            </div>
          </div>
        </Section>
        
        {/* Contact Section */}
        <Section id="contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-orbitron text-white mb-6">
                <GradientText>Get In Touch</GradientText>
              </h2>
              <p className="text-white/80 font-spacegrotesk mb-10">
                Ready to explore the possibilities? Contact our team to discuss how SpaceLabs can help turn your vision into reality.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-techblue/20 flex items-center justify-center">
                    <span className="text-techblue">📧</span>
                  </div>
                  <p className="text-white font-spacegrotesk">contact@spacelabs.tech</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-deepviolet/20 flex items-center justify-center">
                    <span className="text-deepviolet">📱</span>
                  </div>
                  <p className="text-white font-spacegrotesk">+1 (555) 123-4567</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-neongreen/20 flex items-center justify-center">
                    <span className="text-neongreen">📍</span>
                  </div>
                  <p className="text-white font-spacegrotesk">123 Space Avenue, Moon City, Earth</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-techblue/30">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2 font-spacegrotesk">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white font-spacegrotesk focus:outline-none focus:border-techblue"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2 font-spacegrotesk">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white font-spacegrotesk focus:outline-none focus:border-techblue"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white mb-2 font-spacegrotesk">Message</label>
                  <textarea 
                    id="message" 
                    className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white font-spacegrotesk focus:outline-none focus:border-techblue h-32"
                  ></textarea>
                </div>
                
                <button className="w-full px-8 py-3 bg-techblue text-black font-orbitron tracking-wider rounded-md hover:bg-techblue/80 transition-all duration-300">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </Section>
      </HorizontalLayout>
    </>
  );
}

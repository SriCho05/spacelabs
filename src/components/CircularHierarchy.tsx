import React, { useState } from 'react';

// Define types for the application data
interface Application {
  title: string;
  description: string;
}

interface Category {
  name: string;
  color: string;
  applications: Application[];
}

// Define the categories and their applications with colors
const categories: Category[] = [
  {
    name: 'RGB Imaging',
    color: '#baffc9', // Neon green
    applications: [
      { title: 'GIS Feature Extraction', description: 'Automatically extracts buildings, roads, water bodies' },
      { title: 'Surveillance & Security', description: 'Detects intrusions and unauthorized vehicles' },
      { title: 'Infrastructure Inspection', description: 'Identifies structural damage in infrastructure' },
      { title: 'Vegetation Mapping', description: 'Maps vegetation boundaries and density' },
    ],
  },
  {
    name: 'Multispectral',
    color: '#7f00ff', // Deep violet
    applications: [
      { title: 'Plantation Health Monitoring', description: 'Detects crop health variations across fields' },
      { title: 'Land Use & Cover Classification', description: 'Segments land into forest, agriculture, urban' },
      { title: 'Irrigation Planning', description: 'Identifies moisture stress for precision irrigation' },
      { title: 'Harvest & Yield Prediction', description: 'Counts crops and predicts yields globally' },
    ],
  },
  {
    name: 'Hyperspectral',
    color: '#00f0ff', // Tech blue
    applications: [
      { title: 'Location-Agnostic Crop Detection', description: 'Identifies crop species anywhere globally' },
      { title: 'Biodiversity & Conservation Mapping', description: 'Maps habitats and species distribution' },
      { title: 'Pollution Monitoring', description: 'Detects water, air, soil pollution hotspots' },
      { title: 'Carbon Sequestration Assessment', description: 'Maps carbon-storing vegetation zones' },
    ],
  },
  {
    name: 'LiDAR',
    color: '#baffc9', // Neon green
    applications: [
      { title: 'High-Resolution Terrain Modelling', description: 'Generates detailed slope and elevation maps' },
      { title: 'Forest Canopy & Biomass Estimation', description: 'Estimates canopy structure and biomass' },
      { title: 'Infrastructure 3D Mapping', description: 'Creates 3D models of utilities and structures' },
      { title: 'Deep Inspection', description: 'Identifies road defects, building crack depth, wind turbine structural issues' },
    ],
  },
];

// Main component
const SpectraAI: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    switch(color) {
      case '#00f0ff': return 'border-techblue text-techblue hover:bg-techblue/10';
      case '#7f00ff': return 'border-deepviolet text-deepviolet hover:bg-deepviolet/10';
      case '#baffc9': return 'border-neongreen text-neongreen hover:bg-neongreen/10';
      default: return 'border-white text-white hover:bg-white/10';
    }
  };

  const getGlowStyle = (color: string, isHovered: boolean) => {
    if (!isHovered) return {};
    const glowColors = {
      '#00f0ff': '0 0 15px rgba(0, 240, 255, 0.4)',
      '#7f00ff': '0 0 15px rgba(127, 0, 255, 0.4)',
      '#baffc9': '0 0 15px rgba(186, 255, 201, 0.4)'
    };
    
    return {
      boxShadow: glowColors[color as keyof typeof glowColors] || '0 0 15px rgba(255, 255, 255, 0.3)'
    };
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black py-8 px-4 md:px-8 overflow-hidden">
      <h1 className="text-4xl font-orbitron text-techblue text-center mb-10 tracking-widest">SPECTRA AI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const isHovered = hoveredCategory === category.name;
          const colorClasses = getColorClasses(category.color);
          const glowStyle = getGlowStyle(category.color, isHovered);
          
          return (
            <div 
              key={category.name} 
              className={`group bg-white/5 backdrop-blur-md border ${isHovered ? 'border-opacity-100' : 'border-opacity-30'} 
              rounded-xl overflow-hidden transition-all duration-300`}
              style={{ 
                borderColor: category.color,
                ...glowStyle
              }}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div 
                className={`w-full p-4 flex items-center justify-between font-spacegrotesk text-xl tracking-wider ${colorClasses} 
                transition-all duration-300 ${isHovered ? 'bg-black/40' : ''}`}
              >
                <span>{category.name}</span>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className={`transition-transform duration-300 ${isHovered ? 'rotate-45' : ''}`}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isHovered ? 'max-h-[500px] opacity-100 p-5' : 'max-h-0 opacity-0 p-0'
                }`}
              >
                <ul className="space-y-3">
                  {category.applications.map((app) => (
                    <li key={app.title} className="flex gap-2 items-start">
                      <div 
                        className="w-2 h-2 mt-2 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <div>
                        <h3 className="font-rajdhani text-lg font-semibold" style={{ color: category.color }}>
                          {app.title}
                        </h3>
                        <p className="text-white/80 font-spacegrotesk text-sm mt-1">{app.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpectraAI;

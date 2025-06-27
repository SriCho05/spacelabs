"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0a");
    
    // Camera with wider field of view for better visibility
    const camera = new THREE.PerspectiveCamera(
      75, 
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 80);

    // Add debug helpers
    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);

    // Renderer with higher quality settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 1.0);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);
    
    const backLight = new THREE.DirectionalLight(0x7f00ff, 0.6);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // Create a blue gradient background
    const createGradientTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(0.5, '#0a0a0a');
        gradient.addColorStop(1, '#00437a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
      }
      return canvas;
    };

    const gradientTexture = new THREE.CanvasTexture(createGradientTexture());
    const gradientMaterial = new THREE.MeshBasicMaterial({
      map: gradientTexture,
      transparent: true,
      opacity: 0.0
    });

    const gradientPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      gradientMaterial
    );
    gradientPlane.position.z = -50;
    scene.add(gradientPlane);

    // Text phrases with increased size and better positioning
    const phrases = [
      { text: "EYES IN THE SKY", position: new THREE.Vector3(0, 0, 40) },
      { text: "INTELLIGENCE ON THE", position: new THREE.Vector3(0, 0, 0) },
      { text: "GROUND", position: new THREE.Vector3(0, 0, -40) }
    ];
    
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // SPACELABS title that will appear at the end
    const titleGroup = new THREE.Group();
    scene.add(titleGroup);
    titleGroup.position.set(0, 0, -20);
    titleGroup.visible = false;

    // Function to create canvas-based text (more reliable than font loading)
    const createCanvasText = (text: string, size: number = 10, color: string = "#00f0ff", glow: boolean = true) => {
      const canvas = document.createElement('canvas');
      const height = size * 1.2;
      canvas.width = text.length * size * 1.2;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      
      ctx.fillStyle = "#00000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = size / 2;
      }
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${size}px Orbitron, "Space Grotesk", Rajdhani, sans-serif`;
      ctx.fillStyle = color;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas.width / (height / 4), height / (height / 4)), 
        material
      );
      
      return plane;
    };

    // Create text phrases with improved visibility
    phrases.forEach(({ text, position }) => {
      const textMesh = createCanvasText(text, 12, "#00f0ff", true);
      if (textMesh) {
        textMesh.position.copy(position);
        textGroup.add(textMesh);
      }
    });

    // Create SPACELABS title with larger size
    const title = createCanvasText("SPACELABS", 24, "#ffffff", true);
    if (title) {
      title.position.set(0, 0, 0);
      titleGroup.add(title);
    }

    // Earth model
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);
    earthGroup.position.set(0, -2, -30);  // Better position
    earthGroup.visible = false;  // Hidden initially
    let earthModel: THREE.Object3D | null = null;
    
    // Create fallback Earth model
    const createFallbackEarth = () => {
      console.log('Creating fallback Earth model');
      const earthFallback = new THREE.Group();
      
      // Create a sphere for Earth
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshStandardMaterial({ 
          color: 0x0077be,
          emissive: 0x004477,
          emissiveIntensity: 0.2,
          roughness: 0.8
        })
      );
      earthFallback.add(sphere);
      
      // Add atmosphere glow
      const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(5.2, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          transparent: true,
          opacity: 0.15,
          side: THREE.BackSide
        })
      );
      earthFallback.add(atmosphere);
      
      earthModel = earthFallback;
      earthGroup.add(earthModel);
      
      // Add particle system around Earth
      addParticleSystem();
    };
    
    // Add particle effect around Earth
    const addParticleSystem = () => {
      const particleCount = 500;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const radius = 8 + Math.random() * 4;  // Distribute particles in a shell around Earth
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x00f0ff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      earthGroup.add(particles);
    };
    
    // Load Earth GLB model with multiple fallback options
    const gltfLoader = new GLTFLoader();
    
    const tryLoadEarthModel = (paths: string[]) => {
      if (paths.length === 0) {
        console.error('Failed to load Earth model from any path, using fallback');
        createFallbackEarth();
        return;
      }
      
      const currentPath = paths[0];
      console.log(`Trying to load Earth from: ${currentPath}`);
      
      gltfLoader.load(
        currentPath,
        (gltf) => {
          earthModel = gltf.scene;
          earthModel.scale.set(5, 5, 5);
          
          // Apply glowing blue material to represent Earth
          gltf.scene.traverse((node) => {
            if (node instanceof THREE.Mesh) {
              node.material = new THREE.MeshStandardMaterial({
                color: 0x0077be,
                emissive: 0x004477,
                emissiveIntensity: 0.2,
                roughness: 0.8
              });
            }
          });
          
          earthGroup.add(earthModel);
          
          // Add particle system around Earth
          addParticleSystem();
          
          console.log('Earth model loaded successfully');
        },
        undefined,
        (error) => {
          console.error('Error loading Earth model:', error);
          // Try next path
          tryLoadEarthModel(paths.slice(1));
        }
      );
    };
    
    // Try to load Earth model from multiple paths
    tryLoadEarthModel([
      '/assets/3d/earth.glb',
      '/public/assets/3d/earth.glb',
      '/components/Lanyard/card.glb' // Use card as last resort
    ]);
    
    // Add drone model
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);
    droneGroup.position.set(10, 10, -25);  // Better position for visibility
    droneGroup.visible = false;  // Hidden initially, will appear after earth
    let droneModel: THREE.Object3D | null = null;
    
    // Create fallback drone model
    const createFallbackDrone = () => {
      console.log('Creating fallback drone model');
      const droneFallback = new THREE.Group();
      
      // Create a simple drone shape
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.2, 0.8),
        new THREE.MeshStandardMaterial({ 
          color: 0x444444,
          emissive: 0x00f0ff,
          emissiveIntensity: 0.5
        })
      );
      droneFallback.add(body);
      
      // Add arms
      [0, Math.PI/2, Math.PI, Math.PI*1.5].forEach(rotation => {
        const arm = new THREE.Mesh(
          new THREE.BoxGeometry(0.8, 0.1, 0.1),
          new THREE.MeshStandardMaterial({ color: 0x333333 })
        );
        arm.rotation.y = rotation;
        arm.position.y = 0;
        droneFallback.add(arm);
      });
      
      // Add rotors
      [[-0.4, 0.4], [-0.4, -0.4], [0.4, 0.4], [0.4, -0.4]].forEach(pos => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.25, 0.05, 16, 32),
          new THREE.MeshStandardMaterial({ 
            color: 0x00f0ff,
            emissive: 0x00f0ff,
            emissiveIntensity: 1.0
          })
        );
        ring.position.set(pos[0], 0, pos[1]);
        ring.rotation.x = Math.PI / 2;
        droneFallback.add(ring);
      });
      
      // Add a light to the drone
      const droneLight = new THREE.PointLight(0x00f0ff, 2, 10);
      droneFallback.add(droneLight);
      
      droneModel = droneFallback;
      droneGroup.add(droneModel);
    };

    // Try multiple paths for drone model
    const tryLoadDroneModel = (paths: string[]) => {
      if (paths.length === 0) {
        console.error('Failed to load Drone model from any path, using fallback');
        createFallbackDrone();
        return;
      }
      
      const currentPath = paths[0];
      console.log(`Trying to load Drone from: ${currentPath}`);
      
      // Load the drone GLB model
      gltfLoader.load(
        currentPath,
        (gltf) => {
          droneModel = gltf.scene;
          droneModel.scale.set(0.4, 0.4, 0.4);  // Adjusted scale to fit the scene
          
          // Rotate to face forward
          droneModel.rotation.set(0, Math.PI * 0.5, 0);
          
          // Apply tech-like materials with glowing effects
          gltf.scene.traverse((node) => {
            if (node instanceof THREE.Mesh) {
              // Create a glowing tech material
              const material = new THREE.MeshStandardMaterial({
                color: 0x111111,  // Dark base
                emissive: 0x00f0ff,  // Glowing tech blue
                emissiveIntensity: 0.8,
                metalness: 0.9,
                roughness: 0.2,
                transparent: true,
                opacity: 0.95
              });
              
              // Apply material
              node.material = material;
            }
          });
          
          droneGroup.add(droneModel);
          console.log('Drone model loaded successfully');
        },
        undefined,
        (error) => {
          console.error('Error loading Drone model:', error);
          // Try next path
          tryLoadDroneModel(paths.slice(1));
        }
      );
    };
    
    // Try to load Drone model from multiple paths
    tryLoadDroneModel([
      '/assets/3d/animated_drone.glb',
      '/public/assets/3d/animated_drone.glb',
      '/components/Lanyard/card.glb' // Use card as last resort
    ]);

    // Animation variables
    let animationState = "text-flythrough";
    let animationTime = 0;
    console.log("Animation starting...");

    // Animation loop
    const animate = () => {
      animationTime += 0.01;
      
      switch(animationState) {
        case "text-flythrough":
          // Move camera through the text phrases very slowly
          camera.position.z -= 0.15;  // Even slower for maximum visibility
          
          if (camera.position.z < -20) {
            // Show earth when we're past the text
            earthGroup.visible = true;
            console.log("Showing Earth now");
            animationState = "show-earth";
          }
          break;
          
        case "show-earth":
          // Slightly rotate earth
          if (earthModel) {
            earthModel.rotation.y += 0.003;
          }
          
          // Fade in the gradient background
          if ((gradientMaterial as THREE.MeshBasicMaterial).opacity < 1.0) {
            (gradientMaterial as THREE.MeshBasicMaterial).opacity += 0.005;
          }
          
          // Transition camera to view earth
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, -2, 0.01);
          camera.position.z = THREE.MathUtils.lerp(camera.position.z, -20, 0.01);
          
          if (Math.abs(camera.position.z - (-20)) < 1.0) {
            // Once we're close to the earth, show the drone
            droneGroup.visible = true;
            console.log("Showing drone now");
            animationState = "show-drone";
          }
          break;
          
        case "show-drone":
          // Continue rotating earth
          if (earthModel) {
            earthModel.rotation.y += 0.003;
          }
          
          // Orbit drone around earth
          if (droneModel) {
            const droneOrbitRadius = 15;
            const droneOrbitSpeed = 0.5;
            droneGroup.position.x = Math.cos(animationTime * droneOrbitSpeed) * droneOrbitRadius;
            droneGroup.position.z = Math.sin(animationTime * droneOrbitSpeed) * droneOrbitRadius - 30;  // Offset to keep near earth
            droneGroup.lookAt(earthGroup.position);
          }
          
          // Move camera to final position
          camera.position.z = THREE.MathUtils.lerp(camera.position.z, -15, 0.01);
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, 5, 0.01);
          
          if (animationTime > 10) {  // After showing earth and drone for a while
            // Show the SPACELABS title
            titleGroup.visible = true;
            console.log("Showing SPACELABS title");
            animationState = "show-title";
          }
          break;
          
        case "show-title":
          // Continue earth rotation
          if (earthModel) {
            earthModel.rotation.y += 0.003;
          }
          
          // Continue drone orbit
          if (droneModel) {
            const droneOrbitRadius = 15;
            const droneOrbitSpeed = 0.5;
            droneGroup.position.x = Math.cos(animationTime * droneOrbitSpeed) * droneOrbitRadius;
            droneGroup.position.z = Math.sin(animationTime * droneOrbitSpeed) * droneOrbitRadius - 30;
            droneGroup.lookAt(earthGroup.position);
          }
          
          // Pulse the title for emphasis
          if (titleGroup.children.length > 0) {
            const pulse = Math.sin(animationTime * 1.5) * 0.1 + 1;
            titleGroup.scale.set(pulse, pulse, 1);
          }
          break;
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, width: "100%", height: "100%" }}
      aria-label="Three.js background"
    />
  );
};

export default ThreeBackground;

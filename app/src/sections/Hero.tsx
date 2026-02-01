import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

// Fluid Shader Background
const FluidShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
  });

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse following
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex noise functions
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Create flowing noise
      float noise1 = snoise(uv * 3.0 + uTime * 0.1);
      float noise2 = snoise(uv * 5.0 - uTime * 0.15 + 100.0);
      float noise3 = snoise(uv * 2.0 + uTime * 0.08 + 200.0);
      
      // Mouse influence
      float mouseDist = distance(uv, uMouse);
      float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;
      
      // Combine noises
      float finalNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
      finalNoise += mouseInfluence;
      
      // Color palette - deep void with orange embers
      vec3 voidColor = vec3(0.02, 0.02, 0.02);
      vec3 orangeColor = vec3(1.0, 0.36, 0.0);
      vec3 darkOrange = vec3(0.4, 0.15, 0.0);
      
      // Create ember-like spots
      float emberMask = smoothstep(0.3, 0.6, finalNoise);
      float emberGlow = smoothstep(0.5, 0.7, finalNoise) * 0.5;
      
      // Mix colors
      vec3 color = mix(voidColor, darkOrange, emberMask * 0.3);
      color = mix(color, orangeColor, emberGlow);
      
      // Add subtle vignette
      float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5));
      color *= vignette * 0.3 + 0.7;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

// Text scramble effect hook
const useTextScramble = (text: string, isActive: boolean) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    if (!isActive) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 1.8;
    }, 30);

    return () => clearInterval(interval);
  }, [text, isActive]);

  return displayText;
};

const Hero = ({ isAppLoading }: { isAppLoading?: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const scrambledTitle = useTextScramble('SOFTWARE ENGINEER', isLoaded);
  const scrambledName = useTextScramble('MAHAD ASHRAF', isLoaded);

  useEffect(() => {
    if (!isAppLoading) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isAppLoading]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <FluidShader />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8">
        {/* Main Title */}
        <div className="text-center" ref={titleRef}>
          <h2
            className={`font-display text-[clamp(1rem,3vw,2rem)] tracking-[0.3em] text-orange-500 mb-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            {scrambledName}
          </h2>

          <h1
            className={`font-display text-[clamp(3rem,12vw,10rem)] leading-none tracking-tight text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            {scrambledTitle}
          </h1>

          <p
            className={`mt-6 text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-400 max-w-xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '600ms' }}
          >
            6th Semester Software Engineering Student at FAST NUCES
          </p>
        </div>

        {/* CTA Button */}
        <div
          className={`mt-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 border border-orange-500/50 text-white font-body text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:border-orange-500"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Explore My Work
            </span>
            <div className="absolute inset-0 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </button>
        </div>

        {/* Social Links */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '1000ms' }}
        >
          {[
            { icon: Github, href: 'https://github.com/MahadAsh', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/mahad-ashraf', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:mahad8ash@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-3 text-gray-400 hover:text-orange-500 transition-all duration-300"
              onMouseEnter={() => setHoveredLink(label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Icon className="w-5 h-5" />
              {hoveredLink === label && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-orange-500 whitespace-nowrap">
                  {label}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-12 right-8 hidden md:flex flex-col items-center gap-2 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase rotate-90 origin-center translate-y-8">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-orange-500 animate-bounce mt-16" />
        </div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;

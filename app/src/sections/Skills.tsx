import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Wrench,
  Palette,
  Brain,
  Cpu,
  Database,
  Terminal,
  Gamepad2,
  Film,
  Video,
  Clapperboard,
  Lightbulb,
  Target,
  MessageSquare,
  Braces,
  Coffee,
  Atom
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  category: 'language' | 'tool' | 'creative' | 'soft';
}

const skills: Skill[] = [
  // Languages
  { name: 'C++', icon: Code2, category: 'language' },
  { name: 'C#', icon: Cpu, category: 'language' },
  { name: 'Python', icon: Braces, category: 'language' },
  { name: 'MERN', icon: Atom, category: 'language' },
  { name: 'Java', icon: Coffee, category: 'language' },
  { name: 'R', icon: Database, category: 'language' },
  { name: 'SQL', icon: Database, category: 'language' },


  // Tools
  { name: 'VS Code', icon: Code2, category: 'tool' },
  { name: 'Eclipse', icon: Terminal, category: 'tool' },
  { name: 'SQL Server', icon: Database, category: 'tool' },
  { name: 'Unity', icon: Gamepad2, category: 'tool' },

  // Creative
  { name: 'Filmmaking', icon: Film, category: 'creative' },
  { name: 'Videography', icon: Video, category: 'creative' },
  { name: 'Video Editing', icon: Clapperboard, category: 'creative' },

  // Soft Skills
  { name: 'Problem Solving', icon: Lightbulb, category: 'soft' },
  { name: 'Critical Thinking', icon: Target, category: 'soft' },
  { name: 'Storytelling', icon: MessageSquare, category: 'soft' },
];

const categories = [
  { id: 'language', label: 'Languages', color: '#ff5c00', icon: Code2 },
  { id: 'tool', label: 'Tools', color: '#3b82f6', icon: Wrench },
  { id: 'creative', label: 'Creative', color: '#8b5cf6', icon: Palette },
  { id: 'soft', label: 'Soft Skills', color: '#10b981', icon: Brain },
];

const SkillNode = ({
  skill,
  angle,
  radius,
  isHovered,
  onHover
}: {
  skill: Skill;
  angle: number;
  radius: number;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}) => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const category = categories.find(c => c.id === skill.category);

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer ${isHovered ? 'scale-125 z-20' : 'scale-100 z-10'
        }`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      onMouseEnter={() => onHover(skill.name)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 rounded-lg sm:rounded-xl bg-void-secondary border transition-all duration-300 ${isHovered
          ? 'border-orange-500 shadow-lg shadow-orange-500/20'
          : 'border-white/10 hover:border-white/30'
          }`}
        style={{
          boxShadow: isHovered ? `0 0 30px ${category?.color}30` : 'none',
        }}
      >
        <skill.icon
          className="w-4 h-4 sm:w-6 sm:h-6"
          style={{ color: category?.color || '#ff5c00' }}
        />
        <span className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">{skill.name}</span>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [responsiveRadius, setResponsiveRadius] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setResponsiveRadius(140);
      else if (width < 1024) setResponsiveRadius(220);
      else setResponsiveRadius(300);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const constellation = constellationRef.current;
    const heading = headingRef.current;

    if (!section || !constellation || !heading) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 10%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Central node animation
      const centralNode = constellation.querySelector('.central-node');
      gsap.fromTo(centralNode,
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 10%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill nodes orbit entry
      const nodes = constellation.querySelectorAll('.skill-node');
      nodes.forEach((node, i) => {
        gsap.fromTo(node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.3 + i * 0.08,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Connection lines draw
      const lines = constellation.querySelectorAll('.connection-line');
      lines.forEach((line, i) => {
        gsap.fromTo(line,
          { strokeDashoffset: 200 },
          {
            strokeDashoffset: 0,
            duration: 1,
            delay: 1 + i * 0.1,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Filter skills by category
  const filteredSkills = activeCategory
    ? skills.filter(s => s.category === activeCategory)
    : skills;

  // Calculate positions for orbital layout
  const getSkillPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return { angle, radius };
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-void overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-[clamp(3rem,8vw,6rem)] text-white mb-4"
          >
            TECHNICAL EXPERTISE
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A diverse skill set spanning programming languages, development tools,
            creative media, and problem-solving abilities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${activeCategory === null
              ? 'bg-orange-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${activeCategory === cat.id
                ? 'text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              style={{
                backgroundColor: activeCategory === cat.id ? cat.color : undefined,
              }}
            >

              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Constellation */}
        <div
          ref={constellationRef}
          className="relative h-[400px] sm:h-[600px] lg:h-[800px]"
        >
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Lines from center to each skill */}
            {filteredSkills.map((skill, i) => {
              const pos = getSkillPosition(i, filteredSkills.length, responsiveRadius - 20);
              const x = Math.cos(pos.angle) * pos.radius;
              const y = Math.sin(pos.angle) * pos.radius;
              const category = categories.find(c => c.id === skill.category);
              const isHovered = hoveredSkill === skill.name;

              return (
                <line
                  key={skill.name}
                  className="connection-line"
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${x}px)`}
                  y2={`calc(50% + ${y}px)`}
                  stroke={category?.color}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeDasharray="5,5"
                  opacity={isHovered ? 0.8 : 0.3}
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                />
              );
            })}
          </svg>

          {/* Central Node */}
          <div className="central-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Pulsing rings */}
              <div className="absolute inset-0 w-32 h-32 -m-8">
                <div className="absolute inset-0 border-2 border-orange-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-2 border border-orange-500/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              </div>

              {/* Central content */}
              <div className="relative w-12 h-12 sm:w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>

              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-sm text-orange-500 font-medium">Core Skills</span>
              </div>
            </div>
          </div>

          {/* Skill Nodes */}
          {filteredSkills.map((skill, i) => {
            const pos = getSkillPosition(i, filteredSkills.length, responsiveRadius);
            const isHovered = hoveredSkill === skill.name;

            return (
              <div
                key={skill.name}
                className="skill-node absolute"
                style={{
                  left: `calc(50% + ${Math.cos(pos.angle) * pos.radius}px)`,
                  top: `calc(50% + ${Math.sin(pos.angle) * pos.radius}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <SkillNode
                  skill={skill}
                  angle={pos.angle}
                  radius={0}
                  isHovered={isHovered}
                  onHover={setHoveredSkill}
                />
              </div>
            );
          })}
        </div>

        {/* Skills Grid (Mobile Fallback) - showing only if needed or keep for list view */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12">
          {filteredSkills.map((skill) => {
            const category = categories.find(c => c.id === skill.category);
            return (
              <div
                key={skill.name}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <skill.icon className="w-5 h-5" style={{ color: category?.color || '#ff5c00' }} />
                <span className="text-sm text-gray-300">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;

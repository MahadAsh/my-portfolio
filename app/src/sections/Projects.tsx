import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronRight, Gamepad2, Share2, Activity, Database, Languages, Clapperboard, Brain, BookA } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Reel lab Studio',
    description: 'A marketing agency for social media content creation founded by me, delivering high-quality content to clients.',
    tech: [],
    image: '/reellab.png',
    icon: Clapperboard,
    demo: "https://www.instagram.com/reellabstudio.co/"
  },
  {
    id: 2,
    title: 'Game Store Web App',
    description: 'A full-featured game store with SQL backend, responsive frontend, and intuitive UI for browsing and purchasing games.',
    tech: ['C++', 'SQL', 'HTML/CSS'],
    image: '/project-gamestore.jpg',
    icon: Gamepad2,
  },
  {
    id: 3,
    title: 'Mini Instagram',
    description: 'Social feed simulation implementing core data structures including vectors, linked lists, and hash tables for efficient data management.',
    tech: ['C++', 'DSA', 'Hash Tables'],
    image: '/project-instagram.jpg',
    icon: Share2,
  },
  {
    id: 4,
    title: 'Hit N Jump',
    description: 'An engaging 2D platformer game built in Unity featuring dynamic physics, level progression, and smooth character controls.',
    tech: ['C#', 'Unity', 'Game Design'],
    image: '/project-platformer.jpg',
    icon: Gamepad2,
  },
  {
    id: 5,
    title: 'Stroke Prediction App',
    description: 'Desktop application using R for statistical analysis to predict stroke risk based on patient health metrics.',
    tech: ['R', 'Statistics', 'ML'],
    image: '/project-stroke.jpg',
    icon: Activity,
  },
  {
    id: 6,
    title: 'Tone Based AI Humanizer',
    description: 'Humanizer which takes a piece of your own writing and mimic your writing style which no other humanizer is doing in the market.',
    tech: ['Python', 'ML', 'AI'],
    image: '/humanizer.jpeg',
    icon: Brain,
  },
  {
    id: 7,
    title: 'Arabic to Urdu Dictionary',
    description: 'A 3 layered Java-based dictionary. It handles complex linguistic data including roots, grammatical metadata, and usage statistics.',
    tech: ['Java', 'JavaFX', 'Swing'],
    image: '/arabic.png',
    icon: BookA,
    github: 'https://github.com/SoftwareConstructionAndDev/25f-prj-scd-javatitans',

  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`flex-shrink-0 w-[70vw] sm:w-[45vw] lg:w-[30vw] h-[50vh] sm:h-[55vh] relative group transition-transform duration-700 ${isHovered ? 'z-20' : 'z-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full overflow-hidden rounded-3xl bg-void-secondary/40 backdrop-blur-sm border border-white/5 shadow-2xl transition-all duration-700 hover:border-orange-500/30">
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-110' : 'scale-100'
              }`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-90" />
        </div>

        {/* Dynamic Glass Overlay */}
        <div className={`absolute inset-0 bg-void/10 backdrop-blur-[2px] transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          {/* Project Number */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-display text-5xl text-orange-500/20 tracking-tighter">
              {String(index + 1).padStart(2, '0')}
            </span>
            <project.icon className="w-6 h-6 text-orange-500" />
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl sm:text-3xl text-white mb-3 tracking-wide">
            {project.title}
          </h3>

          {/* Description */}
          <p
            className={`text-sm sm:text-base text-gray-400 mb-6 transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } line-clamp-3`}
          >
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className={`flex flex-wrap gap-2 mb-6 transition-all duration-700 delay-75 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[10px] uppercase tracking-widest bg-white/5 text-gray-300 rounded-full border border-white/10 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div
            className={`flex gap-4 transition-all duration-700 delay-150 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            {project.github && (
              <a
                href={project.github}
                className="flex items-center gap-2 pr-4 py-2 text-white hover:text-orange-500 transition-colors duration-300 group/btn"
              >
                <div className="p-2 bg-white/10 rounded-full group-hover/btn:bg-orange-500 transition-colors duration-300">
                  <Github className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest">Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                className="flex items-center gap-2 pr-4 py-2 text-orange-500 hover:text-white transition-colors duration-300 group/btn"
              >
                <div className="p-2 border border-orange-500/50 rounded-full group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500 transition-all duration-300">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest">Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Glow Accent */}
        <div className={`absolute -inset-px bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl opacity-0 transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : ''}`} />
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;
    const progress = progressRef.current;

    if (!section || !container || !track || !heading || !progress) return;

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
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Horizontal scroll
      const getScrollWidth = () => track.scrollWidth - container.offsetWidth;

      const scrollTween = gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth + window.innerWidth * 0.8}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.to(progress, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
            });
          },
        },
      });

      // Forces a refresh after a small delay to catch late layout shifts
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);

      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);

      // Card entrance animations
      const cards = track.querySelectorAll('.project-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              containerAnimation: scrollTween,
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      return () => {
        scrollTween.kill();
        window.removeEventListener('load', handleLoad);
      };
    }, section);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full min-h-screen bg-void overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headingRef} className="pt-24 pb-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-orange-500 text-sm tracking-widest uppercase mb-2 block">
              Portfolio
            </span>
            <h2 className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-none">
              MY PROJECTS
            </h2>
          </div>
          <p className="text-gray-400 max-w-md">
            A collection of projects showcasing my skills in software development,
            game design, and data analysis.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 sm:px-8 lg:px-16 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-orange-500 rounded-full transition-all duration-100"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-[55vh] sm:h-[60vh]">
        <div
          ref={trackRef}
          className="flex gap-10 px-4 sm:px-8 lg:px-16 h-full items-center"
          style={{ width: 'fit-content' }}
        >
          {projects.map((project, index) => (
            <div key={project.id} className="project-card">
              <ProjectCard project={project} index={index} />
            </div>
          ))}

          {/* End Card - CTA */}
          <div className="flex-shrink-0 w-[35vw] sm:w-[30vw] lg:w-[20vw] h-[50vh] sm:h-[55vh] flex items-center justify-center p-4">
            <div className="relative w-full h-full rounded-3xl bg-void-secondary/30 backdrop-blur-md border border-white/5 flex flex-col items-center justify-center text-center p-8 group/cta hover:border-orange-500/30 transition-all duration-700">
              <div className="p-4 bg-orange-500/10 rounded-full mb-6 group-hover/cta:scale-110 transition-transform duration-700">
                <Database className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2 uppercase tracking-widest">
                More Projects
              </h3>
              <p className="text-gray-400 text-sm mb-8 max-w-[150px]">
                Explore my full portfolio on GitHub
              </p>
              <a
                href="https://github.com/MahadAsh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 sm:px-8 sm:py-3 bg-orange-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all duration-300"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Visit GitHub</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-white/10 rounded-tr-xl group-hover/cta:border-orange-500/30 transition-colors duration-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 right-8 text-gray-500 text-sm flex items-center gap-2">
        <span>Scroll to explore</span>
        <ChevronRight className="w-4 h-4 animate-pulse" />
      </div>
    </section>
  );
};

export default Projects;

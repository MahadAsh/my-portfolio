import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, GraduationCap, Calendar, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const heading = headingRef.current;

    if (!section || !image || !content || !heading) return;

    const ctx = gsap.context(() => {
      // Heading character animation
      const chars = heading.querySelectorAll('.char');
      gsap.fromTo(chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image reveal
      gsap.fromTo(image,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content paragraphs stagger
      const paragraphs = content.querySelectorAll('.reveal-text');
      gsap.fromTo(paragraphs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax on image
      gsap.to(image.querySelector('img'), {
        scale: 1.1,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Lens zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const headingText = 'ABOUT ME';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-void"
    >
      {/* Background Text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] text-white/[0.02] whitespace-nowrap">
          ABOUT
        </span>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2
          ref={headingRef}
          className="font-display text-[clamp(3rem,8vw,6rem)] text-white mb-16 overflow-hidden"
        >
          {headingText.split('').map((char, i) => (
            <span key={i} className="char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Column */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              src="/mahad2.jpeg"
              alt="Mahad Ashraf"
              className="w-full h-full object-cover transition-transform duration-700"
            />

            {/* Lens Zoom Effect */}
            {isHovering && (
              <div
                className="absolute w-32 h-32 rounded-full border-2 border-orange-500 pointer-events-none overflow-hidden"
                style={{
                  left: `calc(${mousePos.x}% - 64px)`,
                  top: `calc(${mousePos.y}% - 64px)`,
                  boxShadow: '0 0 20px rgba(255, 92, 0, 0.3)',
                }}
              >
                <img
                  src="/about-portrait.jpg"
                  alt=""
                  className="absolute w-[500%] h-[500%] object-cover"
                  style={{
                    left: `${-mousePos.x * 4}%`,
                    top: `${-mousePos.y * 4}%`,
                  }}
                />
              </div>
            )}

            {/* Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-void/90 to-transparent">
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: GraduationCap, label: '6th Semester' },
                  { icon: Calendar, label: 'FAST NUCES' },
                  { icon: Code2, label: 'Software Engineering' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
                  >
                    <Icon className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="space-y-8">
            <div className="reveal-text">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Hardworking and detail-oriented 6th semester Software Engineering student at
                <span className="text-orange-500 font-medium"> FAST NUCES, Faisalabad</span>.
                Enthusiastic about solving complex problems and eager to apply strong programming
                and critical thinking skills to real-world projects.
              </p>
            </div>

            <div className="reveal-text space-y-6">
              <h3 className="font-display text-2xl text-white">What I Do</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Web Development', desc: 'Full-stack applications with modern technologies' },
                  { title: 'Film Making', desc: 'Short films and documentaries' },
                  { title: 'Software Quality Assurance', desc: 'Testing and debugging Softwares' },
                  { title: 'Artificial Intelligence', desc: 'Building AI models and applications' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/50 transition-colors duration-300"
                  >
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-text">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>Sahiwal, Pakistan</span>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="reveal-text grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '10+', label: 'Projects' },
                { value: '5+', label: 'Languages' },
                { value: '1+', label: 'Years Exp' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-white/5 rounded-lg"
                >
                  <div className="font-display text-3xl text-orange-500">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Resume Button */}
            <div className="reveal-text pt-4">
              <a
                href="/resume.pdf"
                download="Mahad_Ashraf_Resume.pdf"
                className="group relative inline-flex px-8 py-4 border border-orange-500/50 text-white font-body text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:border-orange-500 bg-transparent items-center gap-3"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-500 flex items-center gap-2">
                  Download Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
    degree: string;
    institution: string;
    location: string;
    period: string;
    details?: string[];
    icon: typeof GraduationCap;
}

const educationData: EducationItem[] = [
    {
        degree: 'B.Sc. in Software Engineering',
        institution: 'FAST NUCES',
        location: 'Faisalabad',
        period: '2023 – Present',
        details: ['Currently in 6th semester', 'Focusing on Software Architecture and Data Science, AI, Web Development'],
        icon: GraduationCap,
    },
    {
        degree: 'F.Sc. (Pre-Engineering)',
        institution: 'Punjab College',
        location: 'Sahiwal',
        period: '2020 – 2022',
        details: ['Pre Engineering background'],
        icon: Award,
    },
    {
        degree: 'Matriculation (Science Group)',
        institution: 'The Educators School',
        location: 'Sahiwal',
        period: '2018 – 2020',
        details: ['Secured 1016 / 1100 marks (92.4%)', 'Strong foundation in Mathematics and Physics'],
        icon: Calendar,
    },
];

const Education = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.education-header',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.education-header',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

            // Timeline items animation
            itemsRef.current.forEach((item, index) => {
                if (!item) return;

                gsap.fromTo(item,
                    {
                        x: index % 2 === 0 ? -50 : 50,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });

            // Central line animation
            gsap.fromTo('.timeline-line',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.education-content',
                        start: 'top 70%',
                        end: 'bottom 20%',
                        scrub: true,
                    }
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="education"
            className="relative w-full py-24 bg-void overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
                {/* Section Header */}
                <div className="education-header mb-20">
                    <span className="text-orange-500 text-sm tracking-widest uppercase mb-2 block">
                        Journey
                    </span>
                    <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] text-white leading-none">
                        EDUCATION
                    </h2>
                </div>

                {/* Timeline Content */}
                <div className="education-content relative">
                    {/* Central Line */}
                    <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 origin-top hidden md:block" />

                    {/* Items */}
                    <div className="space-y-12 md:space-y-0">
                        {educationData.map((item, index) => (
                            <div
                                key={index}
                                ref={(el) => { itemsRef.current[index] = el; }}
                                className={`relative flex items-center justify-between md:mb-24 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                                    }`}
                            >
                                {/* Visual Dot on Line */}
                                <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 hidden md:flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] border-4 border-void" />
                                </div>

                                {/* Card Container */}
                                <div className="w-full md:w-[45%] pl-10 md:pl-0">
                                    <div className="p-6 sm:p-8 rounded-2xl bg-void-secondary/30 backdrop-blur-md border border-white/5 hover:border-orange-500/30 transition-all duration-500 group">
                                        {/* Icon & Period */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="p-3 bg-orange-500/10 rounded-xl group-hover:scale-110 transition-transform duration-500">
                                                <item.icon className="w-6 h-6 text-orange-500" />
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-widest">
                                                <Calendar className="w-3 h-3" />
                                                {item.period}
                                            </div>
                                        </div>

                                        {/* Degree */}
                                        <h3 className="font-display text-xl sm:text-2xl text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">
                                            {item.degree}
                                        </h3>

                                        {/* Institution */}
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-gray-400">
                                            <span className="font-medium text-gray-300">{item.institution}</span>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {item.location}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        {item.details && (
                                            <ul className="space-y-2">
                                                {item.details.map((detail, dIdx) => (
                                                    <li key={dIdx} className="flex items-start gap-2 text-sm text-gray-500">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500/50 flex-shrink-0" />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                {/* Spacer for flow */}
                                <div className="hidden md:block w-0" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Accents */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default Education;

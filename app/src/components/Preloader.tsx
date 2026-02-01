import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                const ctx = gsap.context(() => {
                    gsap.to('.preloader', {
                        yPercent: -100,
                        duration: 1.2,
                        ease: 'power4.inOut',
                        onComplete: () => {
                            setIsVisible(false);
                            onComplete?.();
                        },
                    });
                });
                return () => ctx.revert();
            }, 500);
        }
    }, [progress, onComplete]);

    if (!isVisible) return null;

    return (
        <div className="preloader fixed inset-0 z-[10000] bg-void flex flex-col items-center justify-center pointer-events-auto">
            {/* Branding */}
            <div className="relative mb-12 overflow-hidden">
                <h2 className="font-display text-8xl text-white tracking-widest opacity-10">
                    PORTFOLIO
                </h2>
                <div
                    className="absolute inset-0 font-display text-8xl text-orange-500 tracking-widest overflow-hidden transition-all duration-300"
                    style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                >
                    PORTFOLIO
                </div>
            </div>

            {/* Progress Counter */}
            <div className="flex flex-col items-center">
                <div className="font-display text-4xl text-white mb-2">
                    {progress}<span className="text-orange-500">%</span>
                </div>
                <div className="w-64 h-px bg-white/10 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.5em] text-gray-500">
                    Initializing Systems
                </p>
            </div>
        </div>
    );
};

export default Preloader;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Movement logic
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        // Hover logic
        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isPointer = target.closest('a, button, [role="button"], .project-card, .skill-node');

            if (isPointer) {
                gsap.to(follower, { scale: 2, backgroundColor: 'rgba(255, 92, 0, 0.2)', duration: 0.1 });
                gsap.to(cursor, { scale: 0.5, duration: 0.1 });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.1 });
            gsap.to(cursor, { scale: 1, duration: 0.1 });
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return (
        <>
            {/* Main dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-orange-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
            />
            {/* Outer circle */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-orange-500/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 hidden md:block"
            />
        </>
    );
};

export default CustomCursor;

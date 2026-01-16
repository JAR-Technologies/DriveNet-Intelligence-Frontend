'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor
    // Balanced values for universal comfort: responsive but smooth, no jitter.
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = (e: MouseEvent) => {
            const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
            setRipples((prev) => [...prev, newRipple]);

            setTimeout(() => {
                setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
            }, 800);
        };

        // Robust Hover Detection using MouseOver/MouseOut (Bubbling)
        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            // Recursive check for interactive elements
            const isInteractive = (el: HTMLElement | null): boolean => {
                if (!el || el === document.body || el === document.documentElement) return false;

                const tagName = el.tagName.toLowerCase();
                const role = el.getAttribute('role');
                const isClickableTag = ['a', 'button', 'input', 'select', 'textarea', 'label'].includes(tagName);
                const isClickableRole = role === 'button' || role === 'link' || role === 'checkbox' || role === 'option';
                const hasPointerCursor = el.classList.contains('cursor-pointer') || window.getComputedStyle(el).cursor === 'pointer'; // Fallback check

                if (isClickableTag || isClickableRole || hasPointerCursor) return true;

                return isInteractive(el.parentElement);
            };

            setIsHovered(isInteractive(target));
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', updateHoverState); // Better than mousemove for perf
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', updateHoverState);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, [mouseX, mouseY, isVisible]);

    // Touch Device Detection
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Check if primary input mechanism is coarse (touch)
        // or if matchMedia is available and matches coarse
        const checkTouch = () => {
            if (typeof window !== 'undefined') {
                setIsTouch(window.matchMedia("(pointer: coarse)").matches);
            }
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    // Don't render custom cursor on touch devices
    if (isTouch) return null;

    return (
        <>
            {/* Cursor Main Elements */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference" // Ensures visibility on light/cyan backgrounds
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0, // Hide until moved
                }}
            >
                {/* Core Reticle */}
                <motion.div
                    className="rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00f0ff]"
                    animate={{
                        width: isHovered ? 5 : 10, // Shrinks to nothing (Open Aperture)
                        height: isHovered ? 5 : 10,
                        opacity: isHovered ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />

                {/* Target Ring */}
                <motion.div
                    className="rounded-full border border-[#00f0ff]"
                    animate={{
                        width: isHovered ? 64 : 24, // Massive expansion (24px -> 64px)
                        height: isHovered ? 64 : 24,
                        opacity: isHovered ? 1 : 0.6,
                        backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.15)' : 'transparent', // Clear fill on hover
                        borderWidth: isHovered ? '3px' : '2px', // Thick border on active
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400, // Very snappy
                        damping: 25
                    }}
                />
            </motion.div>

            {/* Click Ripples */}
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        className="fixed pointer-events-none rounded-full border border-[#00f0ff] z-[9998]"
                        initial={{
                            width: 0,
                            height: 0,
                            opacity: 0.8,
                            x: ripple.x,
                            y: ripple.y,
                            translateX: '-50%',
                            translateY: '-50%'
                        }}
                        animate={{
                            width: 100,
                            height: 100,
                            opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                ))}
            </AnimatePresence>
        </>
    );
};

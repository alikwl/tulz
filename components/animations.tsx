'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
    children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname()

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
            }}
        >
            {children}
        </motion.div>
    )
}

export function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    )
}

export function SlideIn({ children, direction = 'left', delay = 0 }: { children: ReactNode; direction?: 'left' | 'right' | 'up' | 'down'; delay?: number }) {
    const directionOffset = {
        left: { x: -100, y: 0 },
        right: { x: 100, y: 0 },
        up: { x: 0, y: -100 },
        down: { x: 0, y: 100 },
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directionOffset[direction] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    )
}

export function ScaleIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    )
}

export function StaggerContainer({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({ children }: { children: ReactNode }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    },
                },
            }}
        >
            {children}
        </motion.div>
    )
}

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.2 }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function AnimatedButton({ children, className = '', ...props }: any) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={className}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export function AnimatedToolCard({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.4,
                delay,
            }}
            whileHover={{
                y: -12,
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
            }}
        >
            {children}
        </motion.div>
    )
}

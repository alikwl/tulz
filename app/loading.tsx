'use client'

import { motion } from 'framer-motion'

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-sm text-muted-foreground"
                >
                    Loading...
                </motion.p>
            </motion.div>
        </div>
    )
}

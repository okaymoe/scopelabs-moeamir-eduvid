"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

//splash screen was mostly AI generated for SVGs and framer motion movement, not really the best but felt like it gave it a nice touch

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 6000) 

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden">
      <div className="absolute inset-0 bg-static opacity-10"></div>

      <div className="absolute inset-0 bg-scanlines opacity-30 animate-scan"></div>

      <div className="relative text-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="relative w-40 h-40 mx-auto">
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <path
                d="M9.5 2C8.89555 2 8.31711 2.23545 7.8859 2.6541C7.45469 3.07276 7.21924 3.64489 7.21924 4.24403C7.21924 4.5779 7.29079 4.90071 7.42743 5.19537C6.63696 5.66976 6.10039 6.51001 6.10039 7.46777C6.10039 7.80164 6.17194 8.12445 6.30858 8.41911C5.51811 8.8935 4.98154 9.73375 4.98154 10.6915C4.98154 11.6493 5.51811 12.4895 6.30858 12.9639C6.17194 13.2586 6.10039 13.5814 6.10039 13.9152C6.10039 14.873 6.63696 15.7133 7.42743 16.1876C7.29079 16.4823 7.21924 16.8051 7.21924 17.139C7.21924 18.0968 7.75581 18.937 8.54628 19.4114C8.40964 19.7061 8.33809 20.0289 8.33809 20.3627C8.33809 20.9619 8.57354 21.534 9.00475 21.9527C9.43596 22.3713 10.0144 22.6068 10.6188 22.6068H13.3812C13.9856 22.6068 14.564 22.3713 14.9953 21.9527C15.4265 21.534 15.6619 20.9619 15.6619 20.3627C15.6619 20.0289 15.5904 19.7061 15.4537 19.4114C16.2442 18.937 16.7808 18.0968 16.7808 17.139C16.7808 16.8051 16.7092 16.4823 16.5726 16.1876C17.363 15.7133 17.8996 14.873 17.8996 13.9152C17.8996 13.5814 17.8281 13.2586 17.6914 12.9639C18.4819 12.4895 19.0185 11.6493 19.0185 10.6915C19.0185 9.73375 18.4819 8.8935 17.6914 8.41911C17.8281 8.12445 17.8996 7.80164 17.8996 7.46777C17.8996 6.51001 17.363 5.66976 16.5726 5.19537C16.7092 4.90071 16.7808 4.5779 16.7808 4.24403C16.7808 3.64489 16.5453 3.07276 16.1141 2.6541C15.6829 2.23545 15.1045 2 14.5 2H9.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="rgba(255,255,255,0.1)"
              />
              <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M9 12L15 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>

            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 absolute -top-4 -right-4 text-yellow-300"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <path
                d="M9.66347 17H14.3364M11.9999 3V4M18.3639 5.63604L17.6568 6.34315M21 11.9999H20M4 11.9999H3M6.34309 6.34315L5.63599 5.63604M8.46441 15.5356C6.51179 13.5829 6.51179 10.4171 8.46441 8.46449C10.417 6.51187 13.5829 6.51187 15.5355 8.46449C17.4881 10.4171 17.4881 13.5829 15.5355 15.5356L14.9884 16.0827C14.3555 16.7155 13.9999 17.5739 13.9999 18.469V19C13.9999 20.1046 13.1045 21 11.9999 21C10.8954 21 9.99995 20.1046 9.99995 19V18.469C9.99995 17.5739 9.6444 16.7155 9.01151 16.0827L8.46441 15.5356Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="rgba(255,255,0,0.2)"
              />
            </motion.svg>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            EduVid
          </motion.h1>

          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 mb-4"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 3.3, duration: 0.8 }}
          />

          <motion.p
            className="text-white/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 0.8 }}
          >
            Learn Anything, Anytime
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center mt-8 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.3, duration: 0.5 }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-4 h-4 bg-white rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                delay: 4.5 + dot * 0.2,
                duration: 0.6,
                repeat: 5,
                repeatType: "loop",
                repeatDelay: 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

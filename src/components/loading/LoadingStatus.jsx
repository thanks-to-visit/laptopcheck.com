import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const STAGES = [
  {
    id: 'dead-pixel',
    label: 'Dead Pixel Test',
    activeMessage: 'Preparing Dead Pixel Test',
  },
  {
    id: 'battery-report',
    label: 'Generate Battery Report',
    activeMessage: 'Preparing Battery Report',
  },
  {
    id: 'keyboard-test',
    label: 'Keyboard Test',
    activeMessage: 'Preparing Keyboard Test',
  },
];

export const LoadingStatus = ({ stageIndex = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const isReady = stageIndex >= STAGES.length;

  const currentMessage = isReady
    ? 'LaptopCheck is ready!'
    : STAGES[stageIndex]?.activeMessage || 'Getting your diagnostic tools ready...';

  return (
    <div
      className="w-full max-w-sm flex flex-col items-center text-center"
      role="status"
      aria-live="polite"
      aria-busy={!isReady}
    >
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#171717]">
        Preparing LaptopCheck
      </h1>

      <p className="mt-1.5 text-sm sm:text-base text-[#737373]">
        Getting your diagnostic tools ready...
      </p>

      {/* Sequential Active Stage Message */}
      <div className="mt-5 h-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={currentMessage}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.14, ease: 'easeOut' }}
            className={`text-sm font-medium ${
              isReady ? 'text-[#2563EB]' : 'text-[#171717]'
            }`}
          >
            {currentMessage}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Diagnostic Preparation Stages */}
      <ul
        className="mt-5 w-full max-w-[260px] space-y-2.5 text-left"
        aria-label="Diagnostic preparation stages"
      >
        {STAGES.map((stage, index) => {
          const isCompleted = stageIndex > index;
          const isActive = stageIndex === index;

          return (
            <motion.li
              key={stage.id}
              initial={false}
              animate={{
                opacity: isActive || isCompleted ? 1 : 0.48,
                x: shouldReduceMotion ? 0 : isActive ? 2 : 0,
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.14, ease: 'easeOut' }}
              className="flex items-center gap-3 text-sm"
            >
              {/* Small Status Indicator */}
              <span
                aria-hidden="true"
                className="relative flex h-3 w-3 shrink-0 items-center justify-center"
              >
                {isCompleted ? (
                  <svg
                    viewBox="0 0 12 12"
                    className="h-3 w-3 text-[#2563EB]"
                    fill="none"
                  >
                    <path
                      d="M2.5 6.2L5 8.7L9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : isActive ? (
                  <>
                    {!shouldReduceMotion && (
                      <span className="absolute inline-flex h-3 w-3 rounded-full bg-[#2563EB]/25 animate-ping" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2563EB]" />
                  </>
                ) : (
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#D4D4D4]" />
                )}
              </span>

              {/* Stage Descriptive Label */}
              <span
                className={`transition-colors duration-100 ${
                  isActive
                    ? 'font-medium text-[#171717]'
                    : isCompleted
                    ? 'text-[#171717]'
                    : 'text-[#737373]'
                }`}
              >
                {stage.label}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default LoadingStatus;

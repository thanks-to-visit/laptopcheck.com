import React from 'react';

export const LoadingLogo = () => {
  return (
    <div
      className="flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 md:w-[220px] md:h-[220px] rounded-[48px] bg-white p-7 sm:p-9 md:p-10 select-none"
      style={{
        boxShadow:
          '0 18px 44px -10px rgba(96, 165, 250, 0.34), -16px -8px 38px -12px rgba(248, 113, 113, 0.28), 16px 12px 40px -12px rgba(74, 222, 128, 0.30), 0 4px 16px rgba(23, 23, 23, 0.04)',
      }}
    >
      <img
        src="/icon.svg"
        alt="LaptopCheck logo"
        className="w-full h-full object-contain"
        decoding="async"
        loading="eager"
      />
    </div>
  );
};

export default LoadingLogo;

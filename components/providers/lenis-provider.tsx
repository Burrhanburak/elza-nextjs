"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { FC, useRef, ReactNode } from "react";

interface LenisScrollProviderProps {
  children: ReactNode;
}

const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef(null);
  
  return (
    <ReactLenis 
      ref={lenisRef} 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true,
        touchMultiplier: 2,
      }}
    >
      {children as any}
    </ReactLenis>
  );
};

export default LenisScrollProvider;

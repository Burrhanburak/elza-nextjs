import React from 'react'
import { Handshake } from 'lucide-react';
import Image from 'next/image';
interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      {/* <Handshake className="text-current" /> */}
      <Image src="/green-elza.svg" alt="Elaza Darya" width={28} height={28} />
      <span className="text-xl font-medium text-current">Elza Darya</span>
    </div>
  )
}

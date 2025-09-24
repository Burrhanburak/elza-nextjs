'use client';

import {
  AvatarGroup,
  AvatarGroupTooltip,
} from '@/components/animate-ui/components/animate/avatar-group';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const AVATARS = [
  {
    src: '/customer/custo-1.png',
    fallback: 'SK',
    tooltip: 'Sibel Kaya',
  },
  {
    src: '/customer/custo-2.png',
    fallback: 'BY',
    tooltip: 'Buket Yılmaz',
  },
  {
    src: '/customer/custo-3.png',
    fallback: 'DB',
    tooltip: 'Derin begaovic',
  },
  {
    src: '/customer/custo-4.png',
    fallback: 'DH',
    tooltip: 'Dilara Hür',
  },
  {
    src: '/customer/custo-5.png',
    fallback: 'MC',
    tooltip: 'Merve cimen',
  },

];

export const AvatarGroupDemo = () => {
  return (
    <AvatarGroup>
      {AVATARS.map((avatar, index) => (
        <Avatar key={index} className="size-12 border-3 border-background">
          <AvatarImage src={avatar.src} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
          <AvatarGroupTooltip>{avatar.tooltip}</AvatarGroupTooltip>
        </Avatar>
      ))}
    </AvatarGroup>
  );
};
'use client';

import { useMemo } from 'react';

import { LucideIcon, LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface IDynamicIconProps extends Omit<LucideProps, 'ref'> {
  icon: string;
}

function DynamicIcon({ icon, ...props }: IDynamicIconProps) {
  const IconComponent = useMemo<LucideIcon>(() => {
    const lowercase = icon.toLowerCase();
    const allIconNames = Object.keys(LucideIcons);
    const matchingIcon = allIconNames.find((name) => name.toLowerCase() === lowercase);

    if (matchingIcon) {
      return LucideIcons[matchingIcon as keyof typeof LucideIcons] as LucideIcon;
    }

    return LucideIcons.Check;
  }, [icon]);

  return <IconComponent {...props} />;
}

export default DynamicIcon;

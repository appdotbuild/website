import Image from 'next/image';

import { cn } from '@/lib/utils';

interface IAuthorsVariantsProps {
  avatars: string[];
  names?: string[];
  className?: string;
  priority?: boolean;
  size?: keyof typeof sizes;
}

const sizes = {
  xs: { className: 'size-7', width: 28, height: 28 },
  sm: { className: 'size-8', width: 32, height: 32 },
  md: { className: 'size-9', width: 36, height: 36 },
  lg: { className: 'size-10', width: 40, height: 40 },
  xl: { className: 'size-11', width: 44, height: 44 },
} as const;

function StackedAvatars({
  className,
  avatars,
  names,
  priority = false,
  size = 'md',
}: IAuthorsVariantsProps) {
  const isMultipleAuthors = avatars.length > 1;

  if (avatars.length === 0) {
    return null;
  }

  const { className: imageClassName, width, height } = sizes[size] || sizes.md;

  if (avatars.length === 1) {
    return (
      <Image
        className={cn('shrink-0 rounded-full bg-muted', imageClassName, className)}
        src={avatars[0]}
        alt={names?.[0] ?? ''}
        width={width}
        height={height}
        priority={priority}
        quality={100}
      />
    );
  }

  return (
    <div className={cn('flex shrink-0 items-center', className)}>
      {avatars.map((avatar, index) => (
        <Image
          key={index}
          className={cn(
            'relative shrink-0 rounded-full bg-muted',
            {
              '-ml-2.5': index > 0 && size === 'xs',
              '-ml-3': index > 0 && size === 'sm',
              '-ml-3.5': index > 0 && ['md', 'lg'].includes(size),
              '-ml-4': index > 0 && size === 'xl',
            },
            isMultipleAuthors && 'outline outline-2 outline-background',
            imageClassName,
          )}
          src={avatar}
          alt={names?.[index] ?? ''}
          width={width}
          height={height}
          priority={priority}
          quality={100}
        />
      ))}
    </div>
  );
}

export default StackedAvatars;

import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn(' max-w-[1920px] px-1.5 sm:px-3', className)}>{children}</div>;
};
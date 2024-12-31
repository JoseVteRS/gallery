import { cn } from '@/lib/utils';
import React from 'react';

export const SeparatorWithText = ({
  text = "or",
  className,
}: {
  text?: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-center", className)}  >
      <div className="w-full border-t border-gray-300"></div>
      <span className="px-2 text-gray-500">{text}</span>
      <div className="w-full border-t border-gray-300"></div>
    </div>
  );
};

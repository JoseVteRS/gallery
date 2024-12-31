import React from "react";

export const LoadingState = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      {children && <p className="text-sm text-muted-foreground">{children}</p>}
    </div>
  );
};

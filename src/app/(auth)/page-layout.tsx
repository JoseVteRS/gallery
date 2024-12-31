import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout(props: {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex justify-center px-4 py-4 md:px-6">
      <div className="w-[1250px] min-w-0 max-w-[1250px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2>{props.title}</h2>
            {props.description && <p>{props.description}</p>}
          </div>
          {props.actions}
        </div>
        <div className="mt-4 flex flex-col gap-4">{props.children}</div>
      </div>
    </div>
  );
}

'use client';

import { ReactElement, ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    content: string;
}

export const Tooltip = ({ children, content }: TooltipProps): ReactElement => {
    if (!content) return <>{children}</>;

    return (
        <div className="group relative">
            {children}
            <div className="pointer-events-none absolute -top-10 left-1/2 w-[200px] -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-md bg-neutral-800 px-3 py-1 text-sm text-white">
                    {content}
                </div>
                <div className="absolute left-1/2 top-full size-2 -translate-x-1/2 rotate-45 bg-neutral-800" />
            </div>
        </div>
    );
};

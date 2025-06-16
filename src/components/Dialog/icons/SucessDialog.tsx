import * as React from "react";

export const SucessDialog = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={56}
            height={56}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x={4} y={4} width={48} height={48} rx={24} fill="#D1FADF" />
            <rect
                x={4}
                y={4}
                width={48}
                height={48}
                rx={24}
                stroke="#ECFDF3"
                strokeWidth={8}
            />
            <path
                d="M23.5 28l3 3 6-6m5.5 3c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
                stroke="#039855"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

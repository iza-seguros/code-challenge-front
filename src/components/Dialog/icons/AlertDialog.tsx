import * as React from "react";

export const AlertDialog = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={56}
            height={56}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x={4} y={4} width={48} height={48} rx={24} fill="#FEF0C7" />
            <rect
                x={4}
                y={4}
                width={48}
                height={48}
                rx={24}
                stroke="#FFFAEB"
                strokeWidth={8}
            />
            <path
                d="M26.738 17.963l-8.47 14.14a2 2 0 001.71 3h16.94a2 2 0 001.71-3l-8.47-14.14a2.002 2.002 0 00-3.42 0zM28.448 23.103v4M28.448 31.103h.01"
                stroke="#F57F3C"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

import * as React from "react";

export const CloseDialog = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={14}
            height={14}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M13 1L1 13M1 1l12 12"
                stroke="#667085"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

import * as React from "react";

export const InfoDialog = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={56}
            height={56}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x={4} y={4} width={48} height={48} rx={24} fill="#B9E6FE" />
            <rect
                x={4}
                y={4}
                width={48}
                height={48}
                rx={24}
                stroke="#E0F2FE"
                strokeWidth={8}
            />
            <g clipPath="url(#prefix__clip0_1302_5297)">
                <path
                    d="M26.75 21.75h2.5v2.5h-2.5v-2.5zm0 5h2.5v7.5h-2.5v-7.5zM28 15.5c-6.9 0-12.5 5.6-12.5 12.5S21.1 40.5 28 40.5 40.5 34.9 40.5 28 34.9 15.5 28 15.5zM28 38c-5.512 0-10-4.487-10-10 0-5.512 4.488-10 10-10 5.513 0 10 4.488 10 10 0 5.513-4.487 10-10 10z"
                    fill="#2F7EAA"
                />
            </g>
            <defs>
                <clipPath id="prefix__clip0_1302_5297">
                    <path
                        fill="#fff"
                        transform="translate(13 13)"
                        d="M0 0h30v30H0z"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

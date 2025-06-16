import { IconTypes } from ".";

export const Arrow = ({ className, props }: IconTypes) => (
    <div className={className}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={8}
            height={8}
            fill="none"
            viewBox="0 0 60 33"
            {...props}
        >
            <path
                fill="#9b98a8"
                fillRule="evenodd"
                d="M60 4.17 55.782 0 29.961 24.784l-2.754-2.644.015.014L4.281.134 0 4.243C6.339 10.33 24.042 27.321 29.961 33c4.398-4.218.111-.105 30.039-28.83"
                clipRule="evenodd"
            />
        </svg>
    </div>
);

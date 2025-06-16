export const Pencil = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={17}
            height={17}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.707.293a1 1 0 00-1.414 0l-13 13A1 1 0 000 14v5a1 1 0 001 1h5a1 1 0 00.707-.293l13-13a1 1 0 000-1.414l-5-5zM3.53 15.943L2 14.415l12-12L17.586 6l-12 12-2.057-2.056z"
                fill="#5b6066"
            />
        </svg>
    );
};

export const Close = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={17}
            height={17}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                d="M16.79 8.22a.714.714 0 00-1.01-1.01L12 10.99 8.22 7.21a.714.714 0 10-1.01 1.01L10.99 12l-3.78 3.78a.714.714 0 001.01 1.01L12 13.01l3.78 3.78a.714.714 0 001.01-1.01L13.01 12l3.78-3.78z"
                fill="#f06363"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm0-1.833a9.167 9.167 0 100-18.334 9.167 9.167 0 000 18.334z"
                fill="#f06363"
            />
        </svg>
    );
};

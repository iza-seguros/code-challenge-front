type RowProps = {
    children: React.ReactNode;
};

export const Row = ({ children }: RowProps) => {
    return <div className=" w-full flex gap-2 ">{children}</div>;
};

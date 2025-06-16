import React from "react";

type TableProps = {
    children: React.ReactNode;
    minWidth?: number | string;
};

type ChildrenProps = {
    children: React.ReactNode;
};

const getUnits = (value: number | string): string => {
    if (typeof value === "string") {
        return value;
    }
    return `${value}px`;
};

export const Table: React.FC<TableProps> = ({ children, minWidth }) => {
    const tableStyle = {
        minWidth: minWidth ? getUnits(minWidth) : "auto",
    };

    return (
        <table className="w-full border-collapse" style={tableStyle}>
            {children}
        </table>
    );
};

export const Thead = ({ children }: ChildrenProps) => {
    return <thead>{children}</thead>;
};

export const Tr = ({ children }: ChildrenProps) => {
    return <tr className="bg-white border-[#ddd] border-b">{children}</tr>;
};

export const Th = ({ children }: ChildrenProps) => {
    return (
        <th className="bg-white h-[60px] p-2 text-[10px] font-semibold text-[#a0aec0] uppercase text-left sticky top-[-20px]">
            {children}
        </th>
    );
};

export const Tbody = ({ children }: ChildrenProps) => {
    return <tbody>{children}</tbody>;
};

export const Td = ({ children }: ChildrenProps) => {
    return (
        <td className="text-[13px] p-2 h-[35px] font-bold text-[#2d3748] text-left py-[10px]">
            {children}
        </td>
    );
};

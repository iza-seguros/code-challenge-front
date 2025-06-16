import { ReactNode } from "react";

type DescriptionProps = {
    children: ReactNode;
};

export const Description = ({ children }: DescriptionProps) => {
    return <span className="text-slateDark text-sm">{children}</span>;
};

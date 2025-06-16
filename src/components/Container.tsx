import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
    return <main className="bg-neutral-200 w-screen h-screen">{children}</main>;
};

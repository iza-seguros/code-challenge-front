import { FormHTMLAttributes, ReactNode } from "react";

type FormProps = {
    children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, ...rest }: FormProps) => {
    return (
        <form
            className="w-full h-auto flex-shrink-0 flex flex-col gap-2"
            {...rest}
        >
            {children}
        </form>
    );
};

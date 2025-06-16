import { ReactNode } from "react";

type BoxWrapperProps = {
    children: ReactNode;
    titleStep: string;
};

export const BoxWrapper = ({ children, titleStep }: BoxWrapperProps) => {
    return (
        <section className="p-8 bg-white shadow-sm rounded-2xl w-[40%] min-w-2xl mt-10 m-auto max-[740px]:w-[90%] max-[740px]:min-w-[90%]">
            <h2 className="text-slateDark text-2xl font-semibold mb-6">
                {titleStep}
            </h2>
            {children}
        </section>
    );
};

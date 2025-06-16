import { InputHTMLAttributes, useId } from "react";

type CheckboxProps = {
    disabled?: boolean;
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ disabled, label, ...rest }: CheckboxProps) => {
    const id = useId();
    return (
        <div
            className={`inline-flex items-center w-fit gap-2 ${
                disabled && "opacity-30"
            }`}
        >
            <div
                className="relative flex cursor-pointer items-center rounded-full gap-2"
                data-ripple-dark="true"
            >
                <input
                    id={id}
                    type="checkbox"
                    className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:border-slate-800 checked:bg-slate-800 checked:before:bg-slate-400 hover:before:opacity-10"
                    {...rest}
                />
                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </span>
            </div>
            {label && (
                <label htmlFor={id} className="text-xs text-gray-700">
                    {label}
                </label>
            )}
        </div>
    );
};

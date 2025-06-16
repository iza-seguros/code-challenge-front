import { cepMask, MaskOptions, phoneMask } from "@/utils/regexMask";
import { ChangeEvent, InputHTMLAttributes, JSX, Ref } from "react";
import { Spinner } from "../Spinner";

type InputProps = {
    iconLeft?: JSX.Element;
    label?: string;
    message?: string;
    width?: number | string;
    height?: number;
    ref?: Ref<HTMLInputElement> | undefined;
    maskType?: "cep" | "phone";
    loading?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
    iconLeft,
    label,
    message,
    width = "100%",
    height = 34,
    type = "text",
    maskType,
    ref,
    loading,
    onChange,
    ...rest
}: InputProps) => {
    const masks: MaskOptions = {
        cep: cepMask,
        phone: phoneMask,
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (maskType !== undefined) {
            const selectedMask = masks[maskType];
            if (selectedMask) {
                const maskedValue = selectedMask(event.target.value);
                event.target.value = maskedValue;
            }
        }
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="relative" style={{ width: width }}>
            <label htmlFor="" className="text-[#344054] font-medium text-sm">
                {label}
            </label>
            <div
                style={{ height: height }}
                className=" border border-[#c8ced8] bg-white rounded-md flex items-center gap-1 h-8 p-4 px-3 focus-within:border focus-within:border-[#1c64ff73] focus-within:shadow-within"
            >
                {iconLeft}
                <input
                    ref={ref}
                    type={type}
                    className="w-full outline-none text-sm font-normal text-zinc-600"
                    onChange={(e) => {
                        handleInputChange(e);
                    }}
                    {...rest}
                />
                {loading && <Spinner />}
            </div>
            <span className="text-[10px] absolute -bottom-4 right-2 text-red-600 font-medium">
                {message}
            </span>
        </div>
    );
};

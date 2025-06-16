import { ButtonHTMLAttributes, useState } from "react";
import { Spinner } from "../Spinner";

type ButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
    loadingText?: string;
    width?: number | string;
    height?: number | string;
    variant?: "contained" | "outlined";
    color?: "neutral" | "success" | "info" | "alert" | "danger";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getColorValue = (
    color: ButtonProps["color"],
    type: "background" | "border" | "text" | "hover" = "background"
) => {
    const colors = {
        background: {
            neutral: "#FFF",
            success: "#32D583",
            info: "#006999",
            alert: "#F57F3C",
            danger: "#FF5F57",
        },
        border: {
            neutral: "#a8afb9",
            success: "#32D583",
            info: "#006999",
            alert: "#F57F3C",
            danger: "#FF5F57",
        },
        text: {
            neutral: "#344054",
            success: "#FFF",
            info: "#FFF",
            alert: "#FFF",
            danger: "#FFF",
        },
        hover: {
            neutral: "#e2e5eb",
            success: "#28bd73",
            info: "#194253",
            alert: "#d87237",
            danger: "#e44c44",
        },
    };

    return colors[type][color!] || colors[type]["neutral"];
};

export const Button = ({
    children,
    loading,
    loadingText = "Enviando...",
    width = 144,
    height = 36,
    variant = "contained",
    color = "success",
    disabled,
    ...rest
}: ButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyles = {
        width: width,
        minWidth: 144,
        height: height,
        minHeight: 36,
        backgroundColor:
            variant === "contained"
                ? isHovered
                    ? getColorValue(color, "hover")
                    : getColorValue(color, "background")
                : "transparent",
        border: `1px solid ${getColorValue(color, "border")}`,
        color:
            variant === "contained"
                ? getColorValue(color, "text")
                : getColorValue(
                      color,
                      variant === "outlined" ? "border" : "text"
                  ),
        transition: "background-color 0.3s ease, border-color 0.3s ease",
    };

    return (
        <button
            {...rest}
            style={buttonStyles}
            disabled={disabled}
            className={`w-fit px-4 flex items-center justify-center gap-2 transition-colors duration-300 rounded-lg cursor-pointer active:relative active:top-[1px] select-none max-[580px]:w-full disabled:pointer-events-none disabled:opacity-[0.5] ${
                loading && "pointer-events-none opacity-[0.5]"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="text-sm font-semibold">
                {loading ? loadingText : children}
            </span>
            {loading && <Spinner />}
        </button>
    );
};

import {
    AlertDialog,
    DeleteDialog,
    ErrorDialog,
    InfoDialog,
    SucessDialog,
    CloseDialog,
} from "./icons";
import { Button } from "../Forms";
import { JSX } from "react";

export type DialogProps = {
    open: boolean;
    onClose?: () => void;
    type: "success" | "error" | "info" | "delete" | "alert";
    title: string;
    message: string;
    onClickCancel?: () => void;
    onClickConfirm?: () => void;
    titleButtonCancel?: string;
    titleButtonConfirm?: string;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    position?: "fixed" | "absolute";
};

export const Dialog = ({
    open,
    onClose,
    type,
    title,
    message,
    onClickCancel,
    onClickConfirm,
    titleButtonCancel = "Cancelar",
    titleButtonConfirm = "Confirmar",
    position = "absolute",
}: DialogProps) => {
    const defineIcon = (type: DialogProps["type"]): JSX.Element => {
        const listIcons: Record<DialogProps["type"], JSX.Element> = {
            success: <SucessDialog />,
            error: <ErrorDialog />,
            info: <InfoDialog />,
            delete: <DeleteDialog />,
            alert: <AlertDialog />,
        };

        return listIcons[type] || <InfoDialog />;
    };

    const getTypeButton = ():
        | "success"
        | "info"
        | "alert"
        | "neutral"
        | "danger"
        | undefined => {
        const types: Record<
            DialogProps["type"],
            "success" | "info" | "alert" | "neutral" | "danger" | undefined
        > = {
            success: "success",
            error: "danger",
            info: "info",
            delete: "danger",
            alert: "alert",
        };

        return types[type] || "success";
    };

    if (!open) {
        return null;
    }

    return (
        <div
            className={`w-[500px] max-[576px]:w-[90%] h-fit max-h-[95vh] bg-white border border-zinc-300 rounded-lg p-6 flex flex-col gap-4 animate-scale-up ${
                position === "fixed" ? "fixed" : "absolute"
            } top-0 left-0 right-0 bottom-0 m-auto shadow-lg z-50`}
        >
            <div className="flex items-center justify-between">
                {defineIcon(type)}
                <div
                    className="w-6 h-6 flex items-center justify-center cursor-pointer active:relative active:top-px"
                    onClick={onClose}
                >
                    <CloseDialog />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-lg font-semibold text-gray-900">
                    {title}
                </span>
                <span className="text-sm text-gray-700">{message}</span>
            </div>
            <div className="flex gap-4 items-center justify-end">
                {onClickCancel && (
                    <Button
                        onClick={onClickCancel}
                        color="neutral"
                        variant="outlined"
                    >
                        {titleButtonCancel}
                    </Button>
                )}
                {onClickConfirm && (
                    <Button onClick={onClickConfirm} color={getTypeButton()}>
                        {titleButtonConfirm}
                    </Button>
                )}
            </div>
        </div>
    );
};

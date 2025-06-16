"use client";

import { LogoIza } from "@/assets/icons/types";
import { useFormStep } from "@/store/formStep";
import { useFormStore } from "@/store/formStore";
import Link from "next/link";

type HeaderProps = {
    title: string;
};

export const Header = ({ title }: HeaderProps) => {
    const { resetStep } = useFormStep();
    const { setModeEdit, setTriggerResetForm } = useFormStore();

    const resetConfigs = (): void => {
        setTriggerResetForm();
        setModeEdit({ status: false });
        resetStep();
    };

    return (
        <header className="w-full h-18 border-0 border-b-[1px] shadow-xm border-b-[#ECEEEB] bg-white flex items-center justify-between p-5 max-[570px]:flex-col max-[570px]:p-0 max-[570px]:h-20 max-[570px]:justify-center">
            <div className="flex items-center gap-10">
                <LogoIza />
                <span className="text-[20px] font-semibold text-slateDark max-[570px]:text-[18px]">
                    {title}
                </span>
            </div>
            <div className="flex items-center gap-5">
                <Link
                    href="/list-data"
                    className="text-sm text-blue-950 underline"
                    onClick={resetConfigs}
                >
                    Lista de registros
                </Link>
                <Link
                    href="/form-register"
                    className="text-sm text-blue-950 underline"
                    onClick={resetConfigs}
                >
                    Novo registro
                </Link>
            </div>
        </header>
    );
};

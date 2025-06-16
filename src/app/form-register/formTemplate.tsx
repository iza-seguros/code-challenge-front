"use client";

import { useState } from "react";
import { BoxWrapper } from "@/components/BoxWrapper";
import { PersonalDataStep } from "./personalDataStep";
import { AddressStep } from "./addressStep";
import { TitleStep } from "@/constants/formsContants";
import { Confirmation } from "./confirmation";
import { StepIndicator } from "@/components/StepIndicator";
import { useFormStep } from "@/store/formStep";
import { Dialog, DialogProps } from "@/components/Dialog";

export const FormTemplate = () => {
    const { currentForm } = useFormStep();
    const [dialog, setDialog] = useState<DialogProps>({
        open: false,
        title: "",
        message: "",
        type: "success",
        onClose: undefined,
    });

    return (
        <BoxWrapper titleStep={TitleStep[currentForm]}>
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentForm * 100}%)` }}
                >
                    <PersonalDataStep />
                    <AddressStep />
                    <Confirmation setDialog={setDialog} />
                </div>
            </div>
            <StepIndicator currentForm={currentForm} />
            <Dialog
                {...dialog}
                onClose={() => setDialog((prev) => ({ ...prev, open: false }))}
            />
        </BoxWrapper>
    );
};

import { create } from "zustand";

type FormStepState = {
    currentForm: number;
    nextForm: () => void;
    prevForm: () => void;
    resetStep: () => void;
};

export const useFormStep = create<FormStepState>((set) => ({
    currentForm: 0,
    resetStep: () => {
        set(() => ({
            currentForm: 0,
        }));
    },
    nextForm: () =>
        set((state) => ({
            currentForm:
                state.currentForm < 2
                    ? state.currentForm + 1
                    : state.currentForm,
        })),
    prevForm: () =>
        set((state) => ({
            currentForm:
                state.currentForm > 0
                    ? state.currentForm - 1
                    : state.currentForm,
        })),
}));

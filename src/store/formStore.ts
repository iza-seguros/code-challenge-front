import { PartialFormTypes } from "@/domain/users/types";
import { create } from "zustand";

type ModeEditTypes = {
    status: boolean;
    id?: number;
};

type FormStoreTypes = {
    dataformStore: PartialFormTypes;
    addDataformStore: (newData: PartialFormTypes) => void;
    modeEdit: ModeEditTypes;
    setModeEdit: (params: { id?: number; status: boolean }) => void;
    triggerResetForm: boolean;
    setTriggerResetForm: () => void;
};

export const useFormStore = create<FormStoreTypes>((set) => ({
    dataformStore: { terms_accepted: false },
    modeEdit: { id: undefined, status: false },
    triggerResetForm: false,
    addDataformStore(newData) {
        set((state) => ({
            dataformStore: { ...state.dataformStore, ...newData },
        }));
    },
    setModeEdit({ id, status }) {
        set(() => ({
            modeEdit: { id, status: status },
        }));
    },
    setTriggerResetForm() {
        set((state) => ({
            triggerResetForm: !state.triggerResetForm,
        }));
    },
}));

export function useFormData() {
    const dataformStore = useFormStore((state) => state.dataformStore);
    return { dataformStore };
}

export function useFormServices() {
    const addDataformStore = useFormStore((state) => state.addDataformStore);
    return { addDataformStore };
}

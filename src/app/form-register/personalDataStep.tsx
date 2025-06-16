import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input } from "@/components/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormData, useFormServices, useFormStore } from "@/store/formStore";
import { useFormStep } from "@/store/formStep";
import { handleLastInputKeyDown } from "@/utils/functions";

const PersonalFormSchema = z.object({
    full_name: z.string().trim().min(1, "O campo nome é obrigatório"),
    email: z
        .string()
        .trim()
        .min(1, "O campo e-mail é obrigatório")
        .email("Formato de e-mail inválido"),

    phone: z.string().trim().min(1, "O campo telefone é obrigatório"),
});

type PersonalFormTypes = z.infer<typeof PersonalFormSchema>;

export const PersonalDataStep = () => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isValid },
    } = useForm<PersonalFormTypes>({
        resolver: zodResolver(PersonalFormSchema),
    });
    const { addDataformStore } = useFormServices();
    const { dataformStore } = useFormData();
    const { triggerResetForm, modeEdit } = useFormStore();
    const { nextForm } = useFormStep();

    const loadForm = (data: PersonalFormTypes) => {
        addDataformStore(data);
        nextForm();
    };

    useEffect(() => {
        const clearInputs: PersonalFormTypes = {
            email: "",
            full_name: "",
            phone: "",
        };

        reset(clearInputs);
    }, [reset, triggerResetForm]);

    useEffect(() => {
        if (modeEdit.status === false) {
            addDataformStore({
                full_name: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                number: "",
                state: "",
                terms_accepted: false,
                zip_code: "",
            });
        }
    }, [addDataformStore, modeEdit]);

    useEffect(() => {
        if (dataformStore) {
            if (dataformStore.full_name)
                setValue("full_name", dataformStore.full_name);
            if (dataformStore.email) setValue("email", dataformStore.email);
            if (dataformStore.phone) setValue("phone", dataformStore.phone);
        }
    }, [dataformStore, setValue]);

    return (
        <Form>
            <Input
                label="Nome completo:"
                {...register("full_name")}
                message={errors.full_name?.message}
            />
            <Input
                label="E-mail:"
                type="email"
                {...register("email")}
                message={errors.email?.message}
            />
            <Input
                label="Telefone:"
                {...register("phone")}
                message={errors.phone?.message}
                maskType="phone"
                onKeyDown={handleLastInputKeyDown}
            />
            <div className="flex justify-end mt-4">
                <Button
                    disabled={!isValid}
                    onClick={handleSubmit(loadForm)}
                    type="button"
                >
                    Próximo
                </Button>
            </div>
        </Form>
    );
};

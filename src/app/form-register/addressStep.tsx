import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Input, Row } from "@/components/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "@/components/Forms/Select";
import { dataStateAcronyms } from "@/constants/formsContants";
import { useFormData, useFormServices, useFormStore } from "@/store/formStore";
import { useFormStep } from "@/store/formStep";
import { useGetZipCode } from "@/domain/zipcode/useCases/useGetZipCode";
import { handleLastInputKeyDown } from "@/utils/functions";

const AddressFormSchema = z.object({
    zip_code: z.string().trim().min(9, "O campo CEP é obrigatório"),
    address: z.string().trim().min(1, "O campo endereço é obrigatório"),
    number: z.string().trim().min(1, "O campo número é obrigatório"),
    city: z.string().trim().min(1, "O campo cidade é obrigatório"),
    state: z.string().nonempty("O campo estado é obrigatório"),
});

type PersonalFormTypes = z.infer<typeof AddressFormSchema>;

export const AddressStep = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setValue,
        watch,
    } = useForm<PersonalFormTypes>({
        resolver: zodResolver(AddressFormSchema),
    });

    const { addDataformStore } = useFormServices();
    const { dataformStore } = useFormData();
    const { triggerResetForm } = useFormStore();
    const { nextForm, prevForm } = useFormStep();
    const { getZipCode, data, loading } = useGetZipCode();

    const loadFormAddress = (data: PersonalFormTypes) => {
        addDataformStore(data);
        nextForm();
    };

    const zipCode = watch("zip_code");

    useEffect(() => {
        if (zipCode && zipCode.length === 9) {
            getZipCode(zipCode);
        }
    }, [zipCode, getZipCode]);

    useEffect(() => {
        if (data?.erro) {
            setValue("address", "Endereço não encontrado!");
            setValue("city", "Cidade não encontrada");
        }
        if (data) {
            if (data.logradouro) setValue("address", data.logradouro);
            if (data.localidade) setValue("city", data.localidade);
            if (data.uf) setValue("state", data.uf);
        }
    }, [data, setValue]);

    useEffect(() => {
        if (dataformStore) {
            if (dataformStore.zip_code)
                setValue("zip_code", dataformStore.zip_code);
            if (dataformStore.number) setValue("number", dataformStore.number);
            if (dataformStore.address)
                setValue("address", dataformStore.address);
            if (dataformStore.city) setValue("city", dataformStore.city);
            if (dataformStore.state) setValue("state", dataformStore.state);
        }
    }, [dataformStore, setValue]);

    useEffect(() => {
        const clearInputs: PersonalFormTypes = {
            address: "",
            city: "",
            number: "",
            state: "",
            zip_code: "",
        };
        reset(clearInputs);
    }, [reset, triggerResetForm]);

    return (
        <Form>
            <Input
                label="Cep:"
                {...register("zip_code")}
                message={errors.zip_code?.message}
                maskType="cep"
                loading={loading}
            />
            <Row>
                <Input
                    label="Endereço:"
                    {...register("address")}
                    message={errors.address?.message}
                />
                <Input
                    label="Número:"
                    {...register("number")}
                    message={errors.number?.message}
                    width={90}
                />
            </Row>
            <Row>
                <Input
                    label="Cidade:"
                    {...register("city")}
                    message={errors.city?.message}
                />
                <Select
                    {...register("state")}
                    label="Estado:"
                    data={dataStateAcronyms}
                />
            </Row>
            <div className="flex justify-end gap-2 mt-4">
                <Button
                    type="button"
                    onClick={prevForm}
                    onKeyDown={handleLastInputKeyDown}
                >
                    Anterior
                </Button>
                <Button
                    type="button"
                    disabled={!isValid}
                    onClick={handleSubmit(loadFormAddress)}
                >
                    Próximo
                </Button>
            </div>
        </Form>
    );
};

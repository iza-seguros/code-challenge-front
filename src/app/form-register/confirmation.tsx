import { Button, Checkbox, Form } from "@/components/Forms";
import { Description } from "@/components/Description";
import { useFormData, useFormServices, useFormStore } from "@/store/formStore";
import { useCreateUser } from "@/domain/users/useCases/useCreateUser";
import { useFormStep } from "@/store/formStep";
import { Dispatch, SetStateAction } from "react";
import { DialogProps } from "@/components/Dialog";
import { useEditUser } from "@/domain/users/useCases/useEditUser";
import { FormTypesWithId } from "@/domain/users/types";

type ConfirmationProps = {
    setDialog: Dispatch<SetStateAction<DialogProps>>;
};

export const Confirmation = ({ setDialog }: ConfirmationProps) => {
    const { addDataformStore } = useFormServices();
    const { dataformStore } = useFormData();
    const { modeEdit, setTriggerResetForm } = useFormStore();
    const { prevForm, resetStep } = useFormStep();
    const { editUser, loading: loadingEdit } = useEditUser({
        onSucess() {
            setDialog({
                open: true,
                type: "success",
                title: "Edição de dados",
                message: "Dados editados com sucesso!",
            });
            resetStep();
            setTriggerResetForm();
        },
        onError(error) {
            setDialog({
                open: true,
                type: "error",
                title: "Erro ao salvar usuário",
                message: error as string,
            });
        },
    });
    const { createUser, loading } = useCreateUser({
        onSucess() {
            setDialog({
                open: true,
                type: "success",
                title: "Envio de dados",
                message: "Dados salvos com sucesso!",
            });
            resetStep();
            setTriggerResetForm();
        },
        onError(error) {
            setDialog({
                open: true,
                type: "error",
                title: "Erro ao salvar usuário",
                message: error as string,
            });
        },
    });

    const handleSubmit = (): void => {
        console.log({ a: modeEdit.status, b: modeEdit.id });
        if (modeEdit.status && modeEdit.id) {
            console.log("caiu na edição");
            editUser(modeEdit.id, dataformStore as FormTypesWithId);
            return;
        }
        createUser(dataformStore);
    };

    return (
        <Form>
            <div className="flex flex-col gap-2">
                <h2 className="text-slateDark">
                    Revise suas informações antes de enviar
                </h2>
                <span className="text-slateDark text-sm">
                    Confira os dados preenchidos. Se estiver tudo certo,
                    finalize clicando em Enviar. Caso precise, você pode voltar
                    e corrigir.
                </span>
            </div>
            <div className="w-full h-auto border border-gray-300 rounded-2xl mt-4 p-3 flex flex-col gap-2">
                <Description>
                    Nome completo: {dataformStore.full_name}
                </Description>
                <Description>Email: {dataformStore.email}</Description>
                <Description>Telefone: {dataformStore.phone}</Description>
                <Description>CEP: {dataformStore.zip_code}</Description>
                <Description>Endereço: {dataformStore.address}</Description>
                <Description>Número: {dataformStore.number}</Description>
                <Description>Cidade: {dataformStore.city}</Description>
                <Description>Estado: {dataformStore.state}</Description>
            </div>
            <Checkbox
                label="Confirmo que os dados estão corretos."
                checked={dataformStore.terms_accepted}
                onChange={(e) =>
                    addDataformStore({ terms_accepted: e.target.checked })
                }
            />
            <div className="flex justify-end gap-2 mt-4">
                <Button type="button" onClick={prevForm}>
                    Anterior
                </Button>
                <Button
                    type="button"
                    loading={loading || loadingEdit}
                    disabled={!dataformStore.terms_accepted}
                    onClick={handleSubmit}
                >
                    Salvar
                </Button>
            </div>
        </Form>
    );
};

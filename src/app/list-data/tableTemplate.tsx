"use client";

import { useRouter } from "next/navigation";
import { Close } from "@/assets/icons/Close";
import { Pencil } from "@/assets/icons/Pencil";
import { Button } from "@/components/Forms";
import { Table, Thead, Tbody, Td, Th, Tr } from "@/components/Table";
import { FormTypes } from "@/domain/users/types";
import { useFormServices, useFormStore } from "@/store/formStore";
import { useDeleteUser } from "@/domain/users/useCases/useDeleteUser";
import { Dialog, DialogProps } from "@/components/Dialog";
import { useState } from "react";
import { downloadCSVFromJson } from "@/utils/functions";

type TableTemplateProps = {
    listUsers: Array<FormTypes>;
};

export const TableTemplate = ({ listUsers }: TableTemplateProps) => {
    const [dialog, setDialog] = useState<DialogProps>({
        open: false,
        title: "",
        message: "",
        type: "success",
        onClose: undefined,
        onClickCancel: undefined,
        onClickConfirm: undefined,
    });

    const router = useRouter();
    const { setModeEdit } = useFormStore();
    const { addDataformStore } = useFormServices();

    const { deleteUser } = useDeleteUser({
        async onSucess() {
            setDialog({
                open: true,
                type: "success",
                title: "Exclusão de usuário",
                message: "Usuário excluído com sucesso!",
            });
            router.refresh();
        },
        onError(error) {
            setDialog({
                open: true,
                type: "error",
                title: "Erro ao excluir usuário",
                message: error instanceof Error ? error.message : String(error),
            });
        },
    });

    /**
     * Função responsável por lidar com a exclusão de um usuário.
     *
     * IMPORTANTE: Por padrão, o back-end local (API) não estava enviando o campo `id` na resposta da listagem de usuários.
     * Para contornar esse problema e evitar erros na exclusão, foi feita uma alteração local no back-end para incluir o `id`.
     * No entanto, para garantir a retrocompatibilidade e evitar falhas em caso de esquecimento ou inconsistência da API,
     * esta função implementa um fallback:
     *
     * Caso o `id` ainda não venha na resposta da API, será utilizado o índice do array + 1 (`index + 1`) como ID provisório
     * para identificação e exclusão do usuário.
     */

    const handleDeleteUser = (users: FormTypes, index: number): void => {
        if ("id" in users) {
            setDialog({
                open: true,
                type: "delete",
                title: "Exclusão de usuário",
                message: `Deseja realmente apagar o usuário ${users.full_name} ?`,
                onClickCancel() {
                    setDialog((prev) => ({ ...prev, open: false }));
                },
                onClickConfirm() {
                    deleteUser(users.id as number);
                },
            });
            return;
        }

        setDialog({
            open: true,
            type: "delete",
            title: "Exclusão de usuário",
            message: `Deseja realmente apagar o usuário ${users.full_name} ?`,
            onClickCancel() {
                setDialog((prev) => ({ ...prev, open: false }));
            },
            onClickConfirm() {
                deleteUser(index + 1);
            },
        });
    };

    const handleEditUser = (users: FormTypes, index: number): void => {
        if ("id" in users) {
            setModeEdit({ status: true, id: users.id as number });
            addDataformStore(users);
            router.push("/form-register");
            return;
        }

        setModeEdit({ status: true, id: index + 1 });
        addDataformStore(users);
        router.push("/form-register");
    };

    const navigateToFormRegister = (): void => {
        setModeEdit({ status: false });
        router.push("/form-register");
    };

    const handleExportCSV = (): void => {
        downloadCSVFromJson("usuarios.csv", listUsers);
    };

    return (
        <div className="w-[90%] max-h-[80vh] min-h-[80vh] m-auto mt-10 bg-white p-5 rounded-2xl overflow-scroll">
            <div className="flex items-center gap-4">
                <Button width={220} onClick={navigateToFormRegister}>
                    Adicionar novo registro
                </Button>
                <Button color="info" onClick={handleExportCSV}>
                    Exportar CSV
                </Button>
            </div>
            <Table minWidth={1300}>
                <Thead>
                    <Tr>
                        <Th>Nome completo</Th>
                        <Th>E-mail</Th>
                        <Th>Telefone</Th>
                        <Th>CEP</Th>
                        <Th>Endereço</Th>
                        <Th>Número</Th>
                        <Th>Cidade</Th>
                        <Th>Estado</Th>
                        <Th>Editar</Th>
                        <Th>Excluir</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {listUsers.length > 0 ? (
                        listUsers.map((users, index) => (
                            <Tr key={index}>
                                <Td>{users.full_name}</Td>
                                <Td>{users.email}</Td>
                                <Td>{users.phone}</Td>
                                <Td>{users.zip_code}</Td>
                                <Td>{users.address}</Td>
                                <Td>{users.number}</Td>
                                <Td>{users.city}</Td>
                                <Td>{users.state}</Td>
                                <Td>
                                    <div
                                        className="cursor-pointer flex items-center justify-center w-5 active:relative active:top-[1px]"
                                        onClick={() =>
                                            handleEditUser(users, index)
                                        }
                                    >
                                        <Pencil />
                                    </div>
                                </Td>
                                <Td>
                                    <div
                                        className="cursor-pointer flex items-center justify-center w-5 active:relative active:top-[1px]"
                                        onClick={() =>
                                            handleDeleteUser(users, index)
                                        }
                                    >
                                        <Close />
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td>Nenhum usuário foi registrado</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <Dialog
                {...dialog}
                onClose={() => setDialog((prev) => ({ ...prev, open: false }))}
            />
        </div>
    );
};

import { Header } from "@/components/Header";
import { FormTemplate } from "./formTemplate";

export default function FormRegister() {
    return (
        <main className="bg-neutral-200 w-screen h-screen">
            <Header title="Formulário de Cadastro de Usuário" />
            <FormTemplate />
        </main>
    );
}

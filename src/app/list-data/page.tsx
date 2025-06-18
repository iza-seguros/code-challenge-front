import { Header } from "@/components/Header";
import { TableTemplate } from "./tableTemplate";
import { Container } from "@/components/Container";
import { getListAllUsers } from "@/data/users/getListAllUsers";

export default async function ListData() {
    const listUsers = await getListAllUsers();

    return (
        <Container>
            <Header title="Tabela de registros" />
            <TableTemplate listUsers={listUsers} />
        </Container>
    );
}

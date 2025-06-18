export async function getListAllUsers() {
    "use server";

    try {
        const response = await fetch("http://localhost:7000/users", {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            console.error(
                `Erro na API: ${response.status} - ${response.statusText}`
            );
            return [];
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Falha ao buscar usuários:", error);
        return [];
    }
}

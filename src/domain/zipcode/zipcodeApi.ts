import { ApiError } from "../users/types";

async function getZipCode(zipCode: string) {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(errorData.message, response.status, errorData);
    }

    return response.json();
}

export const zipCodeApi = { getZipCode };

import { ApiError, FormTypesWithId, PartialFormTypes } from "./types";

async function createUser(data: PartialFormTypes) {
    const url = "http://localhost:7000/users";
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
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

async function deleteUser(id: number) {
    const response = await fetch(`http://localhost:7000/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(errorData.message, response.status, errorData);
    }

    return response;
}

async function editUser(id: number, body: FormTypesWithId) {
    const response = await fetch(`http://localhost:7000/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(errorData.message, response.status, errorData);
    }

    return response;
}

export const usersApi = {
    createUser,
    deleteUser,
    editUser,
};

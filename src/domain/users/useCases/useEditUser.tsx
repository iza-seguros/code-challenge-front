import { useState } from "react";
import { usersApi } from "../usersApi";
import { FormTypesWithId, UseCaseOptions } from "../types";

export function useEditUser(options?: UseCaseOptions) {
    const [loading, setLoading] = useState(false);

    const editUser = async (id: number, body: FormTypesWithId) => {
        try {
            setLoading(true);
            await usersApi.editUser(id, body);
            options?.onSucess?.();
        } catch (error) {
            console.log("Error in edit user", error);
            options?.onError?.(error);
        } finally {
            setLoading(false);
        }
    };

    return { editUser, loading };
}

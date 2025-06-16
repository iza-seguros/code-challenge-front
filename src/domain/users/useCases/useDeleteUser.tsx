import { useState } from "react";
import { usersApi } from "../usersApi";
import { UseCaseOptions } from "../types";

export function useDeleteUser(options?: UseCaseOptions) {
    const [loading, setLoading] = useState(false);

    const deleteUser = async (id: number) => {
        try {
            setLoading(true);
            await usersApi.deleteUser(id);
            options?.onSucess?.();
        } catch (error) {
            console.log("Error in delete user", error);
            options?.onError?.(error);
        } finally {
            setLoading(false);
        }
    };

    return { deleteUser, loading };
}

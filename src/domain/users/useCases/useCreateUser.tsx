import { useState } from "react";
import { PartialFormTypes, UseCaseOptions } from "../types";
import { usersApi } from "../usersApi";

export function useCreateUser(options?: UseCaseOptions) {
    const [loading, setLoading] = useState(false);

    const createUser = async (data: PartialFormTypes) => {
        try {
            setLoading(true);
            await usersApi.createUser(data);
            options?.onSucess?.();
        } catch (error) {
            if (error instanceof Error) {
                options?.onError?.(error.message);
            } else {
                console.log("Error saving new user", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading };
}

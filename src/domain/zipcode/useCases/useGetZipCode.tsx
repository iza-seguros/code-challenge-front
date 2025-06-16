import { useState, useCallback } from "react";
import { zipCodeApi } from "../zipcodeApi";
import { ZipCodeResponse } from "../types";

export function useGetZipCode() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ZipCodeResponse>();
    const getZipCode = useCallback(async (zipCode: string): Promise<void> => {
        try {
            setLoading(true);
            const response = await zipCodeApi.getZipCode(zipCode);
            setData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);
    return { getZipCode, loading, data };
}

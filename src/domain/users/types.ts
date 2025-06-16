export type FormTypes = {
    id?: number;
    full_name: string;
    email: string;
    phone: string;
    zip_code: string;
    address: string;
    number: string;
    city: string;
    state: string;
    terms_accepted: boolean;
};

export type FormTypesWithId = FormTypes & {
    id: number;
};

export type PartialFormTypes = Partial<FormTypes>;

export interface UseCaseOptions<T = unknown> {
    onSucess?: (data?: T) => void;
    onError?: (error?: unknown) => void;
}

export class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(message: string, status: number, data: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

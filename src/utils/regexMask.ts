export type MaskOptions = {
    [key: string]: (value: string) => string;
};

export const cepMask = (v: string): string => {
    v = v.replace(/\D/g, "");
    v = v.substring(0, 8);
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v;
};

export const phoneMask = (value: string = ""): string => {
    const numericValue = value.replace(/\D/g, "").slice(0, 11);
    return numericValue
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})/, "$1-$2");
};

export const removePhoneMask = (value: string = ""): string => {
    return value.replace(/\D/g, "");
};

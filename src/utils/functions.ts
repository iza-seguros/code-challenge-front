export const handleLastInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>
) => {
    if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        return;
    }
};

type JsonObject = Record<string, unknown>;

export function downloadCSVFromJson<T extends JsonObject>(
    filename: string,
    arrayOfJson: T[]
): void {
    if (arrayOfJson.length === 0) return;

    const replacer = (_key: string, value: unknown): string => {
        return value === null || value === undefined ? "" : String(value);
    };

    const header: string[] = Object.keys(arrayOfJson[0]);
    const csvRows: string[] = arrayOfJson.map((row: T) =>
        header
            .map((fieldName: string) =>
                JSON.stringify(row[fieldName], replacer)
            )
            .join(";")
    );

    csvRows.unshift(header.join(";"));
    const csvContent: string = csvRows.join("\r\n");

    const link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute(
        "href",
        "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContent)
    );
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function getEnumKeyFromValue<T extends Record<string | number, string>>(
    map: T,
    value: string
): keyof T | undefined {
    const entry = Object.entries(map).find(([, v]) => v === value);
    return entry ? (Number.isNaN(Number(entry[0])) ? entry[0] : Number(entry[0])) : undefined;
}
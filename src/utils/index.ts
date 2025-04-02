import { isEmpty, omitBy } from "lodash";

export const removeEmpty = (obj: any) => omitBy(obj, (x) => isEmpty(`${x}`));

export const formatCurrency = (value: number): string => {
    if (typeof value !== 'number' || isNaN(value)) return '0.00';
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const formatNumber = (value: any, decimalPlaces = 2) => {
    if (isNaN(value) || value === null || value === undefined) return "0";
    
    const number = Number(value);
    return number.toLocaleString("en-US", {
        minimumFractionDigits: number % 1 === 0 ? 0 : decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
};

export const getRandomColor = (): string => {
    const colors = ["text-orange-600", "text-green-600", "text-blue-600", "text-red-600", "text-purple-600", "text-yellow-600"];
    return colors[Math.floor(Math.random() * colors.length)]
};

export const getBadgeColorByStatus = (status?: string): any => {
    switch (status) {
        case "available": case "accepted": case "Yes": case "open": case "confirmed": case "completed":
            return "success";
        case "pending": case "No":
            return "warning";
        case "declined": case "closed": case "cancelled": case "unattended":
            return "error";
        default:
            return "neutral";
    }
};
import { format } from 'date-fns';

/**
 * Returns a formatted date like: "July 24th 2024"
 */
export function formatDateStandard(dateInput: string | Date): string {
    const date = new Date(dateInput);
    return format(date, 'MMMM do yyyy'); // July 24th 2024
}

/**
 * Returns a formatted date like: "24th July, 2024"
 */
export function formatDateReadable(dateInput: string | Date): string {
    const date = new Date(dateInput);
    return format(date, 'do MMMM, yyyy'); // 24th July, 2024
}

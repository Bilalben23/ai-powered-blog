import { format } from 'date-fns';

export function formatDate(dateInput: string): string {
    const date = new Date(dateInput);
    return format(date, 'MMMM do yyyy');
}

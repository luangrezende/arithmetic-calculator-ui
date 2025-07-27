import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export type DatePickerFormat = Dayjs | Date | string | number | null | undefined;

export function fToNow(date: DatePickerFormat) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).toNow(true) : 'Invalid time value';
}

export const formatDate = (dateString: string): string => dayjs(dateString).format('DD/MM/YYYY • HH:mm');
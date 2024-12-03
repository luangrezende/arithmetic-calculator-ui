import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export type DatePickerFormat = Dayjs | Date | string | number | null | undefined;

export const formatStr = {
    dateTime: 'DD MMM YYYY h:mm a', 
    date: 'DD MMM YYYY', 
    time: 'h:mm a', 
    split: {
        dateTime: 'DD/MM/YYYY h:mm a', 
        date: 'DD/MM/YYYY', 
    },
    paramCase: {
        dateTime: 'DD-MM-YYYY h:mm a', 
        date: 'DD-MM-YYYY', 
    },
};

export function today(format?: string) {
    return dayjs(new Date()).startOf('day').format(format);
}

export function fDateTime(date: DatePickerFormat, format?: string) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).format(format ?? formatStr.dateTime) : 'Invalid time value';
}

export function fDate(date: DatePickerFormat, format?: string) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).format(format ?? formatStr.date) : 'Invalid time value';
}

export function fTime(date: DatePickerFormat, format?: string) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).format(format ?? formatStr.time) : 'Invalid time value';
}

export function fTimestamp(date: DatePickerFormat) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).valueOf() : 'Invalid time value';
}

export function fToNow(date: DatePickerFormat) {
    if (!date) {
        return null;
    }

    const isValid = dayjs(date).isValid();

    return isValid ? dayjs(date).toNow(true) : 'Invalid time value';
}

export const formatDate = (dateString: string): string => dayjs(dateString).format('DD/MM/YYYY HH:mm');
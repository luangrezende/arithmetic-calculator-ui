import type { OperationRecord } from "src/models/operation-record";

export const parseOperationRecords = (data: any): OperationRecord[] | null => {
    if (!data.records || !Array.isArray(data.records)) {
        return null;
    }

    try {
        const operationRecords: OperationRecord[] = data.records;
        return operationRecords;
    } catch (error) {
        console.error("Error processing operation records from API response:", error);
        return null;
    }
};
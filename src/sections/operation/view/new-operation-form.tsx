import { useState } from 'react';

import { useToast } from 'src/contexts/toast-context';
import { useBalance } from 'src/context/balance-context';
import { getUserProfile } from 'src/services/api/auth-service';
import { useNotifications } from 'src/context/notifications-context';
import { addOperationRecord } from 'src/services/api/operation-service';

import { ModernInput } from 'src/components/modern-input';
import { ModernButton } from 'src/components/modern-button';

interface NewOperationFormProps {
    onClose: () => void;
    onAddOperation: () => void;
}

const operationOptions = [
    { id: 'arithmetic', description: 'Arithmetic Operation' },
    { id: 'random', description: 'Random String' },
];

export function NewOperationForm({ onClose, onAddOperation }: NewOperationFormProps) {
    const [operationType, setOperationType] = useState<{
        id: string;
        description: string;
    } | null>(null);
    const [expression, setExpression] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldError, setFieldError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { fetchBalance } = useBalance();
    const { addOperationNotification } = useNotifications();
    const { showToast } = useToast();

    const validateFields = () => {
        if (!operationType) {
            setErrorMessage('Please select an operation');
            return false;
        }

        if (operationType.description === 'Arithmetic Operation' && !expression.trim()) {
            setFieldError('Expression is required');
            return false;
        }

        setFieldError(null);
        return true;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        setIsLoading(true);

        try {
            const userProfile = await getUserProfile();
            const accountId = userProfile.data?.accounts?.[0]?.id;
            
            if (!accountId) {
                throw new Error('No account found');
            }

            const result = await addOperationRecord(accountId, expression);
            
            const operationCost = result.data?.operationRecord?.cost || 1;
            addOperationNotification(
                operationType?.description || 'Unknown Operation',
                operationCost
            );

            showToast('Operation created successfully!', 'success');
            fetchBalance();
            onClose();
            onAddOperation();
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOperationChange = (operationId: string) => {
        const selectedOp = operationOptions.find((op) => op.id === operationId);
        setOperationType(selectedOp || null);

        if (selectedOp?.description === 'Random String') {
            setExpression('random_string');
        } else {
            setExpression('');
        }

        setFieldError(null);
        setErrorMessage(null);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="space-y-1">
                <label htmlFor="operation-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Operation
                    <div className="modern-select mt-1">
                        <select
                            id="operation-select"
                            name="operation-select"
                            value={operationType?.id || ''}
                            onChange={(e) => handleOperationChange(e.target.value)}
                            className="w-full py-2 px-4 pr-12 xl:py-3 xl:px-6 xl:pr-14 text-base h-12 xl:text-lg xl:h-14 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer shadow-sm hover:border-gray-300 dark:hover:border-slate-400"
                            required
                    >
                        <option value="" disabled className="text-gray-400 dark:text-gray-500">
                            Select an operation
                        </option>
                        {operationOptions.map((option) => (
                            <option 
                                key={option.id} 
                                value={option.id} 
                                className="text-gray-900 dark:text-white bg-white dark:bg-slate-600"
                            >
                                {option.description}
                            </option>
                        ))}
                    </select>
                    </div>
                </label>
            </div>

            {operationType?.description === 'Arithmetic Operation' && (
                <div>
                    <ModernInput
                        label="Expression"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        error={fieldError || undefined}
                        required
                        className="w-full"
                    />
                </div>
            )}

            {operationType?.description === 'Random String' && (
                <div className="p-4 bg-blue-50 rounded-lg text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                    A new random string will be generated automatically.
                </div>
            )}

            {errorMessage && (
                <div className="p-4 bg-red-50 rounded-lg text-red-800 dark:bg-red-900/20 dark:text-red-300">
                    {errorMessage}
                </div>
            )}

            <div className="flex justify-end gap-2">
                <ModernButton
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </ModernButton>
                <ModernButton
                    variant="primary"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Add Operation
                </ModernButton>
            </div>
        </div>
    );
}

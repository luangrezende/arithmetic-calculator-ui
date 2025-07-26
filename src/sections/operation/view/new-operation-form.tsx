import { useState } from 'react';

import { useBalance } from 'src/context/balance-context';
import { useNotifications } from 'src/context/notifications-context';
import { getUserProfile } from 'src/services/api/auth-service';
import { addOperationRecord } from 'src/services/api/operation-service';

import { ModernButton } from 'src/components/modern-button';
import { ModernInput } from 'src/components/modern-input';

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
            
            // Adicionar notificação de operação
            const operationCost = result.data?.operationCost || 1; // Fallback para 1 se não retornar o custo
            addOperationNotification(
                operationType?.description || 'Unknown Operation',
                operationCost
            );

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
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label id="operation-label" htmlFor="operation-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Operation
                </label>
                <select
                    id="operation-select"
                    aria-labelledby="operation-label"
                    value={operationType?.id || ''}
                    onChange={(e) => handleOperationChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                >
                    <option value="">Select an operation</option>
                    {operationOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.description}
                        </option>
                    ))}
                </select>
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
                    {fieldError && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{fieldError}</p>
                    )}
                </div>
            )}

            {operationType?.description === 'Random String' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
                    A new random string will be generated automatically.
                </div>
            )}

            {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
                    {errorMessage}
                </div>
            )}

            <div className="flex justify-end gap-2">
                <ModernButton
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </ModernButton>
                <ModernButton
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Submit'}
                </ModernButton>
            </div>
        </div>
    );
}

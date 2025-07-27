import { useState } from 'react';

import { useToast } from 'src/contexts/toast-context';
import { useBalance } from 'src/context/balance-context';
import { getUserProfile } from 'src/services/api/auth-service';
import { useNotifications } from 'src/context/notifications-context';
import { addOperationRecord } from 'src/services/api/operation-service';

import { ModernInput } from 'src/components/modern-input';
import { ModernButton } from 'src/components/modern-button';
import { ModernSelect } from 'src/components/modern-select';

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
            <ModernSelect
                label="Operation"
                value={operationType?.id || ''}
                onChange={(e) => handleOperationChange(e.target.value)}
                required
            >
                <option value="" disabled>
                    Select an operation
                </option>
                {operationOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.description}
                    </option>
                ))}
            </ModernSelect>

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

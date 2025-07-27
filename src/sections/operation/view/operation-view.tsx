import type { OperationRecord } from 'src/models/operation-record';

import { useMemo, useState, useEffect, useCallback } from 'react';

import { useCurrency } from 'src/hooks/use-currency';

import { cn } from 'src/utils/cn';
import { formatDate } from 'src/utils/format-time';
import { formatCurrencyWithSymbol } from 'src/utils/format-number';

import { useToast } from 'src/contexts/toast-context';
import { DashboardContent } from 'src/layouts/dashboard';
import {
    deleteOperationRecords,
    getPagedOperationRecords,
} from 'src/services/api/operation-service';

import { Iconify } from 'src/components/iconify';
import { ModernCard } from 'src/components/modern-card';
import { ModernInput } from 'src/components/modern-input';
import { ModernButton } from 'src/components/modern-button';
import { FallbackLoader } from 'src/components/fallback/fallback-loader';
import { UI_HEIGHTS } from 'src/theme/constants';

import { NewOperationForm } from './new-operation-form';

export function OperationView() {
    const { currency } = useCurrency();
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [operations, setOperations] = useState<OperationRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState<keyof OperationRecord>('createdAt');
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [selected, setSelected] = useState<string[]>([]);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { showToast } = useToast();

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleCloseConfirmDelete = () => setConfirmDeleteOpen(false);

    const fetchPagedOperations = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getPagedOperationRecords(page, rowsPerPage, debouncedSearchQuery);
            setOperations(data.records || []);
            setTotalRecords(data.total || 0);
            setPage(data.page || 0);
        } catch (error) {
            console.error('Failed to fetch operations:', error);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, debouncedSearchQuery]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 600);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        fetchPagedOperations();
    }, [fetchPagedOperations]);

    const handleSelectAllClick = useCallback((checked: boolean) => {
        if (checked) {
            const newSelected = operations.map(n => n.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    }, [operations]);

    const handleSelectClick = useCallback((id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    }, [selected]);

    const handleRequestSort = useCallback((property: keyof OperationRecord) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    const handlePageChange = useCallback((_: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const handleDeleteSelected = useCallback(async () => {
        if (selected.length === 0) return;

        try {
            setIsDeleting(true);
            await deleteOperationRecords(selected);
            
            showToast(`${selected.length} operation(s) deleted successfully`, 'success');
            setSelected([]);
            setConfirmDeleteOpen(false);
            await fetchPagedOperations();
        } catch (error) {
            console.error('Failed to delete operations:', error);
            showToast('Failed to delete operations', 'danger');
        } finally {
            setIsDeleting(false);
        }
    }, [selected, showToast, fetchPagedOperations]);

    const sortedOperations = useMemo(() => {
        if (!operations) return [];
        
        return operations.slice().sort((a, b) => {
            let aValue = a[orderBy];
            let bValue = b[orderBy];
            
            if (orderBy === 'createdAt') {
                aValue = new Date(aValue as string).getTime();
                bValue = new Date(bValue as string).getTime();
            }
            
            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [operations, order, orderBy]);

    // Helper function to get operation icon (same as notifications)
    const getOperationIcon = (operation: string) => {
        if (operation === 'addition') {
            return 'solar:add-circle-outline';
        }
        if (operation === 'subtraction') {
            return 'solar:minus-circle-outline';
        }
        if (operation === 'multiplication') {
            return 'solar:close-circle-outline';
        }
        if (operation === 'division') {
            return 'solar:divide-outline';
        }
        if (operation === 'square_root') {
            return 'solar:calculator-outline';
        }
        if (operation === 'random_string') {
            return 'solar:shuffle-outline';
        }
        return 'solar:calculator-minimalistic-outline';
    };

    const totalPages = Math.ceil(totalRecords / rowsPerPage);

    const renderTopBar = () => (
        <div className="flex flex-col gap-4 mb-6">
            {/* Desktop: Title + Controls */}
            <div className="hidden lg:flex lg:items-center gap-4">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Operations
                    </h1>
                </div>
                
                <div className="flex gap-3 items-center">
                    <div className="w-64">
                        <ModernInput
                            placeholder="Search operations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    
                    <div className={`flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1 ${UI_HEIGHTS.default}`}>
                        <button
                            type="button"
                            onClick={() => setViewMode('table')}
                            className={`flex items-center justify-center w-10 h-10 rounded-md text-lg font-medium transition-colors ${
                                viewMode === 'table'
                                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                        >
                            <Iconify icon="solar:list-bold" width={18} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('card')}
                            className={`flex items-center justify-center w-10 h-10 rounded-md text-lg font-medium transition-colors ${
                                viewMode === 'card'
                                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                        >
                            <Iconify icon="solar:widget-2-bold" width={18} />
                        </button>
                    </div>
                    
                    <ModernButton
                        variant="primary"
                        size="md"
                        onClick={handleOpenModal}
                        className={`whitespace-nowrap ${UI_HEIGHTS.default}`}
                    >
                        <Iconify icon="solar:add-circle-bold" width={18} />
                        <span className="ml-2">New Operation</span>
                    </ModernButton>
                </div>
            </div>

            {/* Mobile: Search + Button only */}
            <div className="flex lg:hidden gap-3">
                <div className="flex-1">
                    <ModernInput
                        placeholder="Search operations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                    />
                </div>
                
                <div className="relative group">
                    <ModernButton
                        variant="primary"
                        size="md"
                        onClick={handleOpenModal}
                        className={`shrink-0 ${UI_HEIGHTS.default}`}
                        title="New Operation"
                    >
                        <Iconify icon="solar:add-circle-bold" width={18} />
                    </ModernButton>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        New Operation
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDeleteActions = () => (
        selected.length > 0 && (
            <div className="flex items-center justify-between p-4 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    {selected.length} operation(s) selected
                </span>
                <ModernButton
                    variant="danger"
                    size="md"
                    onClick={() => setConfirmDeleteOpen(true)}
                    className={`h-${UI_HEIGHTS.default}`}
                >
                    <div className="flex items-center gap-2">
                        <Iconify icon="solar:trash-bin-bold" width={16} />
                        <span>Delete Selected</span>
                    </div>
                </ModernButton>
            </div>
        )
    );

    const renderTableView = () => (
        <ModernCard className="overflow-hidden">
            {loading ? (
                <div className="p-6">
                    <div className="flex items-center justify-center min-h-96">
                        <div className="w-full max-w-md mx-auto">
                            <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
                                <div className="text-center mb-4">
                                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading operations...</div>
                                </div>
                                <div className="relative h-2 bg-slate-100 dark:bg-slate-600 rounded-full overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-bar" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    <table className="w-full table-fixed">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th className="px-1 lg:px-4 py-3 text-left w-8 lg:w-12">
                                        <input
                                            type="checkbox"
                                            checked={operations.length > 0 && selected.length === operations.length}
                                            onChange={(e) => handleSelectAllClick(e.target.checked)}
                                            className="rounded text-blue-600"
                                        />
                                    </th>
                                    <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-20 lg:w-40">
                                        <button
                                            type="button"
                                            onClick={() => handleRequestSort('type')}
                                            className="flex items-center space-x-1 hover:text-slate-700 dark:hover:text-slate-200"
                                        >
                                            <span className="hidden lg:block">Operation</span>
                                            <span className="lg:hidden">Op</span>
                                            <span className={`text-xs ${orderBy === 'type' ? 'opacity-100' : 'opacity-40'}`}>
                                                {order === 'asc' ? '↑' : '↓'}
                                            </span>
                                        </button>
                                    </th>
                                    <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-14 lg:w-24">
                                        <button
                                            type="button"
                                            onClick={() => handleRequestSort('expression')}
                                            className="flex items-center space-x-1 hover:text-slate-700 dark:hover:text-slate-200"
                                        >
                                            <span>Expression</span>
                                            <span className={`text-xs ${orderBy === 'expression' ? 'opacity-100' : 'opacity-40'}`}>
                                                {order === 'asc' ? '↑' : '↓'}
                                            </span>
                                        </button>
                                    </th>
                                    <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-14 lg:w-28">
                                        <button
                                            type="button"
                                            onClick={() => handleRequestSort('result')}
                                            className="flex items-center space-x-1 hover:text-slate-700 dark:hover:text-slate-200"
                                        >
                                            <span>Result</span>
                                            <span className={`text-xs ${orderBy === 'result' ? 'opacity-100' : 'opacity-40'}`}>
                                                {order === 'asc' ? '↑' : '↓'}
                                            </span>
                                        </button>
                                    </th>
                                    <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-14 lg:w-24">
                                        <button
                                            type="button"
                                            onClick={() => handleRequestSort('cost')}
                                            className="flex items-center space-x-1 hover:text-slate-700 dark:hover:text-slate-200"
                                        >
                                            <span>Cost</span>
                                            <span className={`text-xs ${orderBy === 'cost' ? 'opacity-100' : 'opacity-40'}`}>
                                                {order === 'asc' ? '↑' : '↓'}
                                            </span>
                                        </button>
                                    </th>
                                    <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-14 lg:w-24 hidden sm:table-cell">
                                        <button
                                            type="button"
                                            onClick={() => handleRequestSort('userBalance')}
                                            className="flex items-center space-x-1 hover:text-slate-700 dark:hover:text-slate-200"
                                        >
                                            <span>Balance</span>
                                            <span className={`text-xs ${orderBy === 'userBalance' ? 'opacity-100' : 'opacity-40'}`}>
                                                {order === 'asc' ? '↑' : '↓'}
                                            </span>
                                        </button>
                                    </th>
                                    <th className="px-2 lg:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-20 lg:w-28">
                                        <button
                                            type="button"
                                            onClick={() => handleRequestSort('createdAt')}
                                            className="flex items-center space-x-1 hover:text-slate-700 dark:hover:text-slate-200"
                                        >
                                            <span>Date</span>
                                            <span className={`text-xs ${orderBy === 'createdAt' ? 'opacity-100' : 'opacity-40'}`}>
                                                {order === 'asc' ? '↑' : '↓'}
                                            </span>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                                {sortedOperations.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="text-4xl text-slate-400 dark:text-slate-500 mb-3">📥</div>
                                                <span className="text-slate-600 dark:text-slate-400 mt-3">No operations found</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    sortedOperations.map((operation) => (
                                        <tr 
                                            key={operation.id} 
                                            className={cn(
                                                'cursor-pointer transition-colors duration-150',
                                                'hover:bg-slate-50 dark:hover:bg-slate-800/50',
                                                selected.includes(operation.id) && 'bg-blue-50 dark:bg-blue-900/20'
                                            )}
                                            onClick={() => handleSelectClick(operation.id)}
                                        >
                                            <td className="px-1 lg:px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.includes(operation.id)}
                                                    onChange={() => handleSelectClick(operation.id)}
                                                    className="rounded text-blue-600"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </td>
                                            <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-5 h-5 lg:w-8 lg:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-1 lg:mr-3 shrink-0">
                                                        <Iconify 
                                                            icon={getOperationIcon(operation.type)}
                                                            width={12}
                                                            sx={{ color: 'primary.main' }}
                                                        />
                                                    </div>
                                                    <span className="text-xs lg:text-sm font-medium text-slate-900 dark:text-slate-100 capitalize truncate">
                                                        <span className="hidden lg:inline">{operation.type.replace('_', ' ')}</span>
                                                        <span className="lg:hidden">{operation.type.split('_')[0]}</span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-2 lg:px-6 py-4">
                                                <div className="truncate">
                                                    <span className="text-xs lg:text-sm text-slate-900 dark:text-slate-100 font-mono">
                                                        {operation.expression}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-2 lg:px-6 py-4">
                                                <div className="truncate">
                                                    <span className="text-xs lg:text-sm text-slate-900 dark:text-slate-100 font-mono">
                                                        {operation.result}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col lg:flex-row lg:items-baseline">
                                                    <span className="text-xs text-red-600 dark:text-red-400 lg:mr-1">{formatCurrencyWithSymbol(operation.cost, currency).currency}</span>
                                                    <span className="text-xs lg:text-sm font-medium text-red-600 dark:text-red-400">{formatCurrencyWithSymbol(operation.cost, currency).value}</span>
                                                </div>
                                            </td>
                                            <td className="px-2 lg:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                                <div className="flex flex-col lg:flex-row lg:items-baseline">
                                                    <span className="text-xs text-green-600 dark:text-green-400 lg:mr-1">{formatCurrencyWithSymbol(operation.userBalance, currency).currency}</span>
                                                    <span className="text-xs lg:text-sm font-medium text-green-600 dark:text-green-400">{formatCurrencyWithSymbol(operation.userBalance, currency).value}</span>
                                                </div>
                                            </td>
                                            <td className="px-2 lg:px-6 py-4">
                                                <div className="truncate">
                                                    <span className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                                                        <span className="hidden lg:inline">{formatDate(operation.createdAt)}</span>
                                                        <span className="lg:hidden">{new Date(operation.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </ModernCard>
    );

    const renderCardView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-hidden">
            {loading ? (
                <div className="col-span-full">
                    <div className="flex items-center justify-center min-h-96">
                        <div className="w-full max-w-md mx-auto">
                            <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
                                <div className="text-center mb-4">
                                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading operations...</div>
                                </div>
                                <div className="relative h-2 bg-slate-100 dark:bg-slate-600 rounded-full overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-bar" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : sortedOperations.length === 0 ? (
                <div className="col-span-full flex flex-col items-center py-12">
                    <div className="text-4xl text-slate-400 dark:text-slate-500 mb-3">📥</div>
                    <span className="text-slate-600 dark:text-slate-400 mt-3">No operations found</span>
                </div>
            ) : (
                sortedOperations.map((operation) => {
                    const isSelected = selected.includes(operation.id);
                    return (
                        <ModernCard 
                            key={operation.id} 
                            className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-lg group overflow-hidden ${
                                isSelected 
                                    ? 'bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                            }`}
                            onClick={() => handleSelectClick(operation.id)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center min-w-0 flex-1">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-3 shrink-0">
                                        <Iconify 
                                            icon={getOperationIcon(operation.type)}
                                            width={20}
                                            sx={{ color: 'primary.main' }}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 capitalize truncate">
                                            {operation.type.replace('_', ' ')}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                            {formatDate(operation.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Selected indicator */}
                                {isSelected && (
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                        <Iconify icon="solar:check-bold" width={12} sx={{ color: 'white' }} />
                                    </div>
                                )}
                                
                                {/* Delete button - only show when not selected */}
                                {!isSelected && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // You can add delete single item logic here if needed
                                            handleSelectClick(operation.id);
                                        }}
                                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Iconify icon="solar:trash-bin-bold" width={16} />
                                    </button>
                                )}
                            </div>
                            
                            <div className="space-y-4 overflow-hidden">
                                <div className="overflow-hidden">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Expression</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 font-mono truncate">
                                        {operation.expression}
                                    </p>
                                </div>
                                
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 overflow-hidden">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Result</p>
                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono break-words">
                                        {operation.result}
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between overflow-hidden">
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cost</p>
                                        <p className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-baseline">
                                            <span className="text-xs mr-1">{formatCurrencyWithSymbol(operation.cost, currency).currency}</span>
                                            <span className="truncate">{formatCurrencyWithSymbol(operation.cost, currency).value}</span>
                                        </p>
                                    </div>
                                    <div className="text-right overflow-hidden">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Balance</p>
                                        <p className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-baseline justify-end">
                                            <span className="text-xs mr-1">{formatCurrencyWithSymbol(operation.userBalance, currency).currency}</span>
                                            <span className="truncate">{formatCurrencyWithSymbol(operation.userBalance, currency).value}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ModernCard>
                    );
                })
            )}
        </div>
    );

    const renderPagination = () => (
        <div className="flex flex-col gap-3 mt-6 p-3 bg-white dark:bg-slate-700 rounded-xl lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:p-4">
            <div className="flex items-center gap-2 justify-center order-2 lg:order-1 lg:justify-start">
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium lg:text-sm">Show:</span>
                <div className="relative">
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="appearance-none px-2 py-1 pr-6 text-xs rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600 lg:px-3 lg:py-1.5 lg:pr-8 lg:text-sm"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <span className="text-slate-400 dark:text-slate-500 text-xs">▼</span>
                    </div>
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium lg:text-sm">per page</span>
            </div>
            
            <div className="flex flex-col gap-2 order-1 lg:order-2 lg:flex-row lg:items-center lg:gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium text-center lg:text-sm lg:text-left">
                    {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, totalRecords)} of {totalRecords}
                </div>
                
                <div className="flex items-center gap-1 justify-center lg:gap-2">
                    <button
                        type="button"
                        onClick={() => handlePageChange(null, Math.max(0, page - 1))}
                        disabled={page === 0}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm text-sm border border-slate-200 dark:border-slate-600 lg:w-9 lg:h-9 lg:rounded-xl lg:text-base"
                    >
                        ←
                    </button>
                    
                    {Array.from({ length: Math.min(3, totalPages) }).map((_, index) => {
                        const pageNum = Math.max(0, Math.min(totalPages - 3, page - 1)) + index;
                        if (pageNum >= totalPages) return null;
                        return (
                            <button
                                type="button"
                                key={pageNum}
                                onClick={() => handlePageChange(null, pageNum)}
                                className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium transition-all shadow-sm border lg:w-9 lg:h-9 lg:rounded-xl lg:text-sm ${
                                    page === pageNum
                                        ? 'bg-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/30 border-blue-600'
                                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600'
                                }`}
                            >
                                {pageNum + 1}
                            </button>
                        );
                    })}
                    
                    <button
                        type="button"
                        onClick={() => handlePageChange(null, Math.min(totalPages - 1, page + 1))}
                        disabled={page >= totalPages - 1}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm text-sm border border-slate-200 dark:border-slate-600 lg:w-9 lg:h-9 lg:rounded-xl lg:text-base"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <DashboardContent maxWidth="lg" className="overflow-hidden">
            {renderTopBar()}
            {renderDeleteActions()}
            
            {/* Desktop: respects viewMode, Mobile: always cards */}
            <div className="hidden lg:block overflow-hidden">
                {viewMode === 'table' ? renderTableView() : renderCardView()}
            </div>
            <div className="block lg:hidden overflow-hidden">
                {renderCardView()}
            </div>
            
            {totalRecords > 0 && renderPagination()}

            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    New Operation
                                </h2>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>
                            <NewOperationForm
                                onClose={handleCloseModal}
                                onAddOperation={() => {
                                    handleCloseModal();
                                    fetchPagedOperations();
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {confirmDeleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-red-600 dark:text-red-400 text-xl">⚠</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        Delete Operations
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                            
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                Are you sure you want to delete {selected.length} operation(s)? This will permanently remove them from your account.
                            </p>
                            
                            <div className="flex space-x-3">
                                <ModernButton
                                    variant="outline"
                                    size="md"
                                    onClick={handleCloseConfirmDelete}
                                    disabled={isDeleting}
                                    className="flex-1"
                                >
                                    Cancel
                                </ModernButton>
                                <ModernButton
                                    variant="danger"
                                    onClick={handleDeleteSelected}
                                    disabled={isDeleting}
                                    size="md"
                                    className="flex-1"
                                >
                                    {isDeleting ? (
                                        <>
                                            <svg 
                                                className="animate-spin -ml-1 mr-2 h-4 w-4" 
                                                fill="none" 
                                                viewBox="0 0 24 24"
                                            >
                                                <circle 
                                                    className="opacity-25" 
                                                    cx="12" 
                                                    cy="12" 
                                                    r="10" 
                                                    stroke="currentColor" 
                                                    strokeWidth="4"
                                                />
                                                <path 
                                                    className="opacity-75" 
                                                    fill="currentColor" 
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete'
                                    )}
                                </ModernButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardContent>
    );
}

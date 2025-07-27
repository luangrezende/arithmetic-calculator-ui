import type { OperationRecord } from 'src/models/operation-record';

import { useMemo, useState, useEffect, useCallback } from 'react';

import {
    Box,
    Table,
    Modal,
    Dialog,
    Tooltip,
    TableRow,
    Checkbox,
    TableBody,
    TableCell,
    TableHead,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableContainer,
    TableSortLabel,
    TablePagination,
    CircularProgress,
    DialogContentText,
} from '@mui/material';

import { useCurrency } from 'src/hooks/use-currency';

import { formatDate } from 'src/utils/format-time';
import { formatCurrency, formatLargeNumber, formatCurrencyWithSymbol } from 'src/utils/format-number';

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

import { NewOperationForm } from './new-operation-form';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none',
};

export function OperationView() {
    const { currency } = useCurrency();
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleCloseConfirmDelete = () => setConfirmDeleteOpen(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [operations, setOperations] = useState<OperationRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState<keyof OperationRecord>('createdAt');
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState<string[]>([]);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { showToast } = useToast();

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleOpenConfirmDelete = useCallback(() => {
        if (selected.length === 0) {
            showToast('No records selected for deletion.', 'warning');
            return;
        }
        setConfirmDeleteOpen(true);
    }, [selected, showToast]);

    const deleteRecords = async (ids: string[]) => {
        if (!ids.length) {
            showToast('No records selected for deletion.', 'warning');
            return;
        }

        setIsDeleting(true);
        try {
            await deleteOperationRecords(ids);
            showToast('Selected records were successfully deleted.', 'success');

            setSelected([]);
            fetchPagedOperations();
            handleCloseConfirmDelete();
        } catch (error) {
            console.error('Failed to delete records:', error);
            showToast('Failed to delete selected records.', 'danger');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.checked ? operations.map((op) => op.id) : []);
    };

    const handleNewOperation = () => {
        showToast('Operation was successfully added.', 'success');
        fetchPagedOperations();
    };

    const handleSort = (property: keyof OperationRecord) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedOperations = useMemo(
        () =>
            [...operations].sort((a, b) => {
                if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
                if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
                return 0;
            }),
        [operations, orderBy, order]
    );

    return (
        <DashboardContent>
            {loading ? (
                <div className="flex items-center justify-center min-h-96">
                    <div className="w-full max-w-md mx-auto">
                        <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
                            <div className="text-center mb-4">
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading Operations...</div>
                            </div>
                            <div className="relative h-2 bg-slate-100 dark:bg-slate-600 rounded-full overflow-hidden">
                                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-bar" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <Box display="flex" alignItems="center" mb={5}>
                        <Typography variant="h4" flexGrow={1}>
                            Operations
                        </Typography>
                        <div className="relative mr-2 w-150px sm:w-auto">
                            <ModernInput
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                inputSize="sm"
                                startIcon={
                                    <Iconify 
                                        icon="mdi:magnify" 
                                        width={16} 
                                        sx={{ color: 'text.secondary' }}
                                    />
                                }
                            />
                        </div>
                        <ModernButton
                            variant="primary"
                            size="sm"
                            onClick={handleOpenModal}
                            className="flex items-center justify-center min-w-[36px] sm:min-w-auto px-2 sm:px-3"
                        >
                            <Iconify
                                icon="mingcute:add-line"
                                width={20}
                                sx={{
                                    mr: { xs: 0, sm: 1 },
                                }}
                            />
                            <span className="hidden sm:inline">
                                New operation
                            </span>
                        </ModernButton>
                    </Box>

                    <ModernCard className="overflow-hidden">
                        {operations.length > 0 ? (
                    <>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                indeterminate={
                                                    selected.length > 0 &&
                                                    selected.length < operations.length
                                                }
                                                checked={
                                                    operations.length > 0 &&
                                                    selected.length === operations.length
                                                }
                                                onChange={handleSelectAll}
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <TableSortLabel
                                                active={orderBy === 'type'}
                                                direction={order}
                                                onClick={() => handleSort('type')}
                                            >
                                                Type
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="left">
                                            <TableSortLabel
                                                active={orderBy === 'expression'}
                                                direction={order}
                                                onClick={() => handleSort('expression')}
                                            >
                                                Operation
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="left">
                                            <TableSortLabel
                                                active={orderBy === 'result'}
                                                direction={order}
                                                onClick={() => handleSort('result')}
                                            >
                                                Result
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="left">
                                            <TableSortLabel
                                                active={orderBy === 'cost'}
                                                direction={order}
                                                onClick={() => handleSort('cost')}
                                            >
                                                Cost
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="left">
                                            <TableSortLabel
                                                active={orderBy === 'userBalance'}
                                                direction={order}
                                                onClick={() => handleSort('userBalance')}
                                            >
                                                Balance
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="left">
                                            <TableSortLabel
                                                active={orderBy === 'createdAt'}
                                                direction={order}
                                                onClick={() => handleSort('createdAt')}
                                            >
                                                Date
                                            </TableSortLabel>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedOperations.map((record) => (
                                        <TableRow
                                            key={record.id}
                                            selected={selected.includes(record.id)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selected.includes(record.id)}
                                                    onChange={() => handleSelect(record.id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <b>{record.type}</b>
                                            </TableCell>
                                            <TableCell>{record.expression}</TableCell>
                                            <TableCell>
                                                <Tooltip title={record.result} arrow>
                                                    <Typography noWrap>
                                                        {Number.isNaN(Number(record.result))
                                                            ? record.result
                                                            : formatLargeNumber(record.result, {
                                                                  notation: 'compact',
                                                                  maximumFractionDigits: 2,
                                                              })}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'red',
                                                        fontWeight: 'bold',
                                                        display: 'flex',
                                                        alignItems: 'baseline',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <span>-</span>
                                                    <span style={{ fontSize: '0.8em' }}>{formatCurrencyWithSymbol(record.cost.toFixed(2), currency).currency}</span>
                                                    <span>{formatCurrencyWithSymbol(record.cost.toFixed(2), currency).value}</span>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: record.cost > 0 ? 'green' : 'red',
                                                        fontWeight: 'bold',
                                                        display: 'flex',
                                                        alignItems: 'baseline',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '0.8em' }}>{formatCurrencyWithSymbol(record.userBalance.toFixed(2), currency).currency}</span>
                                                    <span>{formatCurrencyWithSymbol(record.userBalance.toFixed(2), currency).value}</span>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{formatDate(record.createdAt)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={totalRecords}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" p={5}>
                        <Typography variant="h6" color="textSecondary">
                            No operations available.
                        </Typography>
                    </Box>
                )}
            </ModernCard>

            {selected.length > 0 && (
                <Box display="flex" justifyContent="flex-end" my={2}>
                    <ModernButton
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            if (selected.length > 0) {
                                handleOpenConfirmDelete();
                            } else {
                                showToast('Please select at least one record to delete.', 'warning');
                            }
                        }}
                        disabled={isDeleting}
                        loading={isDeleting}
                        className="text-red-600 border-red-600 sm:hover:bg-red-50 sm:hover:border-red-700 dark:text-red-400 dark:border-red-400 sm:dark:hover:bg-red-900/20 sm:dark:hover:border-red-300"
                    >
                        <Iconify icon="tabler:trash" width={20} sx={{ mr: 1 }} />
                        Delete Selected
                    </ModernButton>
                </Box>
            )}

            <Dialog
                open={confirmDeleteOpen}
                onClose={handleCloseConfirmDelete}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
            >
                <DialogTitle id="confirm-delete-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-delete-description">
                        Are you sure you want to delete the selected operations? This action cannot
                        be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ModernButton
                        onClick={handleCloseConfirmDelete}
                        variant="ghost"
                        size="sm"
                        disabled={isDeleting}
                    >
                        Cancel
                    </ModernButton>
                    <ModernButton
                        onClick={() => {
                            deleteRecords(selected);
                        }}
                        variant="primary"
                        size="sm"
                        disabled={isDeleting}
                        loading={isDeleting}
                        className="bg-red-600 sm:hover:bg-red-700 active:bg-red-800 dark:bg-red-500 sm:dark:hover:bg-red-600 dark:active:bg-red-700"
                    >
                        {isDeleting ? (
                            <>
                                <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                                Deleting...
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </ModernButton>
                </DialogActions>
            </Dialog>

            <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" mb={2}>
                        New Operation
                    </Typography>
                    <NewOperationForm
                        onClose={handleCloseModal}
                        onAddOperation={handleNewOperation}
                    />
                </Box>
            </Modal>
            </>
            )}
        </DashboardContent>
    );
}

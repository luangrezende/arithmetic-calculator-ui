import type { OperationRecord } from 'src/models/operation-record';

import { useMemo, useState, useEffect, useCallback } from 'react';

import {
    Box,
    Card,
    Table,
    Modal,
    Button,
    Dialog,
    Tooltip,
    TableRow,
    Checkbox,
    TableBody,
    TableCell,
    TableHead,
    TextField,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableContainer,
    InputAdornment,
    TableSortLabel,
    TablePagination,
    CircularProgress,
    DialogContentText,
} from '@mui/material';

import { formatDate } from 'src/utils/format-time';
import { formatCurrency, formatLargeNumber } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';
import {
    deleteOperationRecords,
    getPagedOperationRecords,
} from 'src/services/api/operation-service';

import { Iconify } from 'src/components/iconify';
import { AlertSnackbar } from 'src/components/alert-snackbar';

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
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

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
            setSnackbar({
                open: true,
                message: 'No records selected for deletion.',
                severity: 'error',
            });
            return;
        }
        setConfirmDeleteOpen(true);
    }, [selected]);

    const deleteRecords = async (ids: string[]) => {
        if (!ids.length) {
            setSnackbar({
                open: true,
                message: 'No records selected for deletion.',
                severity: 'error',
            });
            return;
        }

        setIsDeleting(true);
        try {
            await deleteOperationRecords(ids);
            setSnackbar({
                open: true,
                message: 'Selected records were successfully deleted.',
                severity: 'success',
            });

            setSelected([]);
            fetchPagedOperations();
            handleCloseConfirmDelete();
        } catch (error) {
            console.error('Failed to delete records:', error);
            setSnackbar({
                open: true,
                message: 'Failed to delete selected records.',
                severity: 'error',
            });
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
        setSnackbar({
            open: true,
            message: 'Operation was successfully added.',
            severity: 'success',
        });
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
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1}>
                    Operations
                </Typography>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{
                        mr: { xs: 1, sm: 2 },
                        width: { xs: '150px', sm: 'auto' },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="mdi:magnify" width={20} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenModal}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: { xs: '40px', sm: 'auto' },
                        padding: { xs: '8px', sm: '10px 16px' },
                    }}
                >
                    <Iconify
                        icon="mingcute:add-line"
                        width={20}
                        sx={{
                            mr: { xs: 0, sm: 1 },
                        }}
                    />
                    <Typography
                        variant="button"
                        sx={{
                            display: { xs: 'none', sm: 'inline' },
                        }}
                    >
                        New operation
                    </Typography>
                </Button>
            </Box>

            <Card>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" p={5}>
                        <Typography variant="h6" color="textSecondary">
                            Loading...
                        </Typography>
                    </Box>
                ) : operations.length > 0 ? (
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
                                                    }}
                                                >
                                                    -{formatCurrency(record.cost.toFixed(2))}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: record.cost > 0 ? 'green' : 'red',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {formatCurrency(record.userBalance.toFixed(2))}
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
            </Card>

            {selected.length > 0 && (
                <Box display="flex" justifyContent="flex-end" my={2}>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<Iconify icon="tabler:trash" width={20} />}
                        onClick={() => {
                            if (selected.length > 0) {
                                handleOpenConfirmDelete();
                            } else {
                                setSnackbar({
                                    open: true,
                                    message: 'Please select at least one record to delete.',
                                    severity: 'error',
                                });
                            }
                        }}
                    >
                        Delete Selected
                    </Button>
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
                    <Button
                        onClick={handleCloseConfirmDelete}
                        color="primary"
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            deleteRecords(selected);
                        }}
                        color="error"
                        variant="contained"
                        disabled={isDeleting}
                        startIcon={
                            isDeleting ? <CircularProgress size={16} color="inherit" /> : null
                        }
                    >
                        {isDeleting ? 'Deleting...' : 'Confirm'}
                    </Button>
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

            <AlertSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity={snackbar.severity}
            />
        </DashboardContent>
    );
}

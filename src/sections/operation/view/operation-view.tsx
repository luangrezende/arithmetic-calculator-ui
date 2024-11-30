import { useState, useCallback } from 'react';

import {
    Box,
    Card,
    Fade,
    Table,
    Modal,
    Button,
    Dialog,
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
    TableSortLabel,
    InputAdornment,
    TablePagination,
    DialogContentText,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

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

const getTimeAgo = (minutes: number) =>
    new Date(new Date().getTime() - minutes * 60 * 1000).toLocaleString();

const initialOperations = [
    {
        id: 1,
        type: 'Square Root',
        cost: 5.0,
        value: '9',
        result: 3,
        credit: 48.5,
        date: getTimeAgo(10),
    },
    {
        id: 2,
        type: 'Division',
        cost: 15.0,
        value: '10/5',
        result: 2,
        credit: 53.5,
        date: getTimeAgo(20),
    },
    {
        id: 3,
        type: 'Multiplication',
        cost: 15.5,
        value: '9*5',
        result: 45,
        credit: 68.5,
        date: getTimeAgo(30),
    },
    {
        id: 4,
        type: 'Subtraction',
        cost: 5.25,
        value: '13-5',
        result: 8,
        credit: 84.0,
        date: getTimeAgo(40),
    },
    {
        id: 5,
        type: 'Addition',
        cost: 10.75,
        value: '2+2',
        result: 4,
        credit: 89.25,
        date: getTimeAgo(50),
    },
    {
        id: 6,
        type: 'Square Root',
        cost: 5.0,
        value: '16',
        result: 4,
        credit: 43.5,
        date: getTimeAgo(15),
    },
    {
        id: 7,
        type: 'Random String',
        cost: 8.0,
        value: '',
        result: 'xXz1Fg9',
        credit: 35.5,
        date: getTimeAgo(25),
    },
];

export function OperationView() {
    const [openModal, setOpenModal] = useState(false);
    const [operations, setOperations] = useState(initialOperations);
    const [credit, setCredit] = useState(48.5);
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState<keyof (typeof initialOperations)[0]>('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState<number[]>([]);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleOpenModal = useCallback(() => setOpenModal(true), []);
    const handleCloseModal = useCallback(() => setOpenModal(false), []);
    const handleOpenConfirmDelete = useCallback(() => setConfirmDeleteOpen(true), []);
    const handleCloseConfirmDelete = useCallback(() => setConfirmDeleteOpen(false), []);

    const handleDeleteSelected = useCallback(() => {
        setOperations((prev) => prev.filter((op) => !selected.includes(op.id)));
        setSelected([]);
    }, [selected]);

    const handleConfirmDelete = useCallback(() => {
        handleDeleteSelected();
        setConfirmDeleteOpen(false);
    }, [handleDeleteSelected]);

    const handleNewOperation = () => {
        setSnackbar({
            open: true,
            message: 'Operation calculated.',
            severity: 'success',
        });
    };

    const handleSort = (column: keyof (typeof initialOperations)[0]) => {
        setOrderBy(column);
        setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.checked ? operations.map((op) => op.id) : []);
    };

    const handleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const filteredOperations = operations.filter(
        (op) =>
            op.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            op.result.toString().includes(searchQuery)
    );

    const sortedData = [...filteredOperations].sort((a, b) =>
        order === 'asc' ? (a[orderBy] < b[orderBy] ? -1 : 1) : a[orderBy] > b[orderBy] ? -1 : 1
    );

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                <TableContainer>
                    <Table>
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
                                <TableCell align="left">ID</TableCell>
                                <TableCell
                                    align="left"
                                    sortDirection={orderBy === 'type' ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'type'}
                                        direction={orderBy === 'type' ? order : 'asc'}
                                        onClick={() => handleSort('type')}
                                    >
                                        Operation Type
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sortDirection={orderBy === 'value' ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'value'}
                                        direction={orderBy === 'value' ? order : 'asc'}
                                        onClick={() => handleSort('value')}
                                    >
                                        Value
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sortDirection={orderBy === 'result' ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'result'}
                                        direction={orderBy === 'result' ? order : 'asc'}
                                        onClick={() => handleSort('result')}
                                    >
                                        Result
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sortDirection={orderBy === 'cost' ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'cost'}
                                        direction={orderBy === 'cost' ? order : 'asc'}
                                        onClick={() => handleSort('cost')}
                                    >
                                        Cost
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="left">Balance</TableCell>
                                <TableCell
                                    align="left"
                                    sortDirection={orderBy === 'date' ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === 'date'}
                                        direction={orderBy === 'date' ? order : 'asc'}
                                        onClick={() => handleSort('date')}
                                    >
                                        Date
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedData.map((record) => (
                                <TableRow key={record.id} selected={selected.includes(record.id)}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selected.includes(record.id)}
                                            onChange={() => handleSelect(record.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{record.id}</TableCell>
                                    <TableCell>{record.type}</TableCell>
                                    <TableCell>{record.value}</TableCell>
                                    <TableCell>{record.result}</TableCell>
                                    <TableCell>
                                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                                            {`-$${record.cost.toFixed(2)}`}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            style={{
                                                color: record.credit > 0 ? 'green' : 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            ${record.credit.toFixed(2)}
                                        </span>
                                    </TableCell>
                                    <TableCell>{record.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={sortedData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            {selected.length > 0 && (
                <Box display="flex" justifyContent="flex-end" my={2}>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<Iconify icon="tabler:trash" width={20} />}
                        onClick={handleOpenConfirmDelete}
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
                    <Button onClick={handleCloseConfirmDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
                <Fade in={openModal}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" mb={2}>
                            New Operation
                        </Typography>
                        <NewOperationForm
                            onClose={handleCloseModal}
                            onAddOperation={handleNewOperation}
                            credit={credit}
                        />
                    </Box>
                </Fade>
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

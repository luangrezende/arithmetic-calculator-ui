import { useState, useCallback } from 'react';

import {
    Box,
    Card,
    Fade,
    Table,
    Modal,
    Button,
    TableRow,
    Checkbox,
    TableBody,
    TableCell,
    TableHead,
    TextField,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { NewOperationForm } from './new-operation-form-view';

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
    { id: 1, type: 'Square Root', cost: 5.0, result: 3, credit: 48.5, date: getTimeAgo(10) },
    { id: 2, type: 'Division', cost: 15.0, result: 2, credit: 53.5, date: getTimeAgo(20) },
    { id: 3, type: 'Multiplication', cost: 15.5, result: 45, credit: 68.5, date: getTimeAgo(30) },
    { id: 4, type: 'Subtraction', cost: 5.25, result: 8, credit: 84.0, date: getTimeAgo(40) },
    { id: 5, type: 'Addition', cost: 10.75, result: 15, credit: 89.25, date: getTimeAgo(50) },
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

    const handleOpenModal = useCallback(() => setOpenModal(true), []);
    const handleCloseModal = useCallback(() => setOpenModal(false), []);

    const handleNewOperation = (newOperation: any) => {
        const newCredit = Math.max(credit + newOperation.cost, 0);
        const operationWithCredit = {
            ...newOperation,
            id: operations.length + 1,
            credit: newCredit,
            date: new Date().toLocaleString(),
        };
        setOperations((prev) => [operationWithCredit, ...prev]);
        setCredit(newCredit);
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

    const handleDeleteSelected = () => {
        setOperations((prev) => prev.filter((op) => !selected.includes(op.id)));
        setSelected([]);
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
                    sx={{ mr: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Iconify icon="mingcute:add-line" width={20} />}
                    onClick={handleOpenModal}
                >
                    New operation
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
                                <TableCell align="left" onClick={() => handleSort('type')}>
                                    Operation Type{' '}
                                    {orderBy === 'type' && (order === 'asc' ? '▲' : '▼')}
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('result')}>
                                    Result {orderBy === 'result' && (order === 'asc' ? '▲' : '▼')}
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('cost')}>
                                    Cost {orderBy === 'cost' && (order === 'asc' ? '▲' : '▼')}
                                </TableCell>
                                <TableCell align="left">Balance</TableCell>
                                <TableCell align="left" onClick={() => handleSort('date')}>
                                    Date {orderBy === 'date' && (order === 'asc' ? '▲' : '▼')}
                                </TableCell>
                                <TableCell align="center">Actions</TableCell>
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
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleSelect(record.id)}>
                                            <Iconify icon="solar:trash-bin-bold" width={20} />
                                        </IconButton>
                                    </TableCell>
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
                        startIcon={<Iconify icon="solar:trash-bin-bold" width={20} />}
                        onClick={handleDeleteSelected}
                    >
                        Delete Selected
                    </Button>
                </Box>
            )}

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
        </DashboardContent>
    );
}

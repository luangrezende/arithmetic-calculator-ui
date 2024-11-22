import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { NewOperationForm } from './new-operation-form-view';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const getTimeAgo = (minutes: number) =>
    new Date(new Date().getTime() - minutes * 60 * 1000).toLocaleString();

const initialOperations = [
    { id: 1, type: 'Square Root', cost: 5.0, result: 3, balance: 48.5, date: getTimeAgo(10) },
    { id: 2, type: 'Division', cost: 15.0, result: 2, balance: 53.5, date: getTimeAgo(20) },
    { id: 3, type: 'Multiplication', cost: 15.5, result: 45, balance: 68.5, date: getTimeAgo(30) },
    { id: 4, type: 'Subtraction', cost: 5.25, result: 8, balance: 84.0, date: getTimeAgo(40) },
    { id: 5, type: 'Addition', cost: 10.75, result: 15, balance: 89.25, date: getTimeAgo(50) },
    { id: 6, type: 'Addition', cost: 10.75, result: 15, balance: 100.0, date: getTimeAgo(60) },
    { id: 7, type: 'Addition', cost: 10.75, result: 15, balance: 110.75, date: getTimeAgo(70) },
];

export function OperationView() {
    const [openModal, setOpenModal] = useState(false);
    const [operations, setOperations] = useState(initialOperations);
    const [balance, setBalance] = useState(48.5); // Saldo inicial
    const [order, setOrder] = useState<'asc' | 'desc'>('desc'); // Estado de ordenação
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenModal = useCallback(() => setOpenModal(true), []);
    const handleCloseModal = useCallback(() => setOpenModal(false), []);

    const handleNewOperation = (newOperation: any) => {
        const newBalance = Math.max(balance + newOperation.cost, 0);
        const operationWithBalance = {
            ...newOperation,
            id: operations.length + 1,
            balance: newBalance,
            date: new Date().toLocaleString(),
        };
        setOperations((prev) => [operationWithBalance, ...prev]);
        setBalance(newBalance);
    };

    const handleSort = () => {
        setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const sortedData = [...operations].sort((a, b) =>
        order === 'desc'
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
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
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Iconify icon="mingcute:add-line" />}
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
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Operation Type</TableCell>
                                <TableCell align="left">Result</TableCell>
                                <TableCell align="left">Cost</TableCell>
                                <TableCell align="left">Balance</TableCell>
                                <TableCell
                                    align="left"
                                    onClick={handleSort}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Date {order === 'asc' ? '▲' : '▼'}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((record) => (
                                <TableRow key={record.id}>
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
                                                color: record.balance > 0 ? 'green' : 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            ${record.balance.toFixed(2)}
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
                    count={operations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" mb={2}>
                            New Operation
                        </Typography>
                        <NewOperationForm
                            onClose={handleCloseModal}
                            // onAddOperation={handleNewOperation}
                        />
                    </Box>
                </Fade>
            </Modal>
        </DashboardContent>
    );
}

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useLocalUser } from 'src/hooks/use-local-user';

import { DashboardContent } from 'src/layouts/dashboard';

import { Chart } from 'src/components/chart';

import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function OverviewAnalyticsView() {
    const user = useLocalUser();

    return (
        <DashboardContent maxWidth="xl">
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Hi, {user?.name} 👋
            </Typography>

            <Grid container spacing={3}>
                {/* Card 1: Operações */}
                <Grid xs={12} sm={6} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <AnalyticsWidgetSummary
                            title="Operations"
                            percent={0.1}
                            total={22}
                            color="primary"
                            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
                            chart={{
                                categories: [
                                    'Jan',
                                    'Feb',
                                    'Mar',
                                    'Apr',
                                    'May',
                                    'Jun',
                                    'Jul',
                                    'Aug',
                                ],
                                series: [56, 47, 40, 62, 73, 30, 23, 54],
                            }}
                        />
                        {/* Adicionando progresso */}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Monthly Target
                            </Typography>
                            <LinearProgress variant="determinate" value={70} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 2: Crédito */}
                <Grid xs={12} sm={6} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <AnalyticsWidgetSummary
                            title="Credit"
                            percent={-0.2}
                            total={25054}
                            color="success"
                            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
                            chart={{
                                categories: [
                                    'Jan',
                                    'Feb',
                                    'Mar',
                                    'Apr',
                                    'May',
                                    'Jun',
                                    'Jul',
                                    'Aug',
                                ],
                                series: [70, 50, 90, 60, 80, 40, 30, 70],
                            }}
                        />
                        {/* Adicionando progresso */}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Annual Target
                            </Typography>
                            <LinearProgress variant="determinate" value={45} color="success" />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Extra Gráficos/Seções */}
            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Performance Highlights
                </Typography>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={4}>
                        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h6" color="primary">
                                87%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Customer Satisfaction
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h6" color="error">
                                5,000
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Pending Orders
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="h6" color="success">
                                $1.2M
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Revenue
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </DashboardContent>
    );
}

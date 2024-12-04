import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useLocalUser } from 'src/hooks/use-local-user';

import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function OverviewAnalyticsView() {
    const user = useLocalUser();

    return (
        <DashboardContent maxWidth="xl">
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Hi, {user?.name} 👋
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <AnalyticsWidgetSummary
                            title="Operations"
                            percent={0.1}
                            total={22}
                            color="primary"
                            icon={<img alt="icon" src="/assets/icons/custom/calculator.svg" />}
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
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Monthly Target
                            </Typography>
                            <LinearProgress variant="determinate" value={70} />
                        </Box>
                    </Paper>
                </Grid>

                <Grid xs={12} sm={6} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <AnalyticsWidgetSummary
                            title="Credit"
                            percent={-0.2}
                            total={25054}
                            color="success"
                            icon={<img alt="icon" src="/assets/icons/custom/pound-banknote.svg" />}
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
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Annual Target
                            </Typography>
                            <LinearProgress variant="determinate" value={45} color="success" />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Performance Highlights
                </Typography>
                <Grid container spacing={3}>
                    {[
                        { value: 55, label: 'Users created', color: 'primary.main' },
                        { value: 4985, label: 'Total operations', color: 'primary.main' },
                        { value: '$1.2M', label: 'Total cash added', color: 'success.main' },
                    ].map((item, index) => (
                        <Grid xs={12} sm={6} md={4} key={index}>
                            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: item.color }}>
                                    {item.value}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    aria-label={item.label}
                                >
                                    {item.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </DashboardContent>
    );
}

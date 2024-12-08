import type { Dashboard } from 'src/models/dashboard';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useLocalUser } from 'src/hooks/use-local-user';

import { formatCurrency } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';
import { getDashboardData } from 'src/services/api/operation-service';

import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function OverviewAnalyticsView() {
    const user = useLocalUser();
    const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                const data = await getDashboardData();
                setDashboardData(data.data);
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <DashboardContent maxWidth="xl">
                <Typography variant="h5">Loading...</Typography>
            </DashboardContent>
        );
    }

    if (!dashboardData) {
        return (
            <DashboardContent maxWidth="xl">
                <Typography variant="h5" color="error">
                    Failed to load data.
                </Typography>
            </DashboardContent>
        );
    }

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
                            percent={
                                dashboardData.totalMonthlyOperations / dashboardData.totalOperations
                            }
                            total={dashboardData.totalOperations}
                            color="primary"
                            icon={<img alt="icon" src="/assets/icons/custom/calculator.svg" />}
                            chart={{
                                categories: [],
                                series: [],
                            }}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Monthly Target
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={
                                    (dashboardData.totalMonthlyOperations /
                                        dashboardData.totalOperations) *
                                    100
                                }
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid xs={12} sm={6} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <AnalyticsWidgetSummary
                            title="Credit"
                            percent={
                                (dashboardData.totalAnnualCashAdded - dashboardData.totalCredit) /
                                dashboardData.totalAnnualCashAdded
                            }
                            total={dashboardData.totalCredit}
                            color="success"
                            icon={<img alt="icon" src="/assets/icons/custom/pound-banknote.svg" />}
                            chart={{
                                categories: [],
                                series: [],
                            }}
                            isCurrency
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Annual Target
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={
                                    (dashboardData.totalAnnualCashAdded /
                                        dashboardData.annualTarget) *
                                    100
                                }
                                color="success"
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Platform Performance
                </Typography>
                <Grid container spacing={3}>
                    {[
                        {
                            value: dashboardData.totalPlatformOperations,
                            label: 'Total operations',
                            color: 'primary.main',
                        },
                        {
                            value: formatCurrency(
                                dashboardData.totalPlatformCashSpent.toFixed(2).toString()
                            ),
                            label: 'Total spent',
                            color: 'error.main',
                        },
                        {
                            value: formatCurrency(
                                dashboardData.totalPlatformCashAdded.toFixed(2).toString()
                            ),
                            label: 'Total cash added',
                            color: 'success.main',
                        },
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

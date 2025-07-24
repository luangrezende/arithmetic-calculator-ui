import type { Dashboard } from 'src/models/dashboard';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';

import { useLocalUser } from 'src/hooks/use-local-user';
import { fCurrency } from 'src/utils/format-number';
import { varAlpha } from 'src/theme/styles';

import { DashboardContent } from 'src/layouts/dashboard';
import { getDashboardData } from 'src/services/api/operation-service';
import { ModernCard } from 'src/components/modern-card';
import { ResponsiveGrid } from 'src/components/responsive-grid';

import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

export function OverviewAnalyticsView() {
    const user = useLocalUser();
    const theme = useTheme();
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 400,
                    }}
                >
                    <LinearProgress sx={{ width: '50%', maxWidth: 400 }} />
                </Box>
            </DashboardContent>
        );
    }

    if (!dashboardData) {
        return (
            <DashboardContent maxWidth="xl">
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No data available
                </Typography>
            </DashboardContent>
        );
    }

    return (
        <DashboardContent maxWidth="xl">
            <Box
                sx={{
                    mb: { xs: 3, md: 5 },
                    p: { xs: 2, md: 3 },
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${varAlpha('37 99 235', 0.1)} 0%, ${varAlpha('124 58 237', 0.05)} 100%)`,
                }}
            >
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontWeight: 600,
                        mb: 1,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Hi, {user?.name?.split(' ')[0]}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome back to your arithmetic calculator dashboard
                </Typography>
            </Box>

            <ResponsiveGrid
                columns={{ xs: 1, md: 2 }}
                gap={3}
                sx={{ mb: 4 }}
            >
                <ModernCard hoverable gradient>
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                Operations
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total calculations performed
                            </Typography>
                        </Box>
                        
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main }}>
                            {dashboardData.totalOperations.toLocaleString()}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Monthly Progress
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {dashboardData.totalMonthlyOperations}/{dashboardData.totalOperations}
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min((dashboardData.totalMonthlyOperations / dashboardData.totalOperations) * 100, 100)}
                                sx={{ 
                                    height: 8, 
                                    borderRadius: 4,
                                    backgroundColor: varAlpha('37 99 235', 0.1),
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </ModernCard>

                <ModernCard hoverable gradient>
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                Total Credit
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Available balance
                            </Typography>
                        </Box>
                        
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: theme.palette.success.main }}>
                            {fCurrency(dashboardData.totalCredit)}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Annual Cash Added
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.success.dark }}>
                                {fCurrency(dashboardData.totalAnnualCashAdded)}
                            </Typography>
                        </Box>
                    </Box>
                </ModernCard>
            </ResponsiveGrid>

            <ResponsiveGrid
                columns={{ xs: 1, md: 2, lg: 3 }}
                gap={3}
            >
                <ModernCard glassy interactive>
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                Platform Overview
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Global operations count
                            </Typography>
                        </Box>
                        
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: theme.palette.info.main }}>
                            {dashboardData.totalPlatformOperations.toLocaleString()}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Target Progress
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {Math.min(Math.round((dashboardData.totalPlatformOperations / 1000) * 100), 100)}%
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min((dashboardData.totalPlatformOperations / 1000) * 100, 100)}
                                sx={{ 
                                    height: 8, 
                                    borderRadius: 4,
                                    backgroundColor: varAlpha('0 184 217', 0.1),
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        background: `linear-gradient(90deg, ${theme.palette.info.main}, ${theme.palette.info.light})`,
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </ModernCard>

                <ModernCard glassy interactive>
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                Platform Finances
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Revenue & expenses overview
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Cash Spent
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.error.main, mb: 2 }}>
                                {fCurrency(dashboardData.totalPlatformCashSpent)}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Cash Added
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.success.main }}>
                                {fCurrency(dashboardData.totalPlatformCashAdded)}
                            </Typography>
                        </Box>
                    </Box>
                </ModernCard>

                <ModernCard glassy interactive>
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                Annual Target
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Yearly goal progress
                            </Typography>
                        </Box>
                        
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: theme.palette.warning.main }}>
                            {fCurrency(dashboardData.annualTarget)}
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Progress to Goal
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {Math.min(Math.round((dashboardData.totalOperations / dashboardData.annualTarget) * 100), 100)}%
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min((dashboardData.totalOperations / dashboardData.annualTarget) * 100, 100)}
                                sx={{ 
                                    height: 8, 
                                    borderRadius: 4,
                                    backgroundColor: varAlpha('245 158 11', 0.1),
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        background: `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.warning.light})`,
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </ModernCard>
            </ResponsiveGrid>
        </DashboardContent>
    );
}

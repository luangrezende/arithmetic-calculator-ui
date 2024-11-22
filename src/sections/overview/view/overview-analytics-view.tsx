import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tasks, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
    return (
        <DashboardContent maxWidth="xl">
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Hi, USER_NAME 👋
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={4}>
                    <AnalyticsWidgetSummary
                        title="New users"
                        percent={-0.1}
                        total={1352831}
                        color="secondary"
                        icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [56, 47, 40, 62, 73, 30, 23, 54],
                        }}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                    <AnalyticsWidgetSummary
                        title="New users"
                        percent={-0.1}
                        total={1352831}
                        color="secondary"
                        icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [56, 47, 40, 62, 73, 30, 23, 54],
                        }}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                    <AnalyticsWidgetSummary
                        title="Purchase orders"
                        percent={2.8}
                        total={1723315}
                        color="success"
                        icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [40, 70, 50, 28, 70, 75, 7, 64],
                        }}
                    />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}

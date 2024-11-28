import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

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
                    <AnalyticsWidgetSummary
                        title="Operations"
                        percent={-0.1}
                        total={22}
                        color="secondary"
                        icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [56, 47, 40, 62, 73, 30, 23, 54],
                        }}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={6}>
                    <AnalyticsWidgetSummary
                        title="Credit"
                        percent={-0.1}
                        total={250}
                        color="secondary"
                        icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
                        chart={{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            series: [56, 47, 40, 62, 73, 30, 23, 54],
                        }}
                    />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}

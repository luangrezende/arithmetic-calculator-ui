import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';

export function NotFoundView() {
    return (
        <SimpleLayout content={{ compact: true }}>
            <Container sx={{ textAlign: 'center' }}>
                <Box
                    component="img"
                    src="/assets/illustrations/illustration-404.svg"
                    alt="404 illustration"
                    sx={{
                        maxWidth: 180,
                        height: 'auto',
                        margin: '0 auto',
                        mb: 3,
                    }}
                />

                <Typography variant="h5" sx={{ mb: 1 }}>
                    Page not found
                </Typography>

                <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 3 }}>
                    The page you’re looking for doesn’t exist.
                </Typography>

                <Button
                    component={RouterLink}
                    href="/"
                    size="medium"
                    variant="contained"
                    color="primary"
                >
                    Go Home
                </Button>
            </Container>
        </SimpleLayout>
    );
}

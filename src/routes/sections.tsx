import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { PrivateRoute } from './components/private-route';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const OperationPage = lazy(() => import('src/pages/operation'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
    <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
        <LinearProgress
            sx={{
                width: 1,
                maxWidth: 320,
                bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
                [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
            }}
        />
    </Box>
);

export function Router() {
    return useRoutes([
        {
            element: (
                <PrivateRoute>
                    <DashboardLayout>
                        <Suspense fallback={renderFallback}>
                            <Outlet />
                        </Suspense>
                    </DashboardLayout>
                </PrivateRoute>
            ),
            children: [
                { element: <HomePage />, index: true },
                { path: 'products', element: <ProductsPage /> },
                { path: 'operation', element: <OperationPage /> },
            ],
        },
        {
            path: 'sign-in',
            element: (
                <AuthLayout>
                    <SignInPage />
                </AuthLayout>
            ),
        },
        {
            path: 'sign-up', // Nova rota para o componente de cadastro
            element: (
                <AuthLayout>
                    <SignUpPage />
                </AuthLayout>
            ),
        },
        {
            path: '404',
            element: <Page404 />,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);
}

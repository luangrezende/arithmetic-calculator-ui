import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { FallbackLoader } from 'src/components/fallback/fallback-loader';
import { PrivateRoute } from 'src/components/private-route/private-route';

import { HelmetTitle } from './helmet-title';

export const HomePage = lazy(() => import('src/pages/home/dashboard-view'));
export const OperationPage = lazy(() => import('src/pages/operation'));
export const SignUpPage = lazy(() => import('src/pages/auth/sign-up-view'));
export const SignInPage = lazy(() => import('src/pages/auth/sign-in-view'));
export const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password-view'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export function Router() {
    const publicRoutes = [
        {
            path: 'sign-in',
            element: (
                <AuthLayout>
                    <HelmetTitle title="Sign in" />
                    <SignInPage />
                </AuthLayout>
            ),
        },
        {
            path: 'sign-up',
            element: (
                <AuthLayout>
                    <HelmetTitle title="Sign up" />
                    <SignUpPage />
                </AuthLayout>
            ),
        },
        {
            path: 'forgot-password',
            element: (
                <AuthLayout>
                    <HelmetTitle title="Forgot password" />
                    <ForgotPasswordPage />
                </AuthLayout>
            ),
        },
        {
            path: '/404',
            element: <Page404 />,
        },
    ];

    const privateRoutes = [
        {
            element: (
                <PrivateRoute>
                    <DashboardLayout>
                        <Suspense fallback={<FallbackLoader />}>
                            <Outlet />
                        </Suspense>
                    </DashboardLayout>
                </PrivateRoute>
            ),
            children: [
                { element: <HomePage />, index: true },
                { path: 'operation', element: <OperationPage /> },
            ],
        },
    ];

    const notFoundRoute = {
        path: '*',
        element: <Navigate to="/404" replace />,
    };

    return useRoutes([...privateRoutes, ...publicRoutes, notFoundRoute]);
}

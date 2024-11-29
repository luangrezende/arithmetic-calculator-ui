import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

import { FallbackLoader } from 'src/components/fallback/fallback-loader';
import { PrivateRoute } from 'src/components/private-route/private-route';

import { HelmetTitle } from './helmet-title';

const HomePage = lazy(() => import('src/pages/home/dashboard-view'));
const OperationPage = lazy(() => import('src/pages/operation'));
const SignUpPage = lazy(() => import('src/features/auth/sign-up'));
const SignInPage = lazy(() => import('src/features/auth/sign-in'));
const ForgotPasswordPage = lazy(
    () => import('src/features/auth/forgot-password/forgot-password-view')
);
const Page404 = lazy(() => import('src/pages/page-not-found'));

const withSuspense = (Component: React.ComponentType) => (
    <Suspense fallback={<FallbackLoader />}>
        <Component />
    </Suspense>
);

export function Router() {
    const publicRoutes = [
        {
            path: 'sign-in',
            element: (
                <AuthLayout>
                    <HelmetTitle title="Sign in" />
                    {withSuspense(SignInPage)}
                </AuthLayout>
            ),
        },
        {
            path: 'sign-up',
            element: (
                <AuthLayout>
                    <HelmetTitle title="Sign up" />
                    {withSuspense(SignUpPage)}
                </AuthLayout>
            ),
        },
        {
            path: 'forgot-password',
            element: (
                <AuthLayout>
                    <HelmetTitle title="Forgot password" />
                    {withSuspense(ForgotPasswordPage)}
                </AuthLayout>
            ),
        },
        {
            path: '/404',
            element: withSuspense(Page404),
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
                { element: withSuspense(HomePage), index: true },
                { path: 'operation', element: withSuspense(OperationPage) },
            ],
        },
    ];

    const notFoundRoute = {
        path: '*',
        element: <Navigate to="/404" replace />,
    };

    return useRoutes([...privateRoutes, ...publicRoutes, notFoundRoute]);
}

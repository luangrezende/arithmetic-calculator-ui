import type { Dashboard } from 'src/models/dashboard';

import { useState, useEffect } from 'react';

import { useLocalUser } from 'src/hooks/use-local-user';

import { fCurrency } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';
import { getDashboardData } from 'src/services/api/operation-service';

import { ModernCard } from 'src/components/modern-card';
import { ResponsiveGrid } from 'src/components/responsive-grid';

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
                <div className="flex items-center justify-center min-h-96">
                    <div className="w-full max-w-md">
                        <div className="h-1 bg-primary-500 rounded animate-pulse" />
                    </div>
                </div>
            </DashboardContent>
        );
    }

    if (!dashboardData) {
        return (
            <DashboardContent maxWidth="xl">
                <div className="text-center py-8">
                    <h2 className="text-xl text-gray-600 dark:text-gray-400">No data available</h2>
                </div>
            </DashboardContent>
        );
    }

    return (
        <DashboardContent maxWidth="xl">
            <div className="mb-6 p-4 md:p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                <h1 className="text-2xl font-semibold mb-2 text-primary-600 dark:text-primary-400">
                    Hi, {user?.name?.split(' ')[0]}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome back to your arithmetic calculator dashboard
                </p>
            </div>

            <ResponsiveGrid
                columns={{ xs: 1, sm: 2, md: 2, lg: 2 }}
                gap={3}
                sx={{ mb: 4 }}
            >
                <ModernCard hoverable padding="none">
                    <div className="p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                Operations
                            </h3>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                        Total calculations performed
                    </div>
                        </div>

                        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                            {dashboardData.totalOperations.toLocaleString()}
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Monthly Progress
                                </span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {Math.min(Math.round((dashboardData.totalMonthlyOperations / dashboardData.totalOperations) * 100), 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${Math.min((dashboardData.totalMonthlyOperations / dashboardData.totalOperations) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </ModernCard>

                <ModernCard hoverable padding="none">
                    <div className="p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                Total Credit
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Available balance
                            </p>
                        </div>
                        
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                            {fCurrency(dashboardData.totalCredit)}
                        </div>
                        
                        <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                Annual Cash Added
                            </p>
                            <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                                {fCurrency(dashboardData.totalAnnualCashAdded)}
                            </div>
                        </div>
                    </div>
                </ModernCard>
            </ResponsiveGrid>

            <ResponsiveGrid
                columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
                gap={3}
            >
                <ModernCard hoverable padding="none">
                    <div className="p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                Platform Overview
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Global operations count
                            </p>
                        </div>
                        
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                            {dashboardData.totalPlatformOperations.toLocaleString()}
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Target Progress
                                </span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {Math.min(Math.round((dashboardData.totalPlatformOperations / 1000) * 100), 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${Math.min((dashboardData.totalPlatformOperations / 1000) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </ModernCard>

                <ModernCard hoverable padding="none">
                    <div className="p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                Platform Finances
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Revenue & expenses overview
                            </p>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                Cash Spent
                            </p>
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                                {fCurrency(dashboardData.totalPlatformCashSpent)}
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                Cash Added
                            </p>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {fCurrency(dashboardData.totalPlatformCashAdded)}
                            </div>
                        </div>
                    </div>
                </ModernCard>

                <ModernCard hoverable padding="none">
                    <div className="p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                Annual Target
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Yearly goal progress
                            </p>
                        </div>
                        
                        <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-4">
                            {fCurrency(dashboardData.annualTarget)}
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Progress to Goal
                                </span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {Math.min(Math.round((dashboardData.totalOperations / dashboardData.annualTarget) * 100), 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-amber-500 h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${Math.min((dashboardData.totalOperations / dashboardData.annualTarget) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </ModernCard>
            </ResponsiveGrid>
        </DashboardContent>
    );
}

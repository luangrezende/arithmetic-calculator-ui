import type { Dashboard } from 'src/models/dashboard';

import { useState, useEffect } from 'react';

import { useCurrency } from 'src/hooks/use-currency';
import { useLocalUser } from 'src/hooks/use-local-user';

import { formatCurrencyWithSymbol } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';
import { getDashboardData } from 'src/services/api/operation-service';

import { ModernCard } from 'src/components/modern-card';

export function OverviewAnalyticsView() {
    const user = useLocalUser();
    const { currency } = useCurrency();
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
            <DashboardContent maxWidth="lg">
                <div className="flex items-center justify-center min-h-64 sm:min-h-96">
                    <div className="w-full max-w-md mx-auto">
                        <div className="bg-white dark:bg-slate-700 rounded-xl p-4 sm:p-6">
                            <div className="text-center mb-3 sm:mb-4">
                                <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Loading dashboard...</div>
                            </div>
                            <div className="relative h-1.5 sm:h-2 bg-slate-100 dark:bg-slate-600 rounded-full overflow-hidden">
                                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-bar" />
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardContent>
        );
    }

    if (!dashboardData) {
        return (
            <DashboardContent maxWidth="lg">
                <div className="text-center py-8">
                    <h2 className="text-xl text-gray-600 dark:text-gray-400">No data available</h2>
                </div>
            </DashboardContent>
        );
    }

    return (
        <DashboardContent maxWidth="lg">
            <div className="space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-blue-100 dark:bg-slate-500/90">
                    <h1 className="text-xl sm:text-2xl font-bold mb-2 text-primary-600 dark:text-primary-400">
                        Hi, {user?.name?.split(' ')[0]}
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                        Welcome back to your arithmetic calculator dashboard
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <ModernCard hoverable padding="none" className="h-full min-h-48 sm:min-h-80">
                        <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    Operations
                                </h3>
                                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Total calculations performed
                                </div>
                            </div>

                            <div className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4 sm:mb-6">
                                {dashboardData.totalOperations.toLocaleString()}
                            </div>
                            
                            <div className="mt-auto">
                                <div className="flex justify-between items-center mb-2 sm:mb-3">
                                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        Monthly Progress
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                        {Math.min(Math.round((dashboardData.totalMonthlyOperations / dashboardData.totalOperations) * 100), 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 sm:h-2">
                                    <div 
                                        className="bg-primary-500 h-1.5 sm:h-2 rounded-full transition-all duration-300" 
                                        style={{ width: `${Math.min((dashboardData.totalMonthlyOperations / dashboardData.totalOperations) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModernCard>

                    <ModernCard hoverable padding="none" className="h-full min-h-48 sm:min-h-80">
                        <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    Total Credit
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Available balance
                                </p>
                            </div>
                            
                            <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-4 sm:mb-6 flex items-baseline">
                                <span className="text-xl sm:text-2xl mr-1">{formatCurrencyWithSymbol(dashboardData.totalCredit, currency).currency}</span>
                                <span>{formatCurrencyWithSymbol(dashboardData.totalCredit, currency).value}</span>
                            </div>
                            
                            <div className="mt-auto">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
                                    Annual Cash Added
                                </p>
                                <div className="text-base sm:text-lg font-semibold text-green-700 dark:text-green-300 flex items-baseline">
                                    <span className="text-sm mr-1">{formatCurrencyWithSymbol(dashboardData.totalAnnualCashAdded, currency).currency}</span>
                                    <span>{formatCurrencyWithSymbol(dashboardData.totalAnnualCashAdded, currency).value}</span>
                                </div>
                            </div>
                        </div>
                    </ModernCard>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    <ModernCard hoverable padding="none" className="h-full min-h-48 sm:min-h-75">
                        <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    Platform Overview
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Global operations count
                                </p>
                            </div>
                            
                            <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4 sm:mb-6">
                                {dashboardData.totalPlatformOperations.toLocaleString()}
                            </div>
                            
                            <div className="mt-auto">
                                <div className="flex justify-between items-center mb-2 sm:mb-3">
                                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        Target Progress
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                        {Math.min(Math.round((dashboardData.totalPlatformOperations / 1000) * 100), 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 sm:h-2">
                                    <div 
                                        className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300" 
                                        style={{ width: `${Math.min((dashboardData.totalPlatformOperations / 1000) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModernCard>

                    <ModernCard hoverable padding="none" className="h-full min-h-48 sm:min-h-75">
                        <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    Platform Finances
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Revenue & expenses overview
                                </p>
                            </div>
                            
                            <div className="flex-1 space-y-4 sm:space-y-6">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
                                        Cash Spent
                                    </p>
                                    <div className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 flex items-baseline">
                                        <span className="text-base sm:text-xl mr-1">{formatCurrencyWithSymbol(dashboardData.totalPlatformCashSpent, currency).currency}</span>
                                        <span>{formatCurrencyWithSymbol(dashboardData.totalPlatformCashSpent, currency).value}</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
                                        Cash Added
                                    </p>
                                    <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 flex items-baseline">
                                        <span className="text-base sm:text-xl mr-1">{formatCurrencyWithSymbol(dashboardData.totalPlatformCashAdded, currency).currency}</span>
                                        <span>{formatCurrencyWithSymbol(dashboardData.totalPlatformCashAdded, currency).value}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModernCard>

                    <ModernCard hoverable padding="none" className="h-full min-h-48 sm:min-h-75">
                        <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                            <div className="mb-4 sm:mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    Annual Target
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    Yearly goal progress
                                </p>
                            </div>
                            
                            <div className="text-3xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-4 sm:mb-6 flex items-baseline">
                                <span className="text-xl sm:text-2xl mr-1">{formatCurrencyWithSymbol(dashboardData.annualTarget, currency).currency}</span>
                                <span>{formatCurrencyWithSymbol(dashboardData.annualTarget, currency).value}</span>
                            </div>
                            
                            <div className="mt-auto">
                                <div className="flex justify-between items-center mb-2 sm:mb-3">
                                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        Progress to Goal
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                        {Math.min(Math.round((dashboardData.totalOperations / dashboardData.annualTarget) * 100), 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5 sm:h-2">
                                    <div 
                                        className="bg-amber-500 h-1.5 sm:h-2 rounded-full transition-all duration-300" 
                                        style={{ width: `${Math.min((dashboardData.totalOperations / dashboardData.annualTarget) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModernCard>
                </div>
            </div>
        </DashboardContent>
    );
}

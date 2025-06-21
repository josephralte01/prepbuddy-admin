// 📁 prepbuddy-admin/src/app/admin/dashboard/xp-analytics/index.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure this is the correct axios instance (e.g. '@/lib/axios')
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DateRangePicker } from '@/components/ui/date-range-picker'; // Assuming this exists and is setup
import AdjustXPModal from '../xp-control/components/AdjustXPModal';
import XPLogTable from './components/XPLogTable';
import TopUsersList from './components/TopUsersList';
import toast from 'react-hot-toast'; // For error notifications

// Types from original xp-logs.tsx and xp-analytics/page.tsx
interface XPLogEntry { // Renamed from XPLog to avoid conflict with state variable
  _id: string;
  userId: string; // From XPAnalyticsPage
  user?: { name?: string; email?: string }; // From XPLogsPage log
  xp: number;
  action: string; // From XPAnalyticsPage (could be actionType from XPLogsPage)
  actionType: string; // From XPLogsPage
  createdAt: string;
  meta?: any; // From XPAnalyticsPage
}

interface TopUser {
  userId: string;
  name?: string;
  email: string;
  totalXP: number;
  streak: number;
}

export default function XPAnalyticsPage() {
  // State from xp-analytics/page.tsx (chart related)
  const [chartLogs, setChartLogs] = useState<XPLogEntry[]>([]);
  const [range, setRange] = useState<{ from: Date; to: Date } | undefined>();
  const [chartLoading, setChartLoading] = useState(false);

  // State from xp-logs.tsx (log table and top users related)
  const [transactionLogs, setTransactionLogs] = useState<XPLogEntry[]>([]);
  const [filters, setFilters] = useState({
    userId: '',
    actionType: '',
    minXP: '',
    maxXP: '',
    sortBy: 'createdAt',
    order: 'desc',
  });
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [topUsersPeriod, setTopUsersPeriod] = useState('weekly');
  const [selectedUserForModal, setSelectedUserForModal] = useState<TopUser | null>(null);
  const [logsLoading, setLogsLoading] = useState(false);
  const [topUsersLoading, setTopUsersLoading] = useState(false);


  const fetchChartLogs = async () => {
    setChartLoading(true);
    try {
      // Assuming a general endpoint, adjust if specific params are needed for chart
      const res = await axios.get('/api/xp-logs');
      setChartLogs(res.data);
    } catch (err) {
      console.error('Failed to fetch chart logs', err);
      toast.error('Failed to load XP chart data.');
    } finally {
      setChartLoading(false);
    }
  };

  const fetchTransactionLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await axios.get('/api/xp-logs', { params: filters });
      setTransactionLogs(res.data);
    } catch (err) {
      console.error('Failed to fetch transaction logs', err);
      toast.error('Failed to load XP transaction logs.');
    } finally {
      setLogsLoading(false);
    }
  };

  const fetchTopUsers = async () => {
    setTopUsersLoading(true);
    try {
      const res = await axios.get('/api/xp-logs/top-users', {
        params: { period: topUsersPeriod },
      });
      setTopUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch top users', err);
      toast.error('Failed to load top XP earners.');
    } finally {
      setTopUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchChartLogs();
    fetchTransactionLogs();
    fetchTopUsers();
  }, []); // Initial fetch

  useEffect(() => {
    fetchTransactionLogs();
  }, [filters]);

  useEffect(() => {
    fetchTopUsers();
  }, [topUsersPeriod]);

  const filteredChartLogs = range
    ? chartLogs.filter((log) => {
        const logDate = new Date(log.createdAt);
        // Ensure range.from and range.to are valid dates
        return logDate >= new Date(range.from) && logDate <= new Date(range.to);
      })
    : chartLogs;

  const chartData = filteredChartLogs.reduce<Record<string, number>>((acc, log) => {
    const date = new Date(log.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + log.xp;
    return acc;
  }, {});

  const finalChartData = Object.entries(chartData).map(([date, xp]) => ({ date, xp }));

  const handleRefreshAll = () => {
    fetchChartLogs();
    fetchTransactionLogs(); // Re-fetch with current filters
    fetchTopUsers(); // Re-fetch with current period
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📊 XP Analytics & Logs</h1>
        <Button onClick={handleRefreshAll} disabled={chartLoading || logsLoading || topUsersLoading}>
          Refresh All Data
        </Button>
      </div>

      {/* XP Analytics Chart Section */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">XP Trends</h2>
          <div className="flex justify-between items-center">
            <DateRangePicker value={range} onValueChange={setRange} />
          </div>
          {chartLoading && <p>Loading chart data...</p>}
          {!chartLoading && finalChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={finalChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="xp" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            !chartLoading && <p className="text-center text-muted-foreground">No XP data in selected range or for the current period.</p>
          )}
        </CardContent>
      </Card>

      {/* Top Users Section */}
      {topUsersLoading && <p>Loading top users...</p>}
      {!topUsersLoading && (
        <TopUsersList
          topUsers={topUsers}
          period={topUsersPeriod}
          onPeriodChange={setTopUsersPeriod}
          onAdjustXP={setSelectedUserForModal}
        />
      )}

      {/* XP Log Filters and Table Section */}
      <Card className="mb-6">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-4 items-end">
          <Input
            placeholder="User ID or Email"
            value={filters.userId}
            onChange={(e) =>
              setFilters((f) => ({ ...f, userId: e.target.value }))
            }
            className="lg:col-span-2"
          />
          <Select
            value={filters.actionType}
            onValueChange={(v) =>
              setFilters((f) => ({ ...f, actionType: v }))
            }
          >
            <SelectTrigger><SelectValue placeholder="Action Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="mock-test">Mock Test</SelectItem>
              <SelectItem value="study-material">Study Material</SelectItem>
              <SelectItem value="manual-adjustment">Manual Adjustment</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Min XP"
            value={filters.minXP}
            onChange={(e) =>
              setFilters((f) => ({ ...f, minXP: e.target.value }))
            }
          />
          <Input
            type="number"
            placeholder="Max XP"
            value={filters.maxXP}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxXP: e.target.value }))
            }
          />
          {/* SortBy and Order removed for brevity, can be added back if needed */}
           <Button onClick={() => fetchTransactionLogs()} disabled={logsLoading} className="lg:col-start-6">
            {logsLoading ? 'Filtering...' : 'Filter Logs'}
          </Button>
        </CardContent>
      </Card>

      {logsLoading && <p>Loading logs...</p>}
      {!logsLoading && <XPLogTable logs={transactionLogs} />}

      {selectedUserForModal && (
        <AdjustXPModal
          user={selectedUserForModal}
          onClose={() => setSelectedUserForModal(null)}
          onRefresh={() => {
            fetchTransactionLogs(); // Refresh logs
            fetchTopUsers(); // Refresh top users as XP might have changed
            fetchChartLogs(); // Refresh chart data
          }}
        />
      )}
    </div>
  );
}

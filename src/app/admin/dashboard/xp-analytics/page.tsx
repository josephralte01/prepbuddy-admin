// 📁 prepbuddy-admin/src/app/admin/dashboard/xp-analytics/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DateRangePicker } from '@/components/ui/date-range-picker';

interface XPLog {
  _id: string;
  userId: string;
  xp: number;
  action: string;
  createdAt: string;
  meta?: any;
}

export default function XPAnalyticsPage() {
  const [logs, setLogs] = useState<XPLog[]>([]);
  const [range, setRange] = useState<{ from: Date; to: Date } | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/xp-logs');
      setLogs(res.data);
    } catch (err) {
      console.error('Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = range
    ? logs.filter((log) => {
        const logDate = new Date(log.createdAt);
        return logDate >= range.from && logDate <= range.to;
      })
    : logs;

  const chartData = filteredLogs.reduce<Record<string, number>>((acc, log) => {
    const date = new Date(log.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + log.xp;
    return acc;
  }, {});

  const data = Object.entries(chartData).map(([date, xp]) => ({ date, xp }));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📊 XP Analytics</h1>
      <div className="flex justify-between items-center">
        <DateRangePicker value={range} onChange={setRange} />
        <Button onClick={fetchLogs} disabled={loading}>
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="xp" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground">No XP data in selected range.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

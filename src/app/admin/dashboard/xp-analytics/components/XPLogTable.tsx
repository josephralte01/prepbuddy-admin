'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Log {
  _id: string;
  user?: { name?: string; email?: string };
  actionType: string;
  xp: number;
  createdAt: string;
}

interface XPLogTableProps {
  logs: Log[];
}

export default function XPLogTable({ logs }: XPLogTableProps) {
  if (!logs || logs.length === 0) {
    return <p>No logs to display.</p>;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-3">XP Transaction Logs</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Action</th>
              <th className="text-left py-2">XP</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-b">
                <td className="py-2">
                  {log.user?.name || 'N/A'} ({log.user?.email || 'N/A'})
                </td>
                <td className="py-2">{log.actionType}</td>
                <td className="py-2">{log.xp}</td>
                <td className="py-2">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

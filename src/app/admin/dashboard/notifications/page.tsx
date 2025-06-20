'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationAnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await axios.get('/api/analytics/admin/notification-analytics');
      setData(res.data);
    };
    fetchAnalytics();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📬 Notification Analytics</h1>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Notifications Sent</h2>
          <p className="text-3xl font-bold text-blue-600">{data.sentCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">XP Reminders</h2>
          <p className="text-3xl text-green-600">{data.xpReminders}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Streak Alerts</h2>
          <p className="text-3xl text-orange-500">{data.streakAlerts}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">📄 Recent Notifications</h3>
      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">User</th>
              <th className="p-2">Type</th>
              <th className="p-2">Message</th>
              <th className="p-2">Sent At</th>
            </tr>
          </thead>
          <tbody>
            {data.recentLogs.map((log: any) => (
              <tr key={log._id} className="border-t">
                <td className="p-2">{log.user?.name} ({log.user?.email})</td>
                <td className="p-2">{log.type}</td>
                <td className="p-2">{log.message}</td>
                <td className="p-2">{new Date(log.sentAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

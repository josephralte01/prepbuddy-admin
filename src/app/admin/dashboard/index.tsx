// 📁 src/app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import AdminShell from '@/components/layout/AdminShell';

interface Metrics {
  totalUsers: number;
  totalTests: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    api.get('/api/admin/metrics')
      .then(res => setMetrics(res.data))
      .catch(() => router.push('/admin/login'));
  }, [router]);

  return (
    <AdminShell>
      <h1 className="text-3xl font-bold mb-6">Welcome Admin</h1>

      {!metrics ? (
        <p className="text-slate-600">Loading metrics...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h2 className="text-slate-500 text-sm">Total Users</h2>
            <p className="text-2xl font-semibold">{metrics.totalUsers}</p>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h2 className="text-slate-500 text-sm">Mock Tests</h2>
            <p className="text-2xl font-semibold">{metrics.totalTests}</p>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h2 className="text-slate-500 text-sm">Revenue</h2>
            <p className="text-2xl font-semibold">₹{metrics.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

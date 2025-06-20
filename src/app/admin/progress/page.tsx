// 📁 src/app/admin/progress/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import UserProgressTable from '@/components/admin/UserProgressTable';

export default function AdminProgressPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">User Progress Tracker</h1>
      <UserProgressTable />
    </AdminShell>
  );
}

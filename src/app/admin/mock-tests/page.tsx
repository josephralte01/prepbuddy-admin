// 📁 src/app/admin/mock-tests/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import MockTestForm from '@/components/admin/MockTestForm';
import MockTestList from '@/components/admin/MockTestList';

export default function AdminMockTestsPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">Manage Mock Tests</h1>

      <MockTestForm />
      <MockTestList />
    </AdminShell>
  );
}

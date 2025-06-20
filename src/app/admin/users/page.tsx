// 📁 src/app/admin/users/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import UserAccessTable from '@/components/admin/UserAccessTable';

export default function AdminUsersPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">Manage User Access & Tiers</h1>
      <UserAccessTable />
    </AdminShell>
  );
}
v
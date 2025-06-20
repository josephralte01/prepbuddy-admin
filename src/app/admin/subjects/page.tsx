// 📁 src/app/admin/subjects/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import SubjectForm from '@/components/admin/SubjectForm';
import SubjectList from '@/components/admin/SubjectList';

export default function AdminSubjectsPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">Manage Subjects</h1>

      <SubjectForm />
      <SubjectList />
    </AdminShell>
  );
}

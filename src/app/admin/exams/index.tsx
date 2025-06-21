// 📁 src/app/admin/exams/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import ExamList from '@/components/admin/ExamList';
import ExamForm from '@/components/admin/ExamForm';

export default function AdminExamsPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">Manage Exams</h1>

      <ExamForm />
      <ExamList />
    </AdminShell>
  );
}

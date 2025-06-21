// 📁 src/app/admin/ai/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import AISyllabusForm from '@/components/admin/AISyllabusForm';

export default function AdminAISyllabusPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">Generate AI-based Syllabus & Materials</h1>
      <AISyllabusForm />
    </AdminShell>
  );
}

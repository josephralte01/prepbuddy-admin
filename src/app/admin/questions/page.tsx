// 📁 src/app/admin/questions/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import QuestionForm from '@/components/admin/QuestionForm';
import QuestionList from '@/components/admin/QuestionList';

export default function AdminQuestionsPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">Manage Questions</h1>

      <QuestionForm />
      <QuestionList />
    </AdminShell>
  );
}

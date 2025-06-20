// 📁 src/app/admin/exam-categories/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import ExamCategoryForm from '@/components/admin/ExamCategoryForm';
import ExamCategoryList from '@/components/admin/ExamCategoryList';

export default function AdminExamCategoriesPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">Manage Exam Categories</h1>

      <ExamCategoryForm />
      <ExamCategoryList />
    </AdminShell>
  );
}

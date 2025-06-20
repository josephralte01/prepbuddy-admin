// 📁 src/app/admin/topics/page.tsx
'use client';

import AdminShell from '@/components/layout/AdminShell';
import TopicForm from '@/components/admin/TopicForm';
import TopicList from '@/components/admin/TopicList';

export default function AdminTopicsPage() {
  return (
    <AdminShell>
      <h1 className="text-2xl font-bold mb-6">Manage Topics (Chapters)</h1>

      <TopicForm />
      <TopicList />
    </AdminShell>
  );
}

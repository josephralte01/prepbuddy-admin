// 📁 src/components/admin/MockTestList.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface MockTest {
  _id: string;
  title: string;
  subject: { name: string };
}

export default function MockTestList() {
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    api.get('/api/mock-tests').then((res) => setMockTests(res.data));
  }, []);

  const startEdit = (test: MockTest) => {
    setEditingId(test._id);
    setEditTitle(test.title);
  };

  const saveEdit = async () => {
    await api.put(`/api/mock-tests/${editingId}`, { title: editTitle });
    setMockTests((prev) =>
      prev.map((t) => (t._id === editingId ? { ...t, title: editTitle } : t))
    );
    setEditingId(null);
  };

  const deleteMockTest = async (id: string) => {
    await api.delete(`/api/mock-tests/${id}`);
    setMockTests((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="space-y-4">
      {mockTests.map((t) => (
        <div
          key={t._id}
          className="flex items-center justify-between p-4 border rounded-lg bg-white"
        >
          {editingId === t._id ? (
            <div className="flex gap-2 w-full">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1"
              />
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="ghost" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div>
                <p className="font-medium text-slate-800">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.subject?.name}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => startEdit(t)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteMockTest(t._id)}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

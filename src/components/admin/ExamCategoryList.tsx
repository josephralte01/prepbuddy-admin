// 📁 src/components/admin/ExamCategoryList.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Category {
  _id: string;
  name: string;
}

export default function ExamCategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    api.get('/api/exam-categories').then((res) => setCategories(res.data));
  }, []);

  const deleteCategory = async (id: string) => {
    await api.delete(`/api/exam-categories/${id}`);
    setCategories(categories.filter((c) => c._id !== id));
  };

  const startEdit = (c: Category) => {
    setEditing(c._id);
    setEditName(c.name);
  };

  const saveEdit = async () => {
    await api.put(`/api/exam-categories/${editing}`, { name: editName });
    const updated = categories.map((c) =>
      c._id === editing ? { ...c, name: editName } : c
    );
    setCategories(updated);
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      {categories.map((c) => (
        <div
          key={c._id}
          className="flex items-center gap-4 bg-white border rounded-lg p-3"
        >
          {editing === c._id ? (
            <>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <p className="flex-1 text-slate-700">{c.name}</p>
              <Button variant="outline" onClick={() => startEdit(c)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteCategory(c._id)}>
                Delete
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

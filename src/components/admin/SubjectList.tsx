// 📁 src/components/admin/SubjectList.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Subject {
  _id: string;
  name: string;
  examCategory: { name: string };
}

export default function SubjectList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    api.get('/api/subjects').then((res) => setSubjects(res.data));
  }, []);

  const deleteSubject = async (id: string) => {
    await api.delete(`/api/subjects/${id}`);
    setSubjects(subjects.filter((s) => s._id !== id));
  };

  const startEdit = (s: Subject) => {
    setEditing(s._id);
    setEditName(s.name);
  };

  const saveEdit = async () => {
    await api.put(`/api/subjects/${editing}`, { name: editName });
    const updated = subjects.map((s) =>
      s._id === editing ? { ...s, name: editName } : s
    );
    setSubjects(updated);
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      {subjects.map((s) => (
        <div
          key={s._id}
          className="flex items-center gap-4 bg-white border rounded-lg p-3"
        >
          {editing === s._id ? (
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
              <p className="flex-1 text-slate-700">
                {s.name} <span className="text-xs text-slate-400">({s.examCategory?.name})</span>
              </p>
              <Button variant="outline" onClick={() => startEdit(s)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteSubject(s._id)}>
                Delete
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

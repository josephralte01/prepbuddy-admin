// 📁 src/components/admin/ExamList.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ExamCategory {
  _id: string;
  name: string;
}

export default function ExamList() {
  const [exams, setExams] = useState<ExamCategory[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    api.get('/api/exam-categories').then((res) => setExams(res.data));
  }, []);

  const deleteExam = async (id: string) => {
    await api.delete(`/api/exam-categories/${id}`);
    setExams(exams.filter((e) => e._id !== id));
  };

  const startEdit = (exam: ExamCategory) => {
    setEditing(exam._id);
    setEditName(exam.name);
  };

  const saveEdit = async () => {
    await api.put(`/api/exam-categories/${editing}`, { name: editName });
    const updated = exams.map((e) =>
      e._id === editing ? { ...e, name: editName } : e
    );
    setExams(updated);
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      {exams.map((exam) => (
        <div
          key={exam._id}
          className="flex items-center gap-4 bg-white border rounded-lg p-3"
        >
          {editing === exam._id ? (
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
              <p className="flex-1 text-slate-700">{exam.name}</p>
              <Button variant="outline" onClick={() => startEdit(exam)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteExam(exam._id)}>
                Delete
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

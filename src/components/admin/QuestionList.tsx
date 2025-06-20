// 📁 src/components/admin/QuestionList.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

interface Question {
  _id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  topic: { title: string };
}

export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    api.get('/api/questions').then((res) => setQuestions(res.data));
  }, []);

  const startEdit = (q: Question) => {
    setEditingId(q._id);
    setEditText(q.question);
  };

  const saveEdit = async () => {
    await api.put(`/api/questions/${editingId}`, { question: editText });
    const updated = questions.map((q) =>
      q._id === editingId ? { ...q, question: editText } : q
    );
    setQuestions(updated);
    setEditingId(null);
  };

  const deleteQuestion = async (id: string) => {
    await api.delete(`/api/questions/${id}`);
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div
          key={q._id}
          className="border rounded-lg p-4 bg-white space-y-2"
        >
          {editingId === q._id ? (
            <>
              <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="ghost" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <p className="text-slate-700 font-medium">{q.question}</p>
              <p className="text-xs text-slate-400">
                Correct: {q.correctAnswer} | Topic: {q.topic?.title}
              </p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={() => startEdit(q)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteQuestion(q._id)}>
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

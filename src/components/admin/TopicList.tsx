// 📁 src/components/admin/TopicList.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Topic {
  _id: string;
  title: string;
  subject: { name: string };
}

export default function TopicList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    api.get('/api/topics').then((res) => setTopics(res.data));
  }, []);

  const deleteTopic = async (id: string) => {
    await api.delete(`/api/topics/${id}`);
    setTopics(topics.filter((t) => t._id !== id));
  };

  const startEdit = (t: Topic) => {
    setEditing(t._id);
    setEditTitle(t.title);
  };

  const saveEdit = async () => {
    await api.put(`/api/topics/${editing}`, { title: editTitle });
    const updated = topics.map((t) =>
      t._id === editing ? { ...t, title: editTitle } : t
    );
    setTopics(updated);
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      {topics.map((t) => (
        <div
          key={t._id}
          className="flex items-center gap-4 bg-white border rounded-lg p-3"
        >
          {editing === t._id ? (
            <>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Button onClick={saveEdit}>Save</Button>
              <Button variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <p className="flex-1 text-slate-700">
                {t.title}{' '}
                <span className="text-xs text-slate-400">({t.subject?.name})</span>
              </p>
              <Button variant="outline" onClick={() => startEdit(t)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteTopic(t._id)}>
                Delete
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

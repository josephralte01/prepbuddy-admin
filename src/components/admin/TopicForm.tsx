// 📁 src/components/admin/TopicForm.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';

export default function TopicForm() {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/subjects').then((res) => setSubjects(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/topics', { title, subject: subjectId });
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Input
        placeholder="Topic/Chapter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Select value={subjectId} onValueChange={setSubjectId} required>
        <SelectItem value="" disabled>Select subject</SelectItem>
        {subjects.map((s: any) => (
          <SelectItem key={s._id} value={s._id}>
            {s.name}
          </SelectItem>
        ))}
      </Select>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Topic'}
      </Button>
    </form>
  );
}

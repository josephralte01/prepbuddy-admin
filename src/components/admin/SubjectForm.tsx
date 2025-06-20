// 📁 src/components/admin/SubjectForm.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';

export default function SubjectForm() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/exam-categories').then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/subjects', { name, examCategory: categoryId });
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
        placeholder="Subject Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Select value={categoryId} onValueChange={setCategoryId} required>
        <SelectItem value="" disabled>Select exam category</SelectItem>
        {categories.map((cat: any) => (
          <SelectItem key={cat._id} value={cat._id}>
            {cat.name}
          </SelectItem>
        ))}
      </Select>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Subject'}
      </Button>
    </form>
  );
}

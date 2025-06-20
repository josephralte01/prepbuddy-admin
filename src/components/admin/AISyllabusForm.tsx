// 📁 src/components/admin/AISyllabusForm.tsx
'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function AISyllabusForm() {
  const [examName, setExamName] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!examName) return;
    setLoading(true);
    try {
      const res = await api.post('/api/ai/syllabus', { examName });
      setResponse(res.data.text || JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      console.error(err);
      setResponse('❌ Error generating syllabus.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter exam name (e.g., NEET, UPSC, JEE)"
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Syllabus'}
      </Button>

      {response && (
        <Textarea
          value={response}
          readOnly
          className="min-h-[300px] text-sm whitespace-pre-wrap"
        />
      )}
    </div>
  );
}

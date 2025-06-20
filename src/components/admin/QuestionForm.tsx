// 📁 src/components/admin/QuestionForm.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectItem } from '../ui/select';

export default function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [topicId, setTopicId] = useState('');
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/topics').then((res) => setTopics(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/questions', {
        question,
        options,
        correctAnswer,
        topic: topicId,
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Textarea
        placeholder="Enter question text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />

      {options.map((opt, idx) => (
        <Input
          key={idx}
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[idx] = e.target.value;
            setOptions(newOptions);
          }}
          required
        />
      ))}

      <Select value={correctAnswer} onValueChange={setCorrectAnswer} required>
        <SelectItem value="" disabled>Select correct answer</SelectItem>
        {options.map((opt, idx) => (
          <SelectItem key={idx} value={opt}>
            {opt || `Option ${idx + 1}`}
          </SelectItem>
        ))}
      </Select>

      <Select value={topicId} onValueChange={setTopicId} required>
        <SelectItem value="" disabled>Select topic</SelectItem>
        {topics.map((t: any) => (
          <SelectItem key={t._id} value={t._id}>
            {t.title}
          </SelectItem>
        ))}
      </Select>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Question'}
      </Button>
    </form>
  );
}

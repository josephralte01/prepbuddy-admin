// 📁 src/components/admin/UserProgressTable.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Progress {
  _id: string;
  user: { name: string; email: string };
  subject: { name: string };
  completedTopics: number;
  totalTopics: number;
  score: number;
}

export default function UserProgressTable() {
  const [progressData, setProgressData] = useState<Progress[]>([]);

  useEffect(() => {
    api.get('/api/user-progress').then((res) => setProgressData(res.data));
  }, []);

  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {progressData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.user.name}</TableCell>
              <TableCell>{item.user.email}</TableCell>
              <TableCell>{item.subject.name}</TableCell>
              <TableCell>
                {item.completedTopics}/{item.totalTopics}
              </TableCell>
              <TableCell>{item.score}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

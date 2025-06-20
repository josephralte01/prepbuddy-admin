// 📁 src/components/admin/UserAccessTable.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectItem } from '../ui/select';

interface User {
  _id: string;
  name: string;
  email: string;
  tier: string;
}

export default function UserAccessTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/api/users').then((res) => setUsers(res.data));
  }, []);

  const handleTierChange = async (userId: string, newTier: string) => {
    await api.put(`/api/users/${userId}`, { tier: newTier });
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, tier: newTier } : u))
    );
  };

  return (
    <div className="border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Select value={u.tier} onValueChange={(val) => handleTierChange(u._id, val)}>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

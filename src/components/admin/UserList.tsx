// 📁 src/components/admin/UserList.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Button } from '../ui/button';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  tier: 'free' | 'basic' | 'premium';
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/api/users').then((res) => setUsers(res.data));
  }, []);

  const toggleRole = async (id: string, role: 'user' | 'admin') => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    await api.put(`/api/users/${id}/role`, { role: newRole });
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
    );
  };

  const changeTier = async (id: string, tier: 'free' | 'basic' | 'premium') => {
    const newTier = tier === 'free' ? 'basic' : tier === 'basic' ? 'premium' : 'free';
    await api.put(`/api/users/${id}/tier`, { tier: newTier });
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, tier: newTier } : u))
    );
  };

  return (
    <div className="space-y-3">
      {users.map((u) => (
        <div
          key={u._id}
          className="flex items-center justify-between bg-white border rounded-lg p-4"
        >
          <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-muted-foreground">{u.email}</p>
            <p className="text-xs text-slate-400">{u.role} — {u.tier}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toggleRole(u._id, u.role)}>
              Toggle Role
            </Button>
            <Button variant="secondary" onClick={() => changeTier(u._id, u.tier)}>
              Change Tier
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

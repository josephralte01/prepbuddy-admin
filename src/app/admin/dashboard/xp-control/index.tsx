'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

export default function XPControlPage() {
  const [emailOrId, setEmailOrId] = useState('');
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await axios.get('/admin/xp-logs?source=manual');
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/admin/xp-control', {
        userIdOrEmail: emailOrId,
        xpAmount: amount,
        reason
      });
      toast.success('XP Updated');
      setEmailOrId('');
      setAmount(0);
      setReason('');
      fetchLogs();
    } catch (err) {
      toast.error('Failed to update XP');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manual XP Control</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="User Email or ID"
          className="w-full border p-2 rounded"
          value={emailOrId}
          onChange={(e) => setEmailOrId(e.target.value)}
        />
        <input
          type="number"
          placeholder="XP Amount"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <textarea
          placeholder="Reason"
          className="w-full border p-2 rounded"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Recent Manual XP Logs</h2>
        <ul className="space-y-2">
          {logs.map((log, i) => (
            <li key={i} className="text-sm border-b py-1">
              <strong>{log.user?.email}</strong> {log.xp > 0 ? '+' : ''}{log.xp} XP — {log.metadata?.reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import AdjustXPModal from '@/components/admin/AdjustXPModal';

export default function XPLogsPage() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    userId: '',
    actionType: '',
    minXP: '',
    maxXP: '',
    sortBy: 'createdAt',
    order: 'desc',
  });
  const [topUsers, setTopUsers] = useState([]);
  const [period, setPeriod] = useState('weekly');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchLogs = async () => {
    const res = await axios.get('/api/xp-logs', { params: filters });
    setLogs(res.data);
  };

  const fetchTopUsers = async () => {
    const res = await axios.get('/api/xp-logs/top-users', {
      params: { period },
    });
    setTopUsers(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  useEffect(() => {
    fetchTopUsers();
  }, [period]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">XP Logs</h1>

      <Card className="mb-6">
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          <Input
            placeholder="User ID"
            value={filters.userId}
            onChange={(e) =>
              setFilters((f) => ({ ...f, userId: e.target.value }))
            }
          />
          <Select
            value={filters.actionType}
            onValueChange={(v) =>
              setFilters((f) => ({ ...f, actionType: v }))
            }
          >
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="mock-test">Mock Test</SelectItem>
            <SelectItem value="study-material">Study Material</SelectItem>
            <SelectItem value="manual-adjustment">Manual</SelectItem>
          </Select>
          <Input
            type="number"
            placeholder="Min XP"
            value={filters.minXP}
            onChange={(e) =>
              setFilters((f) => ({ ...f, minXP: e.target.value }))
            }
          />
          <Input
            type="number"
            placeholder="Max XP"
            value={filters.maxXP}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxXP: e.target.value }))
            }
          />
          <Select
            value={filters.sortBy}
            onValueChange={(v) => setFilters((f) => ({ ...f, sortBy: v }))}
          >
            <SelectItem value="createdAt">Date</SelectItem>
            <SelectItem value="xp">XP</SelectItem>
          </Select>
          <Select
            value={filters.order}
            onValueChange={(v) => setFilters((f) => ({ ...f, order: v }))}
          >
            <SelectItem value="desc">Desc</SelectItem>
            <SelectItem value="asc">Asc</SelectItem>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Top XP Earners</h2>
            <Select value={period} onValueChange={setPeriod}>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </Select>
          </div>
          <ul className="space-y-2">
            {topUsers.map((user, i) => (
              <li
                key={user.userId}
                className="flex justify-between items-center border p-3 rounded-md"
              >
                <div>
                  <p className="font-medium">
                    #{i + 1} {user.name || 'Unnamed'} ({user.email})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    XP: {user.totalXP} | Streak: {user.streak}
                  </p>
                </div>
                <Button
                  onClick={() => setSelectedUser(user)}
                  variant="outline"
                  size="sm"
                >
                  Adjust XP
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">User</th>
                <th className="text-left py-2">Action</th>
                <th className="text-left py-2">XP</th>
                <th className="text-left py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-b">
                  <td className="py-2">
                    {log.user?.name} ({log.user?.email})
                  </td>
                  <td className="py-2">{log.actionType}</td>
                  <td className="py-2">{log.xp}</td>
                  <td className="py-2">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {selectedUser && (
        <AdjustXPModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onRefresh={fetchLogs}
        />
      )}
    </div>
  );
}

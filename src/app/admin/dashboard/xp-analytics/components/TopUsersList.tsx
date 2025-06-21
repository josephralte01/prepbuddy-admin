'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  userId: string;
  name?: string;
  email: string;
  totalXP: number;
  streak: number;
}

interface TopUsersListProps {
  topUsers: User[];
  period: string;
  onPeriodChange: (value: string) => void;
  onAdjustXP: (user: User) => void;
}

export default function TopUsersList({
  topUsers,
  period,
  onPeriodChange,
  onAdjustXP,
}: TopUsersListProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Top XP Earners</h2>
          <Select value={period} onValueChange={onPeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {topUsers.length === 0 ? (
          <p>No top users to display for this period.</p>
        ) : (
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
                  onClick={() => onAdjustXP(user)}
                  variant="outline"
                  size="sm"
                >
                  Adjust XP
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

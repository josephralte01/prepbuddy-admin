'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

type XPBadge = {
  _id: string;
  name: string;
  description: string;
  xpRequired: number;
  imageUrl: string;
  createdAt: string;
};

interface BadgeCardProps {
  badge: XPBadge;
  onDelete: (id: string) => void;
}

export default function BadgeCard({ badge, onDelete }: BadgeCardProps) {
  return (
    <div className="border p-4 rounded space-y-2 shadow">
      <img
        src={badge.imageUrl}
        alt={badge.name}
        className="w-16 h-16 rounded"
      />
      <div>
        <h2 className="font-bold">{badge.name}</h2>
        <p className="text-sm text-muted-foreground">{badge.description}</p>
        <p className="text-sm font-medium">XP: {badge.xpRequired}</p>
      </div>
      <Button variant="destructive" onClick={() => onDelete(badge._id)}>
        Delete
      </Button>
    </div>
  );
}

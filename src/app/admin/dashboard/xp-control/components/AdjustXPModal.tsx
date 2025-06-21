import { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';

export default function AdjustXPModal({ user, onClose, onRefresh }) {
  const [xp, setXP] = useState('');
  const [reason, setReason] = useState('');
  const [actionType, setActionType] = useState('manual-adjustment');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!xp || !reason || !actionType) return;
    setLoading(true);
    try {
      await axios.post('/api/xp-logs/manual', {
        userId: user.userId,
        xp: parseInt(xp),
        actionType,
        reason,
      });
      onClose();
      onRefresh();
    } catch (err) {
      console.error(err);
      alert('XP adjustment failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="space-y-4 p-6">
        <h2 className="text-lg font-semibold mb-2">
          Adjust XP for {user.name} ({user.email})
        </h2>

        <div className="space-y-2">
          <Label>XP Amount</Label>
          <Input
            type="number"
            value={xp}
            onChange={(e) => setXP(e.target.value)}
            placeholder="Enter XP to add"
          />
        </div>

        <div className="space-y-2">
          <Label>Reason</Label>
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for XP adjustment"
          />
        </div>

        <div className="space-y-2">
          <Label>Action Type</Label>
          <Select value={actionType} onValueChange={setActionType}>
            <SelectItem value="manual-adjustment">Manual</SelectItem>
            <SelectItem value="bonus">Bonus</SelectItem>
            <SelectItem value="admin-correction">Admin Correction</SelectItem>
          </Select>
        </div>

        <Button disabled={loading} onClick={handleSubmit} className="w-full">
          {loading ? 'Saving...' : 'Adjust XP'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

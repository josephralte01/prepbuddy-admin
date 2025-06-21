'use client'

import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import {
  Button
} from '@/components/ui/button'
import {
  Input
} from '@/components/ui/input'
import {
  Label
} from '@/components/ui/label'
import axios from 'axios'
import toast from 'react-hot-toast'
import BadgeCard from './components/BadgeCard';

type XPBadge = {
  _id: string
  name: string
  description: string
  xpRequired: number
  imageUrl: string
  createdAt: string
}

export default function XPBadgesPage() {
  const [badges, setBadges] = useState<XPBadge[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    xpRequired: '',
    imageUrl: ''
  })

  const fetchBadges = async () => {
    try {
      const res = await axios.get('/api/xp-badges')
      setBadges(res.data)
    } catch (err) {
      toast.error('Failed to fetch XP badges')
    }
  }

  useEffect(() => {
    fetchBadges()
  }, [])

  const handleCreate = async () => {
    if (!form.name || !form.description || !form.xpRequired || !form.imageUrl) {
      toast.error('All fields are required')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post('/api/xp-badges', {
        ...form,
        xpRequired: Number(form.xpRequired),
      })
      toast.success('Badge created')
      setForm({ name: '', description: '', xpRequired: '', imageUrl: '' })
      fetchBadges()
    } catch (err) {
      toast.error('Error creating badge')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this badge?')) return
    try {
      await axios.delete(`/api/xp-badges/${id}`)
      toast.success('Badge deleted')
      fetchBadges()
    } catch (err) {
      toast.error('Error deleting badge')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">XP Badge Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create New Badge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label>XP Required</Label>
              <Input
                type="number"
                value={form.xpRequired}
                onChange={(e) => setForm({ ...form, xpRequired: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Image URL</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? 'Creating...' : 'Create Badge'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Badges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {badges.length === 0 && <p>No badges defined yet.</p>}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <BadgeCard key={badge._id} badge={badge} onDelete={handleDelete} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 📁 prepbuddy-admin/src/app/admin/dashboard/analytics/BadgeChart.tsx
import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default function BadgeChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/analytics/badge-distribution');
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: 400 }}>
      <h2 className="text-xl font-semibold mb-2">XP Badge Distribution</h2>
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="badge"
        margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        axisBottom={{ tickRotation: 45 }}
        colors={{ scheme: 'nivo' }}
      />
    </div>
  );
}

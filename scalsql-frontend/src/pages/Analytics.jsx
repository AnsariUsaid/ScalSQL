import React from 'react';
import { Activity, Server, Database, CloudRain, Cpu, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const latencyData = [
  { time: '10:00', ms: 120 }, { time: '10:05', ms: 125 }, { time: '10:10', ms: 140 },
  { time: '10:15', ms: 135 }, { time: '10:20', ms: 210 }, { time: '10:25', ms: 110 },
  { time: '10:30', ms: 105 }, { time: '10:35', ms: 115 }, { time: '10:40', ms: 130 },
];

const volumeData = [
  { day: 'Mon', count: 420 }, { day: 'Tue', count: 512 }, { day: 'Wed', count: 320 },
  { day: 'Thu', count: 650 }, { day: 'Fri', count: 710 }, { day: 'Sat', count: 200 },
];

const Analytics = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-6 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="w-6 h-6 text-primary" />
            System Analytics
          </h1>
          <p className="text-textMuted mt-1">Live monitoring via AWS CloudWatch integration.</p>
        </div>
        <div className="flex gap-2 items-center text-sm font-medium bg-surfaceHighlight px-3 py-1.5 rounded-lg border border-border">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           Live Feed Active
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-blue-500">
            <div className="p-4 rounded-full bg-blue-500/10">
              <Cpu className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <div className="text-textMuted font-medium text-sm">Cluster CPU Usage</div>
               <div className="text-2xl font-bold">24.5%</div>
            </div>
         </div>
         <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-purple-500">
            <div className="p-4 rounded-full bg-purple-500/10">
              <Server className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <div className="text-textMuted font-medium text-sm">Active Nodes</div>
               <div className="text-2xl font-bold">4 <span className="text-sm font-normal text-textMuted">(Auto-scaled)</span></div>
            </div>
         </div>
         <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-red-500">
            <div className="p-4 rounded-full bg-red-500/10">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <div className="text-textMuted font-medium text-sm">Error Rate (1h)</div>
               <div className="text-2xl font-bold">0.02%</div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency Chart */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="font-bold flex items-center gap-2 mb-6">
            <CloudRain className="w-4 h-4 text-primary" /> API Latency (ms) - Last Hour
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyData}>
                <defs>
                  <linearGradient id="colorMs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#9ca3af" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#27272a', borderRadius: '0.5rem' }} />
                <Area type="monotone" dataKey="ms" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Query Volume Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="font-bold flex items-center gap-2 mb-6">
            <Database className="w-4 h-4 text-primary" /> Query Volume by Day
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="day" stroke="#9ca3af" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#27272a', borderRadius: '0.5rem' }} cursor={{fill: '#1e1e1e'}} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

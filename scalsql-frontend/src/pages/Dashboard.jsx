import React from 'react';
import { motion } from 'framer-motion';
import { TerminalSquare, Database, Activity, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', queries: 400 },
  { name: 'Tue', queries: 300 },
  { name: 'Wed', queries: 550 },
  { name: 'Thu', queries: 450 },
  { name: 'Fri', queries: 700 },
  { name: 'Sat', queries: 200 },
  { name: 'Sun', queries: 150 },
];

const statCards = [
  { title: 'Total Queries Today', value: '1,248', icon: TerminalSquare, trend: '+12%', color: 'from-blue-500/20 to-blue-500/0', border: 'border-blue-500/50' },
  { title: 'API Latency (avg)', value: '124ms', icon: Activity, trend: '-5ms', color: 'from-purple-500/20 to-purple-500/0', border: 'border-purple-500/50' },
  { title: 'Active Connections', value: '4', icon: Database, trend: 'Stable', color: 'from-green-500/20 to-green-500/0', border: 'border-green-500/50' },
  { title: 'Active Users', value: '28', icon: Users, trend: '+3', color: 'from-amber-500/20 to-amber-500/0', border: 'border-amber-500/50' },
];

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-textMuted mt-1">Welcome to your ScalSQL control center.</p>
        </div>
        <Link 
          to="/dashboard/query"
          className="flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20"
        >
          <TerminalSquare className="w-4 h-4" />
          New Query
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`glass-panel p-6 rounded-2xl relative overflow-hidden group border-b-2`}
            style={{ borderBottomColor: stat.border.split('-')[1] }} // Simple hack for border color based on class string
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${stat.color} opacity-50 z-0`}></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="text-textMuted text-sm font-medium">{stat.title}</div>
                <div className="p-2 rounded-lg bg-surfaceHighlight border border-border">
                  <stat.icon className="w-4 h-4 text-textMain" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-green-400 font-medium">{stat.trend}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl"
        >
          <h2 className="text-lg font-bold mb-6">Query Volume (Last 7 Days)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', borderColor: '#27272a', borderRadius: '0.5rem' }} 
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="queries" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Queries / Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="glass-panel p-6 rounded-2xl flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <Link to="/dashboard/history" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-surfaceHighlight transition-colors group cursor-pointer border border-transparent hover:border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <TerminalSquare className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-textMain line-clamp-1 group-hover:text-primary transition-colors">
                    Find users who registered last week
                  </p>
                  <div className="flex gap-2 items-center mt-1 text-xs text-textMuted">
                    <span className="text-green-400">Success</span> • 2m ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

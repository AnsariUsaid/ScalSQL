import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Search, Filter, Play, Clock, CheckCircle2, XCircle, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockHistory = [
  { id: 'Q-9281', query: "SELECT * FROM users WHERE status = 'active'", user: 'analyst_sarah', time: '12ms', status: 'success', date: '2 Mins Ago' },
  { id: 'Q-9280', query: "SELECT count(*) FROM sales GROUP BY region", user: 'admin_john', time: '450ms', status: 'success', date: '15 Mins Ago' },
  { id: 'Q-9279', query: "DELETE FROM organizations WHERE id = 12", user: 'analyst_sarah', time: '-', status: 'failed', date: '1 Hour Ago', error: 'Policy Violation: Read-Only Access' },
  { id: 'Q-9278', query: "SELECT AVG(amount) FROM payments WHERE date >= CURRENT_DATE", user: 'finance_mike', time: '1.2s', status: 'success', date: '3 Hours Ago' },
  { id: 'Q-9277', query: "SELECT * FROM logs LIMIT 10", user: 'admin_john', time: '5ms', status: 'success', date: 'Yesterday' },
];

const QueryHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <History className="w-6 h-6 text-primary" />
            Query History
          </h1>
          <p className="text-textMuted mt-1">Audit log of all AI-generated operations across your organization.</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl flex-1 flex flex-col overflow-hidden border">
        {/* Toolbar */}
        <div className="p-4 border-b border-border bg-surfaceHighlight/30 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-textMuted" />
            </div>
            <input
              type="text"
              placeholder="Search by query, user, or ID..."
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-surface text-sm font-medium hover:bg-surfaceHighlight transition-colors">
            <Filter className="w-4 h-4 text-textMuted" /> Filter
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
          <table className="w-full text-left border-collapse">
             <thead className="sticky top-0 bg-surfaceHighlight/80 backdrop-blur z-10 border-b border-border">
              <tr>
                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted">Query ID</th>
                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted">SQL Statement</th>
                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted">Executed By</th>
                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted">Status</th>
                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted">Time</th>
                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockHistory.map((item, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.id} 
                  className="hover:bg-surfaceHighlight/30 transition-colors group cursor-default"
                >
                  <td className="py-4 px-6 text-sm font-mono text-textMuted whitespace-nowrap">{item.id}</td>
                  <td className="py-4 px-6 text-sm">
                    <div className="font-mono text-blue-200 line-clamp-1 max-w-md">{item.query}</div>
                    {item.status === 'failed' && (
                       <div className="text-xs text-red-400 mt-1">{item.error}</div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium">{item.user}</td>
                  <td className="py-4 px-6 text-sm">
                    {item.status === 'success' ? (
                      <span className="flex items-center gap-1.5 text-green-400 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Success
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
                        <XCircle className="w-4 h-4" /> Failed
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <div className="text-textMain">{item.time}</div>
                    <div className="text-xs text-textMuted flex items-center gap-1 mt-0.5">
                       <Clock className="w-3 h-3" /> {item.date}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-right">
                     <button 
                       onClick={() => navigate('/dashboard/query')}
                       className="inline-flex items-center justify-center p-2 rounded bg-surface border border-border hover:bg-surfaceHighlight hover:text-primary transition-all shadow-sm"
                       title="Re-run Query"
                     >
                       <Play className="w-4 h-4" />
                     </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueryHistory;

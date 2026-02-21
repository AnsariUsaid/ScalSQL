import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, UserPlus, Settings, MoreVertical, Search, CheckCircle2 } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'admin_john@hospital.org', role: 'Admin', status: 'Active', lastActive: '2 mins ago' },
  { id: 2, name: 'Sarah Smith', email: 'analyst_sarah@hospital.org', role: 'Analyst', status: 'Active', lastActive: '15 mins ago' },
  { id: 3, name: 'Mike Johnson', email: 'viewer_mike@hospital.org', role: 'Viewer', status: 'Active', lastActive: '1 day ago' },
  { id: 4, name: 'Alice Brown', email: 'alice.b@hospital.org', role: 'Analyst', status: 'Invited', lastActive: 'Never' },
];

const AdminPanel = () => {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            Admin Panel
          </h1>
          <p className="text-textMuted mt-1">Manage users, roles, and organization-wide security policies.</p>
        </div>
        <button 
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primaryHover text-white rounded-lg font-bold transition-all shadow-lg shadow-primary/20"
        >
          <UserPlus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Col - Role Context */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl text-sm">
            <h3 className="font-bold mb-4 uppercase tracking-wider text-textMuted text-xs flex items-center gap-2">
              <Users className="w-4 h-4" /> Role Capabilities
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 border border-red-500/30 rounded-xl bg-red-500/5">
                <div className="font-bold text-red-400 mb-1">Admin</div>
                <div className="text-textMuted text-xs">Full access. Can configure databases, invite users, and bypass query limits.</div>
              </div>
              <div className="p-3 border border-blue-500/30 rounded-xl bg-blue-500/5">
                <div className="font-bold text-blue-400 mb-1">Analyst</div>
                <div className="text-textMuted text-xs">Can generate and execute READ-ONLY (SELECT) queries. Cannot run INSERT/DELETE/UPDATE.</div>
              </div>
              <div className="p-3 border border-green-500/30 rounded-xl bg-green-500/5">
                <div className="font-bold text-green-400 mb-1">Viewer</div>
                <div className="text-textMuted text-xs">Can only view dashboards, historical results, and analytics. Cannot execute queries.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Users Table */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-surfaceHighlight/30 flex justify-between items-center">
             <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-textMuted" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surfaceHighlight/50 border-b border-border">
                <tr>
                  <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted text-left">User</th>
                  <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted text-left">Role</th>
                  <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted text-center">Status</th>
                  <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted text-left">Last Active</th>
                  <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockUsers.map((user, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={user.id} 
                    className="hover:bg-surfaceHighlight/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surfaceHighlight border border-border flex items-center justify-center text-xs font-bold text-textMuted">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-textMain">{user.name}</div>
                          <div className="text-xs text-textMuted">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <select className="bg-surface border border-border rounded px-2 py-1 text-sm text-textMain focus:outline-none focus:border-primary">
                        <option value="Admin" selected={user.role === 'Admin'}>Admin</option>
                        <option value="Analyst" selected={user.role === 'Analyst'}>Analyst</option>
                        <option value="Viewer" selected={user.role === 'Viewer'}>Viewer</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {user.status === 'Active' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">Active</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Invited</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-textMuted">{user.lastActive}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-1.5 rounded hover:bg-surfaceHighlight text-textMuted hover:text-textMain transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Very basic inline mock invite flow */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel p-8 rounded-2xl max-w-md w-full border border-primary/30 shadow-2xl">
             <h2 className="text-xl font-bold mb-6">Invite New Member</h2>
             <div className="space-y-4 mb-6">
               <div>
                  <label className="text-sm text-textMuted mb-1 block">Email Address</label>
                  <input type="email" className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-sm" placeholder="colleague@hospital.org" />
               </div>
               <div>
                  <label className="text-sm text-textMuted mb-1 block">Role</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-sm">
                    <option>Analyst (Read-Only)</option>
                    <option>Viewer</option>
                    <option>Admin</option>
                  </select>
               </div>
             </div>
             <div className="flex gap-3 justify-end">
               <button onClick={() => setShowInvite(false)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-surfaceHighlight">Cancel</button>
               <button onClick={() => setShowInvite(false)} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover">Send Invite</button>
             </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

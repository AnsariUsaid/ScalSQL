import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Plus, RefreshCw, Server, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiFetch } from '../lib/api';

const DatabaseConfig = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('none'); // 'none', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('');
  
  const [name, setName] = useState('');
  const [dialect, setDialect] = useState('postgres');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('5432');
  const [db_name, setDbName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeConnections, setActiveConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const data = await apiFetch('/api/config/db');
      setActiveConnections(data);
    } catch (err) {
      console.error('Failed to fetch connections:', err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleTestConnection = async (e) => {
    e.preventDefault();
    setIsConnecting(true);
    setConnectionStatus('none');
    setErrorMsg('');
    
    try {
      await apiFetch('/api/config/db', {
        method: 'POST',
        body: JSON.stringify({ name, dialect, host, port, db_name, username, password })
      });
      setConnectionStatus('success');
      setName('');
      setHost('');
      setDbName('');
      setUsername('');
      setPassword('');
      fetchConnections();
    } catch (err) {
      setConnectionStatus('error');
      setErrorMsg(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold">Database Configuration</h1>
          <p className="text-textMuted mt-1">Manage physical RDS connections and schema caching.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connection Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 glass-panel p-8 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Server className="w-48 h-48" />
          </div>

          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Add New Connection
          </h2>

          <form onSubmit={handleTestConnection} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted">Connection Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="block w-full px-4 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Production Analytics RDS" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted">Database Type</label>
                <select value={dialect} onChange={(e) => setDialect(e.target.value)} className="block w-full px-4 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer">
                  <option value="postgres">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="mssql">SQL Server</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-textMuted">Host</label>
                <input type="text" value={host} onChange={(e) => setHost(e.target.value)} required className="block w-full px-4 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="db-prod.cluster-[id].us-east-1.rds.amazonaws.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted">Port</label>
                <input type="number" value={port} onChange={(e) => setPort(e.target.value)} required className="block w-full px-4 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="5432" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Database Name</label>
              <input type="text" value={db_name} onChange={(e) => setDbName(e.target.value)} required className="block w-full px-4 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="healthcare_records" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="block w-full px-4 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="readonly_analyst" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted">Password (Encrypted at Rest)</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full px-4 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono" placeholder="••••••••••••" />
              </div>
            </div>

            {connectionStatus === 'success' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-500">Connection successful! Schema extracted and cached.</span>
              </motion.div>
            )}

            {connectionStatus === 'error' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-500">{errorMsg}</span>
              </motion.div>
            )}

            <div className="pt-4 flex items-center justify-end gap-4 border-t border-border">
              <button type="button" className="px-6 py-3 rounded-xl border border-border font-medium hover:bg-surfaceHighlight transition-colors">
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isConnecting}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primaryHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Shield className="w-5 h-5" />
                )}
                {isConnecting ? 'Testing Connection...' : 'Test & Save Connection'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Existing Connections Side Panel */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.4, delay: 0.2 }}
           className="space-y-6"
        >
           <div className="glass-panel p-6 rounded-2xl">
             <h3 className="font-bold flex items-center justify-between mb-4 text-lg">
               Active Connections
               <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">{activeConnections.length}</span>
             </h3>

             <div className="space-y-4">
               {activeConnections.length === 0 ? (
                 <p className="text-sm text-textMuted text-center py-4">No active connections yet.</p>
               ) : (
                 activeConnections.map(conn => (
                   <div key={conn.id} className="p-4 rounded-xl border border-border bg-surface/50 hover:border-primary/50 transition-colors">
                     <div className="flex items-center justify-between mb-2">
                       <div className="font-semibold flex items-center gap-2">
                         <Database className="w-4 h-4 text-primary" />
                         {conn.name}
                       </div>
                       <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     </div>
                     <div className="text-xs text-textMuted font-mono bg-surface p-2 rounded border border-border mt-3 line-clamp-1 truncate">
                       {conn.host}
                     </div>
                     <div className="flex justify-between items-center mt-4">
                       <span className="text-xs text-textMuted capitalize">{conn.dialect} • Syncing</span>
                       <button className="text-xs font-semibold text-primary hover:text-primaryHover flex items-center gap-1">
                         <RefreshCw className="w-3 h-3" /> Sync Schema
                       </button>
                     </div>
                   </div>
                 ))
               )}
             </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-surfaceHighlight/30 text-center border-dashed border-2 border-border/50">
            <Plus className="w-8 h-8 text-textMuted mx-auto mb-3" />
            <h4 className="font-medium mb-1">Need another DB?</h4>
            <p className="text-xs text-textMuted mb-4">Enterprise plan allows up to 10 connections per organization.</p>
            <button className="w-full py-2 bg-surface border border-border rounded-lg text-sm font-medium hover:bg-surfaceHighlight transition-colors">
              Upgrade Plan
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DatabaseConfig;

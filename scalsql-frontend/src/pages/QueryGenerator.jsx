import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Terminal, Play, Save, Copy, Mic, Check, AlertCircle, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

const mockSchema = [
  { table: 'users', count: 12500, columns: ['id', 'email', 'name', 'role', 'created_at'] },
  { table: 'organizations', count: 42, columns: ['id', 'name', 'api_key', 'tier', 'status'] },
  { table: 'queries_log', count: 850430, columns: ['id', 'user_id', 'sql_query', 'execution_time_ms', 'status', 'timestamp'] },
];

const QueryGenerator = () => {
  const [nlQuery, setNlQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSql, setGeneratedSql] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await apiFetch('/api/config/db');
        setConnections(data);
        if (data.length > 0) {
          setSelectedConnection(data[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch connections:', err);
      }
    };
    fetchConnections();
  }, []);

  const handleGenerate = async () => {
    if (!nlQuery || !selectedConnection) return;
    setIsGenerating(true);
    setErrorMsg('');
    try {
      const data = await apiFetch('/api/query/generate', {
        method: 'POST',
        body: JSON.stringify({ question: nlQuery, connection_id: selectedConnection })
      });
      setGeneratedSql(data.sql);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExecute = async () => {
    if (!generatedSql || !selectedConnection) return;
    setIsExecuting(true);
    setErrorMsg('');
    try {
      const data = await apiFetch('/api/query/execute', {
        method: 'POST',
        body: JSON.stringify({ sql: generatedSql, question: nlQuery, connection_id: selectedConnection })
      });
      // Navigate to results page with actual executed data state
      navigate('/dashboard/results', { state: { queryResult: data, sql: generatedSql } });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)] flex gap-6">
      {/* Left Panel - Natural Language Input */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold">Query Generator</h1>
            <p className="text-textMuted mt-1">Translate plain English into optimized SQL.</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs font-semibold text-textMuted flex items-center gap-2">
              <Database className="w-3 h-3 text-primary" /> Active RDS:
            </span>
            <select
              value={selectedConnection}
              onChange={(e) => setSelectedConnection(e.target.value)}
              className="px-3 py-1 bg-surfaceHighlight border border-border rounded text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            >
              {connections.length === 0 ? (
                <option value="">No Connections Found</option>
              ) : (
                connections.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Input Box */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col shadow-lg">
          <label className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
            <Search className="w-4 h-4" /> Ask Your Database
          </label>
          <div className="relative flex-1 min-h-[120px]">
            <textarea 
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder="e.g., Show me the daily successful query count and average latency for the last 7 days..."
              className="w-full h-full bg-transparent resize-none focus:outline-none text-lg placeholder:text-textMuted/50 border-none p-0"
              autoFocus
            />
            {/* Microphone Button */}
            <button className="absolute bottom-2 left-0 p-2 rounded-full bg-surfaceHighlight hover:bg-surface border border-border text-textMuted transition-colors flex items-center justify-center group" title="Voice to Text (Coming Soon)">
              <Mic className="w-4 h-4 group-hover:text-primary transition-colors" />
            </button>
            <div className="absolute bottom-2 right-0 flex gap-3 items-center">
               {errorMsg && <span className="text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded">{errorMsg}</span>}
               <button 
                  onClick={() => setNlQuery('')} 
                  className="px-4 py-2 text-sm font-medium text-textMuted hover:text-textMain transition-colors"
                >
                  Clear
               </button>
              <button 
                onClick={handleGenerate}
                disabled={!nlQuery || isGenerating || !selectedConnection}
                className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-lg font-bold transition-all disabled:opacity-50 shadow-md shadow-primary/20"
              >
                {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
                {isGenerating ? 'Synthesizing...' : 'Generate SQL'}
              </button>
            </div>
          </div>
        </div>

        {/* Generated SQL Panel */}
        <div className="flex-1 glass-panel rounded-2xl border flex flex-col overflow-hidden shadow-lg relative bg-surface/80">
           <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center bg-surfaceHighlight/50">
             <div className="flex items-center gap-3">
               <span className="text-sm font-semibold uppercase tracking-wider text-textMuted">Generated SQL</span>
               {generatedSql && (
                 <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-green-500/10 text-green-500 border border-green-500/20">
                    <Check className="w-3 h-3" /> Safe to Execute
                 </span>
               )}
             </div>
             
             {generatedSql && (
                <div className="flex gap-2">
                  <button onClick={copyToClipboard} className="p-2 rounded hover:bg-surface text-textMuted hover:text-textMain transition-colors" title="Copy SQL">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button className="p-2 rounded hover:bg-surface text-textMuted hover:text-textMain transition-colors" title="Save Query Snippet">
                    <Save className="w-4 h-4" />
                  </button>
                </div>
             )}
           </div>
           
           <div className="flex-1 p-6 relative overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed text-blue-100">
              {!generatedSql && !isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-textMuted p-8 text-center opacity-50">
                  <Terminal className="w-12 h-12 mb-4 stroke-[1]" />
                  <p>SQL will appear here after generation.</p>
                </div>
              ) : null}

              <AnimatePresence>
                 {generatedSql && (
                   <motion.pre
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="whitespace-pre-wrap"
                   >
                     {generatedSql.split('\n').map((line, i) => (
                       <span key={i} className="block hover:bg-surfaceHighlight/30 px-2 -mx-2 rounded cursor-text">
                         {line.includes('SELECT') || line.includes('FROM') || line.includes('WHERE') || line.includes('GROUP BY') || line.includes('ORDER BY') ? (
                            <span className="text-purple-400 font-bold">{line}</span>
                         ) : line.includes("'") ? (
                            <span className="text-green-300">{line}</span>
                         ) : (
                            line
                         )}
                       </span>
                     ))}
                   </motion.pre>
                 )}
              </AnimatePresence>
           </div>
           
           {generatedSql && (
             <div className="p-4 border-t border-border flex justify-between items-center bg-background/50 backdrop-blur">
                <div className="flex items-center gap-2 text-xs text-textMuted bg-surface p-2 rounded">
                  <AlertCircle className="w-3 h-3 text-yellow-500" />
                  Estimated Cost: High (Full Table Scan)
                </div>
                <button 
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-green-600/20 disabled:opacity-50"
                >
                  {isExecuting ? <RefreshCcw className="w-4 h-4 fill-current animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  {isExecuting ? 'Executing...' : 'Execute Query'}
                </button>
             </div>
           )}
        </div>
      </div>

      {/* Right Panel - Schema Context Sidebar */}
      <div className="w-80 glass-panel rounded-2xl flex flex-col overflow-hidden shadow-xl border-l-2 border-primary/20 bg-surface/50">
        <div className="px-6 py-5 border-b border-border bg-surfaceHighlight/50">
          <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-textMuted">
            <Database className="w-4 h-4" /> Schema Context
          </h3>
          <p className="text-xs text-textMuted mt-1">Available tables for the AI.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {mockSchema.map((item, idx) => (
             <div key={item.table} className="mb-2">
               <div className="flex items-center justify-between p-3 rounded-lg hover:bg-surfaceHighlight cursor-pointer transition-colors group border border-transparent hover:border-border">
                  <div className="font-mono text-sm font-semibold text-textMain group-hover:text-primary transition-colors">
                    {item.table}
                  </div>
                  <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface border border-border text-textMuted">
                    {(item.count / 1000).toFixed(1)}k
                  </div>
               </div>
               
               {/* Show columns specifically for queries_log to demonstrate schema awareness */}
               {item.table === 'queries_log' && (
                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pl-6 pr-2 py-1 space-y-1">
                   {item.columns.map(col => (
                     <div key={col} className="flex justify-between items-center text-xs py-1 text-textMuted border-l-2 border-border pl-3">
                       <span className="font-mono text-[11px]">{col}</span>
                       <span className="text-[9px] uppercase font-bold opacity-50">
                          {col.includes('id') ? 'UUID' : col.includes('time') ? 'INT' : 'STR'}
                       </span>
                     </div>
                   ))}
                 </motion.div>
               )}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryGenerator;

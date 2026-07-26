import React from 'react';
import { motion } from 'framer-motion';
import { Download, Table, BarChart2, AlertCircle, RefreshCw, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const mockData = {
  columns: ['query_date', 'total_queries', 'avg_latency_ms'],
  rows: [
    ['2023-10-25', 12450, 45],
    ['2023-10-24', 15200, 48],
    ['2023-10-23', 14800, 42],
    ['2023-10-22', 11200, 39],
    ['2023-10-21', 9800, 35],
    ['2023-10-20', 16500, 52],
    ['2023-10-19', 15900, 50],
  ]
};

const QueryResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { queryResult, sql } = location.state || {};

  const displayCols = queryResult?.data?.length > 0 
    ? Object.keys(queryResult.data[0]) 
    : mockData.columns;

  const displayRows = queryResult?.data?.length > 0
    ? queryResult.data.map(row => Object.values(row))
    : mockData.rows;

  const displaySQL = sql || `SELECT DATE(timestamp) as query_date, COUNT(*) as total_queries, AVG(execution_time_ms) as avg_latency\nFROM queries_log WHERE status = 'SUCCESS' GROUP BY 1 ORDER BY 1 DESC;`;
  
  const displayTime = queryResult?.execution_time || 124;

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            Query Results
          </h1>
          <p className="text-textMuted mt-1">Execution successful. {displayRows.length} rows returned in {displayTime}ms.</p>
        </div>
        
        <div className="flex gap-3">
          <button onClick={() => navigate('/dashboard/query')} className="flex items-center gap-2 px-4 py-2 bg-surfaceHighlight hover:bg-surface border border-border rounded-lg text-sm font-medium transition-colors">
            <RefreshCw className="w-4 h-4" />
            Regenerate SQL
          </button>
          <div className="flex bg-surfaceHighlight border border-border rounded-lg overflow-hidden p-1">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded text-sm font-medium shadow-sm flex-1">
              <Table className="w-4 h-4" /> Data Grid
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-textMuted hover:text-textMain rounded text-sm font-medium flex-1 transition-colors">
              <BarChart2 className="w-4 h-4" /> Chart
            </button>
          </div>
        </div>
      </div>

      {/* SQL Snippet View */}
      <div className="glass-panel rounded-xl p-4 font-mono text-sm border-l-4 border-l-primary bg-surfaceHighlight/30 text-purple-200 shadow-sm relative group overflow-x-auto">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase font-bold text-textMuted tracking-wider bg-surface px-2 py-1 rounded">Read-Only Executed</span>
        </div>
        <pre>{displaySQL}</pre>
      </div>

      {/* Results Table */}
      <div className="glass-panel rounded-2xl flex-1 flex flex-col overflow-hidden border">
        <div className="px-6 py-4 flex justify-between items-center border-b border-border bg-surfaceHighlight/50">
           <h3 className="font-semibold text-sm uppercase tracking-wider text-textMuted">Data Output</h3>
           <div className="flex gap-2">
             <button className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded text-xs font-semibold hover:bg-surfaceHighlight transition-colors">
               <Download className="w-3 h-3" /> Export CSV
             </button>
           </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-surfaceHighlight/80 backdrop-blur z-10 border-b border-border">
              <tr>
                {displayCols.map((col, i) => (
                  <th key={i} className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-textMuted first:pl-6">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayRows.map((row, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="hover:bg-surfaceHighlight/30 transition-colors group cursor-default"
                >
                  {row.map((cell, j) => (
                    <td key={j} className={`py-4 px-6 text-sm ${j === 0 ? 'font-medium font-mono' : 'text-textMuted'} first:pl-6 group-hover:text-textMain transition-colors`}>
                      {String(cell)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex justify-between items-center bg-surfaceHighlight/20">
          <span className="text-xs text-textMuted font-medium">Showing 1 to {displayRows.length} of {displayRows.length} entries</span>
          <div className="flex gap-1">
            <button disabled className="p-1 rounded bg-surface border border-border text-textMuted opacity-50 cursor-not-allowed"><ChevronLeft className="w-4 h-4" /></button>
            <button className="px-3 py-1 rounded bg-primary text-white text-xs font-bold shadow-sm">1</button>
            <button disabled className="p-1 rounded bg-surface border border-border text-textMuted opacity-50 cursor-not-allowed"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryResults;

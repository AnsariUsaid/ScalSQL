import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Mail, Lock, Database, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [dbType, setDbType] = useState('postgresql');

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/dashboard'); // Mock registration flow
  };

  return (
    <div className="min-h-screen flex text-textMain bg-background selection:bg-primary selection:text-white">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 lg:p-12 relative z-10 bg-background custom-scrollbar overflow-y-auto">
        <div className="w-full max-w-lg">
          <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold mb-10">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">S</div>
            ScalSQL
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-2">Create Organization</h2>
            <p className="text-textMuted mb-8">Set up your multi-tenant environment in seconds.</p>

            <form onSubmit={handleRegister} className="space-y-6">
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-textMuted ml-1 block">Organization Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-textMuted" />
                    </div>
                    <input type="text" required className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm" placeholder="Acme Corp" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-textMuted ml-1 block">Subdomain Prefix</label>
                  <div className="relative flex items-center">
                    <input type="text" required className="block w-full pl-3 pr-16 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm" placeholder="acme" />
                    <span className="absolute right-3 text-sm text-textMuted">.scalsql.com</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-textMuted ml-1 block">Admin Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-textMuted" />
                  </div>
                  <input type="email" required className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm" placeholder="admin@acme.com" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-textMuted ml-1 block">Admin Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-textMuted" />
                  </div>
                  <input type="password" required className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm" placeholder="Minimum 8 characters" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-textMuted ml-1 block">Primary Database Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setDbType('postgresql')}
                    className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center transition-all ${dbType === 'postgresql' ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:border-textMuted'}`}
                  >
                    <Database className={`h-8 w-8 mb-2 ${dbType === 'postgresql' ? 'text-primary' : 'text-textMuted'}`} />
                    <span className={`text-sm font-semibold ${dbType === 'postgresql' ? 'text-primary' : 'text-textMain'}`}>PostgreSQL</span>
                  </div>
                  <div 
                    onClick={() => setDbType('mysql')}
                    className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center transition-all ${dbType === 'mysql' ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:border-textMuted'}`}
                  >
                    <Database className={`h-8 w-8 mb-2 ${dbType === 'mysql' ? 'text-primary' : 'text-textMuted'}`} />
                    <span className={`text-sm font-semibold ${dbType === 'mysql' ? 'text-primary' : 'text-textMain'}`}>MySQL</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-md font-bold rounded-xl text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-all mt-8"
              >
                Initialize Tenant
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-textMuted">
                  Already have an organization?{' '}
                  <Link to="/login" className="font-semibold text-primary hover:text-primaryHover transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>

            </form>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Branding Info */}
      <div className="hidden lg:flex w-[45%] flex-col justify-center px-16 relative overflow-hidden bg-surface/30 border-l border-border/50">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Decorative grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6bTAgMzloNDB2MUgweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8cGF0aCBkPSJNMCAwdjQwaDFWMHptMzkgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+Cjwvc3ZnPg==')]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="z-10 relative">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl relative"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-surfaceHighlight border border-border rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Dedicated Infrastructure</h3>
            <p className="text-textMuted">
              Every organization receives dedicated compute isolation and schema validation caching, ensuring queries are extremely fast without compromising data security across tenants.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel p-8 rounded-2xl relative mt-8 opacity-80"
          >
             <h3 className="text-lg font-bold mb-2">Built for Scale</h3>
            <p className="text-sm text-textMuted">
              Supporting millions of queries per month via AWS-integrated serverless architecture.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;

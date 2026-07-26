import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building, ArrowRight, AlertCircle } from 'lucide-react';
import { apiFetch } from '../lib/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgId, setOrgId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // Send email and password to backend login endpoint
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      // Save JWT token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-textMain bg-background selection:bg-primary selection:text-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-12 relative overflow-hidden bg-surface/30">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="z-10 relative pl-12 max-w-xl">
          <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold mb-12">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">S</div>
            ScalSQL
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold tracking-tight mb-6"
          >
            Welcome back to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Data Hub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-textMuted lead"
          >
            Access your isolated organization environment securely.
          </motion.p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10 bg-background border-l border-border/50 shadow-2xl">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 flex text-center justify-center">
            <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">S</div>
              ScalSQL
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-2">Sign In</h2>
            <p className="text-textMuted mb-8">Enter your credentials to access your account.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm border-none font-medium text-textMuted ml-1 block">Organization ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-textMuted" />
                  </div>
                  <input
                    type="text"
                    required
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="hospital-ny-01"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-textMuted ml-1 block">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-textMuted" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="analyst@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-textMuted ml-1 block">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-textMuted" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded bg-surface"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-textMuted">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primaryHover">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-all mt-6 disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
                <ArrowRight className="ml-2 h-5 w-5 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center bg-surface/30 py-4 rounded-xl border border-border/50">
              <p className="text-sm text-textMuted">
                Don't have an organization setup?{' '}
                <Link to="/register" className="font-semibold text-primary hover:text-primaryHover transition-colors">
                  Contact Sales
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

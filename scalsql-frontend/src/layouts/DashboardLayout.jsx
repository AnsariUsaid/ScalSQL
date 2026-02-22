import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  TerminalSquare, 
  History, 
  Settings, 
  Database,
  Activity,
  LogOut,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Query Generator', path: '/dashboard/query', icon: TerminalSquare },
  { name: 'History', path: '/dashboard/history', icon: History },
  { name: 'Analytics', path: '/dashboard/analytics', icon: Activity },
  { name: 'Database Config', path: '/dashboard/database', icon: Database },
  { name: 'Admin Panel', path: '/dashboard/admin', icon: Users },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

const SidebarItem = ({ item, isCollapsed }) => {
  return (
    <NavLink
      to={item.path}
      end={item.path === '/dashboard'}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative',
          isActive 
            ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
            : 'text-textMuted hover:bg-white/5 hover:text-white border border-transparent',
          isCollapsed ? 'justify-center px-0' : ''
        )
      }
      title={isCollapsed ? item.name : undefined}
    >
      <item.icon className={cn('w-5 h-5 flex-shrink-0 transition-colors', isCollapsed ? 'mx-auto' : '')} />
      
      <AnimatePresence mode="popLayout">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="whitespace-nowrap overflow-hidden"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-[#0a0a0c] text-white text-xs rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {item.name}
        </div>
      )}
    </NavLink>
  );
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#050507] text-gray-200 overflow-hidden font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-sm shadow-[0_0_10px_rgba(168,85,247,0.2)]">S</div>
          ScalSQL
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-gray-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 260,
          x: isMobileOpen ? 0 : window.innerWidth < 768 ? -260 : 0 
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        className={cn(
          "fixed md:relative top-0 left-0 h-full bg-[#0a0a0c]/90 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 transition-shadow shadow-[4px_0_24px_rgba(0,0,0,0.4)] pt-16 md:pt-0"
        )}
      >
        {/* Toggle Button (Desktop) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-6 w-6 h-6 bg-primary rounded-full items-center justify-center text-white shadow-[0_0_10px_rgba(168,85,247,0.4)] hover:scale-110 transition-transform z-10"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Logo Area */}
        <div className={cn("hidden md:flex h-16 items-center px-4 border-b border-white/5 pt-1", isCollapsed ? "justify-center" : "")}>
          <div className="flex items-center gap-3 font-bold text-xl text-white">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-purple-500/10 border border-primary/30 flex items-center justify-center text-primary text-lg shadow-[0_0_15px_rgba(168,85,247,0.2)] flex-shrink-0">
              S
            </div>
            <AnimatePresence mode="popLayout">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap font-display tracking-wide"
                >
                  ScalSQL
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6 mt-2">
          <div>
            <AnimatePresence mode="popLayout">
              {!isCollapsed && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 hidden md:block"
                >
                  Menu
                </motion.div>
              )}
            </AnimatePresence>
            <nav className="space-y-1.5 mt-2 md:mt-0">
              {navItems.map((item) => (
                <SidebarItem key={item.name} item={item} isCollapsed={isCollapsed && window.innerWidth >= 768} />
              ))}
            </nav>
          </div>
        </div>

        {/* User / Logout Area */}
        <div className="p-3 border-t border-white/5 mt-auto">
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-3 py-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-400 text-gray-400 transition-colors group",
              isCollapsed && window.innerWidth >= 768 ? "justify-center px-0" : ""
            )}
            title={isCollapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
            <AnimatePresence mode="popLayout">
              {(!isCollapsed || window.innerWidth < 768) && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap font-medium"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-6 absolute top-0 w-full z-10 pt-16 md:pt-0">
          <div className="flex items-center gap-4 ml-12 md:ml-0 hidden sm:flex">
            <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-xs font-medium border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              System Online
            </span>
            <span className="text-gray-500 text-sm font-medium">Acme Corp Environment</span>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-primary/20 cursor-pointer hover:scale-105 transition-transform">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto w-full pt-16 md:pt-16 mt-16 md:mt-0 bg-[#050507] custom-scrollbar block">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full pb-8"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

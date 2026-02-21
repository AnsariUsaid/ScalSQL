import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TerminalSquare, 
  History, 
  Settings, 
  Database,
  Activity,
  LogOut,
  Users
} from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Query Generator', path: '/dashboard/query', icon: TerminalSquare },
    { name: 'History', path: '/dashboard/history', icon: History },
    { name: 'Analytics', path: '/dashboard/analytics', icon: Activity },
    { name: 'Database Config', path: '/dashboard/database', icon: Database },
    { name: 'Admin Panel', path: '/dashboard/admin', icon: Users },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background text-textMain overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface/50 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white text-sm">S</div>
            ScalSQL
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-4 px-2 mt-2">
            main menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-textMuted hover:bg-surfaceHighlight hover:text-textMain'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-surfaceHighlight cursor-pointer transition-colors" onClick={handleLogout}>
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-red-400">Sign Out</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-surface/80 backdrop-blur flex items-center justify-between px-8 absolute top-0 w-full z-10">
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-semibold border border-green-500/20">
              System Online
            </span>
            <span className="text-textMuted text-sm hidden sm:inline-block">Acme Corp Environment</span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-sm font-bold shadow-md cursor-pointer">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto w-full pt-16 bg-background custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

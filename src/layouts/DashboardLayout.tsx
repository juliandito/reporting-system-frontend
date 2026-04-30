import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileBarChart2,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Menu,
  LogOut,
} from 'lucide-react';
import { ROUTES } from '../constants/RouteConstants';
import { useAuthStore } from '../store/useAuthStore';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  {
    to: ROUTES.DASHBOARD,
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard',
  },
  {
    to: ROUTES.UPLOAD,
    icon: <Upload size={20} />,
    label: 'Upload Data',
  },
  {
    to: ROUTES.REPORTS,
    icon: <FileBarChart2 size={20} />,
    label: 'Reports',
  },
];

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-primary text-primary-content transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } min-h-screen`}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 cursor-pointer"
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          <div className="flex-shrink-0">
            <BarChart3 size={28} className="text-secondary" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm leading-tight">BPH Migas</p>
              <p className="text-xs opacity-70">Reporting System</p>
            </div>
          )}
        </div>

        <div className="divider divider-primary my-0 opacity-20" />

        {/* Nav items */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 pb-4">
          <button
            className="btn btn-ghost btn-sm w-full text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-base-100 border-b border-base-300 px-6 py-3 flex items-center gap-4">
          <button className="btn btn-ghost btn-sm md:hidden">
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          {user && (
            <div className="hidden sm:block text-sm text-base-content/70">
              {user.name}
            </div>
          )}
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
          <div className="text-sm text-base-content/60">
            BPH Migas Reporting System
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

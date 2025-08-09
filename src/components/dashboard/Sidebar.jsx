import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  ChefHat, 
  CreditCard, 
  Settings, 
  Crown,
  LogOut,
  Menu,
  X
} from 'lucide-react';


const Sidebar = ({ user, isOpen, onToggle }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard/pelayan', icon: Users, label: 'Pelayan' },
    { path: '/dashboard/koki', icon: ChefHat, label: 'Koki' },
    { path: '/dashboard/kasir', icon: CreditCard, label: 'Kasir' },
    { path: '/dashboard/admin', icon: Settings, label: 'Admin' },
    { path: '/dashboard/owner', icon: Crown, label: 'Owner' },
  ];

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className={`${isOpen ? 'block' : 'hidden'}`}>
              <h2 className="text-xl font-playfair font-bold text-primary">RejaFood</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2 hover:bg-sidebar-accent"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-sidebar-border">
          <div className={`${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-accent/10 rounded-lg p-3">
              <p className="font-semibold text-accent">{user?.username}</p>
              <p className="text-sm text-muted-foreground">{user?.role}</p>
            </div>
          </div>
          {!isOpen && (
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mx-auto">
              <span className="text-sm font-bold text-accent-foreground">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'hover:bg-sidebar-accent text-sidebar-foreground'
                }`
              }
            >
              <item.icon size={20} />
              <span className={`${isOpen ? 'block' : 'hidden'}`}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-destructive hover:bg-destructive/10"
          >
            <LogOut size={20} />
            <span className={`ml-3 ${isOpen ? 'block' : 'hidden'}`}>Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
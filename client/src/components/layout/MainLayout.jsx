import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BookUser, FilePlus2, LayoutDashboard, LogOut, ShieldCheck, User, ChevronDown } from 'lucide-react';

const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 space-x-3 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'text-text-secondary hover:bg-background hover:text-text'
      }`
    }
  >
    {icon}
    <span className="font-medium">{children}</span>
  </NavLink>
);

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-background text-text">
      <aside className="w-64 bg-surface flex flex-col border-r border-gray-200">
        <div className="flex items-center justify-center p-6 space-x-2 border-b">
          <ShieldCheck className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-bold text-primary">ProctorAI</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {user?.role === 'teacher' && (
            <>
              <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />}>Dashboard</NavItem>
              <NavItem to="/create-exam" icon={<FilePlus2 size={20} />}>Create Exam</NavItem>
            </>
          )}
          {user?.role === 'student' && (
            <>
              <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />}>Dashboard</NavItem>
              <NavItem to="/my-results" icon={<BookUser size={20} />}>My Results</NavItem>
            </>
          )}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* --- NEW HEADER WITH DROPDOWN --- */}
        <header className="bg-surface flex justify-end items-center p-4 border-b shadow-sm relative">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-text">{user?.name}</p>
                  <p className="text-xs text-text-secondary capitalize">{user?.role}</p>
                </div>
                <ChevronDown size={16} className={`text-text-secondary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                    <p className="text-sm font-semibold text-text">{user?.name}</p>
                    <p className="text-xs text-text-secondary capitalize">{user?.role}</p>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 text-sm text-text hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User size={16} className="mr-2 text-text-secondary" />
                    User Profile
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
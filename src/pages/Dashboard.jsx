import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/dashboard/Sidebar';
import PelayanPage from '@/components/dashboard/PelayanPage';
import KokiPage from '@/components/dashboard/KokiPage';
import KasirPage from '@/components/dashboard/KasirPage';
import AdminPage from '@/components/dashboard/AdminPage';
import OwnerPage from '@/components/dashboard/OwnerPage';
import DashboardHome from '@/components/dashboard/DashboardHome';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        user={user} 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/pelayan" element={<PelayanPage />} />
            <Route path="/koki" element={<KokiPage />} />
            <Route path="/kasir/*" element={<KasirPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/owner" element={<OwnerPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
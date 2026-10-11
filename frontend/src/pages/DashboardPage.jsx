import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PrincipalDashboard from './PrincipalDashboard';
import TeacherDashboard from './TeacherDashboard';
import ParentDashboard from './ParentDashboard';
import AdminDashboard from './AdminDashboard';
import FinanceDashboard from './FinanceDashboard';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'principal':
      return <PrincipalDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'parent':
    case 'student':
      return <ParentDashboard />;
    case 'admin':
    case 'administrator':
      return <AdminDashboard />;
    case 'finance':
      return <FinanceDashboard />;
    default:
      return <div className="p-8 text-center">Invalid Role</div>;
  }
}

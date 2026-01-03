
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchoolAccessForm from './pages/SchoolAccessForm';
import LoginPage from './pages/LoginPage';
import TriageAssessment from './pages/TriageAssessment';
import LowRiskDashboard from './pages/dashboards/LowRiskDashboard';
import ModerateRiskDashboard from './pages/dashboards/ModerateRiskDashboard';
import HighRiskDashboard from './pages/dashboards/HighRiskDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CounsellorDashboard from './pages/CounsellorDashboard';
import PeerStories from './pages/PeerStories';
import ResourcesPage from './pages/ResourcesPage';
import GoogleMeetCounseling from './pages/GoogleMeetCounseling';
import ChatInterface from './pages/ChatInterface';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/request-access" element={<SchoolAccessForm />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Student Journey - Protected */}
        <Route path="/triage" element={
          <ProtectedRoute allowedRoles={['student']}>
            <TriageAssessment />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/low" element={
          <ProtectedRoute allowedRoles={['student']}>
            <LowRiskDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/moderate" element={
          <ProtectedRoute allowedRoles={['student']}>
            <ModerateRiskDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/high" element={
          <ProtectedRoute allowedRoles={['student']}>
            <HighRiskDashboard />
          </ProtectedRoute>
        } />
        <Route path="/book-counselling" element={
          <ProtectedRoute allowedRoles={['student']}>
            <GoogleMeetCounseling />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute allowedRoles={['student']}>
            <ChatInterface />
          </ProtectedRoute>
        } />
        <Route path="/peer-stories" element={
          <ProtectedRoute allowedRoles={['student']}>
            <PeerStories />
          </ProtectedRoute>
        } />
        <Route path="/resources" element={
          <ProtectedRoute allowedRoles={['student']}>
            <ResourcesPage />
          </ProtectedRoute>
        } />


        {/* Staff - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/counsellor" element={
          <ProtectedRoute allowedRoles={['counsellor', 'admin']}>
            <CounsellorDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;

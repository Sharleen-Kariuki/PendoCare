import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Restricts access based on authentication status and user roles.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();

    // Check for token and role in localStorage
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('user_role');

    // 1. Not Authenticated: Redirect to login
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Role Not Allowed: Show "Access Denied" or redirect
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 max-w-lg">
                    <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Access Denied</h2>
                    <p className="text-slate-500 font-medium mb-8">
                        You do not have the necessary permissions to view this page.
                        Please contact your administrator if you believe this is an error.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="ml-4 text-brand-600 font-bold hover:underline"
                    >
                        Login as different user
                    </button>
                </div>
            </div>
        );
    }

    // 3. Authorized: Render the component
    return children;
};

export default ProtectedRoute;

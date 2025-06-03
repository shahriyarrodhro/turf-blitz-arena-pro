
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { PaymentProvider } from '@/contexts/PaymentContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import './App.css';

// Lazy load components
const Index = lazy(() => import('@/pages/Index'));
const Auth = lazy(() => import('@/pages/Auth'));
const Turfs = lazy(() => import('@/pages/Turfs'));
const TurfBooking = lazy(() => import('@/pages/TurfBooking'));
const PlayerDashboard = lazy(() => import('@/pages/PlayerDashboard'));
const TurfOwnerDashboard = lazy(() => import('@/pages/TurfOwnerDashboard'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const Tournaments = lazy(() => import('@/pages/Tournaments'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <PaymentProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/turfs" element={<Turfs />} />
                  <Route path="/turf/:id/book" element={<TurfBooking />} />
                  <Route path="/tournaments" element={<Tournaments />} />
                  
                  {/* Protected Routes */}
                  <Route path="/player" element={
                    <ProtectedRoute allowedRoles={['player']}>
                      <PlayerDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/turf-owner" element={
                    <ProtectedRoute allowedRoles={['turf-owner']}>
                      <TurfOwnerDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </Router>
        </PaymentProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;

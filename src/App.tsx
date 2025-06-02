
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Turfs from "./pages/Turfs";
import TurfBooking from "./pages/TurfBooking";
import Tournaments from "./pages/Tournaments";
import PlayerDashboard from "./pages/PlayerDashboard";
import TurfOwnerDashboard from "./pages/TurfOwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BookingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/turfs" element={<Turfs />} />
              <Route path="/turf/:id" element={<TurfBooking />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route 
                path="/player" 
                element={
                  <ProtectedRoute allowedRoles={['player']}>
                    <PlayerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/turf-owner" 
                element={
                  <ProtectedRoute allowedRoles={['turf-owner']}>
                    <TurfOwnerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

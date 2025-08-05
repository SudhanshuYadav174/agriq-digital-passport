import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ExporterDashboard from "./pages/dashboards/ExporterDashboard";
import QADashboard from "./pages/dashboards/QADashboard";
import ImporterDashboard from "./pages/dashboards/ImporterDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import VerifyCertificate from "./pages/VerifyCertificate";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (standalone) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Main Routes (with layout) */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="verify" element={<VerifyCertificate />} />
            <Route path="support" element={<Support />} />
            
            {/* Dashboard Routes */}
            <Route path="dashboard/exporter" element={<ExporterDashboard />} />
            <Route path="dashboard/qa" element={<QADashboard />} />
            <Route path="dashboard/importer" element={<ImporterDashboard />} />
            <Route path="dashboard/admin" element={<AdminDashboard />} />
          </Route>
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

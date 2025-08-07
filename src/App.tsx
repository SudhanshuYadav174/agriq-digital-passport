import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Docs from "./pages/Docs";
import Guides from "./pages/Guides";
import Technical from "./pages/Technical";
import Compliance from "./pages/Compliance";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ExporterDashboard from "./pages/dashboards/ExporterDashboard";
import QADashboard from "./pages/dashboards/QADashboard";
import ImporterDashboard from "./pages/dashboards/ImporterDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import VerifyCertificate from "./pages/VerifyCertificate";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import NewSubmission from "./pages/NewSubmission";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="ui-theme">
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
            <Route path="features" element={<Features />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="docs" element={<Docs />} />
            <Route path="guides" element={<Guides />} />
            <Route path="technical" element={<Technical />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="verify" element={<VerifyCertificate />} />
            <Route path="support" element={<Support />} />
            <Route path="submit" element={<NewSubmission />} />
            
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
  </ThemeProvider>
);

export default App;

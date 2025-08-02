import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "@/components/RequireAuth";
import { AdminShortcut } from "@/components/AdminShortcut";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminShortcut />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/cursos" element={<CoursesPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

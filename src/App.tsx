import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout';
import { LoginPage, RegisterPage } from '@/pages/auth';
import { DashboardPage } from '@/pages/dashboard';
import { EvenementsPage } from '@/pages/evenements';
import { LieuxPage } from '@/pages/lieux';
import { InscriptionsPage } from '@/pages/inscriptions';
import { HistoiresPage } from '@/pages/histoires';
import { ImamsPage } from '@/pages/imams';
import { NotificationsPage } from '@/pages/notifications';
import { UtilisateursPage } from '@/pages/utilisateurs';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';
import { Loading } from '@/components/ui/spinner';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Vérification de l'authentification..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public Route Component (redirect to dashboard if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/evenements" element={<EvenementsPage />} />
        <Route path="/lieux" element={<LieuxPage />} />
        <Route path="/inscriptions" element={<InscriptionsPage />} />
        <Route path="/histoires" element={<HistoiresPage />} />
        <Route path="/imams" element={<ImamsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/utilisateurs" element={<UtilisateursPage />} />
        <Route path="/parametres" element={<ComingSoon title="Paramètres" />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Temporary Coming Soon component
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <h1 className="text-3xl font-bold text-muted-foreground">{title}</h1>
      <p className="text-muted-foreground mt-2">Cette page est en cours de développement</p>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

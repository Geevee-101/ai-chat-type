import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/footer";
import type { JSX } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import PageLoader from "./components/layout/page-loader";

function App() {
  const auth = useAuth();

  function ProtectedRoute({ children }: { children: JSX.Element }) {
    if (auth?.isLoading) {
      return <PageLoader />;
    }

    return auth?.isLoggedIn ? children : <Navigate to="/login" replace />;
  }

  function PublicRoute({ children }: { children: JSX.Element }) {
    if (auth?.isLoading) {
      return (
        <div className="h-full grid place-items-center">
          <div className="flex flex-col items-center gap-2">
            <Spinner />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      );
    }

    return !auth?.isLoggedIn ? children : <Navigate to="/" replace />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen flex flex-col">
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster />
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;

import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Footer from "./components/layout/footer";

function App() {
  const auth = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen flex flex-col">
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={auth?.isLoggedIn ? <Chat /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/login"
              element={!auth?.isLoggedIn ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!auth?.isLoggedIn ? <Signup /> : <Navigate to={"/"} />}
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

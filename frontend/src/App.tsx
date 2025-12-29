import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";

function App() {
  const auth = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
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
    </ThemeProvider>
  );
}

export default App;

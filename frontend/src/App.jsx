import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import GRTNexusTerminal from "./pages/GRTNexusTerminal.jsx";
import PoliciesPage from "./pages/PoliciesPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Layout from "./components/Layout.jsx";

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/terminal" element={<GRTNexusTerminal />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/terminal" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

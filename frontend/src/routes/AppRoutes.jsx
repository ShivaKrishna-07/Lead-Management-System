import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LeadsPage from "../pages/LeadsPage";
import LeadCreatePage from "../pages/LeadCreatePage";
import LeadEditPage from "../pages/LeadEditPage";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/leads" />}
        />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to="/leads" />}
        />
        <Route
          path="/leads"
          element={user ? <LeadsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/leads/create"
          element={user ? <LeadCreatePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/leads/edit/:id"
          element={user ? <LeadEditPage /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/leads" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

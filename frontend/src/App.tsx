import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Players from "./pages/Players";
import ToastContainer from "./components/toast_message/ToastContainer";
import PrivateLayout from "./components/layouts/layout_app/PrivateLayout";
import { RequireAuth } from "./components/RequireAuth";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Доступно всім */}
        <Route path="/login" element={<Login />} />

        {/* Захищені маршрути */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <PrivateLayout>
                <Dashboard />
              </PrivateLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <PrivateLayout>
                <Settings />
              </PrivateLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/players"
          element={
            <RequireAuth>
              <PrivateLayout>
                <Players />
              </PrivateLayout>
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer />
    </Router>
  );
};

export default App;
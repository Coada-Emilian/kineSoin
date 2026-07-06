import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AdminGuard from './components/authentification/AdminGuard';
import TherapistGuard from './components/authentification/TherapistGuard';
import { useAppContext } from './hooks/context/useAppContext';
import { AdminLayout } from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import TherapistLayout from './layouts/TherapistLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminPage from './pages/admin/AdminPage';
import ErrorPage from './pages/ErrorPage';
import TherapistPage from './pages/therapist/TherapistPage';
import { adminRouteDetails } from './utils/config/admin/adminRouteDetails';
import { publicRouteDetails } from './utils/config/public/publicRouteDetails';
import { therapistRouteDetails } from './utils/config/therapist/therapistRouteDetails';

function App() {
  const location = useLocation();
  const { setError } = useAppContext();

  useEffect(() => {
    setError(null);
  }, [location.pathname, setError]);

  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          {publicRouteDetails.map((route) => (
            <Route
              path={route.path}
              key={route.path ?? '/'}
              element={<route.element />}
              index={route.index}
            />
          ))}

          <Route path="*" element={<ErrorPage type="public" />} />
        </Route>

        <Route path="/loginAdmin" element={<AdminLoginPage />} />

        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          {adminRouteDetails.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<AdminPage entityType={route.entityType} />}
            />
          ))}

          <Route path="*" element={<ErrorPage type="adminAuthenticated" />} />
        </Route>

        <Route
          path="/therapist"
          element={
            <TherapistGuard>
              <TherapistLayout />
            </TherapistGuard>
          }
        >
          {therapistRouteDetails.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<TherapistPage pathName={route.path} />}
            />
          ))}

          <Route
            path="*"
            element={<ErrorPage type="therapistAuthenticated" />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

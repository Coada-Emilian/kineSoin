import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { AdminLayout } from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminPage from './pages/admin/AdminPage';
import ErrorPage from './pages/ErrorPage';
import { adminRouteDetails } from './utils/config/admin/adminRouteDetails';
import { publicRouteDetails } from './utils/config/public/publicRouteDetails';
import { useAppContext } from './utils/hooks/context/useAppContext';
import { useAuthentificationContext } from './utils/hooks/context/useAuthentificationContext';

function App() {
  const location = useLocation();
  const { setError } = useAppContext();

  const { isAdminAuthenticated, adminProfileToken } =
    useAuthentificationContext();

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

        {isAdminAuthenticated && adminProfileToken ? (
          <Route path="/admin" element={<AdminLayout />}>
            {adminRouteDetails.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<AdminPage entityType={route.entityType} />}
              />
            ))}

            <Route path="*" element={<ErrorPage type="adminAuthenticated" />} />
          </Route>
        ) : (
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="*"
              element={<ErrorPage type="adminUnauthenticated" />}
            />
          </Route>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

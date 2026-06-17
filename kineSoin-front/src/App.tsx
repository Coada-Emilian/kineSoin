import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import PublicLayout from './layouts/PublicLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ErrorPage from './pages/ErrorPage';
import { publicRouteDetails } from './utils/constants/publicSection/publicRouteDetails';
import { useAppContext } from './utils/contexts/AppContext/useAppContext';
import { useAuthentificationContext } from './utils/contexts/AuthentificationContext/useAuthentificationContext';

function App() {
  const location = useLocation();
  const { setError } = useAppContext();

  const { isAdminAuthenticated, adminProfileToken } =
    useAuthentificationContext();

  useEffect(() => {
    setError(null);
  }, [location.pathname]);

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
        {/* {isAdminAuthenticated && adminProfileToken ? (
          <Route path="/admin" element={<AdminLayout />}>
            {adminRouteDetails.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<AdminMain entityType={route.entityType} />}
              />
            ))}

            <Route
              path="*"
              element={<ErrorPageRefactor type="connectedAdmin" />}
            />
          </Route>
        ) : (
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="*"
              element={<ErrorPageRefactor type="unconnectedAdmin" />}
            />
          </Route>
        )} */}
      </Routes>
    </>
  );
}

export default App;

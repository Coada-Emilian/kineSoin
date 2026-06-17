import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import PublicLayout from './layouts/PublicLayout';
import ErrorPage from './pages/ErrorPage';
import { publicRouteDetails } from './utils/constants/publicSection/publicRouteDetails';
import { useAppContext } from './utils/contexts/AppContext/useAppContext';

function App() {
  const location = useLocation();
  const { setError } = useAppContext();

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
      </Routes>
    </>
  );
}

export default App;

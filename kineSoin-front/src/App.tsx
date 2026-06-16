import { Route, Routes } from 'react-router-dom';
import './App.css';
import PublicLayout from './layouts/PublicLayout';
import { publicRouteDetails } from './utils/constants/publicSection/publicRouteDetails';

function App() {
  // const location = useLocation();
  // const { setError } = useAppContext();

  // useEffect(() => {
  //   setError(null);
  // }, [location.pathname]);

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

          {/* <Route path="*" element={<ErrorPageRefactor type="public" />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;

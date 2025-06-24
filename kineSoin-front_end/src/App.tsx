import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from './components/pageComponents/adminSection/newComponents/AdminLoginPage';
import AdminMain from './components/pageComponents/adminSection/newComponents/AdminMain';
import ErrorPageRefactor from './components/pageComponents/errorPage/newComponents/ErrorPageRefactor';
import ErrorPage from './components/pageComponents/errorPage/oldComponents/ErrorPage';
import TherapistMainRefactor from './components/pageComponents/therapistSection/newComponents/TherapistMainRefactor';
import { adminRoutes } from './utils/constants/publicSection/routes/adminRoutes';
import { publicRoutes } from './utils/constants/publicSection/routes/publicRoutes';
import { therapistRoutes } from './utils/constants/publicSection/routes/therapistRoutes';
import { useAuthentificationContext } from './utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import { AdminLayout } from './utils/layouts/newLayouts/AdminLayout';
import { PublicLayout } from './utils/layouts/newLayouts/PublicLayout';
import { TherapistLayout } from './utils/layouts/newLayouts/TherapistLayout';

function App() {
  const { isAdminAuthenticated, isTherapistAuthenticated } =
    useAuthentificationContext();

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {publicRoutes.map((route) => (
          <Route
            path={route.path}
            key={route.path ?? '/'}
            element={route.element}
            index={route.index}
          />
        ))}

        <Route path="*" element={<ErrorPageRefactor type="public" />} />
      </Route>

      <Route path="/loginAdmin" element={<AdminLoginPage />} />

      {/* Admin routes */}
      {isAdminAuthenticated ? (
        <Route path="/admin" element={<AdminLayout />}>
          {adminRoutes.map((route) => (
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
      )}

      {isTherapistAuthenticated ? (
        <Route path="/therapist" element={<TherapistLayout />}>
          {therapistRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<TherapistMainRefactor />}
            />
          ))}

          <Route
            path="*"
            element={<ErrorPage isConnectedTherapistErrorPage />}
          />
        </Route>
      ) : (
        <Route path="/therapist" element={<TherapistLayout />}>
          <Route
            path="*"
            element={<ErrorPage isUnconnectedTherapistErrorPage />}
          />
        </Route>
      )}

      {/* Patient routes
      {isPatientAuthenticated ? (
        <Route
          path="/patient"
          element={
            <Layout
              isPatientLayout
              isPatientAuthenticated={isPatientAuthenticated}
              setIsPatientAuthenticated={setIsPatientAuthenticated}
            />
          }
        >
          {patientRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<PatientMain {...{ [route.boolean]: true }} />}
            />
          ))}

          <Route path="*" element={<ErrorPage isConnectedPatientErrorPage />} />
        </Route>
      ) : (
        <Route
          path="/patient"
          element={
            <Layout
              isPatientLayout
              isPatientAuthenticated={isPatientAuthenticated}
              setIsPatientAuthenticated={setIsPatientAuthenticated}
            />
          }
        >
          <Route
            path="*"
            element={<ErrorPage isUnconnectedPatientErrorPage />}
          />
        </Route>
      )} */}
    </Routes>
  );
}

export default App;

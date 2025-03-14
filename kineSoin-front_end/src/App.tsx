import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/pageComponents/ErrorPage/ErrorPage';
import AdminLoginPage from './components/pageComponents/AdminSection/AdminLoginPage';
import { Layout } from './utils/AppUtils/appLayouts/Layout';
import { adminRoutes, publicRoutes } from './utils/AppUtils/constants/routes';
import { PublicLayout } from './utils/AppUtils/appLayouts/PublicLayout';
import { useAuthentificationContext } from './utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import { AdminLayout } from './utils/AppUtils/appLayouts/AdminLayout';
import AdminMain from './components/pageComponents/AdminSection/new_components/AdminMain';

function App() {
  const { isAdminAuthenticated, setIsAdminAuthenticated } =
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
        <Route path="*" element={<ErrorPage isPublicErrorPage />} />
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

          <Route path="*" element={<ErrorPage isConnectedAdminErrorPage />} />
        </Route>
      ) : (
        <Route
          path="/admin"
          element={
            <Layout
              isAdminLayout
              isAdminAuthenticated={isAdminAuthenticated}
              setIsAdminAuthenticated={setIsAdminAuthenticated}
            />
          }
        >
          <Route path="*" element={<ErrorPage isUnconnectedAdminErrorPage />} />
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
      )}
      {isTherapistAuthenticated ? (
        <Route
          path="/therapist"
          element={
            <Layout
              isTherapistLayout
              isTherapistAuthenticated={isTherapistAuthenticated}
              setIsTherapistAuthenticated={setIsTherapistAuthenticated}
            />
          }
        >
          {therapistRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<TherapistMain {...{ [route.boolean]: true }} />}
            />
          ))}

          <Route
            path="*"
            element={<ErrorPage isConnectedTherapistErrorPage />}
          />
        </Route>
      ) : (
        <Route
          path="/therapist"
          element={
            <Layout
              isTherapistLayout
              isTherapistAuthenticated={isTherapistAuthenticated}
              setIsTherapistAuthenticated={setIsTherapistAuthenticated}
            />
          }
        >
          <Route
            path="*"
            element={<ErrorPage isUnconnectedTherapistErrorPage />}
          />
        </Route>
      )} */}
    </Routes>
  );
}

export default App;

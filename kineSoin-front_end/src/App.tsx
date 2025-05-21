import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from './components/pageComponents/AdminSection/AdminLoginPage';
import AdminMain from './components/pageComponents/AdminSection/new_components/AdminMain';
import ErrorPage from './components/pageComponents/ErrorPage/ErrorPage';
import ErrorPageRefactor from './components/pageComponents/ErrorPage/new_component/ErrorPageRefactor';
import { adminRoutes } from './utils/AppUtils/constants/routes';
import { AdminLayout } from './utils/AppUtils/layouts/new_layouts/AdminLayout';
import { PublicLayout } from './utils/AppUtils/layouts/new_layouts/PublicLayout';
import { Layout } from './utils/AppUtils/layouts/old_layouts/Layout';
import { publicRoutes } from './utils/constants/public_section/routes/publicRoutes';
import { useAuthentificationContext } from './utils/contexts/authentificationContexts/AuthentificationGlobalContext';

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

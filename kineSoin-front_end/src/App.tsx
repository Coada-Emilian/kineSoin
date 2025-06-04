import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from './components/pageComponents/AdminSection/AdminLoginPage';
import AdminMain from './components/pageComponents/AdminSection/new_components/AdminMain';
import ErrorPageRefactor from './components/pageComponents/ErrorPage/new_component/ErrorPageRefactor';
import { adminRoutes } from './utils/constants/public_section/routes/adminRoutes';
import { publicRoutes } from './utils/constants/public_section/routes/publicRoutes';
import { useAuthentificationContext } from './utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import { AdminLayout } from './utils/layouts/new_layouts/AdminLayout';
import { PublicLayout } from './utils/layouts/new_layouts/PublicLayout';

function App() {
  const { isAdminAuthenticated } = useAuthentificationContext();

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

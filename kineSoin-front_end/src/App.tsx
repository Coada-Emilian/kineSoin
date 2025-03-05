import { useEffect, useState } from 'react';
import { getAdminTokenAndDataFromLocalStorage } from './localStorage/adminLocalStorage';
import { getPatientTokenAndDataFromLocalStorage } from './localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from './localStorage/therapistLocalStorage';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/pageComponents/ErrorPage/ErrorPage';
import AdminLoginPage from './components/pageComponents/AdminSection/AdminLoginPage';
import PatientMain from './components/pageComponents/PatientSection/PatientMain';
import TherapistMain from './components/pageComponents/TherapistSection/TherapistMain';
import { Layout } from './utils/AppUtils/appLayouts/Layout';
import {
  checkAdminAuthentication,
  checkPatientAuthentication,
  checkTherapistAuthentication,
} from './utils/AppUtils/authentificationFunctions/appAuthentificationFunctions';
import AdminPage from './components/pageComponents/AdminSection/AdminPage';
import {
  adminRoutes,
  patientRoutes,
  therapistRoutes,
  publicRoutes,
} from './utils/AppUtils/constants/routes';
import { PublicLayout } from './utils/AppUtils/appLayouts/PublicLayout';
import { GlobalContextProvider } from './utils/contexts/GlobalContext';
import PublicMain from './components/pageComponents/PublicSection/PublicMain';

function App() {
  // Authentication states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);
  const [isTherapistAuthenticated, setIsTherapistAuthenticated] =
    useState(false);

  // Tokens
  const [patientProfileToken, setPatientProfileToken] = useState<string | null>(
    () => {
      const response = getPatientTokenAndDataFromLocalStorage();
      return response ? response.token : null;
    }
  );
  const [adminProfileToken, setAdminProfileToken] = useState<string | null>(
    () => {
      const response = getAdminTokenAndDataFromLocalStorage();
      return response ? response.token : null;
    }
  );
  const [therapistProfileToken, setTherapistProfileToken] = useState<
    string | null
  >(() => {
    const response = getTherapistTokenAndDataFromLocalStorage();
    return response ? response.token : null;
  });

  const [isRegisterPageRendered, setIsRegisterPageRendered] =
    useState<boolean>(false);
  const [isFirstFormValidated, setIsFirstFormValidated] =
    useState<boolean>(false);
  const [isSecondFormValidated, setIsSecondFormValidated] =
    useState<boolean>(false);
  const [isThirdFormValidated, setIsThirdFormValidated] =
    useState<boolean>(false);
  const [isGlobalFormSubmitted, setIsGlobalFormSubmitted] =
    useState<boolean>(false);

  // useEffect to check if the admin is authenticated
  useEffect(() => {
    checkAdminAuthentication({ setIsAdminAuthenticated, setAdminProfileToken });
    // Listen for changes in the local storage
    const handleAdminStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAdminAuthentication({
          setIsAdminAuthenticated,
          setAdminProfileToken,
        });
      }
    };

    // Add event listener for storage change
    window.addEventListener('storage', handleAdminStorageChange);

    // Check every 5 seconds if the admin is authenticated
    const intervalId = setInterval(() => {
      checkAdminAuthentication({
        setIsAdminAuthenticated,
        setAdminProfileToken,
      });
    }, 30000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleAdminStorageChange);
      clearInterval(intervalId);
    };
  }, [adminProfileToken, isAdminAuthenticated]);

  // useEffect to check if the patient is authenticated
  useEffect(() => {
    checkPatientAuthentication({
      setIsPatientAuthenticated,
      setPatientProfileToken,
    });

    // Listen for changes in localStorage
    const handlePatientStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkPatientAuthentication({
          setIsPatientAuthenticated,
          setPatientProfileToken,
        });
      }
    };

    // Add event listener for storage change
    window.addEventListener('storage', handlePatientStorageChange);

    // Check every 30 seconds if the patient is authenticated
    const intervalId = setInterval(() => {
      checkPatientAuthentication({
        setIsPatientAuthenticated,
        setPatientProfileToken,
      });
    }, 30000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handlePatientStorageChange);
      clearInterval(intervalId);
    };
  }, [patientProfileToken, isPatientAuthenticated]);

  // useEffect to check if the therapist is authenticated
  useEffect(() => {
    checkTherapistAuthentication({
      setIsTherapistAuthenticated,
      setTherapistProfileToken,
    });
    // Listen for changes in the local storage
    const handleTherapistStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkTherapistAuthentication({
          setIsTherapistAuthenticated,
          setTherapistProfileToken,
        });
      }
    };

    // Add event listener for storage change
    window.addEventListener('storage', handleTherapistStorageChange);

    // Check every 5 seconds if the therapist is authenticated
    const intervalId = setInterval(() => {
      checkTherapistAuthentication({
        setIsTherapistAuthenticated,
        setTherapistProfileToken,
      });
    }, 30000);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleTherapistStorageChange);
      clearInterval(intervalId);
    };
  }, [therapistProfileToken, isTherapistAuthenticated]);

  return (
    <GlobalContextProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.id}
              element={route.element}
              index={route.index}
            />
          ))}

          <Route path="*" element={<ErrorPage isPublicErrorPage />} />
        </Route>

        <Route
          path="/loginAdmin"
          element={
            <AdminLoginPage
              setAdminProfileToken={setAdminProfileToken}
              adminProfileToken={adminProfileToken}
            />
          }
        />

        {/* Admin routes */}
        {isAdminAuthenticated ? (
          <Route
            path="/admin"
            element={
              <Layout
                isAdminLayout
                isAdminAuthenticated={isAdminAuthenticated}
                setIsAdminAuthenticated={setIsAdminAuthenticated}
                setAdminProfileToken={setAdminProfileToken}
              />
            }
          >
            {adminRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<AdminPage entityType={route.entityType} />}
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
            <Route
              path="*"
              element={<ErrorPage isUnconnectedAdminErrorPage />}
            />
          </Route>
        )}

        {/* Patient routes */}
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

            <Route
              path="*"
              element={<ErrorPage isConnectedPatientErrorPage />}
            />
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
        )}
      </Routes>
    </GlobalContextProvider>
  );
}

export default App;

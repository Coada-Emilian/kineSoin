import { useEffect, useState } from 'react';
import axios from './axios';
import { getAdminTokenAndDataFromLocalStorage } from './localStorage/adminLocalStorage';
import { getPatientTokenAndDataFromLocalStorage } from './localStorage/patientLocalStorage';
import { getTherapistTokenAndDataFromLocalStorage } from './localStorage/therapistLocalStorage';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/pageComponents/ErrorPage/ErrorPage';
import LoginPageMain from './components/pageComponents/PublicSection/LoginPageMain';
import RegisterPageMain from './components/pageComponents/PublicSection/RegisterPageMain';
import AdminLoginPage from './components/pageComponents/AdminSection/AdminLoginPage';
import HomepageMain from './components/pageComponents/PublicSection/HomePageMain';
import AdminMain from './components/pageComponents/AdminSection/AdminMain';
import PatientMain from './components/pageComponents/patientSection/PatientMain';
import TherapistMain from './components/pageComponents/therapistSection/TherapistMain';
import {
  AdminLayout,
  PatientLayout,
  PublicLayout,
  TherapistLayout,
} from './utils/appLayouts/appLayouts';
import {
  checkAdminAuthentication,
  checkPatientAuthentication,
  checkTherapistAuthentication,
} from './utils/authentificationFunctions/appAuthentificationFunctions';

function App() {
  // Use state to keep track of the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Make sure the windowWidth state always has the current window width
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  // useEffect to listen for window resize events
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  useEffect(() => {}, []);

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

  const adminRoutes = [
    {
      path: 'therapists',
      boolean: 'isAdminTherapistsMain',
    },
    { path: 'therapists/:id', boolean: 'isAdminTherapistMain' },
    { path: 'patients', boolean: 'isAdminPatientsMain' },
    { path: 'patients/:id', boolean: 'isAdminPatientMain' },
    { path: 'afflictions', boolean: 'isAdminAfflictionsMain' },
    { path: 'afflictions/:id', boolean: 'isAdminAfflictionMain' },
    { path: 'medics', boolean: 'isAdminMedicsMain' },
    { path: 'medics/:id', boolean: 'isAdminMedicMain' },
    { path: 'insurances', boolean: 'isAdminInsurancesMain' },
    { path: 'insurances/:id', boolean: 'isAdminInsuranceMain' },
  ];

  const patientRoutes = [
    { path: 'dashboard', boolean: 'isPatientDashboardMain' },
    { path: 'new-prescription', boolean: 'isPatientPrescriptionMain' },
    { path: 'appointments', boolean: 'isPatientAppointmentsMain' },
    { path: 'messages', boolean: 'isPatientMessagesMain' },
    { path: 'my-therapist', boolean: 'isPatientTherapistPage' },
    { path: 'my-profile', boolean: 'isPatientDetailsMain' },
  ];

  const therapistRoutes = [
    { path: 'dashboard', boolean: 'isTherapistDashboardMain' },
    { path: 'patients', boolean: 'isTherapistPatientsMain' },
    { path: 'appointments', boolean: 'isTherapistAppointmentsMain' },
    { path: 'messages', boolean: 'isTherapistMessagesMain' },
    { path: 'my-profile', boolean: 'isTherapistProfileMain' },
    { path: 'prescriptions', boolean: 'isTherapistPrescriptionsMain' },
  ];

  return (
    <Routes>
      {/* Public routes */}

      <Route
        element={
          <PublicLayout
            windowWidth={windowWidth}
            setIsFirstFormValidated={setIsFirstFormValidated}
            setIsSecondFormValidated={setIsSecondFormValidated}
            setIsThirdFormValidated={setIsThirdFormValidated}
            setIsRegisterPageRendered={setIsRegisterPageRendered}
          />
        }
      >
        <Route index element={<HomepageMain />} />
        <Route
          path="loginPatient"
          element={
            <LoginPageMain
              isPatientLoginMain
              setPatientProfileToken={setPatientProfileToken}
            />
          }
        />
        <Route
          path="loginTherapist"
          element={
            <LoginPageMain
              isTherapistLoginMain
              setTherapistProfileToken={setTherapistProfileToken}
            />
          }
        />
        <Route
          path="registerPatient"
          element={
            <RegisterPageMain
              isFirstFormValidated={isFirstFormValidated}
              isSecondFormValidated={isSecondFormValidated}
              isThirdFormValidated={isThirdFormValidated}
              setIsFirstFormValidated={setIsFirstFormValidated}
              setIsSecondFormValidated={setIsSecondFormValidated}
              setIsThirdFormValidated={setIsThirdFormValidated}
              isGlobalFormSubmitted={isGlobalFormSubmitted}
              setIsGlobalFormSubmitted={setIsGlobalFormSubmitted}
            />
          }
        />
        <Route path="*" element={<ErrorPage isPublicErrorPage />} />
      </Route>

      <Route
        path="/loginAdmin"
        element={<AdminLoginPage setAdminProfileToken={setAdminProfileToken} />}
      />

      {/* Admin routes */}
      {isAdminAuthenticated ? (
        <Route
          path="/admin"
          element={
            <AdminLayout
              isAdminAuthenticated={isAdminAuthenticated}
              setIsAdminAuthenticated={setIsAdminAuthenticated}
              windowWidth={windowWidth}
            />
          }
        >
          {adminRoutes.map((route) => (
            <Route
              path={route.path}
              element={
                <AdminMain
                  windowWidth={windowWidth}
                  {...{ [route.boolean]: true }}
                />
              }
            />
          ))}
          <Route path="*" element={<ErrorPage isConnectedAdminErrorPage />} />
        </Route>
      ) : (
        <Route
          path="/admin"
          element={
            <AdminLayout
              isAdminAuthenticated={isAdminAuthenticated}
              setIsAdminAuthenticated={setIsAdminAuthenticated}
              windowWidth={windowWidth}
            />
          }
        >
          <Route path="*" element={<ErrorPage isUnconnectedAdminErrorPage />} />
        </Route>
      )}

      {/* Patient routes */}
      {isPatientAuthenticated ? (
        <Route
          path="/patient"
          element={
            <PatientLayout
              isPatientAuthenticated={isPatientAuthenticated}
              setIsPatientAuthenticated={setIsPatientAuthenticated}
              windowWidth={windowWidth}
            />
          }
        >
          {patientRoutes.map((route) => (
            <Route
              path={route.path}
              element={<PatientMain {...{ [route.boolean]: true }} />}
            />
          ))}
          <Route path="*" element={<ErrorPage isConnectedPatientErrorPage />} />
        </Route>
      ) : (
        <Route
          path="/patient"
          element={
            <PatientLayout
              isPatientAuthenticated={isPatientAuthenticated}
              setIsPatientAuthenticated={setIsPatientAuthenticated}
              windowWidth={windowWidth}
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
            <TherapistLayout
              isTherapistAuthenticated={isTherapistAuthenticated}
              setIsTherapistAuthenticated={setIsTherapistAuthenticated}
              windowWidth={windowWidth}
            />
          }
        >
          {therapistRoutes.map((route) => (
            <Route
              path={route.path}
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
            <TherapistLayout
              isTherapistAuthenticated={isTherapistAuthenticated}
              setIsTherapistAuthenticated={setIsTherapistAuthenticated}
              windowWidth={windowWidth}
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
  );
}

export default App;

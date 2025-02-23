import NavBar from '../../../../components/standaloneComponents/generalComponents/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../../components/standaloneComponents/generalComponents/Footer/Footer';
import MobileNav from '../../../../components/standaloneComponents/generalComponents/MobileNav/MobileNav';

interface LayoutProps {
  windowWidth: number;
  setIsFirstFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterPageRendered?: React.Dispatch<React.SetStateAction<boolean>>;

  isAdminAuthenticated?: boolean;
  setIsAdminAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;

  isPatientAuthenticated?: boolean;
  setIsPatientAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;

  isTherapistAuthenticated?: boolean;
  setIsTherapistAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PublicLayout({
  windowWidth,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  setIsRegisterPageRendered,
}: LayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar
        windowWidth={windowWidth}
        isPublicNavBar
        setIsFirstFormValidated={setIsFirstFormValidated}
        setIsSecondFormValidated={setIsSecondFormValidated}
        setIsThirdFormValidated={setIsThirdFormValidated}
        setIsRegisterPageRendered={setIsRegisterPageRendered}
      />
      <Outlet />
      <Footer />

      {windowWidth < 768 && <MobileNav isPublicMobileNav />}
    </div>
  );
}

export function AdminLayout({
  isAdminAuthenticated,
  setIsAdminAuthenticated,
  windowWidth,
}: LayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar
        windowWidth={windowWidth}
        isAdminAuthenticated={isAdminAuthenticated}
        setIsAdminAuthenticated={setIsAdminAuthenticated}
        isAdminNavBar
      />
      <Outlet />
      <Footer isAdminFooter />

      {windowWidth < 768 && <MobileNav isAdminMobileNav />}
    </div>
  );
}

export function PatientLayout({
  setIsPatientAuthenticated,
  isPatientAuthenticated,
  windowWidth,
}: LayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar
        windowWidth={windowWidth}
        setIsPatientAuthenticated={setIsPatientAuthenticated}
        isPatientAuthenticated={isPatientAuthenticated}
        isPatientNavBar
      />
      <Outlet />
      <Footer />

      {windowWidth < 768 && <MobileNav isPatientMobileNav />}
    </div>
  );
}

export function TherapistLayout({
  setIsTherapistAuthenticated,
  isTherapistAuthenticated,
  windowWidth,
}: LayoutProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar
        windowWidth={windowWidth}
        setIsTherapistAuthenticated={setIsTherapistAuthenticated}
        isTherapistAuthenticated={isTherapistAuthenticated}
        isTherapistNavBar
      />
      <Outlet />
      <Footer />

      {windowWidth < 768 && <MobileNav isTherapistMobileNav />}
    </div>
  );
}

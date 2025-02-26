import NavBar from '../../../components/standaloneComponents/generalComponents/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/standaloneComponents/generalComponents/Footer/Footer';
import MobileNav from '../../../components/standaloneComponents/generalComponents/MobileNav/MobileNav';

interface LayoutProps {
  isPublicLayout?: boolean;
  isAdminLayout?: boolean;
  isPatientLayout?: boolean;
  isTherapistLayout?: boolean;

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

export function Layout({
  isPublicLayout,
  isAdminLayout,
  isPatientLayout,
  isTherapistLayout,

  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  setIsRegisterPageRendered,

  isAdminAuthenticated,
  setIsAdminAuthenticated,

  setIsPatientAuthenticated,
  isPatientAuthenticated,

  setIsTherapistAuthenticated,
  isTherapistAuthenticated,
}: LayoutProps) {
  const navBarProps = {
    ...(isPublicLayout && {
      isPublicNavBar: true,
      setIsFirstFormValidated,
      setIsSecondFormValidated,
      setIsThirdFormValidated,
      setIsRegisterPageRendered,
    }),
    ...(isAdminLayout && {
      isAdminNavBar: true,
      isAdminAuthenticated,
      setIsAdminAuthenticated,
    }),
    ...(isPatientLayout && {
      isPatientNavBar: true,
      isPatientAuthenticated,
      setIsPatientAuthenticated,
    }),
    ...(isTherapistLayout && {
      isTherapistNavBar: true,
      isTherapistAuthenticated,
      setIsTherapistAuthenticated,
    }),
  };

  const footerProps = {
    ...(isAdminLayout && { isAdminFooter: true }),
  };

  const mobileNavProps = {
    ...(isPublicLayout && { isPublicMobileNav: true }),
    ...(isAdminLayout && { isAdminMobileNav: true }),
    ...(isPatientLayout && { isPatientMobileNav: true }),
    ...(isTherapistLayout && { isTherapistMobileNav: true }),
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar {...navBarProps} />

      <Outlet />

      <Footer {...footerProps} />
      
      <MobileNav {...mobileNavProps} />
    </div>
  );
}

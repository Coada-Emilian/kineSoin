/**
 * @component PublicLayout
 *
 * This component is responsible for rendering the public layout of the website. It wraps the main content with a consistent header, footer, and mobile navigation. It uses the `PatientRegisterContextProvider` to manage the context related to patient registration across the layout.
 *
 * The layout consists of:
 * - A `PublicNavBar` component, which renders the top navigation bar for the public-facing pages.
 * - A `main` section that contains the dynamic content rendered via `Outlet`.
 * - A `Footer` component that provides footer information and links.
 * - A `PublicMobileNav` component for mobile navigation.
 *
 * @returns {JSX.Element} The entire public layout with navigation, main content area, and footer.
 *
 * @example
 * <PublicLayout />
 *
 * @see {@link https://reactrouter.com/web/api/Outlet} for more information about the `Outlet` component.
 */

import { Outlet } from 'react-router-dom';
import Footer from '../../../components/standaloneComponents/generalComponents/Footer/Footer';
import PublicNavBar from '../../../components/standaloneComponents/generalComponents/NavBar/PublicNavBar';
import { PatientRegisterContextProvider } from '../../contexts/PatientRegisterContext';
import PublicMobileNav from '../../../components/standaloneComponents/generalComponents/MobileNav/PublicMobileNav';

export function PublicLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <PatientRegisterContextProvider>
        <PublicNavBar />

        <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
          <div className="flex flex-col w-full h-full">
            <Outlet />
          </div>
        </main>

        <Footer />

        <PublicMobileNav />
      </PatientRegisterContextProvider>
    </div>
  );
}

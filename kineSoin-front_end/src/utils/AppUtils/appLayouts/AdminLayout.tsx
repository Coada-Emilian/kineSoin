/**
 * @component AdminLayout
 *
 * This component serves as the layout for the admin pages. It includes:
 * - The Admin navigation bar (`AdminNavBar`) at the top.
 * - A dynamic content area, rendered via the `Outlet` component, which allows for rendering different child routes based on the current path.
 * - The Admin footer (`AdminFooter`) displayed at the bottom.
 * - A mobile-friendly navigation bar (`AdminMobileNav`) for smaller screens.
 *
 * This layout is designed to ensure consistency across the admin pages, providing a unified structure for the application.
 *
 * @returns {JSX.Element} The layout structure for the admin pages, including navigation, content, and footer.
 *
 * @example
 * <AdminLayout />
 */

import { Outlet } from 'react-router-dom';
import AdminNavBar from '../../../components/standaloneComponents/generalComponents/NavBar/AdminNavBar';
import AdminFooter from '../../../components/standaloneComponents/generalComponents/Footer/AdminFooter';
import AdminMobileNav from '../../../components/standaloneComponents/generalComponents/MobileNav/AdminMobileNav';

export function AdminLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <AdminNavBar />

      <Outlet />

      <AdminFooter />

      <AdminMobileNav />
    </div>
  );
}

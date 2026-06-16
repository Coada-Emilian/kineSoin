/**
 * AdminLayout.tsx
 *
 * This layout component wraps all admin-related routes.
 * It provides consistent structure and navigation across the admin section.
 *
 * Structure:
 * - Top navigation bar (`AdminNavBar`)
 * - Dynamic content via React Router's `Outlet`
 * - Footer (`AdminFooter`)
 * - Mobile bottom navigation (`AdminMobileNav`)
 *
 * Styling:
 * - Uses a flex column layout with `min-h-screen` to ensure full viewport height
 * - `justify-between` ensures footer stays at the bottom when content is short
 */

import { Outlet } from 'react-router-dom';
import AdminFooter from '../../../components/standaloneComponents/generalComponents/layoutComponents/footer/AdminFooter';
import AdminMobileNav from '../../../components/standaloneComponents/generalComponents/layoutComponents/mobileNav/newComponents/AdminMobileNav';
import AdminNavBar from '../../../components/standaloneComponents/generalComponents/layoutComponents/navBar/newComponents/AdminNavBar';

export function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <AdminNavBar />

      <Outlet />

      <AdminFooter />

      <AdminMobileNav />
    </div>
  );
}

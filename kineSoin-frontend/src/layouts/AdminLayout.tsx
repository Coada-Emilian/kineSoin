import { Outlet } from 'react-router-dom';
import AdminFooter from '../components/layouts/footers/AdminFooter';
import AdminMobileNav from '../components/layouts/mobileNavbars/AdminMobileNavbar';
import AdminNavBar from '../components/layouts/navbars/AdminNavbar';
import AdminSideNavbar from '../components/pages/admin/AdminSideNavbar';
import { AdminContextProvider } from '../contexts/admin/AdminContext';

export function AdminLayout() {
  return (
    <div className="flex flex-col h-screen w-full">
      <AdminNavBar />

      <main className="flex-1 flex items-center justify-center w-full bg-slate-100">
        <div className="flex w-full h-full p-4">
          <div className="hidden md:block h-screen w-1/4">
            <AdminSideNavbar />
          </div>

          <AdminContextProvider>
            <Outlet />
          </AdminContextProvider>
        </div>
      </main>

      <AdminFooter />

      <AdminMobileNav />
    </div>
  );
}

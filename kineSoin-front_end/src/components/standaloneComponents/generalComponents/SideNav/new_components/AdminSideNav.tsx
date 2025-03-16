/**
 * @component AdminSideNav
 *
 * A component that renders the side navigation for the admin section. It uses the `renderSideNavLinks` function
 * to generate the appropriate links for the admin user.
 *
 * @returns JSX.Element - The side navigation bar with links for admin users.
 *
 * @example
 * <AdminSideNav />
 *
 * @remarks
 * - The `renderSideNavLinks` function is used to dynamically render the side navigation links based on the user's role.
 */

import { renderSideNavLinks } from '../../../../../utils/componentUtils/commonComponents/functions/SideNav/renderSideNavLinks';

export default function AdminSideNav() {
  return <div className="mx-4 ">{renderSideNavLinks('admin')}</div>;
}

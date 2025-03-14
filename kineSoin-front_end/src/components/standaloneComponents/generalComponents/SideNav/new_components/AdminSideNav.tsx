/**
 * AdminSideNav Component
 *
 * This component is responsible for rendering the sidebar navigation for the admin section of the application.
 * It fetches the side navigation links from a utility function `renderSideNavLinks` based on the provided role
 * (in this case, 'admin'). The sidebar links provide navigation options for the admin to access various sections of
 * the admin interface, such as managing therapists, patients, and other entities.
 *
 * **Main Features:**
 * - Renders the admin sidebar with the appropriate navigation links.
 * - Uses a utility function `renderSideNavLinks` to generate the list of links dynamically.
 * - The utility function determines which links are relevant based on the role provided (in this case, 'admin').
 *
 * **Usage Example:**
 * ```tsx
 * <AdminSideNav />
 * ```
 * This will render the sidebar with admin-specific links.
 *
 * @component
 */

import { renderSideNavLinks } from '../../../../../utils/componentUtils/commonComponents/functions/SideNav/renderSideNavLinks';

export default function AdminSideNav() {
  return <div className="mx-4 ">{renderSideNavLinks('admin')}</div>;
}

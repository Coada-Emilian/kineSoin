import { renderSideNavLinks } from '../../../../../utils/componentUtils/commonComponents/functions/SideNav/renderSideNavLinks';

export default function AdminSideNav() {
  return <div className="mx-4 ">{renderSideNavLinks('admin')}</div>;
}

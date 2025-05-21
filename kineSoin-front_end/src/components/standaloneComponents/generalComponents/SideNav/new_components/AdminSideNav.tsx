import { renderSideNavLinks } from '../../../../../utils/functions/component_utils/common_components/sideNav/renderSideNavLinks';

export default function AdminSideNav() {
  return <div className="mx-4 ">{renderSideNavLinks('admin')}</div>;
}

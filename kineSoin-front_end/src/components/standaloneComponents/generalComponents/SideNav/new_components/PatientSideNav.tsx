import { renderSideNavLinks } from '../../../../../utils/componentUtils/commonComponents/functions/SideNav/renderSideNavLinks';

export default function PatientSideNav() {
  return <div className="mx-4 ">{renderSideNavLinks('patient')}</div>;
}

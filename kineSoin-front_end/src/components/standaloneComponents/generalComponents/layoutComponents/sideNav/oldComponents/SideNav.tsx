import { renderSideNavLinks } from '../../../../../../utils/functions/component_utils/common_components/sideNav/renderSideNavLinks';

interface SideNavProps {
  isAdminSideNav?: boolean;
  isPatientSideNav?: boolean;
  isTherapistSideNav?: boolean;
}

export default function SideNav({
  isAdminSideNav,
  isPatientSideNav,
  isTherapistSideNav,
}: SideNavProps) {
  return (
    <div className="mx-4 ">
      {isAdminSideNav && renderSideNavLinks('admin')}

      {isPatientSideNav && renderSideNavLinks('patient')}

      {isTherapistSideNav && renderSideNavLinks('therapist')}
    </div>
  );
}

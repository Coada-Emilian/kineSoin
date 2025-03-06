import { renderSideNavLinks } from '../../../../utils/componentUtils/commonComponents/functions/SideNav/renderSideNavLinks';

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

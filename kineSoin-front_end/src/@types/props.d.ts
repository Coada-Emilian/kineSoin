export interface AdminMainProps {
  windowWidth: number;
  isAdminTherapistsMain?: boolean;
  isAdminTherapistMain?: boolean;
  isAdminPatientsMain?: boolean;
  isAdminPatientMain?: boolean;
  isAdminAfflictionsMain?: boolean;
  isAdminAfflictionMain?: boolean;
  isAdminMedicsMain?: boolean;
  isAdminMedicMain?: boolean;
  isAdminInsurancesMain?: boolean;
  isAdminInsuranceMain?: boolean;
}

interface SideNavProps {
  isAdminSideNav?: boolean;
  isPatientSideNav?: boolean;
}

interface AdminTableProps {
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  windowWidth?: number;
  allTherapists?: ITherapist[];
  allBodyRegions?: IBodyRegion[];
}

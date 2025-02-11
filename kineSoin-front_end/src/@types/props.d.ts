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

export interface SideNavProps {
  isAdminSideNav?: boolean;
  isPatientSideNav?: boolean;
}

export interface AdminTableProps {
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  allMedics?: IMedic[];
  allInsurances?: IInsurance[];
  windowWidth?: number;
  allTherapists?: ITherapist[];
  allBodyRegions?: IBodyRegion[];
}

export interface AdminProfileDetailsProps {
  therapist?: ITherapist;
  patient?: IPatient;
  affliction?: IAffliction;
  medic?: IMedic;
  insurance?: IInsurance;
}

export interface StatusButtonsProps {
  isTherapistStatusButtons?: boolean;
  setTherapistStatus?: React.Dispatch<React.SetStateAction<string>>;
  isPatientStatusButtons?: boolean;
  setPatientStatus?: React.Dispatch<React.SetStateAction<string>>;
  isAfflictionStatusButtons?: boolean;
  setAfflictionStatus?: React.Dispatch<React.SetStateAction<string>>;
}

export interface CustomButtonProps {
  btnText?: string | JSX.Element;
  normalButton?: boolean;
  cancelButton?: boolean;
  validateButton?: boolean;
  modifyButton?: boolean;
  deleteButton?: boolean;
  activeButton?: boolean;
  addButton?: boolean;
  allButton?: boolean;
  inactiveButton?: boolean;
  pendingButton?: boolean;
  bannedButton?: boolean;
  navBarButton?: boolean;
  patientNotificationButton?: boolean;
  patientLogoutButton?: boolean;
  adminLogoutButton?: boolean;
  onClick?: () => void;
  btnType?: 'button' | 'submit' | 'reset';
  patientNotificationQuantity?: number;
  setPatientNotificationQuantity?: React.Dispatch<React.SetStateAction<number>>;
  mobileButton?: boolean;
  mobileDeleteButton?: boolean;
  mobileCancelButton?: boolean;
}

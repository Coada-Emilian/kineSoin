export interface AdminPageProps {
  entityType: IAdminEntityTypes;
}

export interface AdminTableProps {
  entities: IAdminEntities;
  entityType: IAdminEntityTypes;
}

export interface AdminTableTitleProps {
  tableTitle: string;
  entityStatus: string;
}

export interface AdminTableHeadProps {
  secondHeaderContent: string;
  thirdHeaderContent: string;
  fourthHeaderContent?: string;
}

export interface AdminTableBodyProps {
  renderedEntities:
    | ITherapist[]
    | IPatient[]
    | IAffliction[]
    | IMedic[]
    | IInsurance[];
  entityType?: string;
}

export interface AdminTableStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface AdminTherapistTableBodyProps {
  renderedTherapists: ITherapist[];
}

export interface AdminPatientTableBodyProps {
  renderedPatients: IPatient[];
}

export interface AdminAfflictionTableBodyProps {
  renderedAfflictions: IAffliction[];
}

export interface AdminMedicTableBodyProps {
  renderedMedics: IMedic[];
}

export interface AdminInsuranceTableBodyProps {
  renderedInsurances: IInsurance[];
}

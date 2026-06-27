import type {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../interfaces/modelInterfaces';
import type { IAdminEntities, IAdminEntityTypes } from '../types/adminTypes';

export interface AdminPageProps {
  entityType: IAdminEntityTypes;
}

export interface AdminTableProps extends AdminPageProps {
  entities: IAdminEntities;
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
  entityType?: IAdminEntityTypes;
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

export interface BaseAdminEntityProfileProps {
  entityType: IAdminEntityTypes;
}

export interface AdminEntityProfileProps extends BaseAdminEntityProfileProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
}

export interface AdminEntityProfileImageProps extends BaseAdminEntityProfileProps {
  picture_url: string | undefined;
}

export interface AdminEntityProfileOutputProps {
  label: string;
  value: string | number | undefined;
  isTextArea?: boolean;
  isOneThirdWidth?: boolean;
}

export interface AdminEntityStatusProps {
  status: string | undefined;
}

export interface AdminEntityIdProps {
  id: number | null;
}

export interface AdminEntityNameProps {
  name: string | undefined;
  surname: string | undefined;
}


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

export interface AdminEntityStatusOutputProps {
  status: string | undefined;
}

export interface AdminEntityIdOutputProps {
  id?: number | null;
}

export interface AdminEntityNameOutputProps {
  name: string | undefined;
  surname: string | undefined;
}

export interface AdminEntityAgeAndGenderOutputProps {
  age: string | undefined;
  gender: string | undefined;
}

export interface AdminEntityEmailOutputProps {
  email: string | undefined;
}

export interface AdminEntityTelephoneNumberOutputProps {
  prefix: string | undefined;
  phone_number: string | undefined;
}

export interface AdminEntityAddressOutputProps {
  city: string | undefined;
  postal_code: string | undefined;
  street_number: string | undefined;
  street_name: string | undefined;
}

export interface AdminEntityCodeOutputProps {
  amc_code?: string | undefined;
  insurance_code?: string | undefined;
  licence_code?: string | undefined;
}

export interface AdminEntityBodyRegionAndOperatedStatusOutputProps {
  body_region: IBodyRegion;
  is_operated: string | undefined;
}

export interface AdminEntityStudiesOutputProps {
  diploma?: string | undefined;
  experience?: string | undefined;
  specialty?: string | undefined;
}

export interface AdminEntityDescriptionOutputProps {
  description: string | undefined;
}

export interface AdminEntityStatusButtonsProps extends BaseAdminEntityProfileProps {
  id?: number | null | undefined;
  entityStatus: string;
  setEditedEntity: React.Dispatch<React.SetStateAction<IAdminEditedEntity>>;
}

export interface AdminUpdateMutationProps {
  id: number;
  formData: FormData;
}

export interface AdminEntityProfileInfoOutputProps {
  icon: string;
  iconAlt: string;
  label: string;
  value: string;
}

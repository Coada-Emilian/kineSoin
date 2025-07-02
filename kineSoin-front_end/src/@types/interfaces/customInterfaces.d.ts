import { ITherapist } from './modelInterfaces';

export interface ICountry {
  flag_url?: string;
  prefix: string;
  name: string;
}

export interface IHomePageArticle {
  imgSrc: string;
  title: string;
  description: string;
}

export interface ISameDayAppointment {
  id: number;
  time: string;
  patientFullName: string;
  afflictionName: string;
  isTimePassed?: boolean;
  patient: {
    id: number;
    name: string;
    surname: string;
    picture_url: string;
  };
  prescription: {
    id: number;
    affliction: {
      id: number;
      name: string;
    };
  };
}

export interface ITherapistPatient {
  id: number;
  fullName: string;
  status: string;
  picture_url: string;
}

export interface ITherapistPatientDetails {
  id: number;
  therapist_id: number;
  name: string;
  surname: string;
  age: number;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  prefix: string;
  phone_number: string;
  status: string;
  picture_url: string;
  email: string;
  insurance_details: IPatientInsuranceExtended;
  // patient_insurance: {
  //   id: number;
  //   patient_id: number;
  //   insurance_id: number;
  //   adherent_code: string;
  //   contract_number: string;
  //   start_date: string;
  //   end_date: string;
  // };

  therapist: ITherapist;
}

export interface IUserProfile {
  fullName: string | null;
  picture_url: string | null;
  id: number;
  token?: string | null;
  status?: string | undefined;
  therapist?: ITherapist | null;
}

export interface ICommonEntityDetails {
  id?: number | undefined;
  name?: string | undefined;
  surname?: string | undefined;
  fullName?: string | undefined;
  status?: string | undefined;
}

export interface IParticularEntityDetails {
  email?: string | undefined;
  licence_code?: string;
  amc_code?: string;
  insurance_code?: string;
  diploma?: string;
  experience?: string;
  specialty?: string;
  phone_number?: string;
  prefix?: string;
  full_phone_number?: string;
  description?: string;
  age?: number;
  city?: string;
  postal_code?: string;
  street_name?: string;
  street_number?: string;
  body_region?: IBodyRegion;
  is_operated?: boolean;
  birth_date?: string;
  gender?: string;
  picture_url?: string;
}

export interface IChosenEntityDetails {
  picture_url?: string;
}

export interface IEntityStates {
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
  allTherapists: ITherapist[];
  setAllTherapists: React.Dispatch<React.SetStateAction<ITherapist[]>>;
  therapist: ITherapist | null;
  setTherapist: React.Dispatch<React.SetStateAction<ITherapist | null>>;
  therapistId: number | null;
  setTherapistId: React.Dispatch<React.SetStateAction<number | null>>;
  allPatients: IPatient[];
  setAllPatients: React.Dispatch<React.SetStateAction<IPatient[]>>;
  patient: IPatient | null;
  setPatient: React.Dispatch<React.SetStateAction<IPatient | null>>;
  patientId: number | null;
  setPatientId: React.Dispatch<React.SetStateAction<number | null>>;
  allAfflictions: IAffliction[];
  setAllAfflictions: React.Dispatch<React.SetStateAction<IAffliction[]>>;
  affliction: IAffliction | null;
  setAffliction: React.Dispatch<React.SetStateAction<IAffliction | null>>;
  afflictionId: number | null;
  setAfflictionId: React.Dispatch<React.SetStateAction<number | null>>;
  allMedics: IMedic[];
  setAllMedics: React.Dispatch<React.SetStateAction<IMedic[]>>;
  medic: IMedic | null;
  setMedic: React.Dispatch<React.SetStateAction<IMedic | null>>;
  medicId: number | null;
  setMedicId: React.Dispatch<React.SetStateAction<number | null>>;
  allInsurances: IInsurance[];
  setAllInsurances: React.Dispatch<React.SetStateAction<IInsurance[]>>;
  insurance: IInsurance | null;
  setInsurance: React.Dispatch<React.SetStateAction<IInsurance | null>>;
  insuranceId: number | null;
  setInsuranceId: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface IAddForm {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeated_password: string;
  description: string;
  diploma: string;
  experience: string;
  specialty: string;
  licence_code: string;
  status: string;
  photo: File | unknown;
  prefix: string;
  phone_number: string;
  full_phone_number: string;
}

export interface IButtonDetails {
  type: IButtonTypes;
  text: string | JSX.Element;
  style: IButtonStyles;
  icon?: IButtonIcon;
  hasBorder?: boolean;
  onClick?: () => void;
}

export interface IErrorPageFunctionProps {
  type:
    | 'public'
    | 'connectedAdmin'
    | 'unconnectedAdmin'
    | 'connectedPatient'
    | 'unconnectedPatient'
    | 'connectedTherapist'
    | 'unconnectedTherapist';
}

export interface ITableBodyRefactorProps {
  renderedEntities:
    | ITherapist[]
    | IPatient[]
    | IAffliction[]
    | IMedic[]
    | IInsurance[];
  entityType: string;
}

interface IEntityFieldSetter {
  stateName: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface IAdminProfileDetailsGlobalContextProps {
  isProfileEditing: boolean;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditPhotoModalOpen: boolean;
  setIsEditPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  updateEntityForm: FormData | null;
  setUpdateEntityForm: React.Dispatch<React.SetStateAction<FormData | null>>;
  entityStatus: string;
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;
  entityName: string;
  setEntityName: React.Dispatch<React.SetStateAction<string>>;
  entitySurname: string;
  setEntitySurname: React.Dispatch<React.SetStateAction<string>>;
  entityEmail: string;
  setEntityEmail: React.Dispatch<React.SetStateAction<string>>;
  entityPrefix: string;
  setEntityPrefix: React.Dispatch<React.SetStateAction<string>>;
  entityPhoneNumber: string;
  setEntityPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  entityLicenceCode: string;
  setEntityLicenceCode: React.Dispatch<React.SetStateAction<string>>;
  entityDiploma: string;
  setEntityDiploma: React.Dispatch<React.SetStateAction<string>>;
  entityAMCCode: string;
  setEntityAMCCode: React.Dispatch<React.SetStateAction<string>>;
  entitySpecialty: string;
  setEntitySpecialty: React.Dispatch<React.SetStateAction<string>>;
  entityExperience: string;
  setEntityExperience: React.Dispatch<React.SetStateAction<string>>;
  entityDescription: string;
  setEntityDescription: React.Dispatch<React.SetStateAction<string>>;
  entityStreetNumber: string;
  setEntityStreetNumber: React.Dispatch<React.SetStateAction<string>>;
  entityStreetName: string;
  setEntityStreetName: React.Dispatch<React.SetStateAction<string>>;
  entityCity: string;
  setEntityCity: React.Dispatch<React.SetStateAction<string>>;
  entityPostalCode: string;
  setEntityPostalCode: React.Dispatch<React.SetStateAction<string>>;
  entityId: number | null;
  setEntityId: React.Dispatch<React.SetStateAction<number | null>>;
  entityPictureUrl: string;
  setEntityPictureUrl: React.Dispatch<React.SetStateAction<string>>;
  entityAge: string;
  setEntityAge: React.Dispatch<React.SetStateAction<string>>;
  entityGender: string;
  setEntityGender: React.Dispatch<React.SetStateAction<string>>;
  entityInsuranceCode: string;
  setEntityInsuranceCode: React.Dispatch<React.SetStateAction<string>>;
  entityOperatedStatus: string;
  setEntityOperatedStatus: React.Dispatch<React.SetStateAction<string>>;
  entityBodyRegion: IBodyRegion | null;
  setEntityBodyRegion: React.Dispatch<React.SetStateAction<IBodyRegion | null>>;
  setEntityStates: (
    entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null
  ) => void;
  inputChangeHandlers: IEntityFieldSetter[];
  bodyRegions: IBodyRegion[];
  previewUrl: string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface IProfileDetailsOutputsProps {
  states: {
    entityAge?: string;
    entityGender?: string;
    entityEmail?: string;
    entityPhoneNumber?: string;
    entityPrefix?: string;
    entityStreetName?: string;
    entityStreetNumber?: string;
    entityPostalCode?: string;
    entityCity?: string;
    entityAMCCode?: string;
    entityInsuranceCode?: string;
    entityLicenceCode?: string;
    entityOperatedStatus?: string;
    entityBodyRegion?: IBodyRegion | null;
    entityDiploma?: string;
    entitySpecialty?: string;
    entityExperience?: string;
    entityDescription?: string;
  };
}

export interface IDescriptionArticle {
  formOrder: IFormOrders;
  image: string;
  alt: string;
  paragraph: string;
  title: string;
}

export interface IRegisterFormUtilsProps {
  setError: (message: string | null) => void;
  setFormOrder?: React.Dispatch<React.SetStateAction<IFormOrders>>;
  formOrder?: IFormOrders;
  setSentPatientData?: React.Dispatch<
    React.SetStateAction<Record<string, string | Blob>>
  >;
  patientImage?: Blob | null;
  sentPatientData?: Record<string, string | Blob>;
}

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

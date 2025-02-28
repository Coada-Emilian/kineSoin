export interface INewAddress {
  full_address?: string;
  street_number?: string;
  street_name?: string;
  postal_code?: string;
  city?: string;
}

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

export interface IFullPatient {
  id: number;
  therapist_id: number;
  name: string;
  surname: string;
  age: number;
  gender: string;
  birth_date: string;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  prefix: string;
  phone_number: string;
  full_phone_number: string;
  status: string;
  picture_url: string;
  email: string;
  insurance: IInsurance[];
  prescription: {
    id: number;
    appointment_quantity: number;
    is_new_prescription: boolean;
    is_completed: boolean;
    at_home_care: boolean;
    date: string;
    picture_url: string;
  };
  medic: {
    id: number;
    name: string;
    surname: string;
    street_number: string;
    street_name: string;
    postal_code: string;
    city: string;
    prefix: string;
    phone_number: string;
    licence_code: string;
  };
  affliction: {
    id: number;
    name: string;
    description: string;
    insurance_code: string;
    is_operated: boolean;
  };
  appointments: {
    is: number;
    date: string;
    time: string;
  }[];
  therapist: ITherapist;
}

export interface IUserProfile {
  fullName: string | null;
  picture_url: string | null;
  id: number | null;
  token: string | null;
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

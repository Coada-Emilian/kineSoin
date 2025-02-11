export interface ITherapist {
  id: number;
  admin_id: number;
  name: string;
  surname: string;
  fullName?: string;
  description: string;
  diploma: string;
  experience: string;
  specialty: string;
  prefix: string;
  phone_number: string;
  full_phone_number: string;
  email: string;
  password: string;
  picture_url: string;
  picture_id: string;
  licence_code: string;
  status: string;
}

export interface IPrescription {
  id: number;
  medic_id: number;
  patient_id: number;
  affliction_id: number;
  appointment_quantity: number;
  is_completed: boolean;
  at_home_care: boolean;
  date: string;
  picture_url: string;
}

export interface IPatientMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  date: string;
  time: string;
  sender: IPatient;
  receiver: ITherapist;
}

export interface IPatient {
  id: number;
  therapist_id: number;
  name: string;
  birth_name: string;
  surname: string;
  fullName?: string;
  gender: string;
  birth_date: string;
  age?: number;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  prefix: string;
  phone_number: string;
  full_phone_number: string;
  email: string;
  password: string;
  therapist?: string;
  status: string;
  picture_url: string;
  picture_id: string;
  insurance?: IInsurance[];
}

export interface IPatient_Insurance {
  insurance_id: number;
  adherent_code: string;
  contract_number: string;
  end_date: string;
  start_date: string;
}

export interface INewAddress {
  full_address?: string;
  street_number?: string;
  street_name?: string;
  postal_code?: string;
  city?: string;
}

export interface IMedic {
  id: number;
  admin_id: number;
  name: string;
  surname: string;
  fullName?: string;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  prefix: string;
  phone_number: string;
  full_phone_number: string;
  licence_code: string;
}

export interface IInsurance {
  id: number;
  admin_id: number;
  name: string;
  amc_code: string;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  address?: string;
  prefix: string;
  phone_number: string;
  full_phone_number: string;
  Patient_Insurance?: IPatient_Insurance;
}

export interface ICountry {
  flag_url?: string;
  prefix: string;
  name: string;
}

export interface IBodyRegion {
  id: number;
  admin_id: number;
  name: string;
}

export interface IAppointment {
  id: number;
  therapist_id: number;
  patient_id: number;
  prescription_id: number;
  is_canceled: boolean;
  is_accepted: boolean;
  date: string;
  time: string;
  therapist?: ITherapist;
  prescription?: IPrescription;
}

export interface IAppointment {
  id: number;
  therapist_id: number;
  patient_id: number;
  prescription_id: number;
  is_canceled: boolean;
  is_accepted: boolean;
  date: string;
  time: string;
  therapist?: ITherapist;
  prescription?: IPrescription;
}

export interface IAffliction {
  id: number;
  admin_id: number;
  body_region_id: number;
  name: string;
  description: string;
  insurance_code: string;
  is_operated: boolean;
  body_region?: IBodyRegion;
}

export interface HomePageArticle {
  imgSrc: string;
  title: string;
  description: string;
}

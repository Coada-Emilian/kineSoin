// Patients

export interface IPatientSummary {
  id: number;
  name: string;
  surname: string;
  picture_url: string;
}

export interface IPatientContact extends IPatientSummary {
  email: string;
  prefix: string;
  phone_number: string;
}

export interface IPatientDetailsDto extends IPatientContact {
  therapist_id: number;
  age: number;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  status: string;
  gender: string;
  createdAt: Date;

  insurance_details: IPatientInsuranceDetails;
  therapist: ITherapistSummary;
}

export interface IPatientHistoryDto extends IPatientSummary {
  prescriptions: IPrescriptionHistory[];
}

export interface IPatientsTableRowDataDto extends IPatientContact {
  status: string;
  therapist: ITherapistWithPicture | null;
  lastAppointmentAt: string | null;
  createdAt: string | null;
  fullName: string;
  fullPhoneNumber: string;
}

// Therapists

export interface ITherapistSummary {
  id: number;
  name: string;
  surname: string;
  fullName: string;
}

export interface ITherapistWithPicture extends ITherapistSummary {
  picture_url: string;
}

// Insurances

export interface IInsuranceSummary {
  id: number;
  name: string;
}

export interface IPatientInsuranceDetails {
  id: number;
  adherent_code: string;
  contract_number: string;
  start_date: string;
  end_date: Date | null;

  insurance: IInsuranceSummary;
}

// Medics

export interface IMedicSummary {
  id: number;
  name: string;
  surname: string;
}

export interface IMedicWithEmail extends IMedicSummary {
  email: string;
}

// Afflictions
export interface IAfflictionSummary {
  id: number;
  name: string;
}

export interface IAfflictionDetails extends IAfflictionSummary {
  description: string;
  insurance_code: string;
  body_region?: IBodyRegionSummary;
}

export interface IAfflictionHistory {
  name: string;
  description: string;
}

// Prescriptions

export interface IPrescriptionSummary {
  id: number;
  appointment_quantity: number;
  completed_appointment_quantity: number;
  at_home_care: boolean;
  date: string | undefined;
  picture_url: string;
  prescription_number: string;
}

export interface IPrescriptionHistory extends IPrescriptionSummary {
  updated_at: string;

  affliction: IAfflictionHistory;
  medic: IMedicWithEmail;

  appointments: IAppointmentHistory[];
}

// Dashboard
export interface IDashboardAppointment {
  id: number;
  date: string;
  time: string;

  patient: IPatientContact;
  prescription: IDashboardPrescription;

  lastAppointmentAt?: string | null;
  isTimePassed?: boolean;
}

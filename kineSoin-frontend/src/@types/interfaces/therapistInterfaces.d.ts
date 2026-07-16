// Patients

export interface IPatientSummary {
  id: number;
  name: string;
  surname: string;
  picture_url: string;
}

export interface IDashboardPatient extends IPatientSummary {
  email: string;
  prefix: string;
  phone_number: string;
}

export interface IAfflictionSummary {
  id: number;
  name: string;
  description: string;
  insurance_code: string;
}

export interface IBodyRegionSummary {
  id: number;
  name: string;
}

export interface IDashboardAffliction extends IAfflictionSummary {
  body_region: IBodyRegionSummary;
}

export interface IPrescriptionSummary {
  id: number;
  appointment_quantity: number;
  completed_appointment_quantity: number;
  is_completed: boolean;
  at_home_care: boolean;
  date: string | undefined;
  picture_url: string;
  prescription_number: string;
}

export interface IMedicSummary {
  id: number;
  name: string;
  surname: string;
}

export interface IMedicWithEmail extends IMedicSummary {
  email: string;
}

export interface IDashboardPrescription extends IPrescriptionSummary {
  affliction: IDashboardAffliction;
  medic: IMedicSummary;
}

export interface IDashboardAppointment {
  id: number;
  date: string;
  time: string;

  patient: IDashboardPatient;
  prescription: IDashboardPrescription;

  lastAppointmentAt?: string | null;
  isTimePassed?: boolean;
}

// -------------------------------------
export interface ITherapistSummary {
  id: number;
  name: string;
  surname: string;
}

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

export interface IPatientDetailsDto extends IDashboardPatient {
  therapist_id: number;
  age: number;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  status: string;
  gender: string;

  insurance_details: IPatientInsuranceDetails;
  therapist: ITherapistSummary;
}

// -----------------------------------------
export interface IAppointmentSummary {
  id: number;
  date: string;
  time: string;
  is_canceled: boolean;
  is_accepted: boolean;
}

export interface ITherapistWithPicture extends ITherapistSummary {
  picture_url: string;
}

export interface IAppointmentHistory extends IAppointmentSummary {
  therapist: ITherapistWithPicture;
}

export interface IPrescriptionHistory extends IPrescriptionSummary {
  affliction: IAfflictionSummary;
  medic: IMedicSummary;
  appointments: IAppointmentHistory[];
}

export interface IPatientHistoryDto extends IPatientSummary {
  prescriptions: IPrescriptionHistory[];
}

// -----------------------------------------

export interface IPatientsTableRowDataDto extends IDashboardPatient {
  status: string;
  therapist: ITherapistWithPicture | null;
  lastAppointmentAt: string | null;
  created_at: string | null;
  full_name: string;
  full_phone_number: string;
}

export interface ICalendarAppointment {
  id: number;
  date: string;
  time: string;
  patient: {
    id: number;
    name: string;
    surname: string;
    picture_url: string;
  };
  prescription: {
    affliction: {
      id: number;
      name: string;
      description: string;
    };
    appointment_quantity: number;
    at_home_care: boolean;
    id: number;
    picture_url: string;
    medic: {
      email: string;
      id: number;
      name: string;
      phone_number: string;
      prefix: string;
      surname: string;
    };
  };
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
      description: string;
      insurance_code: string;
    };
  };
}

export interface IPatientAppointmentDetails {
  id: number;
  prescription_id: number;
  patient_id: number;
  is_canceled: boolean;
  is_accepted: boolean;
  date: string; // format: "YYYY-MM-DD"
  time: string; // format: "HH:MM:SS"
  therapist: {
    id: number;
    name: string;
    surname: string;
  };
  prescription: {
    id: number;
    patient_id: number;
    appointment_quantity: number;
    completed_appointment_quantity: number;
    is_new_prescription: boolean;
    is_completed: boolean;
    at_home_care: boolean;
    date: string; // format: "YYYY-MM-DD"
    picture_url: string;
    medic: {
      id: number;
      name: string;
      surname: string;
      email: string;
      prefix: string;
      phone_number: string;
    };
    affliction: {
      id: number;
      name: string;
      description: string;
    };
  };
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
  gender: string;
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

export interface IPatientPrescription {
  id: number;
  date: string;
  appointment_quantity: number;
  completed_appointment_quantity: number;
  is_new_prescription: boolean;
  is_completed: boolean;
  at_home_care: boolean;
  picture_url: string;
}

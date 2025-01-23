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

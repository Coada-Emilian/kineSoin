import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IPatientAppointmentDetails } from '../../../../../@types/interfaces/customInterfaces';
import { fetchPatientAppointmentsAsTherapist } from '../../../../apiUtils/therapistApiUtils/appointmentApiUtils/fetchPatientAppointmentsAsTherapist';

interface QueryProps {
  patient_id: number;
  setPreviousPatientAppointments: React.Dispatch<
    React.SetStateAction<IPatientAppointmentDetails[]>
  >;
  setUpcomingPatientAppointments: React.Dispatch<
    React.SetStateAction<IPatientAppointmentDetails[]>
  >;
}

export const useFetchPatientAppointmentsByTherapist = ({
  patient_id,
  setPreviousPatientAppointments,
  setUpcomingPatientAppointments,
}: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchPatientAppointmentsByTherapist', patient_id],

    queryFn: () => fetchPatientAppointmentsAsTherapist(patient_id),
    select: (data) => ({
      previousAppointments: data.previousAppointments.map(
        (appointment: IPatientAppointmentDetails) => ({
          id: appointment.id,
          prescription_id: appointment.prescription_id,
          patient_id: appointment.patient_id,
          is_canceled: appointment.is_canceled,
          is_accepted: appointment.is_accepted,
          date: appointment.date,
          time: appointment.time,
          therapist: {
            id: appointment.therapist.id,
            name: appointment.therapist.name,
            surname: appointment.therapist.surname,
          },
          prescription: {
            id: appointment.prescription.id,
            patient_id: appointment.prescription.patient_id,
            appointment_quantity: appointment.prescription.appointment_quantity,
            completed_appointment_quantity:
              appointment.prescription.completed_appointment_quantity,
            is_new_prescription: appointment.prescription.is_new_prescription,
            is_completed: appointment.prescription.is_completed,
            at_home_care: appointment.prescription.at_home_care,
            date: appointment.prescription.date,
            picture_url: appointment.prescription.picture_url,
            medic: {
              id: appointment.prescription.medic.id,
              name: appointment.prescription.medic.name,
              surname: appointment.prescription.medic.surname,
              email: appointment.prescription.medic.email,
              prefix: appointment.prescription.medic.prefix,
              phone_number: appointment.prescription.medic.phone_number,
            },
            affliction: {
              id: appointment.prescription.affliction.id,
              name: appointment.prescription.affliction.name,
              description: appointment.prescription.affliction.description,
            },
          },
        })
      ),
      upcomingAppointments: data.upcomingAppointments.map(
        (appointment: IPatientAppointmentDetails) => ({
          id: appointment.id,
          prescription_id: appointment.prescription_id,
          patient_id: appointment.patient_id,
          is_canceled: appointment.is_canceled,
          is_accepted: appointment.is_accepted,
          date: appointment.date,
          time: appointment.time,
          therapist: {
            id: appointment.therapist.id,
            name: appointment.therapist.name,
            surname: appointment.therapist.surname,
          },
          prescription: {
            id: appointment.prescription.id,
            patient_id: appointment.prescription.patient_id,
            appointment_quantity: appointment.prescription.appointment_quantity,
            completed_appointment_quantity:
              appointment.prescription.completed_appointment_quantity,
            is_new_prescription: appointment.prescription.is_new_prescription,
            is_completed: appointment.prescription.is_completed,
            at_home_care: appointment.prescription.at_home_care,
            date: appointment.prescription.date,
            picture_url: appointment.prescription.picture_url,
            medic: {
              id: appointment.prescription.medic.id,
              name: appointment.prescription.medic.name,
              surname: appointment.prescription.medic.surname,
              email: appointment.prescription.medic.email,
              prefix: appointment.prescription.medic.prefix,
              phone_number: appointment.prescription.medic.phone_number,
            },
            affliction: {
              id: appointment.prescription.affliction.id,
              name: appointment.prescription.affliction.name,
              description: appointment.prescription.affliction.description,
            },
          },
        })
      ),
    }),
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      setPreviousPatientAppointments(queryResult.data.previousAppointments);
      setUpcomingPatientAppointments(queryResult.data.upcomingAppointments);
    }
  }, [
    queryResult.data,
    queryResult.isSuccess,
    queryResult.isError,
    setPreviousPatientAppointments,
    setUpcomingPatientAppointments,
  ]);

  return queryResult;
};

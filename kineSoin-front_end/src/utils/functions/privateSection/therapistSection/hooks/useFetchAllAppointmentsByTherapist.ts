import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ICalendarAppointment } from '../../../../../@types/interfaces/customInterfaces';
import { fetchAllAppointmentsAsTherapist } from '../../../../apiUtils/therapistApiUtils/appointmentApiUtils/fetchAllApointmentsAsTherapist';

interface QueryProps {
  setAllAppointments: React.Dispatch<
    React.SetStateAction<ICalendarAppointment[]>
  >;
}

export const useFetchAllAppointmentsByTherapist = ({
  setAllAppointments,
}: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchAllAppointmentsByTherapist'],
    queryFn: fetchAllAppointmentsAsTherapist,
    select: (appointments) =>
      appointments.map((appointment: ICalendarAppointment) => ({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        patient: {
          id: appointment.patient.id,
          name: appointment.patient.name,
          surname: appointment.patient.surname,
          picture_url: appointment.patient.picture_url,
        },
      })),
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      setAllAppointments(queryResult.data);
    } else if (queryResult.isError) {
      console.error('Error fetching appointments:', queryResult.error);
      setAllAppointments([]);
    }
  }, [
    queryResult.data,
    queryResult.isSuccess,
    queryResult.isError,
    setAllAppointments,
  ]);

  return queryResult;
};

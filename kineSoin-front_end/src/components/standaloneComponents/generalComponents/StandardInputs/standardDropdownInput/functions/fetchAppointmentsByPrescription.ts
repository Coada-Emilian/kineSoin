import { IAppointment } from '../../../../../../@types/interfaces/modelInterfaces';
import { fetchPatientAppointmentsByPrescription } from '../../../../../../utils/apiUtils/patientApiUtils';

interface FunctionProps {
  setFutureAppointments?: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  setPastAppointments?: React.Dispatch<React.SetStateAction<IAppointment[]>>;
}

export const fetchAppointmentsByPrescription = async (
  prescriptionId: number,
  { setFutureAppointments, setPastAppointments }: FunctionProps
) => {
  const response = await fetchPatientAppointmentsByPrescription(prescriptionId);
  if (response) {
    setFutureAppointments && setFutureAppointments(response.futureAppointments);
    setPastAppointments && setPastAppointments(response.pastAppointments);
  }
};

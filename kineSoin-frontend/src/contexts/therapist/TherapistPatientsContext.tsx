import { createContext, useState } from 'react';
import type { ISameDayAppointment } from '../../@types/interfaces/therapistInterfaces';

interface PatientsContextType {
  selectedPatient: ISameDayAppointment['patient'] | null;
  setSelectedPatient: React.Dispatch<
    React.SetStateAction<ISameDayAppointment['patient'] | null>
  >;
}

const TherapistPatientsContext = createContext<PatientsContextType | undefined>(
  undefined
);

export const TherapistPatientsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPatient, setSelectedPatient] = useState<
    ISameDayAppointment['patient'] | null
  >(null);

  return (
    <TherapistPatientsContext.Provider
      value={{
        selectedPatient,
        setSelectedPatient,
      }}
    >
      {children}
    </TherapistPatientsContext.Provider>
  );
};

export default TherapistPatientsContext;

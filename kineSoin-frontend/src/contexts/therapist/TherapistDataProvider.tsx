// TherapistSectionProvider.tsx

import type { ReactNode } from 'react';
import { TherapistAppointmentsContextProvider } from './TherapistAppointmentsContext';
import { TherapistPatientsContextProvider } from './TherapistPatientsContext';
import { TherapistPrescriptionsContextProvider } from './TherapistPrescriptionContext';
import { TherapistUiContextProvider } from './TherapistUiContext';

interface TherapistSectionProviderProps {
  children: ReactNode;
}

const TherapistDataProvider = ({ children }: TherapistSectionProviderProps) => {
  return (
    <TherapistUiContextProvider>
      <TherapistAppointmentsContextProvider>
        <TherapistPatientsContextProvider>
          <TherapistPrescriptionsContextProvider>
            {children}
          </TherapistPrescriptionsContextProvider>
        </TherapistPatientsContextProvider>
      </TherapistAppointmentsContextProvider>
    </TherapistUiContextProvider>
  );
};

export default TherapistDataProvider;

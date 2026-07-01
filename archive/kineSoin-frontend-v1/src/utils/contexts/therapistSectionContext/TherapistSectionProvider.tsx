// TherapistSectionProvider.tsx

import { ReactNode } from 'react';
import { AppointmentsContextProvider } from './AppointmentsContext';
import { CalendarContextProvider } from './CalendarContext';
import { PatientsContextProvider } from './PatientsContext';
import { PrescriptionsContextProvider } from './PrescriptionsContext';
import { TableContextProvider } from './TableContext';
import { TherapistContextProvider } from './TherapistContext';
import { UIContextProvider } from './UIContext';

interface TherapistSectionProviderProps {
  children: ReactNode;
}

const TherapistSectionProvider = ({
  children,
}: TherapistSectionProviderProps) => {
  return (
    <UIContextProvider>
      <AppointmentsContextProvider>
        <PatientsContextProvider>
          <TherapistContextProvider>
            <TableContextProvider>
              <PrescriptionsContextProvider>
                <CalendarContextProvider>{children}</CalendarContextProvider>
              </PrescriptionsContextProvider>
            </TableContextProvider>
          </TherapistContextProvider>
        </PatientsContextProvider>
      </AppointmentsContextProvider>
    </UIContextProvider>
  );
};

export default TherapistSectionProvider;

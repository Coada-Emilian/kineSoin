// TherapistSectionProvider.tsx

import type { ReactNode } from 'react';
import { TherapistSelectionContextProvider } from './TherapistSelectionContext';
import { TherapistUiContextProvider } from './TherapistUiContext';

interface TherapistSectionProviderProps {
  children: ReactNode;
}

const TherapistDataProvider = ({ children }: TherapistSectionProviderProps) => {
  return (
    <TherapistUiContextProvider>
      <TherapistSelectionContextProvider>
        {children}
      </TherapistSelectionContextProvider>
    </TherapistUiContextProvider>
  );
};

export default TherapistDataProvider;

import { useEffect, useState } from 'react';
import PublicHeadBand from '../../standaloneComponents/PublicSection/PublicHeadBand';
import FormSection from '../../standaloneComponents/PublicSection/FormSection/FormSection';
import DescriptionSection from '../../standaloneComponents/PublicSection/DescriptionSection/DescriptionSection';
import { PatientRegisterContextProvider } from '../../../utils/contexts/PatientRegisterContext';

export default function PatientRegisterMain() {
  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <PatientRegisterContextProvider>
          {/* <FormSection /> */}

          <PublicHeadBand />

          {/* <DescriptionSection /> */}
        </PatientRegisterContextProvider>
      </div>
    </main>
  );
}

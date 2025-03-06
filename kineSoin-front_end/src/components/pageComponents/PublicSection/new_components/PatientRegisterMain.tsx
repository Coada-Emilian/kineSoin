import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import { PatientRegisterContextProvider } from '../../../../utils/contexts/PatientRegisterContext';
import PatientRegisterFormSection from '../../../standaloneComponents/PublicSection/DescriptionSection/new_components/formSections/PatientRegisterFormSection';
import PatientRegisterDescriptionSection from '../../../standaloneComponents/PublicSection/DescriptionSection/new_components/descriptionSections/PatientRegisterDescriptionSection';
import { useState } from 'react';
import { IFormOrders } from '../../../../@types/componentTypes';

export default function PatientRegisterMain() {
  return (
    <>
      <PatientRegisterContextProvider>
        <PatientRegisterFormSection />

        <PublicHeadBand />

        <PatientRegisterDescriptionSection />
      </PatientRegisterContextProvider>
    </>
  );
}

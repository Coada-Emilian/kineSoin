import PublicHeadBand from '../../standaloneComponents/PublicSection/PublicHeadBand';
import { PatientRegisterContextProvider } from '../../../utils/contexts/PatientRegisterContext';
import PatientRegisterFormSection from '../../standaloneComponents/PublicSection/FormSection/PatientRegisterFormSection';
import PatientRegisterDescriptionSection from '../../standaloneComponents/PublicSection/DescriptionSection/PatientRegisterDescriptionSection';
import { useState } from 'react';
import { IFormOrders } from '../../../@types/componentTypes';

export default function PatientRegisterMain() {
  const [formOrder, setFormOrder] = useState<IFormOrders>('first');

  return (
    <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
      <div className="flex flex-col w-full h-full">
        <PatientRegisterContextProvider>
          <PatientRegisterFormSection setFormOrder={setFormOrder} formOrder={formOrder}/>

          <PublicHeadBand />

          <PatientRegisterDescriptionSection formOrder={formOrder} />
        </PatientRegisterContextProvider>
      </div>
    </main>
  );
}

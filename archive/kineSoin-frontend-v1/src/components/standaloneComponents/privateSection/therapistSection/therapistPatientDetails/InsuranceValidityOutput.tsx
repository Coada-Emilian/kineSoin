import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { transformInsuranceDate } from '../../../../../utils/functions/privateSection/therapistSection/transformInsuranceDate';

export default function InsuranceValidityOutput() {
  const { patientDetails } = usePatientsContext();

  return (
    <div className="flex-col items-start w-full mb-2 flex gap-1 text-xs md:text-sm lg:text-base xl:text-lg">
      <label className="font-bold">Date de validité:</label>
      <div className="flex">
        <span className="italic font-normal flex gap-2">
          {transformInsuranceDate(patientDetails?.insurance_details.start_date)}
          <p>au</p>
          {transformInsuranceDate(patientDetails?.insurance_details.end_date)}
        </span>
      </div>
    </div>
  );
}

import type { IPatientDetailsDto } from '../../../../../@types/interfaces/therapistInterfaces';
import { formatDate } from '../../../../../utils/functions/formatDate';
import EntityAdherentNumberOutput from '../../../outputs/EntityAdherentNumberOutput';
import EntityContractNumberOutput from '../../../outputs/EntityContractNumberOutput';
import EntityInsuranceOutput from '../../../outputs/EntityInsuranceOutput';
import EntityValidUntilOutput from '../../../outputs/EntityValidUntilOutput';

export default function PatientInsuranceDetailsSection({
  patient,
}: {
  patient: IPatientDetailsDto | undefined;
}) {
  const insuranceEndDate = patient?.insurance_details.end_date
    ? new Date(patient.insurance_details.end_date)
    : null;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-100 p-6">
      <div className="font-semibold text-teal-400 text-xl flex px-2">
        <p>Mutuelle</p>
      </div>

      <div className="flex flex-1 flex-col divide-y divide-slate-100">
        <div className="py-4">
          <EntityInsuranceOutput
            insuranceName={patient?.insurance_details.insurance.name}
          />
        </div>

        <div className="py-4">
          <EntityAdherentNumberOutput
            adherentNumber={patient?.insurance_details.adherent_code}
          />
        </div>

        <div className="py-4">
          <EntityContractNumberOutput
            contractNumber={patient?.insurance_details.contract_number}
          />
        </div>
        <div className="py-4">
          <EntityValidUntilOutput
            validUntil={insuranceEndDate ? formatDate(insuranceEndDate) : ''}
          />
          <div>
            {patient?.insurance_details.end_date &&
            new Date(patient.insurance_details.end_date) >= new Date() ? (
              <div className="flex gap-2 items-center mt-4 ml-4 p-2 bg-green-100 w-fit rounded-lg border border-green-200 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-green-500 font-semibold">
                  Contrat valide
                </span>
              </div>
            ) : (
              <div className="flex gap-2 items-center mt-4 ml-4 p-2 bg-red-100 w-fit rounded-lg border border-red-200 text-sm">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>{' '}
                <span className="text-red-500 font-semibold">
                  Contrat expiré
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

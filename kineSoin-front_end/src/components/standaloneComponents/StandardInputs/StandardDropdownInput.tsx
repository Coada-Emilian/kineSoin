import { useEffect, useState } from 'react';
import { IAffliction } from '../../../@types/IAffliction';
import { IPrescription } from '../../../@types/IPrescription';
import { IAppointment } from '../../../@types/IAppointment';
import { IInsurance } from '../../../@types/IInsurance';
import { ICountry } from '../../../@types/ICountry';
import { fetchPatientAppointmentsByPrescription } from '../../../utils/apiUtils';
import { IMedic } from '../../../@types/IMedic';

interface StandardChoiceDropdownProps {
  isGenderDropdownInput?: boolean;
  registeredPatientGender?: string;
  setRegisteredPatientGender?: React.Dispatch<React.SetStateAction<string>>;
  isMedicDropdownInput?: boolean;
  setNewPrescriptionMedicId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  medics?: IMedic[];
  isAtHomeCareDropdownInput?: boolean;
  setAtHomeCare?: React.Dispatch<React.SetStateAction<boolean>>;
  isAfflictionDropdownInput?: boolean;
  setNewPrescriptionAfflictionId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  afflictions?: IAffliction[];
  patientPrescriptions?: IPrescription[];
  isPrescriptionDropdownInput?: boolean;
  patientId?: number;
  setFutureAppointments?: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  setPastAppointments?: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  isPatientInsuranceDropdownInput?: boolean;
  oldPatientInsuranceName?: string;
  insuranceList?: IInsurance[];
  isCountryDropdownInput?: boolean;
  countries?: ICountry[];
  isAdminTherapistAddStatusInput?: boolean;
}

export default function StandardChoiceDropdown({
  isGenderDropdownInput,
  registeredPatientGender,
  setRegisteredPatientGender,
  isMedicDropdownInput,
  setNewPrescriptionMedicId,
  medics,
  isAtHomeCareDropdownInput,
  setAtHomeCare,
  isAfflictionDropdownInput,
  setNewPrescriptionAfflictionId,
  afflictions,
  patientPrescriptions,
  isPrescriptionDropdownInput,
  patientId,
  setFutureAppointments,
  setPastAppointments,
  isPatientInsuranceDropdownInput,
  oldPatientInsuranceName,
  insuranceList,
  isCountryDropdownInput,
  countries,
  isAdminTherapistAddStatusInput,
}: StandardChoiceDropdownProps) {
  // Function to fetch appointments by prescription
  const fetchAppointmentsByPrescription = async (prescriptionId: number) => {
    const response =
      await fetchPatientAppointmentsByPrescription(prescriptionId);
    if (response) {
      setFutureAppointments &&
        setFutureAppointments(response.futureAppointments);
      setPastAppointments && setPastAppointments(response.pastAppointments);
    }
  };

  // Patient insurance dropdown state
  const [otherInsurances, setOtherInsurances] = useState<IInsurance[]>([]);

  const [actualInsurance, setActualInsurance] = useState<IInsurance | null>(
    null
  );

  // Function to identify the old insurance
  const identifyOldInsurance = (
    insuranceList: IInsurance[],
    oldInsuranceName: string
  ) => {
    const oldInsurance = insuranceList.find(
      (insurance) => insurance.name === oldInsuranceName
    );
    if (oldInsurance) {
      setActualInsurance(oldInsurance);
    }
    const otherInsurances = insuranceList.filter(
      (insurance) => insurance.name !== oldInsuranceName
    );
    if (otherInsurances.length > 0) {
      setOtherInsurances(otherInsurances);
    }
  };

  const [isPrefixChosen, setIsPrefixChosen] = useState(false);

  // UseEffect to identify the old insurance
  useEffect(() => {
    if (insuranceList && oldPatientInsuranceName) {
      identifyOldInsurance(insuranceList, oldPatientInsuranceName);
    }
  }, [insuranceList, oldPatientInsuranceName]);

  return (
    <div className={`${isCountryDropdownInput ? 'w-1/3' : ''} mb-4 italic`}>
      <label
        htmlFor={
          isGenderDropdownInput
            ? 'patient-register-gender_dropdown'
            : isMedicDropdownInput
              ? 'new-prescription-medic_dropdown'
              : isAtHomeCareDropdownInput
                ? 'patient-register-at_home_care_dropdown'
                : isAfflictionDropdownInput
                  ? 'new-prescription-affliction_dropdown'
                  : isCountryDropdownInput
                    ? 'country_prefix_dropdown'
                    : isAdminTherapistAddStatusInput
                      ? 'therapist-status_dropdown'
                      : ''
        }
        className={`${isCountryDropdownInput ? 'text-xs' : ''} text-primaryBlue text-sm font-medium block mb-2`}
      >
        {isGenderDropdownInput && 'Genre'}{' '}
        {isMedicDropdownInput && 'Médecin prescripteur'}
        {isAtHomeCareDropdownInput && 'A domicile ?'}
        {isAfflictionDropdownInput && 'Affection concernée'}
        {isPatientInsuranceDropdownInput && 'Nom mutuelle'}
        {isCountryDropdownInput && 'Préfixe'}
        {isAdminTherapistAddStatusInput && 'Statut'}
      </label>

      <select
        id={
          isGenderDropdownInput
            ? 'patient-register-gender_dropdown'
            : isMedicDropdownInput
              ? 'new-prescription-medic_dropdown'
              : isAtHomeCareDropdownInput
                ? 'patient-register-at_home_care_dropdown'
                : isAfflictionDropdownInput
                  ? 'new-prescription-affliction_dropdown'
                  : isCountryDropdownInput
                    ? 'country_prefix_dropdown'
                    : isAdminTherapistAddStatusInput
                      ? 'therapist-status_dropdown'
                      : ''
        }
        value={
          isGenderDropdownInput && registeredPatientGender
            ? registeredPatientGender
            : undefined
        }
        onChange={(e) => {
          if (isGenderDropdownInput && setRegisteredPatientGender) {
            setRegisteredPatientGender(e.target.value);
          }

          if (isMedicDropdownInput && setNewPrescriptionMedicId) {
            setNewPrescriptionMedicId(Number(e.target.value));
          }

          if (isAtHomeCareDropdownInput && setAtHomeCare) {
            setAtHomeCare(e.target.value === 'true');
          }

          if (isAfflictionDropdownInput && setNewPrescriptionAfflictionId) {
            setNewPrescriptionAfflictionId(Number(e.target.value));
          }

          if (isPrescriptionDropdownInput) {
            const selectedPrescriptionId = Number(e.target.value);
            if (selectedPrescriptionId && patientId) {
              fetchAppointmentsByPrescription(selectedPrescriptionId);
            }
          }
          if (setIsPrefixChosen) {
            setIsPrefixChosen(true);
          }
        }}
        className="block w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryTeal focus:border-transparent"
        name={
          isPatientInsuranceDropdownInput
            ? 'insurance_id'
            : isCountryDropdownInput
              ? 'prefix'
              : isAdminTherapistAddStatusInput
                ? 'status'
                : ''
        }
      >
        {isGenderDropdownInput && (
          <>
            <option value="">Sélectionnez votre genre</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </>
        )}

        {isMedicDropdownInput && (
          <>
            <option value="">Sélectionnez un médecin prescripteur</option>
            {medics &&
              medics.map((medic) => (
                <option key={medic.id} value={medic.id}>
                  {medic.fullName}
                </option>
              ))}
            <option value="other">Autre</option>
            {/* ToDO - add a new medic modal */}
          </>
        )}

        {isAtHomeCareDropdownInput && (
          <>
            <option value="">Choisissez une option</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </>
        )}

        {isAfflictionDropdownInput && (
          <>
            <option value="">Sélectionnez une affection</option>
            {afflictions &&
              afflictions.map((affliction) => (
                <option key={affliction.id} value={affliction.id}>
                  {affliction.name}
                </option>
              ))}
            <option value="other">Autre</option>
            {/* ToDO - add a new affliction modal */}
          </>
        )}

        {isPrescriptionDropdownInput && (
          <>
            <option value="">Sélectionnez une ordonnance</option>
            {patientPrescriptions &&
              patientPrescriptions?.length > 0 &&
              patientPrescriptions.map((prescription) => (
                <option key={prescription.id} value={prescription.id}>
                  {prescription.date}
                </option>
              ))}
          </>
        )}

        {isPatientInsuranceDropdownInput && (
          <>
            <option value={actualInsurance ? actualInsurance.id : '*'}>
              {actualInsurance
                ? actualInsurance.name
                : 'Choisissez une mutuelle'}
            </option>
            {otherInsurances.length > 0
              ? otherInsurances.map((insurance) => (
                  <option key={insurance.id} value={insurance.id}>
                    {insurance.name}
                  </option>
                ))
              : insuranceList?.map((insurance) => (
                  <option key={insurance.id} value={insurance.id}>
                    {insurance.name}
                  </option>
                ))}
          </>
        )}

        {isCountryDropdownInput && (
          <>
            <option value="">Choisissez un préfixe</option>
            {countries &&
              countries.map((country) => (
                <option key={country.name} value={country.prefix}>
                  {isPrefixChosen
                    ? country.prefix
                    : `${country.name}, ${country.prefix}`}
                </option>
              ))}
          </>
        )}

        {isAdminTherapistAddStatusInput && (
          <>
            <option value="">Choisissez un statut</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </>
        )}
      </select>
    </div>
  );
}

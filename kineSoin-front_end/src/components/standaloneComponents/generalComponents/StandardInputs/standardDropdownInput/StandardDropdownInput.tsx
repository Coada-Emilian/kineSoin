import { useEffect, useState } from 'react';

import {
  IAffliction,
  IAppointment,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPrescription,
} from '../../../../../@types/standardTypes';
import { fetchBodyRegionsAsAdmin } from '../../../../../utils/apiUtils/adminApiUtils';
import { fetchAppointmentsByPrescription } from './functions/fetchAppointmentsByPrescription';
import { identifyOldInsurance } from './functions/identifyOldInsurance';
import { fetchCountriesData } from './functions/fetchCountriesData';
import { ICountry } from '../../../../../@types/customTypes';

interface StandardChoiceDropdownProps {
  isGenderDropdownInput?: boolean;
  isMedicDropdownInput?: boolean;
  medics?: IMedic[];
  isAtHomeCareDropdownInput?: boolean;
  isAfflictionDropdownInput?: boolean;
  setNewPrescriptionAfflictionId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  afflictions?: IAffliction[];
  patientPrescriptions?: IPrescription[];
  isPrescriptionDropdownInput?: boolean;
  setFutureAppointments?: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  setPastAppointments?: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  isPatientInsuranceDropdownInput?: boolean;
  oldPatientInsuranceName?: string;
  insuranceList?: IInsurance[];
  isCountryDropdownInput?: boolean;
  isAdminTherapistAddStatusInput?: boolean;
  isAdminAfflictionAddRegionInput?: boolean;
  isAdminAfflictionAddOperatedStatusInput?: boolean;
  isAdminAfflictionEditRegionInput?: boolean;
  affliction?: IAffliction;
  isAdminAfflictionEditOperatedStatusInput?: boolean;
  isAdminTherapistEditPrefixDropdown?: boolean;
  therapist_prefix?: string;
  medic_prefix?: string;
  isAdminMedicEditPrefixDropdown?: boolean;
  isAdminInsuranceEditPrefixDropdown?: boolean;
  insurance_prefix?: string;
  setTherapistPrefix?: React.Dispatch<React.SetStateAction<string>>;
  setInsurancePrefix?: React.Dispatch<React.SetStateAction<string>>;
  setMedicPrefix?: React.Dispatch<React.SetStateAction<string>>;
  isPatientProfilePrefixModification?: boolean;
  patient_prefix?: string;
}

export default function StandardChoiceDropdown({
  isGenderDropdownInput,
  isMedicDropdownInput,
  medics,
  isAtHomeCareDropdownInput,
  isAfflictionDropdownInput,
  setNewPrescriptionAfflictionId,
  afflictions,
  patientPrescriptions,
  isPrescriptionDropdownInput,
  setFutureAppointments,
  setPastAppointments,
  isPatientInsuranceDropdownInput,
  oldPatientInsuranceName,
  insuranceList,
  isCountryDropdownInput,
  isAdminTherapistAddStatusInput,
  isAdminAfflictionAddRegionInput,
  isAdminAfflictionAddOperatedStatusInput,
  isAdminAfflictionEditRegionInput,
  affliction,
  isAdminAfflictionEditOperatedStatusInput,
  isAdminTherapistEditPrefixDropdown,
  therapist_prefix,
  medic_prefix,
  isAdminMedicEditPrefixDropdown,
  isAdminInsuranceEditPrefixDropdown,
  insurance_prefix,
  setTherapistPrefix,
  setInsurancePrefix,
  setMedicPrefix,
  isPatientProfilePrefixModification,
  patient_prefix,
}: StandardChoiceDropdownProps) {
  // Get the window width
  const windowWidth = window.innerWidth;

  // Patient insurance dropdown state
  const [otherInsurances, setOtherInsurances] = useState<IInsurance[]>([]);

  const [actualInsurance, setActualInsurance] = useState<IInsurance | null>(
    null
  );

  const [patientPrefix, setPatientPrefix] = useState<string | null>(
    patient_prefix || null
  );

  const [isPrefixChosen, setIsPrefixChosen] = useState(false);

  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  const [countries, setCountries] = useState<ICountry[]>([]);

  // UseEffect to identify the old insurance
  useEffect(() => {
    if (insuranceList && oldPatientInsuranceName) {
      identifyOldInsurance(insuranceList, oldPatientInsuranceName, {
        setActualInsurance,
        setOtherInsurances,
      });
    }
  }, [insuranceList, oldPatientInsuranceName]);

  {
    useEffect(() => {
      if (isAdminAfflictionAddRegionInput || isAdminAfflictionEditRegionInput) {
        fetchBodyRegionsAsAdmin().then((bodyRegions) => {
          setBodyRegions(bodyRegions);
        });
      }
    }, []);
  }

  useEffect(() => {
    if (isCountryDropdownInput) {
      fetchCountriesData({ setCountries });
    }
  }, [isCountryDropdownInput]);

  const divClassName = `${
    (isCountryDropdownInput && !isPatientProfilePrefixModification) ||
    isAdminAfflictionAddOperatedStatusInput
      ? 'w-1/3 italic text-xxs md:text-xs xl:text-sm 2xl:text-md flex flex-col gap-2'
      : isAdminAfflictionEditRegionInput ||
          isAdminAfflictionEditOperatedStatusInput
        ? 'flex flex-row items-center gap-2 mb-2 w-full'
        : isMedicDropdownInput ||
            isAtHomeCareDropdownInput ||
            isAfflictionDropdownInput
          ? 'flex flex-col items-center md:items-start'
          : isPatientProfilePrefixModification
            ? 'flex items-center gap-2 mb-2 w-full md:w-1/3 md:gap-4'
            : 'mb-4 italic flex flex-col gap-2'
  } `;

  const inputId = isGenderDropdownInput
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
              : isAdminAfflictionAddRegionInput ||
                  isAdminAfflictionEditRegionInput
                ? 'body-region_dropdown'
                : isAdminAfflictionAddOperatedStatusInput ||
                    isAdminAfflictionEditOperatedStatusInput
                  ? 'affliction-operated_status_dropdown'
                  : isAdminTherapistEditPrefixDropdown ||
                      isAdminMedicEditPrefixDropdown ||
                      isAdminInsuranceEditPrefixDropdown ||
                      isPatientProfilePrefixModification
                    ? 'country_prefix_dropdown'
                    : '';

  const labelClassName = `${
    isCountryDropdownInput &&
    !isAdminTherapistEditPrefixDropdown &&
    !isAdminMedicEditPrefixDropdown &&
    !isAdminInsuranceEditPrefixDropdown &&
    !isPatientProfilePrefixModification
      ? 'text-xs'
      : isAdminAfflictionEditRegionInput ||
          isAdminAfflictionEditOperatedStatusInput ||
          isAdminTherapistEditPrefixDropdown ||
          isAdminMedicEditPrefixDropdown ||
          isAdminInsuranceEditPrefixDropdown
        ? 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-1/3 mb-2'
        : isPatientProfilePrefixModification
          ? 'text-xs md:text-base xl:text-xl w-1/4 text-start flex justify-center mb-0'
          : 'text-sm'
  } text-primaryBlue font-medium block  italic`;

  const labelContent = isGenderDropdownInput
    ? 'Genre'
    : isMedicDropdownInput
      ? 'Médecin prescripteur'
      : isAtHomeCareDropdownInput
        ? 'A domicile ?'
        : isAfflictionDropdownInput
          ? 'Affection concernée'
          : isPatientInsuranceDropdownInput
            ? 'Nom mutuelle'
            : isCountryDropdownInput ||
                isAdminTherapistEditPrefixDropdown ||
                isAdminMedicEditPrefixDropdown ||
                isAdminInsuranceEditPrefixDropdown ||
                isPatientProfilePrefixModification
              ? 'Préfixe'
              : isAdminTherapistAddStatusInput
                ? 'Statut'
                : isAdminAfflictionAddRegionInput ||
                    isAdminAfflictionEditRegionInput
                  ? 'Région concernée'
                  : (isAdminAfflictionAddOperatedStatusInput ||
                        isAdminAfflictionEditOperatedStatusInput) &&
                      windowWidth > 768
                    ? 'Est opéré ?'
                    : (isAdminAfflictionAddOperatedStatusInput ||
                          isAdminAfflictionEditOperatedStatusInput) &&
                        windowWidth <= 768
                      ? 'Opéré ?'
                      : '';

  const inputClassName = `${isPatientProfilePrefixModification ? 'w-full md:w-2/4' : 'w-full'} block p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryTeal focus:border-transparent text-xxs md:text-xs xl:text-sm 2xl:text-md`;

  const inputName = isPatientInsuranceDropdownInput
    ? 'insurance_id'
    : isGenderDropdownInput
      ? 'gender'
      : isCountryDropdownInput
        ? 'prefix'
        : isAdminTherapistAddStatusInput
          ? 'status'
          : isAdminAfflictionAddRegionInput || isAdminAfflictionEditRegionInput
            ? 'body_region_id'
            : isAdminAfflictionAddOperatedStatusInput ||
                isAdminAfflictionEditOperatedStatusInput
              ? 'is_operated'
              : isAtHomeCareDropdownInput
                ? 'at_home_care'
                : isMedicDropdownInput
                  ? 'medic_id'
                  : isAfflictionDropdownInput
                    ? 'affliction_id'
                    : '';

  return (
    <div className={divClassName}>
      <label htmlFor={inputId} className={labelClassName}>
        {labelContent}
      </label>

      <select
        id={inputId}
        value={
          isAdminTherapistEditPrefixDropdown && therapist_prefix
            ? therapist_prefix
            : isAdminMedicEditPrefixDropdown && medic_prefix
              ? medic_prefix
              : isAdminInsuranceEditPrefixDropdown && insurance_prefix
                ? insurance_prefix
                : isPatientProfilePrefixModification && patient_prefix
                  ? (patientPrefix ?? '')
                  : undefined
        }
        onChange={(e) => {
          // if (isGenderDropdownInput && setRegisteredPatientGender) {
          //   setRegisteredPatientGender(e.target.value);
          // }

          if (isAfflictionDropdownInput && setNewPrescriptionAfflictionId) {
            setNewPrescriptionAfflictionId(Number(e.target.value));
          }

          if (isPrescriptionDropdownInput) {
            const selectedPrescriptionId = Number(e.target.value);
            if (selectedPrescriptionId) {
              fetchAppointmentsByPrescription(selectedPrescriptionId, {
                setFutureAppointments,
                setPastAppointments,
              });
            }
          }
          if (setIsPrefixChosen) {
            setIsPrefixChosen(true);
          }
          if (setTherapistPrefix) {
            setTherapistPrefix(e.target.value);
          }
          if (setInsurancePrefix) {
            setInsurancePrefix(e.target.value);
          }
          if (setMedicPrefix) {
            setMedicPrefix(e.target.value);
          }
          if (setPatientPrefix) {
            setPatientPrefix(e.target.value);
          }
        }}
        className={inputClassName}
        name={inputName}
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
            <option
              value={
                therapist_prefix ||
                medic_prefix ||
                insurance_prefix ||
                patient_prefix
              }
            >
              {therapist_prefix
                ? therapist_prefix
                : medic_prefix
                  ? medic_prefix
                  : insurance_prefix
                    ? insurance_prefix
                    : patient_prefix
                      ? patient_prefix
                      : 'Choisissez un préfixe'}
            </option>

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

        {isAdminAfflictionAddRegionInput && (
          <>
            <option value="">Choisissez une région</option>
            {bodyRegions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </>
        )}

        {isAdminAfflictionAddOperatedStatusInput && (
          <>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </>
        )}

        {isAdminAfflictionEditRegionInput && (
          <>
            <option value={affliction?.body_region?.id}>
              {affliction?.body_region?.name}
            </option>
            {bodyRegions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </>
        )}

        {isAdminAfflictionEditOperatedStatusInput && (
          <>
            {affliction?.is_operated ? (
              <>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </>
            ) : (
              <>
                <option value="false">Non</option>
                <option value="true">Oui</option>
              </>
            )}
          </>
        )}
      </select>
    </div>
  );
}

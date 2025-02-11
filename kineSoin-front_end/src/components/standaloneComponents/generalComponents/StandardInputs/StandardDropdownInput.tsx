import { useEffect, useState } from 'react';
import { IAffliction } from '../../../../@types/IAffliction';
import { IPrescription } from '../../../../@types/IPrescription';
import { IAppointment } from '../../../../@types/IAppointment';
import { IInsurance } from '../../../../@types/IInsurance';
import { ICountry } from '../../../../@types/ICountry';
import {
  fetchBodyRegions,
  fetchPatientAppointmentsByPrescription,
} from '../../../../utils/apiUtils';
import { IMedic } from '../../../../@types/IMedic';
import { IBodyRegion } from '../../../../@types/IBodyRegion';
import axios from 'axios';

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
}: StandardChoiceDropdownProps) {
  const windowWidth = window.innerWidth;
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

  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  {
    if (isAdminAfflictionAddRegionInput || isAdminAfflictionEditRegionInput) {
      useEffect(() => {
        fetchBodyRegions().then((bodyRegions) => {
          setBodyRegions(bodyRegions);
        });
      }, []);
    }
  }

  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    if (isCountryDropdownInput) {
      const fetchCountriesData = async () => {
        try {
          const response = await axios.get(
            'https://restcountries.com/v3.1/all'
          );
          if (response) {
            const data: ICountry[] = response.data
              .map((country: any): ICountry => {
                const root = country.idd?.root || '';
                const suffixes = country.idd?.suffixes || [];
                const prefix = suffixes.length ? `${root}${suffixes[0]}` : root;

                return {
                  prefix: prefix,
                  name: country.name.common,
                };
              })
              .sort((a: ICountry, b: ICountry) => a.name.localeCompare(b.name));

            setCountries(data);
          }
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };

      fetchCountriesData();
    }
  }, [isCountryDropdownInput]);

  return (
    <div
      className={`${isCountryDropdownInput || isAdminAfflictionAddOperatedStatusInput ? 'w-1/3' : isAdminAfflictionEditRegionInput || isAdminAfflictionEditOperatedStatusInput ? 'flex flex-row items-center gap-2 mb-2 w-full' : ''} mb-4 italic`}
    >
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
                      : isAdminAfflictionAddRegionInput ||
                          isAdminAfflictionEditRegionInput
                        ? 'body-region_dropdown'
                        : isAdminAfflictionAddOperatedStatusInput ||
                            isAdminAfflictionEditOperatedStatusInput
                          ? 'affliction-operated_status_dropdown'
                          : isAdminTherapistEditPrefixDropdown ||
                              isAdminMedicEditPrefixDropdown ||
                              isAdminInsuranceEditPrefixDropdown
                            ? 'country_prefix_dropdown'
                            : ''
        }
        className={`${
          isCountryDropdownInput &&
          !isAdminTherapistEditPrefixDropdown &&
          !isAdminMedicEditPrefixDropdown &&
          !isAdminInsuranceEditPrefixDropdown
            ? 'text-xs'
            : isAdminAfflictionEditRegionInput ||
                isAdminAfflictionEditOperatedStatusInput ||
                isAdminTherapistEditPrefixDropdown ||
                isAdminMedicEditPrefixDropdown ||
                isAdminInsuranceEditPrefixDropdown
              ? 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-1/3'
              : ''
        } text-primaryBlue text-sm font-medium block mb-2`}
      >
        {isGenderDropdownInput && 'Genre'}{' '}
        {isMedicDropdownInput && 'Médecin prescripteur'}
        {isAtHomeCareDropdownInput && 'A domicile ?'}
        {isAfflictionDropdownInput && 'Affection concernée'}
        {isPatientInsuranceDropdownInput && 'Nom mutuelle'}
        {(isCountryDropdownInput ||
          isAdminTherapistEditPrefixDropdown ||
          isAdminMedicEditPrefixDropdown ||
          isAdminInsuranceEditPrefixDropdown) &&
          'Préfixe'}
        {isAdminTherapistAddStatusInput && 'Statut'}
        {(isAdminAfflictionAddRegionInput ||
          isAdminAfflictionEditRegionInput) &&
          'Région concernée'}
        {(isAdminAfflictionAddOperatedStatusInput ||
          isAdminAfflictionEditOperatedStatusInput) &&
          windowWidth > 768 &&
          'Est opéré ?'}
        {isAdminAfflictionAddOperatedStatusInput &&
          windowWidth <= 768 &&
          'Opéré ?'}
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
                      : isAdminAfflictionAddRegionInput ||
                          isAdminAfflictionEditRegionInput
                        ? 'body-region_dropdown'
                        : isAdminAfflictionAddOperatedStatusInput ||
                            isAdminAfflictionEditOperatedStatusInput
                          ? 'affliction-operated_status_dropdown'
                          : isAdminTherapistEditPrefixDropdown ||
                              isAdminMedicEditPrefixDropdown ||
                              isAdminInsuranceEditPrefixDropdown
                            ? 'country_prefix_dropdown'
                            : ''
        }
        value={
          isGenderDropdownInput && registeredPatientGender
            ? registeredPatientGender
            : isAdminTherapistEditPrefixDropdown && therapist_prefix
              ? therapist_prefix
              : isAdminMedicEditPrefixDropdown && medic_prefix
                ? medic_prefix
                : isAdminInsuranceEditPrefixDropdown && insurance_prefix
                  ? insurance_prefix
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
          if (setTherapistPrefix) {
            setTherapistPrefix(e.target.value);
          }
          if (setInsurancePrefix) {
            setInsurancePrefix(e.target.value);
          }
          if (setMedicPrefix) {
            setMedicPrefix(e.target.value);
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
                : isAdminAfflictionAddRegionInput ||
                    isAdminAfflictionEditRegionInput
                  ? 'body_region_id'
                  : isAdminAfflictionAddOperatedStatusInput ||
                      isAdminAfflictionEditOperatedStatusInput
                    ? 'is_operated'
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
            <option
              value={therapist_prefix || medic_prefix || insurance_prefix}
            >
              {therapist_prefix
                ? therapist_prefix
                : medic_prefix
                  ? medic_prefix
                  : insurance_prefix
                    ? insurance_prefix
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

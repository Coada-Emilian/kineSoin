import { useEffect, useState } from 'react';
import { IAffliction } from '../../../../@types/IAffliction';
import { IMedic } from '../../../../@types/IMedic';
import { IPrescription } from '../../../../@types/IPrescription';
import { fetchPatientAppointmentsByPrescription } from '../../../../utils/apiUtils';
import { IAppointment } from '../../../../@types/IAppointment';

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
}: StandardChoiceDropdownProps) {
  const fetchAppointmentsByPrescription = async (
    prescriptionId: number,
    patientId: number
  ) => {
    const response = await fetchPatientAppointmentsByPrescription(
      prescriptionId,
      patientId
    );
    if (response) {
      setFutureAppointments &&
        setFutureAppointments(response.futureAppointments);
      setPastAppointments && setPastAppointments(response.pastAppointments);
    }
  };

  return (
    <div className="mb-4">
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
                  : ''
        }
        className="text-primaryBlue text-sm font-medium block mb-2"
      >
        {isGenderDropdownInput && 'Genre'}{' '}
        {isMedicDropdownInput && 'Médecin prescripteur :'}
        {isAtHomeCareDropdownInput && 'A domicile ?'}
        {isAfflictionDropdownInput && 'Affection concernée :'}
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
                  : ''
        }
        value={
          isGenderDropdownInput && registeredPatientGender
            ? registeredPatientGender
            : undefined
        }
        // onChange={(e) => {
        //   isGenderDropdownInput &&
        //     setRegisteredPatientGender &&
        //     setRegisteredPatientGender(e.target.value);

        //   isMedicDropdownInput &&
        //     setNewPrescriptionMedicId &&
        //     setNewPrescriptionMedicId(Number(e.target.value));

        //   isAtHomeCareDropdownInput &&
        //     setAtHomeCare &&
        //     setAtHomeCare(e.target.value === 'true');

        //   isAfflictionDropdownInput &&
        //     setNewPrescriptionAfflictionId &&
        //     setNewPrescriptionAfflictionId(Number(e.target.value));
        // }}

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
              fetchAppointmentsByPrescription(
                selectedPrescriptionId,
                patientId
              );
            }
          }
        }}
        className="block w-full p-2 border border-gray-300 rounded-md"
      >
        {isGenderDropdownInput && (
          <>
            {' '}
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
            {/* ToDO - add a new medic modal */}
          </>
        )}

        {isPrescriptionDropdownInput && (
          <>
            <option value="">Sélectionnez une ordonnance</option>
            {patientPrescriptions &&
              patientPrescriptions.map((prescription) => (
                <option key={prescription.id} value={prescription.id}>
                  {prescription.date}
                </option>
              ))}
          </>
        )}
      </select>
    </div>
  );
}

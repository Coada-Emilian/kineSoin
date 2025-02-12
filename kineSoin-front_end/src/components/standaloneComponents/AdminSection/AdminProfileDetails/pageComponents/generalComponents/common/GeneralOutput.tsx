import { useEffect, useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/types';

interface GeneralOutputProps {
  isPageTitleOutput?: boolean;
  patient?: IPatient | null;
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
  isProfileStatusOutput?: boolean;
  isProfileIdOutput?: boolean;
  isProfileNameOutput?: boolean;
  isProfileEmailOutput?: boolean;
  isProfileLicenceCodeOutput?: boolean;
  isTherapistDiplomaOutput?: boolean;
  isTherapistExperienceOutput?: boolean;
  isTherapistSpecialtyOutput?: boolean;
  isTherapistPhoneNumberOutput?: boolean;
  isTherapistDescriptionOutput?: boolean;
  isPatientAgeGenderOutput?: boolean;
  isPatientAddressOutput?: boolean;
  isPatientPhoneNumberOutput?: boolean;
  isPatientTherapistOutput?: boolean;
  isAfflictionRegionOutput?: boolean;
  isAfflictionInsuranceCodeOutput?: boolean;
  isAfflictionOperatedOutput?: boolean;
  isAfflictionDescriptionOutput?: boolean;
  isMedicAddressOutput?: boolean;
  isMedicPhoneNumberOutput?: boolean;
  isMedicLicenceCodeOutput?: boolean;
  isInsuranceAddressOutput?: boolean;
  isInsurancePhoneNumberOutput?: boolean;
  isInsuranceAMCCodeOutput?: boolean;
}

export default function GeneralOutput({
  isPageTitleOutput,
  patient,
  therapist,
  medic,
  affliction,
  insurance,
  isProfileStatusOutput,
  isProfileIdOutput,
  isProfileNameOutput,
  isProfileEmailOutput,
  isProfileLicenceCodeOutput,
  isTherapistDiplomaOutput,
  isTherapistExperienceOutput,
  isTherapistSpecialtyOutput,
  isTherapistPhoneNumberOutput,
  isTherapistDescriptionOutput,
  isPatientAgeGenderOutput,
  isPatientAddressOutput,
  isPatientPhoneNumberOutput,
  isPatientTherapistOutput,
  isAfflictionRegionOutput,
  isAfflictionInsuranceCodeOutput,
  isAfflictionOperatedOutput,
  isAfflictionDescriptionOutput,
  isMedicAddressOutput,
  isMedicPhoneNumberOutput,
  isMedicLicenceCodeOutput,
  isInsuranceAddressOutput,
  isInsurancePhoneNumberOutput,
  isInsuranceAMCCodeOutput,
}: GeneralOutputProps) {
  const profileType = therapist
    ? 'therapist'
    : patient
      ? 'patient'
      : medic
        ? 'medic'
        : affliction
          ? 'affliction'
          : insurance
            ? 'insurance'
            : '';

  const getStatusClassName = (status: string | undefined) => {
    switch (status) {
      case 'ACTIF':
        return 'bg-green-300 p-2 rounded-xl font-semibold';
      case 'INACTIF':
        return 'bg-gray-200 p-2 rounded-xl font-semibold';
      case 'EN ATTENTE':
        return 'bg-yellow-300 p-2 rounded-xl font-semibold';
      case 'BANNI':
        return 'bg-red-300 p-2 rounded-xl font-semibold';
      default:
        return 'bg-gray-200 p-2 rounded-xl font-semibold';
    }
  };

  const [therapistStatus, setTherapistStatus] = useState(
    therapist?.status || 'inactive'
  );
  const [patientStatus, setPatientStatus] = useState(
    patient?.status || 'inactive'
  );

  useEffect(() => {
    if (therapist) {
      if (therapist.status === 'active') {
        setTherapistStatus('ACTIF');
      } else if (therapist.status === 'inactive') {
        setTherapistStatus('INACTIF');
      }
    }
    if (patient) {
      if (patient.status === 'active') {
        setPatientStatus('ACTIF');
      } else if (patient.status === 'inactive') {
        setPatientStatus('INACTIF');
      } else if (patient.status === 'pending') {
        setPatientStatus('EN ATTENTE');
      } else if (patient.status === 'banned') {
        setPatientStatus('BANNI');
      }
    }
  }, [therapistStatus, patientStatus]);

  const fields = {
    status: {
      label: 'Statut:',
      value: (therapist && therapistStatus) || (patient && patientStatus),
      className: '',
    },
    id: {
      label: '#ID:',
      value:
        therapist?.id ||
        patient?.id ||
        affliction?.id ||
        medic?.id ||
        insurance?.id,
      className: '',
    },
    name: {
      label: 'Nom:',
      value:
        therapist?.fullName ||
        patient?.fullName ||
        medic?.fullName ||
        affliction?.name ||
        insurance?.name,
      className: '',
    },
    email: {
      label: 'E-mail:',
      value: therapist?.email || patient?.email,
      className: '',
    },
    licenceCode: {
      label: 'Code ADELI:',
      value: therapist?.licence_code || medic?.licence_code,
      className: '',
    },
    diploma: { label: 'Diplôme:', value: therapist?.diploma, className: '' },
    experience: {
      label: 'Expérience:',
      value: therapist?.experience,
      className: '',
    },
    specialty: {
      label: 'Spécialité:',
      value: therapist?.specialty,
      className: '',
    },
    phoneNumber: {
      label: 'Numéro de téléphone:',
      value:
        therapist?.full_phone_number ||
        patient?.full_phone_number ||
        medic?.full_phone_number ||
        insurance?.full_phone_number,
      className: '',
    },
    description: {
      label: 'Description:',
      value: therapist?.description || affliction?.description,
      className: '',
    },
    address: {
      label: 'Adresse:',
      value: patient?.address || medic?.address || insurance?.address,
      className: '',
    },
    therapist: {
      label: 'Thérapeute:',
      value: patient?.therapist,
      className: '',
    },
    region: {
      label: 'Région concernée:',
      value: affliction?.body_region?.name,
      className: '',
    },
    insuranceCode: {
      label: 'Cotation:',
      value: affliction?.insurance_code,
      className: '',
    },
    operated: {
      label: 'Est opérée:',
      value: affliction?.is_operated ? 'Oui' : 'Non',
      className: '',
    },
    amcCode: { label: 'Code AMC:', value: insurance?.amc_code, className: '' },
  };

  const renderField = (fieldKey: keyof typeof fields, condition: boolean) => {
    if (condition) {
      const field = fields[fieldKey];
      return (
        <span key={fieldKey} className={field.className ?? ''}>
          {field.label}{' '}
          <span
            className={`italic font-normal ${fieldKey === 'status' ? getStatusClassName(field.value as string | undefined) : ''}`}
          >
            {field.value || 'N/A'}
          </span>
        </span>
      );
    }
    return null;
  };

  return (
    <div className="text-primaryBlue font-bold md:w-full">
      {isPageTitleOutput && (
        <h1 className="mb-4 text-xl md:text-4xl md:mb-6">
          Inspection{' '}
          {profileType === 'therapist'
            ? 'kinésithérapeute'
            : profileType === 'patient'
              ? 'patient'
              : profileType === 'medic'
                ? 'medic'
                : profileType === 'affliction'
                  ? 'affliction'
                  : "organisme d'assurance"}
        </h1>
      )}

      {(isProfileStatusOutput ||
        isProfileIdOutput ||
        isProfileNameOutput ||
        isProfileEmailOutput ||
        isProfileLicenceCodeOutput ||
        isTherapistDiplomaOutput ||
        isTherapistExperienceOutput ||
        isTherapistSpecialtyOutput ||
        isTherapistPhoneNumberOutput ||
        isTherapistDescriptionOutput ||
        isPatientAddressOutput ||
        isPatientPhoneNumberOutput ||
        isPatientTherapistOutput ||
        isAfflictionRegionOutput ||
        isAfflictionInsuranceCodeOutput ||
        isAfflictionOperatedOutput ||
        isAfflictionDescriptionOutput ||
        isMedicAddressOutput ||
        isMedicPhoneNumberOutput ||
        isMedicLicenceCodeOutput ||
        isInsuranceAddressOutput ||
        isInsuranceAMCCodeOutput ||
        isInsurancePhoneNumberOutput) && (
        <h4 className="mb-2">
          {renderField('status', !!isProfileStatusOutput)}
          {renderField('id', !!isProfileIdOutput)}
          {renderField('name', !!isProfileNameOutput)}
          {renderField('email', !!isProfileEmailOutput)}
          {renderField(
            'licenceCode',
            !!(isProfileLicenceCodeOutput || isMedicLicenceCodeOutput)
          )}
          {renderField('diploma', !!isTherapistDiplomaOutput)}
          {renderField('experience', !!isTherapistExperienceOutput)}
          {renderField('specialty', !!isTherapistSpecialtyOutput)}
          {renderField(
            'phoneNumber',
            !!(
              isTherapistPhoneNumberOutput ||
              isPatientPhoneNumberOutput ||
              isMedicPhoneNumberOutput ||
              isInsurancePhoneNumberOutput
            )
          )}
          {renderField(
            'description',
            !!(isTherapistDescriptionOutput || isAfflictionDescriptionOutput)
          )}
          {renderField(
            'address',
            !!(
              isPatientAddressOutput ||
              isMedicAddressOutput ||
              isInsuranceAddressOutput
            )
          )}
          {renderField('therapist', !!isPatientTherapistOutput)}
          {renderField('region', !!isAfflictionRegionOutput)}
          {renderField('insuranceCode', !!isAfflictionInsuranceCodeOutput)}
          {renderField('operated', !!isAfflictionOperatedOutput)}
          {renderField('amcCode', !!isInsuranceAMCCodeOutput)}
        </h4>
      )}

      {isPatientAgeGenderOutput && patient && (
        <div className="flex gap-6 items-center mb-2">
          <div className="md:text-2xl flex gap-1 items-center">
            <h4 className="font-bold">Age :</h4>
            <span className="italic font-normal">{patient.age ?? 'N/A'}</span>
          </div>
          <div className="flex gap-1 items-center">
            <h4 className="font-bold">Genre :</h4>
            <span className="italic font-normal">
              {patient.gender ?? 'N/A'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

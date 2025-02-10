import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

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
}: GeneralOutputProps) {
  return (
    <div className="text-primaryBlue font-bold">
      {isPageTitleOutput && (
        <h1 className="mb-4 text-xl md:text-4xl md:mb-6">
          Inspection{' '}
          {therapist
            ? 'kinésithérapeute'
            : patient
              ? 'patient'
              : medic
                ? 'medic'
                : affliction
                  ? 'affliction'
                  : insurance
                    ? "organisme d'assurance"
                    : ''}
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
        isMedicLicenceCodeOutput) && (
        <h4 className="mb-2">
          {isProfileStatusOutput && <span>Statut: </span>}
          {isProfileStatusOutput && (
            <span
              className={`italic p-2 rounded-md 
        ${therapist?.status === 'active' ? 'bg-green-300' : ''}
        ${therapist?.status === 'inactive' ? 'bg-gray-200' : ''}
        ${therapist?.status === 'pending' ? 'bg-yellow-300' : ''}
        ${therapist?.status === 'banned' ? 'bg-red-300' : ''}
        ${patient?.status === 'active' ? 'bg-green-300' : ''}
        ${patient?.status === 'inactive' ? 'bg-gray-200' : ''}
        ${patient?.status === 'pending' ? 'bg-yellow-300' : ''}
        ${patient?.status === 'banned' ? 'bg-red-300' : ''}
        ${!therapist && !patient ? 'bg-gray-200' : ''}`}
            >
              {(therapist?.status || patient?.status)?.toUpperCase() || 'N/A'}
            </span>
          )}
          <span>
            {isProfileIdOutput && '#ID:'}
            {isProfileNameOutput && 'Nom: '}
            {isProfileEmailOutput && 'E-mail: '}
            {(isProfileLicenceCodeOutput || isMedicLicenceCodeOutput) &&
              'Code ADELI: '}
            {isTherapistDiplomaOutput && 'Diplôme: '}
            {isTherapistExperienceOutput && 'Expérience: '}
            {isTherapistSpecialtyOutput && 'Spécialité: '}

            {(isTherapistDescriptionOutput || isAfflictionDescriptionOutput) &&
              'Description: '}
            {(isPatientAddressOutput || isMedicAddressOutput) && 'Adresse: '}
            {(isPatientPhoneNumberOutput ||
              isTherapistPhoneNumberOutput ||
              isMedicPhoneNumberOutput) &&
              'Numéro de téléphone: '}
            {isPatientTherapistOutput && 'Thérapeute: '}
            {isAfflictionRegionOutput && 'Région concernée: '}
            {isAfflictionInsuranceCodeOutput && 'Cotation: '}
            {isAfflictionOperatedOutput && 'Est opérée: '}
          </span>

          <span className="italic font-normal">
            {isProfileIdOutput &&
              (therapist
                ? therapist.id
                : patient
                  ? patient.id
                  : affliction
                    ? affliction.id
                    : medic
                      ? medic.id
                      : insurance
                        ? insurance.id
                        : '')}
            {isProfileNameOutput &&
              (therapist
                ? therapist.fullName
                : patient
                  ? patient.fullName
                  : medic
                    ? medic.fullName
                    : affliction
                      ? affliction.name
                      : insurance
                        ? insurance.name
                        : '')}
            {isProfileEmailOutput &&
              (therapist ? therapist.email : patient ? patient.email : '')}
            {isProfileLicenceCodeOutput &&
              (therapist ? therapist.licence_code : '')}
            {isTherapistDiplomaOutput && (therapist ? therapist.diploma : '')}
            {isTherapistExperienceOutput &&
              (therapist ? therapist.experience : '')}
            {isTherapistSpecialtyOutput &&
              (therapist ? therapist.specialty : '')}
            {isTherapistPhoneNumberOutput &&
              (therapist ? therapist.full_phone_number : '')}
            {isTherapistDescriptionOutput &&
              (therapist ? therapist.description : '')}
            {isPatientAddressOutput && (patient ? patient.address : '')}
            {isPatientPhoneNumberOutput &&
              (patient ? patient.full_phone_number : '')}
            {isPatientTherapistOutput && (patient ? patient.therapist : '')}
            {isAfflictionRegionOutput &&
              (affliction ? affliction.body_region?.name : '')}
            {isAfflictionInsuranceCodeOutput &&
              (affliction ? affliction.insurance_code : '')}
            {isAfflictionOperatedOutput &&
              (affliction ? (affliction.is_operated ? 'Oui' : 'Non') : '')}
            {isAfflictionDescriptionOutput &&
              (affliction ? affliction.description : '')}
            {isMedicAddressOutput && (medic ? medic.address : '')}
            {isMedicPhoneNumberOutput && (medic ? medic.full_phone_number : '')}
            {isMedicLicenceCodeOutput && (medic ? medic.licence_code : '')}
          </span>
        </h4>
      )}

      {isPatientAgeGenderOutput && (
        <div className="flex gap-6 items-center mb-2">
          <div className="md:text-2xl flex gap-1 items-center">
            <h4 className="font-bold ">Age :</h4>

            <span className="italic font-normal">{patient?.age ?? 'N/A'}</span>
          </div>

          <div className="flex gap-1 items-center">
            <h4 className="font-bold">Genre :</h4>

            <span className="italic font-normal">
              {patient?.gender ?? 'N/A'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

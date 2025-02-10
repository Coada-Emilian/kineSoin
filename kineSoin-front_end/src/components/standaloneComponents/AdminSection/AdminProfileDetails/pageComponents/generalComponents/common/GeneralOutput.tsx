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
  isTherapistDescriptionOutput?: boolean;
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
  isTherapistDescriptionOutput,
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
        {isProfileIdOutput && <span>#ID: </span>}
        {isProfileIdOutput && (
          <span className="italic font-normal">
            {therapist
              ? therapist.id
              : patient
                ? patient.id
                : affliction
                  ? affliction.id
                  : medic
                    ? medic.id
                    : insurance
                      ? insurance.id
                      : ''}
          </span>
        )}
        {isProfileNameOutput && <span>Nom: </span>}
        {isProfileNameOutput && (
          <span className="italic font-normal">
            {therapist
              ? therapist.fullName
              : patient
                ? patient.fullName
                : medic
                  ? medic.fullName
                  : affliction
                    ? affliction.name
                    : insurance
                      ? insurance.name
                      : ''}
          </span>
        )}
        {isProfileEmailOutput && <span>E-mail: </span>}
        {isProfileEmailOutput && (
          <span className="italic font-normal">
            {therapist ? therapist.email : ''}
            {patient ? patient.email : ''}
          </span>
        )}
        {isProfileLicenceCodeOutput && <span>Code ADELI: </span>}
        {isProfileLicenceCodeOutput && (
          <span className="italic font-normal">
            {therapist ? therapist.licence_code : ''}
          </span>
        )}
        {isTherapistDiplomaOutput && <span>Diplôme: </span>}
        {isTherapistDiplomaOutput && (
          <span className="italic font-normal">
            {therapist ? therapist.diploma : ''}
          </span>
        )}
        {isTherapistExperienceOutput && <span>Expérience: </span>}
        {isTherapistExperienceOutput && (
          <span className="italic font-normal">
            {therapist ? therapist.experience : ''}
          </span>
        )}
        {isTherapistSpecialtyOutput && <span>Spécialité: </span>}
        {isTherapistSpecialtyOutput && (
          <span className="italic font-normal">
            {therapist ? therapist.specialty : ''}
          </span>
        )}
        {isTherapistDescriptionOutput && <span>Description: </span>}
        {isTherapistDescriptionOutput && (
          <span className="italic font-normal">
            {therapist ? therapist.description : ''}
          </span>
        )}
      </h4>
    </div>
  );
}

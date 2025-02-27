import { useEffect, useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardTypes';

interface TitleOutputRefactorProps {
  //   entity:
  //     | ITherapist
  //     | IPatient
  //     | IAffliction
  //     | IMedic
  //     | IInsurance
  //     | null
  //     | undefined;
  entityType: string;
  //   isProfileStatusOutput?: boolean;
  //   isProfileIdOutput?: boolean;
  //   isProfileNameOutput?: boolean;
  //   isProfileEmailOutput?: boolean;
  //   isProfileLicenceCodeOutput?: boolean;
  //   isTherapistDiplomaOutput?: boolean;
  //   isTherapistExperienceOutput?: boolean;
  //   isTherapistSpecialtyOutput?: boolean;
  //   isTherapistPhoneNumberOutput?: boolean;
  //   isTherapistDescriptionOutput?: boolean;
  //   isPatientAgeGenderOutput?: boolean;
  //   isPatientAddressOutput?: boolean;
  //   isPatientPhoneNumberOutput?: boolean;
  //   isPatientTherapistOutput?: boolean;
  //   isAfflictionRegionOutput?: boolean;
  //   isAfflictionInsuranceCodeOutput?: boolean;
  //   isAfflictionOperatedOutput?: boolean;
  //   isAfflictionDescriptionOutput?: boolean;
  //   isMedicAddressOutput?: boolean;
  //   isMedicPhoneNumberOutput?: boolean;
  //   isMedicLicenceCodeOutput?: boolean;
  //   isInsuranceAddressOutput?: boolean;
  //   isInsurancePhoneNumberOutput?: boolean;
  //   isInsuranceAMCCodeOutput?: boolean;
}

export default function TitleOutputRefactor({
  entityType,
  //   entity,
  //   isProfileStatusOutput,
  //   isProfileIdOutput,
  //   isProfileNameOutput,
  //   isProfileEmailOutput,
  //   isProfileLicenceCodeOutput,
  //   isTherapistDiplomaOutput,
  //   isTherapistExperienceOutput,
  //   isTherapistSpecialtyOutput,
  //   isTherapistPhoneNumberOutput,
  //   isTherapistDescriptionOutput,
  //   isPatientAgeGenderOutput,
  //   isPatientAddressOutput,
  //   isPatientPhoneNumberOutput,
  //   isPatientTherapistOutput,
  //   isAfflictionRegionOutput,
  //   isAfflictionInsuranceCodeOutput,
  //   isAfflictionOperatedOutput,
  //   isAfflictionDescriptionOutput,
  //   isMedicAddressOutput,
  //   isMedicPhoneNumberOutput,
  //   isMedicLicenceCodeOutput,
  //   isInsuranceAddressOutput,
  //   isInsurancePhoneNumberOutput,
  //   isInsuranceAMCCodeOutput,
}: TitleOutputRefactorProps) {
  //   const profileType = therapist
  //     ? 'therapist'
  //     : patient
  //       ? 'patient'
  //       : medic
  //         ? 'medic'
  //         : affliction
  //           ? 'affliction'
  //           : insurance
  //             ? 'insurance'
  //             : '';



  //   const [therapistStatus, setTherapistStatus] = useState(
  //     therapist?.status || 'inactive'
  //   );
  //   const [patientStatus, setPatientStatus] = useState(
  //     patient?.status || 'inactive'
  //   );

  

  

  //   const fields = [
  //     {
  //       label: 'Statut:',
  //       value: (entity && 'status' in entity && entityStatus) || '',
  //       className: '',
  //     },
  //     {
  //       label: '#ID:',
  //       value: entity && entity.id,
  //       className: '',
  //     },
  //     {
  //       label: 'Nom:',
  //       value:
  //         entity && 'fullName' in entity
  //           ? entity.fullName
  //           : entity && entity.name,
  //       className: '',
  //     },
  //     {
  //       label: 'E-mail:',
  //       value: entity && 'email' in entity ? entity.email : '',
  //       className: '',
  //     },
  //     {
  //       label: 'Code ADELI:',
  //       value: entity && 'licence_code' in entity ? entity.licence_code : '',
  //       className: '',
  //     },
  //     {
  //       label: 'Diplôme:',
  //       value: entity && 'diploma' in entity && entity.diploma,
  //       className: '',
  //     },
  //     {
  //       label: 'Expérience:',
  //       value: entity && 'experience' in entity && entity.experience,
  //       className: '',
  //     },
  //     {
  //       label: 'Spécialité:',
  //       value: entity && 'specialty' in entity && entity.specialty,
  //       className: '',
  //     },
  //     {
  //       label: 'Numéro de téléphone:',
  //       value:
  //         entity && 'full_phone_number' in entity ? entity.full_phone_number : '',
  //       className: '',
  //     },
  //     {
  //       label: 'Description:',
  //       value: entity && 'description' in entity && entity.description,
  //       className: '',
  //     },
  //     {
  //       label: 'Adresse:',
  //       value: entity && 'address' in entity && entity.address,
  //       className: '',
  //     },
  //     {
  //       label: 'Thérapeute:',
  //       value: entity && 'therapist' in entity && entity.therapist,
  //       className: '',
  //     },
  //     {
  //       label: 'Région concernée:',
  //       value: entity && 'body_region' in entity && entity.body_region?.name,
  //       className: '',
  //     },
  //     {
  //       label: 'Cotation:',
  //       value: entity && 'insurance_code' in entity && entity.insurance_code,
  //       className: '',
  //     },
  //     {
  //       label: 'Est opérée:',
  //       value: entity && 'is_operated' in entity && entity.is_operated,
  //       className: '',
  //     },
  //     {
  //       label: 'Code AMC:',
  //       value: entity && 'amc_code' in entity && entity.amc_code,
  //       className: '',
  //     },
  //   ];

  //   const renderField = (fieldKey: keyof typeof fields) => {
  //     const field = fields[fieldKey];
  //     return (
  //       <span key={fieldKey}>
  //         {field.label}{' '}
  //         <span
  //           className={`italic font-normal ${fieldKey === 'status' ? getStatusClassName(field.value as string | undefined) : ''}`}
  //         >
  //           {field.value || 'N/A'}
  //         </span>
  //       </span>
  //     );
  //   };

  const entityDetails = [
    {
      entityType: 'therapist',
      title: 'Thérapeute',
    },
    { entityType: 'patient', title: 'Patient' },
    {
      entityType: 'affliction',
      title: 'Affliction',
    },
    { entityType: 'medic', title: 'Médecin' },
    {
      entityType: 'insurance',
      title: 'Assurance',
    },
  ];

  const activeEntity = entityDetails.find(
    (entityDetail) => entityDetail.entityType === entityType
  );

  return (
    <div className="text-primaryBlue font-bold md:w-full">
      <h1 className="mb-4 text-lg md:text-xl lg:text-2xl xl:text-3xl md:mb-6">
        Inspection {activeEntity?.title}
      </h1>

      {/* {entity && (
        <div className="flex flex-col gap-4 md:gap-6">
          {Object.entries(fields).map(([key, field]) =>
            field.value ? (
              <div key={key} className="flex gap-1 items-center">
                <h4 className="font-bold">{field.label}</h4>
                <span
                  className={`${field.value === entityStatus && getStatusClassName(entityStatus)} italic font-normal`}
                >
                  {field.value}
                </span>
              </div>
            ) : null
          )}
        </div>
      )} */}

      {/* {isProfileStatusOutput && (
        <div className="flex gap-1 items-center mb-2">
          <h4 className="font-bold">Statut :</h4>
          <span className={getStatusClassName(therapistStatus)}>
            {therapistStatus}
          </span>
        </div>
        
      )}

      {/* {isPatientAgeGenderOutput && patient && (
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
      )} */}
    </div>
  );
}

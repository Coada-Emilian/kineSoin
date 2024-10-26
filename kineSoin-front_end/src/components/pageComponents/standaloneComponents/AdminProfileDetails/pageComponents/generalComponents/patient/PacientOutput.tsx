import { useEffect, useState } from 'react';
import { IPatient } from '../../../../../../../@types/IPatient';

interface PatientOutputProps {
  patient: IPatient;
  isAddressOutput?: boolean;
  isPhoneNumberOutput?: boolean;
  isTherapistOutput?: boolean;
  isAgeGenderOutput?: boolean;
}

export default function PatientOutput({
  patient,
  isAddressOutput,
  isPhoneNumberOutput,
  isTherapistOutput,
  isAgeGenderOutput,
}: PatientOutputProps) {
  const [gender, setGender] = useState<string>('');

  useEffect(() => {
    if (patient.gender === 'male') {
      setGender('Homme');
    } else if (patient.gender === 'female') {
      setGender('Femme');
    } else {
      setGender('Autre');
    }
  }, [patient]);

  return (
    <section className="mb-2 md:text-2xl">
      {isAgeGenderOutput ? (
        <div className="flex gap-6 items-center">
          <div className="md:text-2xl flex gap-1 items-center">
            <h4 className="font-bold ">Age :</h4>
            <span className="italic font-normal">{patient.age}</span>
          </div>

          <div className="flex gap-1 items-center">
            <h4 className="font-bold">Genre :</h4>
            <span className="italic font-normal">{gender}</span>
          </div>
        </div>
      ) : (
        <div className="md:text-2xl">
          <h4 className="font-bold">
            {isAddressOutput
              ? 'Adresse :'
              : isPhoneNumberOutput
                ? 'Numéro de téléphone :'
                : isTherapistOutput
                  ? 'Thérapeute'
                  : ''}
          </h4>

          <span className="italic font-normal">
            {isAddressOutput
              ? patient.address
              : isPhoneNumberOutput
                ? patient.phone_number
                : isTherapistOutput
                  ? patient.therapist
                  : ''}
          </span>
        </div>
      )}
    </section>
  );
}

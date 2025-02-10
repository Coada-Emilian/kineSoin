import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface AdminTextInputProps {
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
  isProfileNameInput?: boolean;
  isProfileSurnameInput?: boolean;
  isTherapistLicenceCodeInput?: boolean;
  isTherapistiplomaInput?: boolean;
  isTherapistExperienceInput?: boolean;
  isTherapistSpecialityInput?: boolean;
  isTherapistDescriptionInput?: boolean;
}

export default function AdminTextInput({
  therapist,
  affliction,
  medic,
  insurance,
  isProfileNameInput,
  isProfileSurnameInput,
  isTherapistLicenceCodeInput,
  isTherapistiplomaInput,
  isTherapistExperienceInput,
  isTherapistSpecialityInput,
  isTherapistDescriptionInput,
}: AdminTextInputProps) {
  return (
    <div className="flex gap-2 items-center ">
      {isProfileNameInput && (
        <>
          <label
            htmlFor={`${
              therapist
                ? 'therapist_name'
                : affliction
                  ? 'affliction_name'
                  : medic
                    ? 'medic_name'
                    : insurance
                      ? 'insurance_name'
                      : ''
            }`.trim()}
            className="font-semibold"
          >
            Nom :
          </label>

          <input
            type="text"
            name="name"
            id={`${
              therapist
                ? 'therapist_name'
                : affliction
                  ? 'affliction_name'
                  : medic
                    ? 'medic_name'
                    : insurance
                      ? 'insurance_name'
                      : ''
            }`.trim()}
            className="border-2 border-gray-300 rounded-md px-2 italic"
            placeholder={
              (therapist
                ? therapist.name
                : affliction
                  ? affliction.name
                  : medic
                    ? medic.name
                    : insurance
                      ? insurance.name
                      : '') || 'Nom'
            }
          />
        </>
      )}

      {isProfileSurnameInput && (
        <>
          <label
            htmlFor={`${
              therapist ? 'therapist_surname' : medic ? 'medic_surname' : ''
            }`}
            className="font-semibold"
          >
            Prénom :
          </label>

          <input
            type="text"
            name="surname"
            id={`${therapist ? 'therapist_surname' : medic ? 'medic_surname' : ''}`}
            className="border-2 border-gray-300 rounded-md px-2 italic"
            placeholder={
              therapist ? therapist.surname : medic ? medic.surname : ''
            }
          />
        </>
      )}
    </div>
  );
}

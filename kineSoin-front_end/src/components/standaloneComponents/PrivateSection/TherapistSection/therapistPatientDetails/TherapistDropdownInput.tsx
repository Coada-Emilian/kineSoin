import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { StandardDropdownInputRefactor } from '../../../generalComponents/standardInputs/newInputs';

interface TherapistDropdownInputProps {
  therapistId: number;
  therapistFullName: string;
  therapists: IUserProfile[];
}
export default function TherapistDropdownInput(
  props: TherapistDropdownInputProps
) {
  const remainingTherapists = props.therapists.filter(
    (therapist) => therapist.id !== props.therapistId
  );
  return (
    <StandardDropdownInputRefactor
      dropdownInput={{
        id: 'therapistDropdown',
        labelName: 'Thérapeute: ',
        name: 'therapist',
        value: props.therapistId.toString(),
        isRequired: true,
        isFlexRow: true,
        isLabelNormal: true,
        additionalDivClassName: 'mb-2 flex',
        additionalLabelClassName:
          'text-primaryBlue font-semibold text-xs md:text-sm lg:text-base xl:text-lg',
        allOptions: {
          startingOption: {
            value: props.therapistId.toString(),
            text: props.therapistFullName,
          },
          options: remainingTherapists.map((therapist) => ({
            key: therapist.id.toString(),
            value: therapist.id.toString(),
            text: therapist.fullName ?? '',
          })),
        },
      }}
    />
  );
}

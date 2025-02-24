import StandardChoiceDropdown from "../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput";
import StandardEmailInput from "../../../../../../generalComponents/StandardInputs/StandardEmailInput";
import StandardPasswordInput from "../../../../../../generalComponents/StandardInputs/StandardPasswordInput";

export default function ThirdAddTherapistModal() {
  return (
    <>
      <StandardEmailInput isAdminTherapistAddEmailInput />

      <StandardPasswordInput isAdminTherapistAddPasswordInput />

      <StandardPasswordInput isAdminTherapistAddRepeatedPasswordInput />
      
      <StandardChoiceDropdown isAdminTherapistAddStatusInput />
    </>
  );
}

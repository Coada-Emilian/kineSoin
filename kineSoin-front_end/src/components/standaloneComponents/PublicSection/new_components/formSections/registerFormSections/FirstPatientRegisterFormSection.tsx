import StandardDateInput from '../../../../generalComponents/StandardInputs/StandardDateInput';
import StandardTextInput from '../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import StandardDropdownInput from '../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTextInputRefactor from '../../../../generalComponents/StandardInputs/standardTextFields/standardTextInputRefactor';

export default function FirstPatientRegisterFormSection() {
  return (
    <>
      <StandardTextInputRefactor
        textInput={{
          inputId: 'patient-register-name_input',
          labelName: 'Nom',
          inputName: 'name',
          inputPlaceholder: 'Entrez votre nom',
          isRequired: true,
          autoComplete: 'name',
        }}
      />

      <StandardTextInputRefactor
        textInput={{
          inputId: 'patient-register-birthName_input',
          labelName: 'Nom de naissance',
          inputName: 'birth_name',
          inputPlaceholder: 'Entrez votre nom de naissance',
          isRequired: true,
          autoComplete: 'birth-name',
        }}
      />

      <StandardTextInputRefactor
        textInput={{
          inputId: 'patient-register-surname_input',
          labelName: 'Prénom',
          inputName: 'surname',
          inputPlaceholder: 'Entrez votre prénom',
          isRequired: true,
          autoComplete: 'surname',
        }}
      />

      <StandardDateInput isPatientRegisterBirthdateInput />

      <StandardDropdownInput isGenderDropdownInput />
    </>
  );
}

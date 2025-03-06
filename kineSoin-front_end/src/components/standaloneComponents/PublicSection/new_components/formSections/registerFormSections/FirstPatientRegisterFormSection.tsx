import StandardTextInputRefactor from '../../../../generalComponents/StandardInputs/standardTextFields/standardTextInputRefactor';
import StandardDateInputRefactor from '../../../../generalComponents/StandardInputs/StandardDateInputRefactor';
import StandardDropdownInputRefactor from '../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInputRefactor';

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

      <StandardDateInputRefactor
        dateInput={{
          inputId: 'patient-register-birthdate_input',
          labelName: 'Date de naissance',
          inputName: 'birth_date',
          isRequired: true,
        }}
      />

      <StandardDropdownInputRefactor
        dropdownInput={{
          inputId: 'patient-register-gender_input',
          labelName: 'Genre',
          inputName: 'gender',
          isRequired: true,
          allOptions: {
            startingOption: {
              value: '',
              text: 'Sélectionnez votre genre',
            },
            options: [
              {
                value: 'male',
                text: 'Homme',
              },
              {
                value: 'female',
                text: 'Femme',
              },
              {
                value: 'other',
                text: 'Autre',
              },
            ],
          },
        }}
      />
    </>
  );
}

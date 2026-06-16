import DateInput from '../../../../ui/inputs/DateInput';
import DropdownInput from '../../../../ui/inputs/DropdownInput';
import TextInput from '../../../../ui/inputs/TextInput';

export default function FirstPatientRegisterFormSection() {
  return (
    <>
      <TextInput
        input={{
          id: 'patient-register-name_input',
          labelName: 'Nom',
          name: 'name',
          placeholder: 'Entrez votre nom',
          isRequired: true,
          autoComplete: 'name',
        }}
      />

      <TextInput
        input={{
          id: 'patient-register-birthName_input',
          labelName: 'Nom de naissance',
          name: 'birth_name',
          placeholder: 'Entrez votre nom de naissance',
          isRequired: true,
          autoComplete: 'birth-name',
        }}
      />

      <TextInput
        input={{
          id: 'patient-register-surname_input',
          labelName: 'Prénom',
          name: 'surname',
          placeholder: 'Entrez votre prénom',
          isRequired: true,
          autoComplete: 'surname',
        }}
      />

      <DateInput
        input={{
          id: 'patient-register-birthdate_input',
          labelName: 'Date de naissance',
          name: 'birth_date',
          isRequired: true,
          autoComplete: 'birth-date',
        }}
      />

      <DropdownInput
        input={{
          id: 'patient-register-gender_input',
          labelName: 'Genre',
          name: 'gender',
          isRequired: true,
          autoComplete: 'gender',
          allOptions: {
            startingOption: {
              value: '',
              text: 'Sélectionnez votre genre',
            },
            options: [
              {
                key: '1',
                value: 'male',
                text: 'Homme',
              },
              {
                key: '2',
                value: 'female',
                text: 'Femme',
              },
              {
                key: '3',
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

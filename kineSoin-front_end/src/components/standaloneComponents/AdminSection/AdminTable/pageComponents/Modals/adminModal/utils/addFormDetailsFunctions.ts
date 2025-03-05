import { IAddForm } from '../../../../../../../../@types/formInterfaces';

interface addFormDetailsProps {
  therapistImageFile?: File | null;
  setError: (message: string | null) => void;
  setIsAddTherapistModalP1Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP3Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdminTherapistFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddForm) => void;
}

export const addFirstFormDetails = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    therapistImageFile,
    setError,
    setIsAddTherapistModalP1Open,
    setIsAddTherapistModalP2Open,
    setAddForm,
  }: addFormDetailsProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const therapistName = formData.get('name') as string;
    const therapistSurname = formData.get('surname') as string;
    const therapistLicenceCode = formData.get('licence_code') as string;
    const file = therapistImageFile;

    // Field Validation
    if (!therapistName || !therapistSurname || !therapistLicenceCode) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (!file) {
      setError('Veuillez ajouter une photo.');
      return;
    }
    if (!/^[0-9]{9}$/.test(therapistLicenceCode)) {
      setError('Le code ADELI doit être composé de 9 chiffres.');
      return;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(therapistName)) {
      setError('Le nom ne doit contenir que des lettres et des espaces.');
      return;
    }
    if (
      !/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(therapistSurname)
    ) {
      setError('Le prénom ne doit contenir que des lettres et des espaces.');
      return;
    }

    setAddForm({
      name: therapistName,
      surname: therapistSurname,
      email: '',
      password: '',
      repeated_password: '',
      description: '',
      diploma: '',
      experience: '',
      specialty: '',
      licence_code: therapistLicenceCode,
      status: '',
      photo: file,
      prefix: '',
      phone_number: '',
      full_phone_number: '',
    });

    setIsAddTherapistModalP1Open && setIsAddTherapistModalP1Open(false);
    setIsAddTherapistModalP2Open && setIsAddTherapistModalP2Open(true);
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    return;
  }
};

export const addSecondFormDetails = (
  e: React.FormEvent<HTMLFormElement>,
  {
    setError,
    setIsAddTherapistModalP2Open,
    setIsAddTherapistModalP3Open,
    setAddForm,
  }: addFormDetailsProps
) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const therapistDiploma = formData.get('diploma') as string;
    const therapistExperience = formData.get('experience') as string;
    const therapistSpecialty = formData.get('specialty') as string;
    const therapistPrefix = formData.get('prefix') as string;
    const therapistTelephone = formData.get('phone_number') as string;
    const therapistDescription = formData.get('description') as string;

    if (
      !therapistDiploma ||
      !therapistExperience ||
      !therapistSpecialty ||
      !therapistDescription ||
      !therapistPrefix ||
      !therapistTelephone
    ) {
      setError('Veuillez remplir tous les champs.');
      return;
    } else if (therapistDiploma.length > 100) {
      setError('Le diplôme ne doit pas dépasser 100 caractères.');
      return;
    } else if (therapistExperience.length > 100) {
      setError("L'expérience ne doit pas dépasser 100 caractères.");
      return;
    } else if (therapistSpecialty.length > 100) {
      setError('La spécialité ne doit pas dépasser 100 caractères.');
      return;
    } else if (therapistDescription.length > 500) {
      setError('La description ne doit pas dépasser 500 caractères.');
      return;
    } else if (therapistPrefix.length > 10) {
      setError('Le préfixe ne doit pas dépasser 10 caractères.');
      return;
    } else if (therapistTelephone.length > 15) {
      setError('Le numéro de téléphone ne doit pas dépasser 15 caractères.');
      return;
    } else if (!/^\d+$/.test(therapistTelephone)) {
      setError('Le numéro de téléphone ne doit contenir que des chiffres.');
      return;
    }

    const fullPhoneNUmber = `${therapistPrefix}${therapistTelephone}`;

    setAddForm((prev) => ({
      ...prev,
      description: therapistDescription,
      diploma: therapistDiploma,
      experience: therapistExperience,
      specialty: therapistSpecialty,
      prefix: therapistPrefix,
      phone_number: therapistTelephone,
      full_phone_number: fullPhoneNUmber,
    }));
    setIsAddTherapistModalP2Open && setIsAddTherapistModalP2Open(false);
    setIsAddTherapistModalP3Open && setIsAddTherapistModalP3Open(true);
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    return;
  }
};

export const addThirdFormDetails = async (
  e: React.FormEvent<HTMLFormElement>,
  { setError, setIsAdminTherapistFormValid, setAddForm }: addFormDetailsProps
) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const therapistEmail = formData.get('email') as string;
    const therapistPassword = formData.get('password') as string;
    const therapistRepeatedPassword = formData.get(
      'repeated_password'
    ) as string;
    const therapistStatus = formData.get('status') as string;

    if (
      !therapistEmail ||
      !therapistPassword ||
      !therapistRepeatedPassword ||
      !therapistStatus
    ) {
      setError('Veuillez remplir tous les champs.');
      return;
    } else if (therapistPassword.length < 12) {
      setError('Le mot de passe doit contenir au moins 12 caractères.');
      return;
    } else if (!/(?=.*[a-z])/.test(therapistPassword)) {
      setError('Le mot de passe doit contenir au moins une minuscule.');
      return;
    } else if (!/(?=.*[A-Z])/.test(therapistPassword)) {
      setError('Le mot de passe doit contenir au moins une majuscule.');
      return;
    } else if (!/(?=.*\d)/.test(therapistPassword)) {
      setError('Le mot de passe doit contenir au moins un chiffre.');
      return;
    } else if (!/(?=.*\W)/.test(therapistPassword)) {
      setError('Le mot de passe doit contenir au moins un caractère spécial.');
      return;
    } else if (therapistPassword !== therapistRepeatedPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(therapistEmail)
    ) {
      setError("L'email n'est pas valide.");
      return;
    }

    setAddForm &&
      setAddForm((prev) => ({
        ...prev,
        email: therapistEmail,
        password: therapistPassword,
        repeated_password: therapistRepeatedPassword,
        status: therapistStatus,
      }));

    setIsAdminTherapistFormValid && setIsAdminTherapistFormValid(true);
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    return;
  }
};

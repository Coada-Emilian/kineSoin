import { IAddForm } from '../../../../../../@types/interfaces/customInterfaces';

interface addFormDetailsProps {
  setError: (message: string | null) => void;
  setIsAdminTherapistFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddForm | any) => void;
}

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
      setAddForm((prev: IAddForm) => ({
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

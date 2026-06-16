export const validateLoginForm = (email: string, password: string) => {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    throw new Error('Veuillez remplir tous les champs');
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmedEmail)) {
    throw new Error('Veuillez entrer une adresse email valide');
  }

  return true;
};

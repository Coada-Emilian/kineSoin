export const validateTherapistLoginForm = (email: string, password: string) => {
  if (!email || !password) {
    throw new Error('Veuillez remplir tous les champs');
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    throw new Error('Veuillez entrer une adresse email valide');
  }

  return true;
};

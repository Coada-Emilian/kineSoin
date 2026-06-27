export const getEntityFrenchGender = (gender: string | undefined): string => {
  if (gender === 'male') return 'Masculin';
  if (gender === 'female') return 'Féminin';
  return 'Autre';
};

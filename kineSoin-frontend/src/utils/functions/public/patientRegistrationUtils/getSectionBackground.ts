import type { FormOrderTypes } from '../../../../@types/types/formTypes';

export const getSectionBackground = (formOrder: FormOrderTypes) => {
  switch (formOrder) {
    case 'first':
      return "bg-[url('/images/patientRegisterFirstForm_mainAlt.webp')]";
    case 'second':
      return "bg-[url('/images/patientRegisterSecondForm_main.webp')]";
    case 'third':
      return "bg-[url('/images/patientRegisterThirdForm_main.webp')]";
    default:
      return "bg-[url('/images/confirmationPage.webp')]";
  }
};

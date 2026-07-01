import { useMutation } from '@tanstack/react-query';
import { IFormOrders } from '../../../../@types/types/componentTypes';

export const usePatientRegisterFormMutation = (
  formOrder: IFormOrders,
  patientImage: Blob | null
) => {
  return useMutation({
    mutationKey: ['patientRegister', formOrder],
    mutationFn: async (formData: FormData) => {
      if (!formData) {
        throw new Error('Form data is required');
      } else if (formOrder === 'first') {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

        const patientName = formData.get('name') as string;
        const patientBirthName = formData.get('birth_name') as string;
        const patientSurname = formData.get('surname') as string;
        const patientBirthDate = formData.get('birth_date') as string;
        const patientGender = formData.get('gender') as string;

        // Check if the name, birth name and surname fields are empty
        if (
          !patientName ||
          !patientBirthName ||
          !patientSurname ||
          !patientBirthDate ||
          !patientGender
        ) {
          throw new Error('Veuillez remplir tous les champs');
        } else if (patientBirthDate > currentDate.toISOString().split('T')[0]) {
          throw new Error('Veuillez entrer une date valide');
        } else if (patientBirthDate < '1900-01-01') {
          throw new Error(
            'Veuillez entrer une date de naissance valide (après 1900)'
          );
        } else if (
          !nameRegex.test(patientName as string) ||
          !nameRegex.test(patientBirthName as string) ||
          !nameRegex.test(patientSurname as string)
        ) {
          throw new Error(
            'Le nom, le prénom et le nom de naissance ne doivent contenir que des lettres.'
          );
        }
        // Check if the patient is under 12 years old
        else {
          const age = currentYear - Number(patientBirthDate.split('-')[0]);
          if (age < 12) {
            throw new Error(
              'Vous devez avoir au moins 12 ans pour vous inscrire'
            );
          }
        }

        const sentData = {
          name: patientName,
          birth_name: patientBirthName,
          surname: patientSurname,
          birth_date: patientBirthDate,
          gender: patientGender,
        };
        return sentData;
      } else if (formOrder === 'second') {
        const patientPostalCode = formData.get('postal_code') as string;
        const patientCity = formData.get('city') as string;
        const patientStreetNumber = formData.get('street_number') as string;
        const patientStreetName = formData.get('street_name') as string;
        const patientPhoneNumber = formData.get('phone_number') as string;
        const patientPrefix = formData.get('prefix') as string;

        if (
          !patientPostalCode ||
          !patientCity ||
          !patientStreetNumber ||
          !patientStreetName ||
          !patientPhoneNumber ||
          !patientPrefix
        ) {
          throw new Error('Veuillez remplir tous les champs');
        } else if (!/^\d{5}$/.test(patientPostalCode)) {
          throw new Error('Veuillez entrer un code postal valide');
        } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(patientCity)) {
          throw new Error('Veuillez entrer un nom de ville valide');
        } else if (!/^\d+$/.test(patientStreetNumber)) {
          throw new Error('Veuillez entrer un numéro de rue valide');
        } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(patientStreetName)) {
          throw new Error('Veuillez entrer un nom de rue valide');
        } else if (!/^\+?\d{1,15}$/.test(patientPhoneNumber)) {
          throw new Error(
            "Veuillez entrer un numéro de téléphone valide (+ et jusqu'à 15 chiffres)"
          );
        } else {
          // Create an object with the form data
          const fullPhoneNumber = `${patientPrefix}${patientPhoneNumber}`;
          const sentData = {
            street_number: patientStreetNumber,
            street_name: patientStreetName,
            postal_code: patientPostalCode,
            city: patientCity,
            prefix: patientPrefix,
            phone_number: patientPhoneNumber,
            full_phone_number: fullPhoneNumber,
          };

          return sentData;
        }
      } else if (formOrder === 'third') {
        const patientEmail = formData.get('email') as string;
        const patientPassword = formData.get('password') as string;
        const patientConfirmPassword = formData.get(
          'confirm-password'
        ) as string;

        if (
          !patientImage ||
          !patientEmail ||
          !patientPassword ||
          !patientConfirmPassword
        ) {
          throw new Error('Veuillez remplir tous les champs');
        } else if (patientPassword !== patientConfirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        } else if (patientPassword.length < 12) {
          throw new Error(
            'Le mot de passe doit contenir au moins 12 caractères'
          );
        } else if (
          !/\d/.test(patientPassword) ||
          !/[a-z]/.test(patientPassword) ||
          !/[A-Z]/.test(patientPassword)
        ) {
          throw new Error(
            'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre'
          );
        } else if (
          !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(patientEmail)
        ) {
          throw new Error('Veuillez entrer une adresse email valide');
        } else {
          const sentData = {
            email: patientEmail,
            password: patientPassword,
            repeated_password: patientConfirmPassword,
            photo: patientImage,
          };
          return sentData;
        }
      } else {
        return;
      }
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};

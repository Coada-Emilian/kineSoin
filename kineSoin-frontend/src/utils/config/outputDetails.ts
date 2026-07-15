import addressIcon from '/icons/address.png';
import adherentIcon from '/icons/adherent.png';
import afflictionIcon from '/icons/affliction2.png';
import statusIcon from '/icons/approve.png';
import regionIcon from '/icons/body-check.png';
import cakeIcon from '/icons/cake.png';
import contractIcon from '/icons/contract.png';
import descriptionIcon from '/icons/description.png';
import educationIcon from '/icons/education.png';
import readIcon from '/icons/envelope.png';
import genderIcon from '/icons/equality.png';
import experienceIcon from '/icons/experience.png';
import homeIcon from '/icons/home.png';
import codeIcon from '/icons/id-card.png';
import idIcon from '/icons/id.png';
import insuranceIcon from '/icons/insurance2.png';
import medicIcon from '/icons/medic.png';
import patientIcon from '/icons/patient2.png';
import specialtyIcon from '/icons/quality.png';
import { default as dateIcon, default as validIcon } from '/icons/schedule.png';
import phoneIcon from '/icons/smartphone.png';
import surgeryIcon from '/icons/surgery.png';
import userIcon from '/icons/user.png';

export const outputDetails = [
  {
    type: 'status',
    icon: statusIcon,
    iconAlt: 'status',
    label: 'Statut :',
  },
  {
    type: 'id',
    icon: idIcon,
    iconAlt: 'id',
    label: 'ID :',
  },
  {
    type: 'age',
    icon: cakeIcon,
    iconAlt: 'age',
    label: 'Âge :',
  },
  {
    type: 'gender',
    icon: genderIcon,
    iconAlt: 'gender',
    label: 'Genre :',
  },
  {
    type: 'email',
    icon: readIcon,
    iconAlt: 'email',
    label: 'Email :',
  },
  {
    type: 'telephone',
    icon: phoneIcon,
    iconAlt: 'telephone',
    label: 'Téléphone :',
  },
  {
    type: 'address',
    icon: addressIcon,
    iconAlt: 'address',
    label: 'Adresse :',
  },
  {
    type: 'amc_code',
    icon: codeIcon,
    iconAlt: 'code amc',
    label: 'Code AMC :',
  },
  {
    type: 'insurance_code',
    icon: codeIcon,
    iconAlt: 'code assurance',
    label: 'Code Assurance :',
  },
  {
    type: 'licence_code',
    icon: codeIcon,
    iconAlt: 'code adeli',
    label: 'Code ADELI :',
  },
  {
    type: 'body_region',
    icon: regionIcon,
    iconAlt: 'Region corps',
    label: 'Region corps :',
  },
  {
    type: 'is_operated',
    icon: surgeryIcon,
    iconAlt: 'est opérée?',
    label: 'Est opérée? :',
  },

  {
    type: 'diploma',
    icon: educationIcon,
    iconAlt: 'Diplôme',
    label: 'Diplôme :',
  },
  {
    type: 'experience',
    icon: experienceIcon,
    iconAlt: 'Experience',
    label: 'Experience :',
  },
  {
    type: 'specialty',
    icon: specialtyIcon,
    iconAlt: 'Spécialité',
    label: 'Spécialité :',
  },
  {
    type: 'description',
    icon: descriptionIcon,
    iconAlt: 'description',
    label: 'Description :',
  },
  {
    type: 'name',
    icon: userIcon,
    iconAlt: 'Nom',
    label: 'Nom :',
  },
  {
    type: 'date',
    icon: dateIcon,
    iconAlt: 'date',
    label: 'Date :',
  },
  {
    type: 'medic',
    icon: medicIcon,
    iconAlt: 'medic',
    label: 'Médecin :',
  },
  {
    type: 'affliction',
    icon: afflictionIcon,
    iconAlt: 'affliction',
    label: 'Affection :',
  },
  {
    type: 'patient',
    icon: patientIcon,
    iconAlt: 'patient',
    label: 'Patient :',
  },
  {
    type: 'home',
    icon: homeIcon,
    iconAlt: 'home',
    label: 'Soins à domicile :',
  },
  {
    type: 'insurance',
    icon: insuranceIcon,
    iconAlt: 'insurance',
    label: 'Mutuelle :',
  },
  {
    type: 'adherent',
    icon: adherentIcon,
    iconAlt: 'adherent',
    label: 'N° Adhérent :',
  },
  {
    type: 'contract',
    icon: contractIcon,
    iconAlt: 'contract',
    label: 'N° Contrat :',
  },
  {
    type: 'validity',
    icon: validIcon,
    iconAlt: 'valid',
    label: "Valide jusqu'au :",
  },
];

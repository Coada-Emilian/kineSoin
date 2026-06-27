import type { IAdminEditedEntity } from '../../../../@types/interfaces/customInterfaces';
import type {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/interfaces/modelInterfaces';

export const mapEntityToEditedEntity = (
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance
): IAdminEditedEntity => {
  return {
    name: 'name' in entity ? entity.name : '',
    surname: 'surname' in entity ? (entity.surname ?? '') : '',
    age: 'age' in entity ? String(entity.age ?? '') : '',
    gender: 'gender' in entity ? (entity.gender ?? '') : '',
    email: 'email' in entity ? (entity.email ?? '') : '',
    status: 'status' in entity ? (entity.status ?? '') : '',

    prefix: 'prefix' in entity ? (entity.prefix ?? '') : '',
    phone_number: 'phone_number' in entity ? (entity.phone_number ?? '') : '',

    licence_code: 'licence_code' in entity ? (entity.licence_code ?? '') : '',

    diploma: 'diploma' in entity ? (entity.diploma ?? '') : '',

    amc_code: 'amc_code' in entity ? (entity.amc_code ?? '') : '',

    specialty: 'specialty' in entity ? (entity.specialty ?? '') : '',

    experience: 'experience' in entity ? String(entity.experience ?? '') : '',

    description: 'description' in entity ? (entity.description ?? '') : '',

    street_number:
      'street_number' in entity ? (entity.street_number ?? '') : '',

    street_name: 'street_name' in entity ? (entity.street_name ?? '') : '',

    city: 'city' in entity ? (entity.city ?? '') : '',

    postal_code: 'postal_code' in entity ? (entity.postal_code ?? '') : '',

    insurance_code:
      'insurance_code' in entity ? (entity.insurance_code ?? '') : '',

    picture_url: 'picture_url' in entity ? (entity.picture_url ?? '') : '',

    // "If this entity has a body_region property, put its value into my edited entity. If that value is null, store undefined instead. If the entity doesn't have the property, store undefined."

    body_region:
      'body_region' in entity ? (entity.body_region ?? undefined) : undefined,

    is_operated:
      'is_operated' in entity
        ? entity.is_operated === true
          ? 'Oui'
          : 'Non'
        : '',
  };
};

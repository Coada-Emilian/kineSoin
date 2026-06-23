import type {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../@types/interfaces/modelInterfaces';
import type {
  IAdminEntities,
  IAdminEntity,
} from '../../../../../@types/types/adminTypes';
import { renderAfflictions } from './renderAfflictions';
import { renderInsurances } from './renderInsurances';
import { renderMedics } from './renderMedics';
import { renderPatients } from './renderPatients';
import { renderTherapists } from './renderTherapists';

export function renderAdminEntities({
  entityType,
  entities,
  setRenderedEntities,
  entityStatus,
}: {
  entityType: string;
  entities: IAdminEntities;
  setRenderedEntities: React.Dispatch<React.SetStateAction<IAdminEntity>>;
  entityStatus: string;
}) {
  switch (entityType) {
    case 'therapist':
      setRenderedEntities(
        renderTherapists(entities as ITherapist[], entityStatus)
      );
      break;

    case 'patient':
      setRenderedEntities(renderPatients(entities as IPatient[], entityStatus));
      break;

    case 'affliction':
      setRenderedEntities(
        renderAfflictions(entities as IAffliction[], entityStatus)
      );
      break;

    case 'medic':
      setRenderedEntities(renderMedics(entities as IMedic[]));
      break;

    case 'insurance':
      setRenderedEntities(renderInsurances(entities as IInsurance[]));
      break;

    default:
      break;
  }
}

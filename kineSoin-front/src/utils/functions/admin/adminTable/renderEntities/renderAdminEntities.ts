import type { IAdminEntity } from '../../../../../@types/interfaces/customInterfaces';
import type {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../@types/interfaces/modelInterfaces';
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
  entities: unknown[];
  setRenderedEntities: React.Dispatch<React.SetStateAction<IAdminEntity[]>>;
  entityStatus: string;
}) {
  switch (entityType) {
    case 'therapist':
      renderTherapists(
        entities as ITherapist[],
        setRenderedEntities as React.Dispatch<
          React.SetStateAction<ITherapist[]>
        >,
        entityStatus
      );
      break;

    case 'patient':
      renderPatients(
        entities as IPatient[],
        setRenderedEntities as React.Dispatch<React.SetStateAction<IPatient[]>>,
        entityStatus
      );
      break;

    case 'affliction':
      renderAfflictions(
        entities as IAffliction[],
        setRenderedEntities as React.Dispatch<
          React.SetStateAction<IAffliction[]>
        >,
        entityStatus
      );
      break;

    case 'medic':
      renderMedics(
        entities as IMedic[],
        setRenderedEntities as React.Dispatch<React.SetStateAction<IMedic[]>>
      );
      break;

    case 'insurance':
      renderInsurances(
        entities as IInsurance[],
        setRenderedEntities as React.Dispatch<
          React.SetStateAction<IInsurance[]>
        >
      );
      break;

    default:
      break;
  }
}

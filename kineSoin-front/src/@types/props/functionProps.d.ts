import type { IAdminEntityTypes } from '../types/adminTypes';
import type { FormOrderTypes } from '../types/formTypes';

export interface HandleFileChangeFunctionProps {
  setFileName?: React.Dispatch<React.SetStateAction<string>>;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  setPreviewUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setPrescriptionScan?: React.Dispatch<React.SetStateAction<File | null>>;
  setTherapistImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

interface GetFormElementFunctionProps {
  formOrder: FormOrderTypes;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface FetchAdminTableDataFunctionProps {
  entityType: IAdminEntityTypes;
}

export interface FetchAdminEntityDetailsFunctionProps {
  entityType: IAdminEntityTypes;
  entity_id: number | null;
}

export interface GetAdminTableDetailsFunctionProps {
  entityStatus: string;
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface UseDeleteEntityFunctionProps {
  entityType: string;
  id: number;
}

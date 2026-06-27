import type { IAdminEntities, IAdminEntityTypes } from '../types/adminTypes';
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

export interface RenderAdminEntitiesFunctionProps {
  entityType: string;
  entities: IAdminEntities;
  setRenderedEntities: React.Dispatch<React.SetStateAction<IAdminEntity>>;
  entityStatus: string;
}

export interface HandleAddTherapistStepOneSubmitFunctionProps {
  therapistImage?: File | null;
  setError: (message: string | null) => void;
  setIsAddTherapistModalP1Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddTherapistFormData) => void;
}

export interface ValidateStepOneFormFunctionProps {
  name: string;
  surname: string;
  licence_code: string;
  file: File | null | undefined;
}

export interface HandleAddTherapistStepTwoSubmitFunctionProps {
  setError: (message: string | null) => void;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP3Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddTherapistFormData) => void;
}

export interface ValidateStepTwoFormFunctionProps {
  diploma: string;
  experience: string;
  specialty: string;
  description: string;
}

export interface HandleAddTherapistStepThreeSubmitFunctionProps {
  setError: (message: string | null) => void;
  setIsAdminTherapistFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddTherapistFormData) => void;
}

export interface ValidateStepThreeFormFunctionProps {
  email: string;
  password: string;
  repeated_password: string;
  status: string;
  prefix: string;
  phone_number: string;
}

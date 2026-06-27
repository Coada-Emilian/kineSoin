import type {
  IButtonDetails,
  IHomePageArticle,
  IPublicArticle,
} from '../interfaces/componentInterfaces';
import type { IBodyRegion } from '../interfaces/modelInterfaces';
import type { ModalButtonSectionMode } from '../types/buttonTypes';
import type { ErrorPageType } from '../types/errorTypes';

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btn: IButtonDetails;
}

export interface PublicRouteDetailsProps {
  path?: string;
  element: ComponentType;
  index?: boolean;
}

export interface IHomePageArticleProps {
  article: IHomePageArticle;
}

export interface PublicArticleRowProps {
  article: IPublicArticle;
}

export interface ErrorPageProps {
  type: ErrorPageType;
}

export interface AdminAddTherapistButtonSectionProps {
  onClose?: () => void;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP3Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddRegionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BodyRegionsTableBodyProps {
  bodyRegions: IBodyRegion[];
}

export interface ModalButtonSectionProps {
  onClose?: () => void;
  setNextModal?: () => void;
  mode: ModalButtonSectionMode;
}

export interface AdminEntityStatusProps {
  status: string | undefined;
}

export interface AdminEntityProfileOutputProps {
  label: string;
  value: string | number | undefined;
  isTextArea?: boolean;
  isOneThirdWidth?: boolean;
}

export interface AdminEntityIdProps {
  id: number | null;
}

export interface AdminEntityNameProps {
  name: string | undefined;
  surname: string | undefined;
}

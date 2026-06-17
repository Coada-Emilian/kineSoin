export type FormOrderTypes = 'first' | 'second' | 'third' | 'last';

export type IButtonStyles = 'normal' | 'nav' | 'status' | 'mobile' | 'hasIcon';

export type IButtonTypes =
  | 'basic'
  | 'cancel'
  | 'modify'
  | 'delete'
  | 'inactive'
  | 'add'
  | 'pending'
  | 'banned'
  | 'send';

export type IButtonIcons =
  | 'notification'
  | 'logout'
  | 'admin'
  | 'patient'
  | 'therapist';

export type IFormOrders = 'first' | 'second' | 'third' | 'last';

export interface IErrorPageTypes {
  type:
    | 'public'
    | 'adminAuthenticated'
    | 'adminUnauthenticated'
    | 'patientAuthenticated'
    | 'patientUnauthenticated'
    | 'therapistAuthenticated'
    | 'therapistUnauthenticated';
}

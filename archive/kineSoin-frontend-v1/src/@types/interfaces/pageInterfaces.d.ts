export interface IErrorPageRefactorProps {
  type:
    | 'public'
    | 'connectedAdmin'
    | 'unconnectedAdmin'
    | 'connectedPatient'
    | 'unconnectedPatient'
    | 'connectedTherapist'
    | 'unconnectedTherapist';
}

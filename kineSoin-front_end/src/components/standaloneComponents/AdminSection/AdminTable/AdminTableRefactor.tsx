// Purpose: The purpose of this component is to render the admin table.

import { useEffect, useState } from 'react';
import AfflictionUtilityButtons from './pageComponents/Affliction/AfflictionUtilityButtons';
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal';
import CustomButton from '../../generalComponents/CustomButton/CustomButton';
import TableTitle from './pageComponents/Common/TableTitle';
import TableHead from './pageComponents/Common/TableHead';
import TableBody from './pageComponents/Common/TableBody';
import StatusButtons from './pageComponents/Common/StatusButtons';
import AdminModal from './pageComponents/Modals/adminModal/AdminModal';
import RegionModal from './pageComponents/Modals/RegionModal';
import AddRegionModal from './pageComponents/Modals/AddRegionModal';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/standardTypes';
import {
  renderTherapists,
  renderPatients,
  renderAfflictions,
} from './utils/renderFunctions';
import { IAddForm } from '../../../../@types/formTypes';
import TherapistStatusButtons from '../AdminProfileDetails/pageComponents/generalComponents/therapist/TherapistStatusButtons';
import TherapistsStatusButtons from './pageComponents/Common/TherapistsStatusButtons';
import PatientsStatusButtons from './pageComponents/Common/PatientsStatusButtons';
import AfflictionsStatusButtons from './pageComponents/Common/AfflictionsStatusButtons';
import TableTitleRefactor from './pageComponents/Common/TableTitleRefactor';
import TableHeadRefactor from './pageComponents/Common/TableHeadRefactor';
import TableBodyRefactor from './pageComponents/Common/TableBodyRefactor';

interface AdminTableRefactorProps {
  entities: ITherapist[] | IPatient[] | IAffliction[] | IMedic[] | IInsurance[];
  entityType: string;
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
}

export default function AdminTableRefactor({
  entity,
  entities,
  entityType,
}: AdminTableRefactorProps) {
  // States for modal opening
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddAfflictionModalOpen, setIsAddAfflictionModalOpen] =
    useState(false);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isAddTherapistModalP1Open, setIsAddTherapistModalP1Open] =
    useState(false);
  const [isAddTherapistModalP2Open, setIsAddTherapistModalP2Open] =
    useState(false);
  const [isAddTherapistModalP3Open, setIsAddTherapistModalP3Open] =
    useState(false);
  const [isAddMedicModalOpen, setIsAddMedicModalOpen] = useState(false);
  const [isAddInsuranceModalOpen, setIsAddInsuranceModalOpen] = useState(false);
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false);

  // States for status changes
  const [therapistStatus, setTherapistStatus] = useState<string>('all');
  const [patientStatus, setPatientStatus] = useState<string>('all');
  const [afflictionStatus, setAfflictionStatus] = useState<string>('all');

  // States for rendered therapists, patients, afflictions
  const [renderedEntities, setRenderedEntities] = useState<
    ITherapist[] | IPatient[] | IAffliction[] | IMedic[] | IInsurance[]
  >(entities || []);

  const [selectedEntity, setSelectedEntity] = useState<
    | ITherapist
    | IPatient
    | IAffliction
    | IMedic
    | IInsurance
    | null
    | IBodyRegion
  >(null);

  //   // State for the add form
  //   const [addForm, setAddForm] = useState<IAddForm>({
  //     name: '',
  //     surname: '',
  //     email: '',
  //     password: '',
  //     repeated_password: '',
  //     description: '',
  //     diploma: '',
  //     experience: '',
  //     specialty: '',
  //     licence_code: '',
  //     status: '',
  //     photo: undefined,
  //     prefix: '',
  //     phone_number: '',
  //     full_phone_number: '',
  //   });

  // useEffects to set rendered therapists, patients, afflictions
  useEffect(() => {
    setRenderedEntities(entities);
  }, [entityType]);

  // useEffects to render therapists, patients, afflictions
  useEffect(() => {
    if (entityType === 'therapist') {
      renderTherapists(
        entities as ITherapist[],
        setRenderedEntities as React.Dispatch<
          React.SetStateAction<ITherapist[]>
        >,
        therapistStatus
      );
    } else if (entityType === 'affliction') {
      renderAfflictions(
        entities as IAffliction[],
        setRenderedEntities as React.Dispatch<
          React.SetStateAction<IAffliction[]>
        >,
        afflictionStatus
      );
    } else if (entityType === 'patient') {
      renderPatients(
        entities as IPatient[],
        setRenderedEntities as React.Dispatch<React.SetStateAction<IPatient[]>>,
        patientStatus
      );
    }
  }, [entityType, therapistStatus, patientStatus, afflictionStatus]);

  // Function to open delete modal
  const openDeleteModal = (
    entity:
      | ITherapist
      | IPatient
      | IAffliction
      | IMedic
      | IInsurance
      | IBodyRegion
  ) => {
    setSelectedEntity(entity);
    setIsDeleteModalOpen(true);
  };

  const tableElements = [
    {
      entityType: 'therapist',
      statusButtons: <TherapistsStatusButtons setStatus={setTherapistStatus} />,
      customBtnText: 'Ajouter un kiné',
      setModalOpen: setIsAddTherapistModalP1Open,
      tableTitle: 'Tous les kinésithérapeutes',
      entityStatus: therapistStatus,
      secondTableHeadContent: 'Nom kiné',
      thirdTableHeadContent: 'Statut',
    },
    {
      entityType: 'patient',
      statusButtons: <PatientsStatusButtons setStatus={setPatientStatus} />,
      tableTitle: 'Tous les patients',
      entityStatus: patientStatus,
      secondTableHeadContent: 'Nom patient',
      thirdTableHeadContent: 'Statut',
    },
    {
      entityType: 'affliction',
      statusButtons: (
        <AfflictionsStatusButtons setStatus={setAfflictionStatus} />
      ),
      customBtnText: 'Ajouter une affliction',
      setModalOpen: setIsAddAfflictionModalOpen,
      regionButton: true,
      setRegionModalOpen: setIsRegionModalOpen,
      tableTitle: 'Toutes les afflictions',
      entityStatus: afflictionStatus,
      secondTableHeadContent: 'Nom affliction',
      thirdTableHeadContent: 'Region concernée',
      fourthTableHeadContent: 'Cotation',
    },
    {
      entityType: 'medic',
      customBtnText: 'Ajouter un médecin',
      setModalOpen: setIsAddMedicModalOpen,
      tableTitle: 'Tous les médecins',
      secondTableHeadContent: 'Nom médecin',
      thirdTableHeadContent: 'Code ADELI',
    },
    {
      entityType: 'insurance',
      customBtnText: 'Ajouter une assurance',
      setModalOpen: setIsAddInsuranceModalOpen,
      tableTitle: 'Toutes les assurances',
      secondTableHeadContent: 'Nom organisme',
      thirdTableHeadContent: 'Code AMC',
    },
  ];

  const activeEntity = Object.values(tableElements).find(
    (group) => entityType === group.entityType
  );

  useEffect(() => {
    console.log(selectedEntity);
  }, [selectedEntity]);

  return (
    <>
      <div className="min-h-screen">
        <div
          className={`${activeEntity && !activeEntity.statusButtons ? 'justify-end' : 'justify-between'} mb-6 flex flex-row md:ml-10 md:mr-10`}
        >
          <>
            {activeEntity?.statusButtons}
            <div className="flex gap-2">
              {' '}
              {activeEntity?.regionButton && (
                <CustomButton
                  btnText="Ajouter une region"
                  addButton
                  onClick={() => activeEntity.setRegionModalOpen(true)}
                />
              )}
              {activeEntity?.customBtnText && (
                <CustomButton
                  btnText={activeEntity.customBtnText}
                  addButton
                  onClick={() =>
                    activeEntity.setModalOpen && activeEntity.setModalOpen(true)
                  }
                />
              )}
            </div>
          </>
        </div>

        <div>
          <TableTitleRefactor
            tableTitle={activeEntity?.tableTitle || ''}
            entityStatus={activeEntity?.entityStatus || ''}
          />
        </div>

        <table className="border-separate border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
          <TableHeadRefactor
            secondHeaderContent={activeEntity?.secondTableHeadContent || ''}
            thirdHeaderContent={activeEntity?.thirdTableHeadContent || ''}
            fourthHeaderContent={activeEntity?.fourthTableHeadContent || ''}
          />

          <TableBodyRefactor
            renderedEntities={renderedEntities}
            entityType={entityType}
            openDeleteModal={openDeleteModal}
          />
        </table>

        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            entity={
              selectedEntity as
                | ITherapist
                | IPatient
                | IAffliction
                | IMedic
                | IInsurance
                | IBodyRegion
            }
            entityType={entityType}
          />
        )}

        {/* {isAddTherapistModalP1Open && (
          <AdminModal
            isFirstAddTherapistModal
            setAddForm={setAddForm}
            setIsAddTherapistModalP1Open={setIsAddTherapistModalP1Open}
            setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
            isAddTherapistModalP1Open={isAddTherapistModalP1Open}
          />
        )}

        {isAddTherapistModalP2Open && (
          <AdminModal
            isSecondAddTherapistModal
            setAddForm={setAddForm}
            setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
            setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
            isAddTherapistModalP2Open={isAddTherapistModalP2Open}
          />
        )}

        {isAddTherapistModalP3Open && (
          <AdminModal
            isThirdAddTherapistModal
            addForm={addForm}
            setAddForm={setAddForm}
            setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
            isAddTherapistModalP3Open={isAddTherapistModalP3Open}
          />
        )}

        {isAddAfflictionModalOpen && (
          <AdminModal
            isAdminAfflictionAddModal
            isAddAfflictionModalOpen={isAddAfflictionModalOpen}
            setIsAddAfflictionModalOpen={setIsAddAfflictionModalOpen}
          />
        )}

        {isRegionModalOpen && (
          <RegionModal
            isRegionModalOpen={isRegionModalOpen}
            setIsRegionModalOpen={setIsRegionModalOpen}
          />
        )}

        {isAddRegionModalOpen && (
          <AddRegionModal
            isAddRegionModalOpen={isAddRegionModalOpen}
            setIsAddRegionModalOpen={setIsAddRegionModalOpen}
          />
        )}

        {isAddMedicModalOpen && (
          <AdminModal
            isAdminAddMedicModal
            isAddMedicModalOpen={isAddMedicModalOpen}
            setIsAddMedicModalOpen={setIsAddMedicModalOpen}
          />
        )}

        {isAddInsuranceModalOpen && (
          <AdminModal
            isAdminAddInsuranceModal
            isAddInsuranceModalOpen={isAddInsuranceModalOpen}
            setIsAddInsuranceModalOpen={setIsAddInsuranceModalOpen}
          />
        )} */}
      </div>
    </>
  );
}

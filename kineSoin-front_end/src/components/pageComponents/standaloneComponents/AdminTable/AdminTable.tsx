import { ITherapist } from '../../../../@types/ITherapist';
import editIcon from '/icons/edit.png';
import deleteIcon from '/icons/delete.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConfirmDeleteModal from '../../AdminSection/Modals/ConfirmDeleteModal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import refreshIcon from '/icons/refresh.png';
import axios from '../../../../axios';
import AddTherapistModalP1 from '../../AdminSection/Modals/AddTherapistModals/AddTherapistModalP1';
import AddTherapistModalP2 from '../../AdminSection/Modals/AddTherapistModals/AddTherapistModalP2';
import AddTherapistModalP3 from '../../AdminSection/Modals/AddTherapistModals/AddTherapistModalP3';
import { IPatient } from '../../../../@types/IPatient';
import { IAffliction } from '../../../../@types/IAffliction';
import { all } from 'axios';
import AddAfflictionModal from '../../AdminSection/Modals/AddAfflictionModals/AddAfflictionModal';

interface AdminTableProps {
  allTherapists?: ITherapist[];
  allPatients?: IPatient[];
  allAfflictions?: IAffliction[];
  windowWidth: number;
}

export default function AdminTable({
  allTherapists,
  allPatients,
  allAfflictions,
  windowWidth,
}: AdminTableProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedTherapist, setSelectedTherapist] = useState<ITherapist | null>(
    null
  );
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [selectedAffliction, setSelectedAffliction] =
    useState<IAffliction | null>(null);

  const [isAddAfflictionModalOpen, setIsAddAfflictionModalOpen] =
    useState(false);

  const [isAddTherapistModalP1Open, setIsAddTherapistModalP1Open] =
    useState(false);
  const [isAddTherapistModalP2Open, setIsAddTherapistModalP2Open] =
    useState(false);
  const [isAddTherapistModalP3Open, setIsAddTherapistModalP3Open] =
    useState(false);

  const [therapistStatus, setTherapistStatus] = useState('all');
  const [patientStatus, setPatientStatus] = useState('all');
  const [afflictionStatus, setAfflictionStatus] = useState('all');

  const [renderedTherapists, setRenderedTherapists] = useState<ITherapist[]>(
    allTherapists || []
  );
  const [renderedPatients, setRenderedPatients] = useState<IPatient[]>(
    allPatients || []
  );
  const [renderedAfflictions, setRenderedAfflictions] = useState<IAffliction[]>(
    allAfflictions || []
  );

  const [addForm, setAddForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeated_password: '',
    description: '',
    diploma: '',
    experience: '',
    specialty: '',
    licence_code: '',
    status: '',
    photo: '' as File | unknown,
  });

  useEffect(() => {
    setRenderedTherapists(allTherapists || []);
  }, [allTherapists]);

  useEffect(() => {
    setRenderedPatients(allPatients || []);
  }, [allPatients]);

  useEffect(() => {
    setRenderedAfflictions(allAfflictions || []);
  }, [allAfflictions]);

  useEffect(() => {
    renderTherapists();
  }, [therapistStatus]);

  useEffect(() => {
    renderPatients();
  }, [patientStatus]);

  useEffect(() => {
    renderAfflictions();
  }, [afflictionStatus]);

  const renderTherapists = () => {
    if (therapistStatus === 'all') {
      setRenderedTherapists(allTherapists ?? []);
    } else if (therapistStatus === 'active') {
      const activeTherapists = (allTherapists ?? []).filter(
        (therapist) => therapist.status === 'active'
      );
      setRenderedTherapists(activeTherapists);
    } else if (therapistStatus === 'inactive') {
      const inactiveTherapists = (allTherapists ?? []).filter(
        (therapist) => therapist.status === 'inactive'
      );
      setRenderedTherapists(inactiveTherapists);
    }
  };

  const renderPatients = () => {
    if (patientStatus === 'all') {
      setRenderedPatients(allPatients ?? []);
    } else if (patientStatus === 'active') {
      const activePatients = (allPatients ?? []).filter(
        (patient) => patient.status === 'active'
      );
      setRenderedPatients(activePatients);
    } else if (patientStatus === 'inactive') {
      const inactivePatients = (allPatients ?? []).filter(
        (patient) => patient.status === 'inactive'
      );
      setRenderedPatients(inactivePatients);
    } else if (patientStatus === 'banned') {
      const bannedPatients = (allPatients ?? []).filter(
        (patient) => patient.status === 'banned'
      );
      setRenderedPatients(bannedPatients);
    } else if (patientStatus === 'pending') {
      const pendingPatients = (allPatients ?? []).filter(
        (patient) => patient.status === 'pending'
      );
      setRenderedPatients(pendingPatients);
    }
  };

  const renderAfflictions = () => {
    if (afflictionStatus === 'all') {
      setRenderedAfflictions(allAfflictions ?? []);
    } else if (afflictionStatus === 'operated') {
      const operatedAfflictions = (allAfflictions ?? []).filter(
        (affliction) => affliction.is_operated === true
      );
      setRenderedAfflictions(operatedAfflictions);
    } else if (afflictionStatus === 'non-operated') {
      const nonOperatedAfflictions = (allAfflictions ?? []).filter(
        (affliction) => affliction.is_operated === false
      );
      setRenderedAfflictions(nonOperatedAfflictions);
    }
  };

  const openDeleteModal = (therapist?: ITherapist, patient?: IPatient) => {
    if (therapist) {
      setSelectedTherapist(therapist);
    }
    if (patient) {
      setSelectedPatient(patient);
    }
    setIsDeleteModalOpen(true);
  };

  const handleStatusChange = async (therapistId: number) => {
    const response = await axios.put(
      `/admin/therapists/${therapistId}/toggleStatus`
    );
    if (response) {
      console.log('Status changed successfully');
      window.location.reload();
    } else {
      console.log('Error changing status');
    }
  };

  return (
    <>
      <div>
        <div className="buttons mb-6 flex flex-row justify-between md:ml-10 md:mr-10">
          {allTherapists && (
            <>
              <div className="flex gap-2 ">
                <CustomButton
                  btnText="Tous"
                  allButton
                  onClick={() => {
                    setTherapistStatus('all');
                    renderTherapists();
                  }}
                />
                <CustomButton
                  btnText="Actifs"
                  activeButton
                  onClick={() => {
                    setTherapistStatus('active');
                    renderTherapists();
                  }}
                />
                <CustomButton
                  btnText="Inactifs"
                  inactiveButton
                  onClick={() => {
                    setTherapistStatus('inactive');
                    renderTherapists();
                  }}
                />
              </div>
              <div>
                <CustomButton
                  btnText="Ajouter un kiné"
                  addButton
                  onClick={() => setIsAddTherapistModalP1Open(true)}
                />
              </div>
            </>
          )}
          {allPatients && (
            <>
              <div className="flex gap-2 ">
                <CustomButton
                  btnText="Tous"
                  allButton
                  onClick={() => {
                    setPatientStatus('all');
                    renderPatients();
                  }}
                />
                <CustomButton
                  btnText="Actifs"
                  activeButton
                  onClick={() => {
                    setPatientStatus('active');
                    renderPatients();
                  }}
                />
                <CustomButton
                  btnText="Inactifs"
                  inactiveButton
                  onClick={() => {
                    setPatientStatus('inactive');
                    renderPatients();
                  }}
                />
                <CustomButton
                  btnText="En attente"
                  pendingButton
                  onClick={() => {
                    setPatientStatus('pending');
                    renderPatients();
                  }}
                />
                <CustomButton
                  btnText="Banis"
                  bannedButton
                  onClick={() => {
                    setPatientStatus('banned');
                    renderPatients();
                  }}
                />
              </div>
            </>
          )}
          {allAfflictions && (
            <>
              <div className="flex gap-2 ">
                <CustomButton
                  btnText="Tous"
                  allButton
                  onClick={() => {
                    setAfflictionStatus('all');
                    renderAfflictions();
                  }}
                />
                <CustomButton
                  btnText="Opérées"
                  activeButton
                  onClick={() => {
                    setAfflictionStatus('operated');
                    renderAfflictions();
                  }}
                />
                <CustomButton
                  btnText="Non opérées"
                  inactiveButton
                  onClick={() => {
                    setAfflictionStatus('non-operated');
                    renderTherapists();
                  }}
                />
              </div>
              <div>
                <CustomButton
                  btnText="Ajouter une affliction"
                  addButton
                  onClick={() => setIsAddAfflictionModalOpen(true)}
                />
              </div>
            </>
          )}
        </div>

        <div>
          <h2 className="text-center text-2xl font-semibold mb-4 md:text-left mb: ml-10">
            {allTherapists &&
              (therapistStatus === 'all'
                ? 'Tous les kinésithérapeutes'
                : therapistStatus === 'active'
                  ? 'Kinésithérapeutes actifs'
                  : therapistStatus === 'inactive'
                    ? 'Kinésithérapeutes inactifs'
                    : '')}
            {allPatients &&
              (patientStatus === 'all'
                ? 'Tous les patients'
                : patientStatus === 'active'
                  ? 'Patients actifs'
                  : patientStatus === 'inactive'
                    ? 'Patients inactifs'
                    : patientStatus === 'banned'
                      ? 'Patients bannis'
                      : patientStatus === 'pending'
                        ? 'Patients en attente'
                        : '')}
            {allAfflictions &&
              (afflictionStatus === 'all'
                ? 'Toutes les afflictions'
                : afflictionStatus === 'operated'
                  ? 'Afflictions opérées'
                  : afflictionStatus === 'non-operated'
                    ? 'Afflictions non opérées'
                    : '')}
          </h2>
        </div>

        <table className="border-collapse border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6">
          <thead
            className={
              windowWidth < 450
                ? 'bg-gray-100 text-xs'
                : 'bg-gray-100 text-sm md:text-base'
            }
          >
            <tr>
              <>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  #id
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  {allTherapists && 'Nom kiné'}
                  {allPatients && 'Nom patient'}
                  {allAfflictions && 'Nom affliction'}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  {allTherapists && allPatients && 'Statut'}
                  {allAfflictions && 'Region concernée'}
                </th>
                {allAfflictions && (
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Cotation
                  </th>
                )}
                <th
                  className="border border-gray-300 px-4 py-2 text-center"
                  colSpan={2}
                >
                  Action
                </th>
              </>
            </tr>
          </thead>
          <tbody
            className={windowWidth < 450 ? 'text-xxs' : 'text-xs md:text-sm'}
          >
            {allTherapists &&
              renderedTherapists.map((therapist: ITherapist) => {
                return (
                  <tr
                    key={therapist.id}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {therapist.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {therapist.fullName}
                    </td>
                    <td
                      className={`border border-gray-300 ${
                        therapist.status === 'active'
                          ? 'bg-green-300'
                          : 'bg-gray-200'
                      } px-4 py-2 text-center flex gap-1 items-center justify-center`}
                    >
                      <Link to="#" className="hidden md:block">
                        <img
                          src={refreshIcon}
                          alt="change status"
                          className="max-w-6"
                          onClick={() => handleStatusChange(therapist.id)}
                        />
                      </Link>

                      <p>{therapist.status.toUpperCase()}</p>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {windowWidth < 768 ? (
                        <Link to={`/admin/therapists/${therapist.id}`}>
                          <img
                            src={editIcon}
                            alt="edit"
                            className={
                              windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                            }
                          />
                        </Link>
                      ) : (
                        <Link
                          to={`/admin/therapists/${therapist.id}`}
                          className="w-25 flex items-center justify-center"
                        >
                          <img
                            src={editIcon}
                            alt="edit"
                            className="w-5 h-5 mx-1"
                          />{' '}
                          <p className="text-blue-300 font-semibold">
                            Inspecter
                          </p>
                        </Link>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {windowWidth < 768 ? (
                        <Link
                          to="#"
                          className="w-12"
                          onClick={() => openDeleteModal(therapist, undefined)}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            className={
                              windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                            }
                          />
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          className="w-25 flex justify-center items-center"
                          onClick={() => openDeleteModal(therapist, undefined)}
                        >
                          <img
                            src={deleteIcon}
                            alt="supprimer"
                            className="w-5 mx-1"
                          />
                          <p className="text-red-600 font-semibold">
                            Supprimer
                          </p>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            {allPatients &&
              renderedPatients.map((patient: IPatient) => {
                return (
                  <tr key={patient.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {patient.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {patient.fullName}
                    </td>
                    <td
                      className={`border border-gray-300 ${
                        patient.status === 'active'
                          ? 'bg-green-300'
                          : patient.status === 'pending'
                            ? 'bg-yellow-300'
                            : patient.status === 'banned'
                              ? 'bg-red-300'
                              : 'bg-gray-200'
                      } px-4 py-2 text-center flex gap-1 items-center justify-center`}
                    >
                      <p>{patient.status.toUpperCase()}</p>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {windowWidth < 768 ? (
                        <Link to={`/admin/patients/${patient.id}`}>
                          <img
                            src={editIcon}
                            alt="edit"
                            className={
                              windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                            }
                          />
                        </Link>
                      ) : (
                        <Link
                          to={`/admin/patients/${patient.id}`}
                          className="w-25 flex items-center justify-center"
                        >
                          <img
                            src={editIcon}
                            alt="edit"
                            className="w-5 h-5 mx-1"
                          />{' '}
                          <p className="text-blue-300 font-semibold">
                            Inspecter
                          </p>
                        </Link>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {windowWidth < 768 ? (
                        <Link
                          to="#"
                          className="w-12"
                          onClick={() => {
                            openDeleteModal(undefined, patient);
                          }}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            className={
                              windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                            }
                          />
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          className="w-25 flex justify-center items-center"
                          onClick={() => {
                            openDeleteModal(undefined, patient);
                          }}
                        >
                          <img
                            src={deleteIcon}
                            alt="supprimer"
                            className="w-5 mx-1"
                          />
                          <p className="text-red-600 font-semibold">
                            Supprimer
                          </p>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            {allAfflictions &&
              renderedAfflictions.map((affliction: IAffliction) => {
                return (
                  <tr
                    key={affliction.id}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {affliction.id}
                    </td>

                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {affliction.name}
                    </td>

                    <td
                      className={`border border-gray-300 px-4 py-2 my-auto text-center flex gap-1 items-center justify-center`}
                    >
                      <p>{affliction.body_region?.name ?? 'N/A'}</p>
                    </td>

                    <td className="text-center border border-gray-300 ">
                      {affliction.insurance_code}
                    </td>

                    <td className="border border-gray-300 py-2 px-2 text-center">
                      {windowWidth < 768 ? (
                        <Link to={`/admin/afflictions/${affliction.id}`}>
                          <img
                            src={editIcon}
                            alt="edit"
                            className={
                              windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                            }
                          />
                        </Link>
                      ) : (
                        <Link
                          to={`/admin/afflictions/${affliction.id}`}
                          className="w-25 flex items-center justify-center"
                        >
                          <img
                            src={editIcon}
                            alt="edit"
                            className="w-5 h-5 mx-1"
                          />{' '}
                          <p className="text-blue-300 font-semibold">
                            Inspecter
                          </p>
                        </Link>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {windowWidth < 768 ? (
                        <Link
                          to="#"
                          className="w-12"
                          // onClick={() => {
                          //   openDeleteModal(undefined, patient);
                          // }}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            className={
                              windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'
                            }
                          />
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          className="w-25 flex justify-center items-center"
                          // onClick={() => {
                          //   openDeleteModal(undefined, patient);
                          // }}
                        >
                          <img
                            src={deleteIcon}
                            alt="supprimer"
                            className="w-5 mx-1"
                          />
                          <p className="text-red-600 font-semibold">
                            Supprimer
                          </p>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          therapist={selectedTherapist}
          patient={selectedPatient}
        />
      )}

      {isAddTherapistModalP1Open && (
        <AddTherapistModalP1
          setAddForm={setAddForm}
          setIsAddTherapistModalP1Open={setIsAddTherapistModalP1Open}
          setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
          isAddTherapistModalP1Open={isAddTherapistModalP1Open}
        />
      )}

      {isAddTherapistModalP2Open && (
        <AddTherapistModalP2
          setAddForm={setAddForm}
          setIsAddTherapistModalP2Open={setIsAddTherapistModalP2Open}
          setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
          isAddTherapistModalP2Open={isAddTherapistModalP2Open}
        />
      )}

      {isAddTherapistModalP3Open && (
        <AddTherapistModalP3
          addForm={addForm}
          setIsAddTherapistModalP3Open={setIsAddTherapistModalP3Open}
          isAddTherapistModalP3Open={isAddTherapistModalP3Open}
        />
      )}

      {isAddAfflictionModalOpen && (
        <AddAfflictionModal
          isAddAfflictionModalOpen={isAddAfflictionModalOpen}
          setIsAddAfflictionModalOpen={setIsAddAfflictionModalOpen}
        />
      )}
    </>
  );
}

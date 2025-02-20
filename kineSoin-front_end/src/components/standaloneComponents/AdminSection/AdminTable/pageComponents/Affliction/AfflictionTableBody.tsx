/**
 * @file AfflictionTableBody.tsx
 * @description A React functional component that renders the body of an affliction table. It displays a list of afflictions, providing options to edit or delete each affliction.
 *
 * @param {Object} props - The props for the AfflictionTableBody component.
 * @param {number} props.windowWidth - The current width of the window, used to adjust the layout responsively.
 * @param {IAffliction[]} props.renderedAfflictions - An array of affliction objects to be displayed in the table.
 * @param {function(ITherapist?, IPatient?, IAffliction?, IMedic?): void} props.openDeleteModal - A function that opens a modal for deleting an affliction, taking optional parameters for the therapist, patient, affliction, and medic.
 *
 * @returns {JSX.Element} The rendered AfflictionTableBody component, consisting of table rows with details of each affliction and actions to edit or delete.
 */

import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import {
  IAffliction,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/types';

interface AfflictionTableBodyProps {
  windowWidth: number;
  renderedAfflictions: IAffliction[];
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic
  ) => void;
}

export default function AfflictionTableBody({
  windowWidth,
  renderedAfflictions,
  openDeleteModal,
}: AfflictionTableBodyProps) {
  return renderedAfflictions.map((affliction: IAffliction) => {
    return (
      <tr key={affliction.id} className="odd:bg-white even:bg-gray-50">
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

        {windowWidth > 768 && (
          <td className="text-center border border-gray-300 ">
            {affliction.insurance_code}
          </td>
        )}

        <td className="border border-gray-300 py-2 px-2 text-center">
          {windowWidth < 768 ? (
            <Link to={`/admin/afflictions/${affliction.id}`}>
              <img
                src={editIcon}
                alt="edit"
                className={
                  windowWidth < 450 ? 'max-w-4 mx-auto' : 'w-5 mx-auto'
                }
              />
            </Link>
          ) : (
            <Link
              to={`/admin/afflictions/${affliction.id}`}
              className="w-25 flex items-center justify-center"
            >
              <img src={editIcon} alt="edit" className="w-5 h-5 mx-1" />{' '}
              <p className="text-blue-300 font-semibold">Inspecter</p>
            </Link>
          )}
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {windowWidth < 768 ? (
            <Link
              to="#"
              className="w-12"
              onClick={() => {
                openDeleteModal(undefined, undefined, affliction, undefined);
              }}
            >
              <img
                src={deleteIcon}
                alt="delete"
                className={
                  windowWidth < 450 ? 'max-w-4 mx-auto' : 'w-5 mx-auto'
                }
              />
            </Link>
          ) : (
            <Link
              to="#"
              className="w-25 flex justify-center items-center"
              onClick={() => {
                openDeleteModal(undefined, undefined, affliction, undefined);
              }}
            >
              <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
              <p className="text-red-600 font-semibold">Supprimer</p>
            </Link>
          )}
        </td>
      </tr>
    );
  });
}

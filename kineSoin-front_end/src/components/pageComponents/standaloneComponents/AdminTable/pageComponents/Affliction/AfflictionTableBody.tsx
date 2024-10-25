/**
 * @file AfflictionTableBody.tsx
 * @description A component that renders a table body for afflictions, displaying
 * their details, including ID, name, body region, insurance code, and actions
 * (edit and delete) for each affliction in the provided list.
 *
 * @interface AfflictionTableBodyProps
 * @param {number} windowWidth - The current width of the window, used to adjust
 * the styling and layout of the table cells.
 * @param {IAffliction[]} renderedAfflictions - An array of afflictions to render
 * in the table body.
 * @param {(
 *   therapist?: ITherapist,
 *   patient?: IPatient,
 *   affliction?: IAffliction,
 *   medic?: IMedic
 * ) => void} openDeleteModal - A function that opens the delete modal for a
 * specific affliction and other entities based on the provided parameters.
 *
 * @returns {JSX.Element} The rendered AfflictionTableBody component displaying
 * a row for each affliction with its ID, name, body region, insurance code,
 * edit, and delete actions.
 */

import { Link } from 'react-router-dom';
import { IAffliction } from '../../../../../../@types/IAffliction';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';
import { IMedic } from '../../../../../../@types/IMedic';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';

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
                className={windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'}
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
                className={windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'}
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

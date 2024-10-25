/**
 * @file InsuranceTableBody.tsx
 * @description A component that renders a table body for insurance records,
 * displaying their details including ID, name, AMC code, and actions
 * (edit and delete) for each insurance in the provided list.
 *
 * @interface InsuranceTableBodyProps
 * @param {number} windowWidth - The current width of the window, used to adjust
 * the styling and layout of the table cells.
 * @param {(
 *   therapist?: ITherapist,
 *   patient?: IPatient,
 *   affliction?: IAffliction,
 *   medic?: IMedic,
 *   insurance?: IInsurance
 * ) => void} openDeleteModal - A function that opens the delete modal for a
 * specific insurance and other entities based on the provided parameters.
 * @param {IInsurance[]} allInsurances - An array of insurance records to render
 * in the table body.
 *
 * @returns {JSX.Element} The rendered InsuranceTableBody component displaying
 * a row for each insurance with its ID, name, AMC code, edit,
 * and delete actions.
 */

import { Link } from 'react-router-dom';
import { IAffliction } from '../../../../../../@types/IAffliction';
import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';
import { IMedic } from '../../../../../../@types/IMedic';
import { IInsurance } from '../../../../../../@types/IInsurance';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';

interface InsuranceTableBodyProps {
  windowWidth: number;
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic,
    insurance?: IInsurance
  ) => void;
  allInsurances: IInsurance[];
}

export default function InsuranceTableBody({
  windowWidth,
  allInsurances,
  openDeleteModal,
}: InsuranceTableBodyProps) {
  return allInsurances.map((insurance: IInsurance) => {
    return (
      <tr key={insurance.id} className="odd:bg-white even:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2 text-center">
          {insurance.id}
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {insurance.name}
        </td>

        <td className="text-center border border-gray-300 ">
          {insurance.amc_code}
        </td>

        <td className="border border-gray-300 py-2 px-2 text-center">
          {windowWidth < 768 ? (
            <Link to={`/admin/insurances/${insurance.id}`}>
              <img
                src={editIcon}
                alt="edit"
                className={windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'}
              />
            </Link>
          ) : (
            <Link
              to={`/admin/insurances/${insurance.id}`}
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
                openDeleteModal(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  insurance
                );
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
                openDeleteModal(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  insurance
                );
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

import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardInterfaces';
import { Button } from '@headlessui/react';

interface RegionTableBodyProps {
  openDeleteModal: (
    entity:
      | ITherapist
      | IPatient
      | IAffliction
      | IMedic
      | IInsurance
      | IBodyRegion,
    isRegionModal?: boolean
  ) => void;
  allBodyRegions: IBodyRegion[];
}

export default function RegionTableBody({
  allBodyRegions,
  openDeleteModal,
}: RegionTableBodyProps) {
  return allBodyRegions.map((region: IBodyRegion, index: number) => {
    const isLastRow = index === allBodyRegions.length - 1;
    return (
      <tr
        key={region.id}
        className="odd:bg-white even:bg-gray-50 text-xs md:text-md h-fit"
      >
        <td
          className={`border border-gray-300 p-2 text-center ${
            isLastRow ? 'rounded-bl-2xl' : ''
          }`}
        >
          {region.id}
        </td>

        <td className="border border-gray-300 px-4 py-1 text-center">
          {region.name}
        </td>

        <td
          className={`border border-gray-300 px-4 py-1 text-center ${
            isLastRow ? 'rounded-br-2xl' : ''
          }`}
        >
          <Button className="w-12">
            <img
              src={deleteIcon}
              alt="delete"
              className="w-4 h-4 mx-auto md:w-6 md:h-6"
              onClick={() => {
                openDeleteModal(region, true);
              }}
            />
          </Button>
        </td>
      </tr>
    );
  });
}

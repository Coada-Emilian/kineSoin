import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import { Button } from '@headlessui/react';

interface RegionTableBodyProps {
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic,
    insurance?: IInsurance,
    body_region?: IBodyRegion
  ) => void;
  allBodyRegions: IBodyRegion[];
}

export default function RegionTableBody({
  allBodyRegions,
  openDeleteModal,
}: RegionTableBodyProps) {
  return allBodyRegions.map((region: IBodyRegion) => {
    return (
      <tr
        key={region.id}
        className="odd:bg-white even:bg-gray-50 text-xs md:text-md h-fit"
      >
        <td className="border border-gray-300 px-4 py-1 text-center">
          {region.id}
        </td>

        <td className="border border-gray-300 px-4 py-1 text-center">
          {region.name}
        </td>

        <td className="border border-gray-300 px-4 py-1 text-center">
          <Button className="w-12">
            <img
              src={deleteIcon}
              alt="delete"
              className="w-4 h-4 mx-auto md:w-6 md:h-6"
              onClick={() =>
                openDeleteModal(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  region
                )
              }
            />
          </Button>
        </td>
      </tr>
    );
  });
}

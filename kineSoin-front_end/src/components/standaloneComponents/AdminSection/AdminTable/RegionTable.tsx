import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/standardInterfaces';
import CustomButton from '../../generalComponents/CustomButton/CustomButton';
import TableHead from './pageComponents/Common/old_components/TableHead';
import RegionTableBody from './pageComponents/Regions/RegionTableBody';

interface RegionTableProps {
  setIsRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allBodyRegions: IBodyRegion[];
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
}

export default function RegionTable({
  setIsRegionModalOpen,
  setIsAddRegionModalOpen,
  allBodyRegions,
  openDeleteModal,
}: RegionTableProps) {
  return (
    <div className=" flex flex-col gap-2 items-end  md:mx-5 overflow-x-auto mx-auto max-h-[450px] md:max-h-[600px]">
      <CustomButton
        btnText="Ajouter une region"
        addButton
        onClick={() => {
          setIsRegionModalOpen(false);
          setIsAddRegionModalOpen(true);
        }}
      />
      {/* <div className="overflow-x-auto mx-auto max-h-[450px]"> */}
      <table className="border-separate border border-gray-300 w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl">
        <thead className="bg-gray-100 xxs:text-xs text-sm md:text-base">
          <tr>
            <>
              <th className="border border-gray-300 px-4 py-2 text-center rounded-tl-2xl w-1/12">
                #id
              </th>

              <th className="border border-gray-300 px-4 py-2 text-center">
                Nom région
              </th>

              <th
                className="border border-gray-300 px-4 py-2 text-center rounded-tr-2xl"
                colSpan={2}
              >
                Action
              </th>
            </>
          </tr>
        </thead>
        <tbody>
          <RegionTableBody
            allBodyRegions={allBodyRegions}
            openDeleteModal={openDeleteModal}
          />
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
}

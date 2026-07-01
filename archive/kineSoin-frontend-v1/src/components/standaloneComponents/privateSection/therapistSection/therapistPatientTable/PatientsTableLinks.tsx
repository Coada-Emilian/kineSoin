import { useTableContext } from '../../../../../utils/contexts/therapistSectionContext/TableContext';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';

export default function PatientsTableLinks() {
  const { setTableType } = useTableContext();

  return (
    <div className="w-11/12 flex gap-2 ">
      <CustomBtn
        btn={{
          type: 'basic',
          text: 'Mes patients',
          style: 'status',
          onClick: () => {
            setTableType('therapistPatients');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'send',
          text: 'Tous les patients',
          style: 'status',
          onClick: () => {
            setTableType('allPatients');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'pending',
          text: 'Patients en attente',
          style: 'status',
          onClick: () => {
            setTableType('pendingPatients');
          },
        }}
      />
    </div>
  );
}

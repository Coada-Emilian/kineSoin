import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';

interface PatientsTableLinksProps {
  setTableType: React.Dispatch<
    React.SetStateAction<'therapistPatients' | 'allPatients'>
  >;
}

export default function PatientsTableLinks({
  setTableType,
}: PatientsTableLinksProps) {
  return (
    <div className="flex justify-between w-full ">
      <div className="flex gap-2">
        <CustomBtn
          btn={{
            type: 'basic',
            text: 'Tous mes patients',
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
      </div>

      {/* <div className="flex gap-2">
        {' '}
        <CustomBtn
          btn={{
            type: 'active',
            text: 'Actifs',
            style: 'status',
          }}
        />
        <CustomBtn
          btn={{
            type: 'inactive',
            text: 'Inactifs',
            style: 'status',
          }}
        />
        <CustomBtn
          btn={{
            type: 'pending',
            text: 'En attente',
            style: 'status',
          }}
        />
        <CustomBtn
          btn={{
            type: 'banned',
            text: 'Bannis',
            style: 'status',
          }}
        />
      </div> */}
    </div>
  );
}

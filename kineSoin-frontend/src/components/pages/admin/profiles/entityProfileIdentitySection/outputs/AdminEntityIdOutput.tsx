import type { AdminEntityIdOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileInfoOutput from '../../entityProfileContactSection/outputs/AdminOutputContainer';
import idIcon from '/icons/id.png';

export default function AdminEntityIdOutput({ id }: AdminEntityIdOutputProps) {
  return (
    <div>
      <AdminEntityProfileInfoOutput
        icon={idIcon}
        iconAlt="id"
        label="ID"
        value={id ? id.toString() : '1'}
      ></AdminEntityProfileInfoOutput>
    </div>
  );
}

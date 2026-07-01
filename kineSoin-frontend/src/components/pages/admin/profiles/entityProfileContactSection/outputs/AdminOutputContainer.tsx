import type { AdminEntityProfileInfoOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

const AdminEntityProfileInfoOutput = ({
  icon,
  iconAlt,
  label,
  value,
}: AdminEntityProfileInfoOutputProps) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <img src={icon} alt={iconAlt} className="h-4 w-4 md:h-6 md:w-6" />
      <AdminEntityProfileOutput label={label} value={value} />
    </div>
  );
};

export default AdminEntityProfileInfoOutput;

import type { AdminEntityCodeOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileOutput from '../../AdminEntityProfileOutput';

export default function AdminEntityCodeOutput({
  amc_code,
  insurance_code,
  licence_code,
}: AdminEntityCodeOutputProps) {
  return (
    <AdminEntityProfileOutput
      value={
        amc_code ? amc_code : insurance_code ? insurance_code : licence_code
      }
      label={
        amc_code
          ? 'Code AMC'
          : insurance_code
            ? 'Code Assurance'
            : 'Code ADELI '
      }
    />
  );
}

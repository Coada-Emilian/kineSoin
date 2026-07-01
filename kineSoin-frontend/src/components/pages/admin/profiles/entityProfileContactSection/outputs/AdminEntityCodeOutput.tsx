import type { AdminEntityCodeOutputProps } from '../../../../../../@types/props/adminProps';
import AdminEntityProfileInfoOutput from './AdminOutputContainer';
import codeIcon from '/icons/id-card.png';

export default function AdminEntityCodeOutput({
  amc_code,
  insurance_code,
  licence_code,
}: AdminEntityCodeOutputProps) {
  return (
    <AdminEntityProfileInfoOutput
      icon={codeIcon}
      iconAlt={
        amc_code
          ? 'Code AMC'
          : insurance_code
            ? 'Code Assurance'
            : 'Code ADELI '
      }
      label={
        amc_code
          ? 'Code AMC'
          : insurance_code
            ? 'Code Assurance'
            : 'Code ADELI '
      }
      value={
        amc_code
          ? (amc_code as string)
          : insurance_code
            ? (insurance_code as string)
            : (licence_code as string)
      }
    ></AdminEntityProfileInfoOutput>
  );
}

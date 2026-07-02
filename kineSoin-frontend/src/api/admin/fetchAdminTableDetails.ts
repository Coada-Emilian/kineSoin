import type { FetchAdminTableDataFunctionProps } from '../../@types/props/functionProps';
import { fetchAdminTableDataFunctionDetails } from '../../utils/config/admin/fetchAdminTableDataFunctionDetails';

export const fetchAdminTableDetails = async <T>({
  entityType,
}: FetchAdminTableDataFunctionProps): Promise<T | undefined> => {
  try {
    const fetchFunction = fetchAdminTableDataFunctionDetails.find(
      (item) => item.entityType === entityType
    )?.fetchFunction;

    if (fetchFunction) {
      const data = await fetchFunction();

      return data;
    } else {
      console.error('No fetch function found for entity type:', entityType);
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching admin table data:', error);
    return undefined;
  }
};

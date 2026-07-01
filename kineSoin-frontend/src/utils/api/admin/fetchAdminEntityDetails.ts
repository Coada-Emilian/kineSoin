import type { FetchAdminEntityDetailsFunctionProps } from '../../../@types/props/functionProps';
import { fetchAdminEntityDataFunctionDetails } from '../../config/admin/fetchAdminEntityDataFunctionDetails';

export const fetchAdminEntityDetails = async <T>({
  entityType,
  entity_id,
}: FetchAdminEntityDetailsFunctionProps): Promise<T | undefined> => {
  try {
    const fetchFunction = fetchAdminEntityDataFunctionDetails.find(
      (item) => item.entityType === entityType
    )?.fetchFunction;

    if (fetchFunction && entity_id) {
      const data = await fetchFunction(entity_id);
      return data;
    } else {
      console.error(
        'No valid fetch function or entityId found for type:',
        entityType
      );
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching admin entity details:', error);
    return undefined;
  }
};

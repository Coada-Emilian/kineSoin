import { createContext, useState, type ReactNode } from 'react';
import type {
  IAdminContext,
  IAdminEntities,
  IAdminEntity,
} from '../../@types/interfaces/customInterfaces';

const AdminContext = createContext<IAdminContext | undefined>(undefined);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEntity, setSelectedEntity] = useState<IAdminEntity | null>(
    null
  );

  const [openModal, setOpenModal] = useState<string | null>(null);

  const [regionDeleteModal, setRegionDeleteModal] = useState(false);

  const [entityStatus, setEntityStatus] = useState<string>('all');

  const [renderedEntities, setRenderedEntities] = useState<IAdminEntities>([]);

  // Function to open the delete modal
  const openDeleteModal = (entity: IAdminEntity, isRegionModal?: boolean) => {
    setSelectedEntity(entity);
    if (isRegionModal) {
      setRegionDeleteModal(true);
    }
  };

  //   useEffect(() => {
  //     if (selectedEntity) {
  //       setOpenModal('delete');
  //     }
  //   }, [selectedEntity]);

  const closeModal = () => {
    setOpenModal(null);
    setSelectedEntity(null);
    setRegionDeleteModal(false);
  };

  return (
    <AdminContext.Provider
      value={{
        selectedEntity,
        setSelectedEntity,
        openModal,
        setOpenModal,
        regionDeleteModal,
        setRegionDeleteModal,
        openDeleteModal,
        closeModal,
        entityStatus,
        setEntityStatus,
        renderedEntities,
        setRenderedEntities,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

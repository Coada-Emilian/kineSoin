import { createContext, useState, type ReactNode } from 'react';
import type { IAdminContext } from '../../@types/interfaces/contextInterfaces';
import type { IAdminEntity } from '../../@types/types/adminTypes';

const AdminContext = createContext<IAdminContext | undefined>(undefined);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEntity, setSelectedEntity] = useState<IAdminEntity | null>(
    null
  );

  const [openModal, setOpenModal] = useState<string | null>(null);

  const [regionDeleteModal, setRegionDeleteModal] = useState(false);

  const [entityStatus, setEntityStatus] = useState<string>('all');

  const [renderedEntities, setRenderedEntities] = useState<IAdminEntity[]>([]);

  // Function to open the delete modal
  const openDeleteModal = (entity: IAdminEntity, isRegionModal?: boolean) => {
    setSelectedEntity(entity);
    setOpenModal('delete');

    if (isRegionModal) {
      setRegionDeleteModal(true);
    }
  };

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

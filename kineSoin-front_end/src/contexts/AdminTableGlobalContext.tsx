import {
  createContext, // Function to create a new context
  useContext, // Hook to access context values
  useState, // Hook to manage state inside the provider
  useEffect, // Hook to perform side effects when dependencies change
  ReactNode, // Type for defining children components
} from 'react';
import { IEntityInterface } from '../@types/componentTypes'; // Importing the entity interface type

// Define the shape of the context
interface AdminTableGlobalContextType {
  selectedEntity: IEntityInterface | null; // Currently selected entity, if any
  openModal: string | null; // Keeps track of which modal is open
  setOpenModal: (modal: string | null) => void; // Function to set the open modal state
  setSelectedEntity: (entity: IEntityInterface | null) => void; // Function to set the selected entity
  setRegionDeleteModal: (value: boolean) => void; // Function to control the region delete modal state
  regionDeleteModal: boolean; // Boolean flag to indicate if the region delete modal is open
  openDeleteModal: (entity: IEntityInterface, isRegionModal?: boolean) => void; // Function to open delete modal
  closeModal: () => void; // Function to close modals
}

// Create the context with an undefined initial value (to be provided later)
const AdminTableGlobalContext = createContext<
  AdminTableGlobalContextType | undefined
>(undefined);

// Context provider component
export const AdminTableGlobalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // State for storing the selected entity
  const [selectedEntity, setSelectedEntity] = useState<IEntityInterface | null>(
    null
  );
  // State to track which modal is currently open
  const [openModal, setOpenModal] = useState<string | null>(null);
  // State to track if the region delete modal is open
  const [regionDeleteModal, setRegionDeleteModal] = useState(false);

  // Function to open the delete modal
  const openDeleteModal = (
    entity: IEntityInterface,
    isRegionModal?: boolean
  ) => {
    setSelectedEntity(entity); // Store the entity to be deleted
    if (isRegionModal) {
      setRegionDeleteModal(true); // Mark the region delete modal as open if applicable
    }
  };

  // Effect to automatically open the delete modal when an entity is selected
  useEffect(() => {
    if (selectedEntity) {
      setOpenModal('delete'); // Set the modal type to 'delete' when an entity is selected
    }
  }, [selectedEntity]); // Runs when `selectedEntity` changes

  // Function to close any open modal
  const closeModal = () => {
    setOpenModal(null); // Close the modal
    setSelectedEntity(null); // Reset the selected entity
    setRegionDeleteModal(false); // Close the region delete modal
  };

  return (
    <AdminTableGlobalContext.Provider
      value={{
        selectedEntity,
        openModal,
        setOpenModal,
        setSelectedEntity,
        setRegionDeleteModal,
        regionDeleteModal,
        openDeleteModal,
        closeModal,
      }}
    >
      {children} {/* Render children components inside the provider */}
    </AdminTableGlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useAdminTableGlobalContext = () => {
  const context = useContext(AdminTableGlobalContext);
  if (!context) {
    throw new Error(
      'useAdminTableGlobal must be used within an AdminTableGlobalProvider'
    );
  }
  return context; // Return the context object
};

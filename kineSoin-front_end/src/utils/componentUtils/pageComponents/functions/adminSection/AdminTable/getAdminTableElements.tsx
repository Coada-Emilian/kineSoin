/**
 * getAdminTableElements Function
 *
 * This function generates a list of configuration objects used for rendering tables and related elements in the admin section
 * of the application. Each configuration object corresponds to a different entity type (e.g., therapist, patient, affliction, etc.)
 * and contains information such as the table title, column headers, status buttons, and modal names.
 *
 * **Main Features:**
 * - Dynamically configures the elements for each table based on the entity type.
 * - Provides custom buttons for adding new entities, including relevant modal names and texts.
 * - Includes customizable table headers and status buttons, which change according to the entity type.
 * - Supports a `setEntityStatus` function for updating the status of the entities via status buttons.
 *
 * **Entity Types Supported:**
 * - **therapist**: Contains a `statusButtons` element for therapist status management, and other relevant table configuration (title, columns, etc.).
 * - **patient**: Includes configuration for managing patients, with corresponding status buttons and table column details.
 * - **affliction**: Similar to the previous entities, but with additional columns for "Region concernée" and "Cotation".
 * - **medic**: Configures a table for medical professionals, with relevant column headers for names and codes.
 * - **insurance**: Supports adding and displaying insurance companies, with columns for names and codes.
 * - **region**: Configures a table for regions, with columns for region names.
 *
 * **Parameters:**
 * - `entityStatus` (`string`): The current status of the entity being displayed (used for status buttons).
 * - `setEntityStatus` (`React.Dispatch<React.SetStateAction<string>>`): A setter function used to update the entity status when status buttons are clicked.
 *
 * **Returns:**
 * - An array of configuration objects, each containing:
 *   - `entityType` (string): The type of entity (e.g., 'therapist', 'patient', etc.).
 *   - `statusButtons` (JSX.Element): The status buttons for the entity type, which are used to manage its status.
 *   - `customBtnText` (string): The text for the button used to add a new entity.
 *   - `modalName` (string): The name of the modal used for adding a new entity.
 *   - `tableTitle` (string): The title displayed at the top of the table.
 *   - `entityStatus` (string): The status of the entity (used to update the displayed entity status).
 *   - Additional table column headers for different entity types (e.g., "Nom kiné", "Statut", "Region concernée").
 *
 * **Usage Example:**
 * ```tsx
 * const tableElements = getAdminTableElements({
 *   entityStatus: 'active',
 *   setEntityStatus: setStatus,
 * });
 * ```
 * This will return an array of table configuration objects for use in rendering the admin tables.
 *
 * **Important Notes:**
 * - Each entity type is associated with a specific set of components (e.g., `TherapistsStatusButtons`, `PatientsStatusButtons`, etc.),
 *   which are used to render the status buttons for each entity.
 * - The `setEntityStatus` function allows the status to be dynamically updated when the status buttons are clicked.
 * - The `customBtnText` provides a consistent way to render the button to add new entities for each entity type.
 * - The function's output is used to dynamically generate different admin sections with varying entity data and actions.
 *
 * @param {string} entityStatus - The current status of the entity (e.g., 'active', 'inactive').
 * @param {React.Dispatch<React.SetStateAction<string>>} setEntityStatus - A setter function to update the entity status.
 * @returns {Object[]} - An array of configuration objects, each representing a different entity's table and status settings.
 */

import AfflictionsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Affliction/new_components/AfflictionsStatusButtons';
import PatientsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Patients/new_components/PatientsStatusButtons';
import TherapistsStatusButtons from '../../../../../../components/standaloneComponents/AdminSection/AdminTable/pageComponents/Therapists/new_components/TherapistsStatusButtons';

interface FunctionProps {
  entityStatus: string;
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const getAdminTableElements = ({
  entityStatus,
  setEntityStatus,
}: FunctionProps) => [
  {
    entityType: 'therapist',
    statusButtons: <TherapistsStatusButtons setStatus={setEntityStatus} />,
    customBtnText: 'Ajouter kiné',
    modalName: 'addTherapistP1',
    tableTitle: 'Tous les kinésithérapeutes',
    entityStatus: entityStatus,
    secondTableHeadContent: 'Nom kiné',
    thirdTableHeadContent: 'Statut',
  },
  {
    entityType: 'patient',
    statusButtons: <PatientsStatusButtons setStatus={setEntityStatus} />,
    tableTitle: 'Tous les patients',
    entityStatus: entityStatus,
    secondTableHeadContent: 'Nom patient',
    thirdTableHeadContent: 'Statut',
  },
  {
    entityType: 'affliction',
    statusButtons: <AfflictionsStatusButtons setStatus={setEntityStatus} />,
    customBtnText: 'Ajouter affliction',
    modalName: 'addAffliction',
    regionButton: true,
    tableTitle: 'Toutes les afflictions',
    entityStatus: entityStatus,
    secondTableHeadContent: 'Nom affliction',
    thirdTableHeadContent: 'Region concernée',
    fourthTableHeadContent: 'Cotation',
  },
  {
    entityType: 'medic',
    customBtnText: 'Ajouter médecin',
    modalName: 'addMedic',
    tableTitle: 'Tous les médecins',
    secondTableHeadContent: 'Nom médecin',
    thirdTableHeadContent: 'Code ADELI',
  },
  {
    entityType: 'insurance',
    customBtnText: 'Ajouter assurance',
    modalName: 'addInsurance',
    tableTitle: 'Toutes les assurances',
    secondTableHeadContent: 'Nom organisme',
    thirdTableHeadContent: 'Code AMC',
  },
  {
    entityType: 'region',
    customBtnText: 'Ajouter region',
    modalName: 'addRegion',
    tableTitle: 'Toutes les regions',
    secondTableHeadContent: 'Nom region',
  },
];

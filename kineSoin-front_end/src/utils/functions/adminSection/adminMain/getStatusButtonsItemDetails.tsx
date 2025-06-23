/**
 * @function getStatusButtonsItemDetails
 *
 * Provides an array of status button configurations for different entity types
 * such as therapists and patients.
 *
 * Each item contains details about the entity type, status value, associated
 * background color classes, hover color classes, and display text.
 *
 * This data is used to render status buttons with appropriate styling and labels
 * based on the entity type and current status.
 *
 * @returns {Array<Object>} Array of status button detail objects with properties:
 *  - entityType {string} - The type of entity (e.g., 'therapist' or 'patient').
 *  - status {string} - The status value associated with the button.
 *  - background {string} - Tailwind CSS classes for the button background color.
 *  - hoverBackground {string} - Tailwind CSS classes for the hover background color.
 *  - text {string} - The label text displayed on the button.
 *
 * @example
 * const items = getStatusButtonsItemDetails();
 * // items might contain:
 * // [
 * //   { entityType: 'therapist', status: 'active', background: 'bg-green-300', ... },
 * //   { entityType: 'patient', status: 'pending', background: 'bg-yellow-300', ... },
 * //   ...
 * // ]
 */

export const getStatusButtonsItemDetails = () => [
  {
    entityType: 'therapist',
    status: 'active',
    background: 'bg-green-300',
    hoverBackground: 'hover:bg-green-500',
    text: 'Actif',
  },
  {
    entityType: 'therapist',
    status: 'inactive',
    background: 'bg-gray-200',
    hoverBackground: 'hover:bg-gray-400',
    text: 'Inactif',
  },
  {
    entityType: 'patient',
    status: 'active',
    background: 'bg-green-300',
    hoverBackground: 'hover:bg-green-500',
    text: 'Actif',
  },
  {
    entityType: 'patient',
    status: 'inactive',
    background: 'bg-gray-200',
    hoverBackground: 'hover:bg-gray-400',
    text: 'Inactif',
  },
  {
    entityType: 'patient',
    status: 'pending',
    background: 'bg-yellow-300',
    hoverBackground: 'hover:bg-yellow-500',
    text: 'En attente',
  },
  {
    entityType: 'patient',
    status: 'banned',
    background: 'bg-red-300',
    hoverBackground: 'hover:bg-red-500',
    text: 'Banni',
  },
];

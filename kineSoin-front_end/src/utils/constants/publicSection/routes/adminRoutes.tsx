/**
 * adminRoutes.ts
 *
 * Defines the route paths and corresponding entity types for the admin section.
 * Each route object contains:
 * - path: The URL path segment for the route, including optional `:id` for details.
 * - entityType: The type of entity the route handles, used for dynamic rendering.
 *
 * Entity types include:
 * 'therapist', 'patient', 'affliction', 'medic', and 'insurance'.
 *
 * This array supports both list views (e.g., 'therapists') and detail views (e.g., 'therapists/:id').
 */

export const adminRoutes: {
  path: string;
  entityType: 'therapist' | 'patient' | 'affliction' | 'medic' | 'insurance';
}[] = [
  { path: 'therapists', entityType: 'therapist' },
  { path: 'therapists/:id', entityType: 'therapist' },

  { path: 'patients', entityType: 'patient' },
  { path: 'patients/:id', entityType: 'patient' },

  { path: 'afflictions', entityType: 'affliction' },
  { path: 'afflictions/:id', entityType: 'affliction' },

  { path: 'medics', entityType: 'medic' },
  { path: 'medics/:id', entityType: 'medic' },

  { path: 'insurances', entityType: 'insurance' },
  { path: 'insurances/:id', entityType: 'insurance' },
];

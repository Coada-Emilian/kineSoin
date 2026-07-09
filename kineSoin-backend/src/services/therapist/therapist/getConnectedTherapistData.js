import { Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getConnectedTherapistData({ therapistId }) {
  const therapist_id = getValidId(therapistId, 'Therapist ID');
  await findOrThrow(Therapist, therapist_id, 'Therapist');

  const therapistData = await Therapist.findByPk(therapist_id, {
    attributes: {
      exclude: ['password', 'created_at', 'updated_at', 'admin_id'],
    },
  });

  return therapistData;
}

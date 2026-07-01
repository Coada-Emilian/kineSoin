import createAfflictionService from '../../../../services/affliction/admin/createAfflictionAsAdmin.js';
import createdAfflictionSchema from '../../../../validations/joi/creation/createdAfflictionSchema.js';

export default async function createAfflictionAsAdmin(req, res) {
  try {
    const { error } = createdAfflictionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const createdAffliction = await createAfflictionService({
      adminId: req.admin_id,
      afflictionData: req.body,
    });

    if (!createdAffliction) {
      return res
        .status(500)
        .json({ message: 'Error while creating affliction.' });
    }

    return res.status(201).json({
      message: 'Affliction created.',
    });
  } catch (error) {
    console.error('Error creating affliction:', error);

    return res.status(500).json({
      message: 'Error creating affliction:',
      error: error.message,
    });
  }
}

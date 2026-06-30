import createAfflictionService from '../../../../services/affliction/admin/createAfflictionAsAdmin.js';

export default async function createAfflictionAsAdmin(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message:
          'The request body cannot be empty. Please provide the necessary data.',
      });
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
    return res.status(201).json(createdAffliction);
  } catch (error) {
    console.error('Error creating affliction:', error);

    return res.status(500).json({
      message: 'Error creating affliction:',
      error: error.message,
    });
  }
}

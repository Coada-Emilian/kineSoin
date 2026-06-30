import updateAfflictionService from '../../../../services/affliction/admin/updateAfflictionAsAdmin.js';

export default async function updateAfflictionAsAdmin(req, res) {
  try {
    if (!req.body) {
      console.error('Request body is empty or invalid');
      return res.status(400).json({
        message:
          'The request body cannot be empty. Please provide the necessary data.',
      });
    }

    const updatedAffliction = updateAfflictionService({
      adminId: req.admin_id,
      afflictionId: req.params.affliction_id,
      afflictionData: req.body,
    });

    if (!updatedAffliction) {
      return res
        .status(500)
        .json({ message: 'Error while updating affliction.' });
    }

    return res.status(200).json({
      message: 'Affliction updated successfully',
    });
    
  } catch (error) {
    console.error('Error updating affliction:', error);

    return res.status(500).json({
      message: 'Error updating affliction:',
      error: error.message,
    });
  }
}

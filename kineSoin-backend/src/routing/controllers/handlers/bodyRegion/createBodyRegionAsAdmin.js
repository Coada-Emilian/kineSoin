import createBodyRegionService from '../../../../services/body_region/admin/createBodyRegionAsAdmin.js';
import createdBodyRegionSchema from '../../../../validations/joi/creation/createdBodyRegionSchema.js';

export default async function createBodyRegionAsAdmin(req, res) {
  try {
    const { error } = createdBodyRegionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    const createdBodyRegion = await createBodyRegionService({
      adminId: req.admin_id,
      bodyRegionData: req.body,
    });

    if (!createdBodyRegion) {
      return res
        .status(500)
        .json({ message: 'Error while creating body region.' });
    }

    return res.status(201).json({
      message: 'Body region created.',
    });
  } catch (error) {
    console.error('Error creating body region:', error);

    return res.status(500).json({
      message: 'Error creating body region:',
      error: error.message,
    });
  }

  if (!newBodyRegion) {
    return res
      .status(500)
      .json({ message: 'Error while creating body region.' });
  }

  return res.status(201).json(newBodyRegion);
}

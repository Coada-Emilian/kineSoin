import getAllInsurancesService from '../../../../services/insurance/admin/getAllInsurancesAsAdmin.js';

export default async function getAllInsurancesAsAdmin(req, res) {
  try {
    const insurances = await getAllInsurancesService({ adminId: req.admin_id });

    if (insurances.length === 0) {
      return res.status(404).json({ message: 'No insurances found.' });
    }
    return res.status(200).json(insurances);
  } catch (error) {
    console.error('Error fetching insurances:', error);

    return res.status(500).json({
      message: 'Error fetching insurances:',
      error: error.message,
    });
  }
}

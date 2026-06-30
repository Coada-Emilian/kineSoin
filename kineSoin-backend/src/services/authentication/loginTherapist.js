import verifyPassword from '../../authentication/verifyPassword.js';
import { Therapist } from '../../models/index.js';

export default async function loginTherapistService({ email, password }) {
  const therapist = await Therapist.findOne({
    where: { email },
    attributes: ['id', 'name', 'surname', 'status', 'picture_url', 'password'],
  });

  if (!therapist) {
    return null;
  }

  const isPasswordValid = verifyPassword(password, therapist.password);

  if (!isPasswordValid) {
    return null;
  }

  return therapist;
}

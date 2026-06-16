import { handleBodyRegionCreationAsAdmin } from '../../../../apiUtils/adminApiUtils/bodyRegionApiUtils';

interface FunctionProps {
  onClose: () => void;
}

export const createRegion = async (
  e: React.FormEvent<HTMLFormElement>,
  { onClose }: FunctionProps
) => {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const formData = new FormData(form);
  const response = await handleBodyRegionCreationAsAdmin(formData);
  if (response) {
    onClose && onClose();
    window.location.reload();
  } else {
    console.error('Failed to create region');
  }
};

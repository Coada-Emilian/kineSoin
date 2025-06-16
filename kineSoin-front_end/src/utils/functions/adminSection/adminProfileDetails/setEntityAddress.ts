export const etEntityAddress = (
  streetNumber: string,
  streetName: string,
  city: string,
  postalCode: string
) => {
  const full_address = `${streetNumber} ${streetName}, ${postalCode}, ${city}`;

  return {
    full_address,
  };
};

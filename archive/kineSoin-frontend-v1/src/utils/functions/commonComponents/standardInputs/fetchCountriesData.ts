import axios from 'axios';
import { ICountry } from '../../../../@types/interfaces/customInterfaces';

interface FunctionProps {
  setCountries: React.Dispatch<React.SetStateAction<ICountry[]>>;
}

export const fetchCountriesData = async ({ setCountries }: FunctionProps) => {
  try {
    const response = await axios.get(
      'https://restcountries.com/v3.1/all?fields=name,idd'
    );

    if (response) {
      const data: ICountry[] = response.data
        .map((country: any): ICountry => {
          const root = country.idd?.root || '';
          const suffixes = country.idd?.suffixes || [];
          const prefix = suffixes.length ? `${root}${suffixes[0]}` : root;

          return {
            prefix: prefix,
            name: country.name.common,
          };
        })
        .sort((a: ICountry, b: ICountry) => a.name.localeCompare(b.name));

      setCountries(data);
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

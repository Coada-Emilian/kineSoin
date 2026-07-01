import axios from 'axios';
import type {
  ICountryPrefix,
  IRestCountry,
} from '../../@types/interfaces/apiInterfaces';

interface FunctionProps {
  setCountryPrefixes: React.Dispatch<React.SetStateAction<ICountryPrefix[]>>;
}

export const fetchCountriesData = async ({
  setCountryPrefixes,
}: FunctionProps) => {
  try {
    const response = await axios.get(
      'https://restcountries.com/v3.1/all?fields=name,idd'
    );

    if (response) {
      const data: ICountryPrefix[] = response.data
        .map((country: IRestCountry): ICountryPrefix => {
          const root = country.idd?.root || '';
          const suffixes = country.idd?.suffixes || [];
          const prefix = suffixes.length ? `${root}${suffixes[0]}` : root;

          return {
            prefix: prefix,
            name: country.name.common,
          };
        })
        .sort((a: ICountryPrefix, b: ICountryPrefix) =>
          a.name.localeCompare(b.name)
        );

      setCountryPrefixes(data);
    }
  } catch (error) {
    console.error('Error fetching country prefixes:', error);
  }
};

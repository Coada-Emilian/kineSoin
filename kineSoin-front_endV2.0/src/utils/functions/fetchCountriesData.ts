import axios from 'axios';
import type {
  CountryPrefixInterface,
  RestCountry,
} from '../../@types/interfaces/customInterfaces';

interface FunctionProps {
  setCountryPrefixes: React.Dispatch<
    React.SetStateAction<CountryPrefixInterface[]>
  >;
}

export const fetchCountriesData = async ({
  setCountryPrefixes,
}: FunctionProps) => {
  try {
    const response = await axios.get(
      'https://restcountries.com/v3.1/all?fields=name,idd'
    );

    if (response) {
      const data: CountryPrefixInterface[] = response.data
        .map((country: RestCountry): CountryPrefixInterface => {
          const root = country.idd?.root || '';
          const suffixes = country.idd?.suffixes || [];
          const prefix = suffixes.length ? `${root}${suffixes[0]}` : root;

          return {
            prefix: prefix,
            name: country.name.common,
          };
        })
        .sort((a: CountryPrefixInterface, b: CountryPrefixInterface) =>
          a.name.localeCompare(b.name)
        );

      setCountryPrefixes(data);
    }
  } catch (error) {
    console.error('Error fetching country prefixes:', error);
  }
};

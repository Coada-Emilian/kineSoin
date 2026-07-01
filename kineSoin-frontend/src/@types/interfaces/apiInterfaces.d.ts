export interface ICountryPrefix {
  flag_url?: string;
  prefix: string;
  name: string;
}

// Type for the country data coming from https://restcountries.com/v3.1/all?fields=name,idd when fetching prefixes data
export interface IRestCountry {
  name: {
    common: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}

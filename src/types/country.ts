/* This interface creates an object to view different country details of a particular country, used in the
random component. */

export default interface Country {
  name: string;
  capital: string;
  region: string;
  flag: string;
  currencies: string;
  languages: string;
  population: number;
}
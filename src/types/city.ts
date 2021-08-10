/* This interface creates an object to view different weather details of a particular place or city. */

export default interface City {
  city: string;
  temperature: string;
  description: string;
  wind: string;
  forecast: any;
}



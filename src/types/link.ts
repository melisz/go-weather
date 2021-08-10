/* This interface creates an object to create routes for the sitemap. */

export default interface Link {
  name: string;
  path: string;
  detail: boolean;
}

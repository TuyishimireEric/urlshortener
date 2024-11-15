export interface ShortenedURL {
  id?: string;
  url: string;
  ttlInSeconds: number | null;
  createdDate?: string;
  modifiedDate?: string;
}

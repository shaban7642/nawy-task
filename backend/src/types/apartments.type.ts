export interface Apartment {
  id: number;
  title?: string;
  description?: string;
  imageStoragePath?: string;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
}

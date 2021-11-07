import { Image, ImageFilter } from "../entities";

export interface ImageRepository {
  getItems(page: number, limit: number): Promise<Image[]>;
  getById(id: string): Promise<Image>;
  getImageWithFilters(id: string, filter: ImageFilter): string;
}

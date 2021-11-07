import { ImageRepository } from "../infrastructure/image-repository.interface";
import { Image, ImageFilter } from "../entities/";

export class GetImageDetails {
  constructor(private readonly imageRepository: ImageRepository) {}

  async load(id: string): Promise<Image> {
    const image = await this.imageRepository.getById(id);
    return image;
  }

  applyFilter(id: string, filter: ImageFilter): string {
    const imageUrl = this.imageRepository.getImageWithFilters(id, filter);
    return imageUrl;
  }
}

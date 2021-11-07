import { ImageRepository } from "../infrastructure/image-repository.interface";
import { Image, ImageFilter } from "../entities/";

export class ApplyImageFilter {
  constructor(private readonly imageRepository: ImageRepository) {}

  apply(id: string, filter: ImageFilter): string {
    const imageUrl = this.imageRepository.getImageWithFilters(id, filter);
    return imageUrl;
  }
}

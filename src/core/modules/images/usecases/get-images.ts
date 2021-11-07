import { ImageRepository } from "../infrastructure/image-repository.interface";
import { Image } from "../entities/";

export class GetImages {
  constructor(private readonly imageRepository: ImageRepository) {}

  async load(page: number = 0, limit: number = 30): Promise<Image[]> {
    const images = await this.imageRepository.getItems(page, limit);
    return images;
  }
}

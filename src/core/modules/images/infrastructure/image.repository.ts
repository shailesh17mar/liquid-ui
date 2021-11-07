import { ImageRepository } from "./image-repository.interface";
import { Image, ImageFilter } from "../entities/";

export class ImageRepositoryImpl implements ImageRepository {
  private readonly baseUrl = "https://picsum.photos";
  private readonly width = 367;
  private readonly height = 367;

  async getItems(page: number = 1, limit: number = 30): Promise<Image[]> {
    if (page < 0 || limit < 0) {
      throw new Error("Invalid parameters");
    }
    const imageResponse = await fetch(`${this.baseUrl}/v2/list?page=${page}`);
    const images: Image[] = await imageResponse.json();
    const thumbnails = images.map((image: Image) => {
      return {
        ...image,
        url: `${this.baseUrl}/id/${image.id}/367/267/`,
      };
    });
    return thumbnails;
  }

  async getById(id: string): Promise<Image> {
    const imageResponse = await fetch(`${this.baseUrl}/id/${id}/info`);
    const image: Image = await imageResponse.json();
    return {
      ...image,
      url: `${this.baseUrl}/id/${image.id}/367/267/`,
      width: this.width,
      height: this.height,
    };
  }

  getImageWithFilters(id: string, filter: ImageFilter): string {
    const dimension = filter.dimension
      ? `/${filter.dimension.width}/${filter.dimension.height}`
      : "";
    const imageUrl = new URL(`${this.baseUrl}/id/${id}${dimension}`);
    if (filter.grayscale) imageUrl.searchParams.append("grayscale", "true");
    if (filter.blur)
      imageUrl.searchParams.append("blur", filter.blur.toString());
    return imageUrl.href;
  }
}

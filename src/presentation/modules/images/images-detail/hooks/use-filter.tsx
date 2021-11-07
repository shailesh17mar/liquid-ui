import { useEffect, useState } from "react";
import { Image, ImageFilter } from "core/modules/images/entities/";

export const useFilter = (
  image: Image | undefined,
  searchParams: URLSearchParams
) => {
  const [filter, setFilter] = useState<ImageFilter | undefined>();
  useEffect(() => {
    if (image) {
      const grayscale = searchParams.get("grayscale");
      const width = searchParams.get("width");
      const height = searchParams.get("height");
      const filter = {
        grayscale: grayscale && grayscale === "true",
        blur: searchParams.get("blur"),
        dimension: {
          width: width ? (width as unknown as number) : image.width,
          height: height ? (height as unknown as number) : image.height,
        },
      } as unknown as ImageFilter;
      setFilter(filter);
    }
  }, [searchParams, image]);
  return [filter];
};

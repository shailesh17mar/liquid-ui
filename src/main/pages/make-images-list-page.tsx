import React from "react";
import { ImagesList } from "presentation/modules/images/";
import { ImageRepositoryImpl } from "core/modules/images/infrastructure/image.repository";
import { GetImages } from "core/modules/images/usecases/get-images";

export const makeGetImagesList = (): GetImages =>
  new GetImages(new ImageRepositoryImpl());

export const ImagesListPage: React.FC = () => {
  return <ImagesList loadImagesList={makeGetImagesList()} />;
};

import React from "react";
import { ImagesDetail } from "presentation/modules/images/";
import { ImageRepositoryImpl } from "core/modules/images/infrastructure/image.repository";
import { GetImageDetails } from "core/modules/images/usecases/get-image-details";

export const makeGetImageDetails = (): GetImageDetails =>
  new GetImageDetails(new ImageRepositoryImpl());

export const ImageDetailsPage: React.FC = () => {
  return <ImagesDetail loadImageDetails={makeGetImageDetails()} />;
};

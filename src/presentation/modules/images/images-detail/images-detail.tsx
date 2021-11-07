import React from "react";
import { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/spinner";
import { useParams, useSearchParams } from "react-router-dom";
import ImageEditForm from "./components/image-edit-form";
import { ImageFilter } from "core/modules/images/entities/";
import {
  ControlPanel,
  Canvas,
  ImageDetailContainer,
} from "./images-detail.styles";
import { GetImageDetails } from "core/modules/images/usecases/get-image-details";
import { useGetImageDetails } from "./hooks/use-get-images-detail";

type Props = {
  loadImageDetails: GetImageDetails;
};

export const ImagesDetail: React.FC<Props> = ({ loadImageDetails }: Props) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<ImageFilter | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [{ loading, image }] = useGetImageDetails(
    loadImageDetails,
    params.id!!
  );
  useEffect(() => {
    const grayscale = searchParams.has("grayscale");
    const width = searchParams.get("width");
    const height = searchParams.get("height");
    const filter = {
      grayscale,
      blur: searchParams.get("blur"),
      dimension: {
        width: width ? (width as unknown as number) : image?.width,
        height: height ? (height as unknown as number) : image?.height,
      },
    } as unknown as ImageFilter;

    const imageUrl = loadImageDetails.applyFilter(params.id!!, filter);
    setFilter(filter);
    setImageUrl(imageUrl);
  }, [searchParams, params, image, setFilter, loadImageDetails]);

  const handleSubmit = (filter: ImageFilter) => {
    const { grayscale, blur, dimension } = filter;
    const imageUrl = loadImageDetails.applyFilter(params.id!!, filter);
    setImageUrl(imageUrl);
    if (grayscale) {
      searchParams.set("grayscale", "true");
    }
    if (blur) {
      searchParams.set("blur", blur.toString());
    }
    if (dimension) {
      searchParams.set("width", dimension.width.toString());
      searchParams.set("height", dimension.height.toString());
    }
    setSearchParams(searchParams);
  };

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <ImageDetailContainer>
      <Canvas>
        <Image src={imageUrl} />
      </Canvas>
      <ControlPanel>
        <ImageEditForm
          image={{ ...image!!, url: imageUrl!! }}
          filter={filter}
          onSubmit={handleSubmit}
        />
      </ControlPanel>
    </ImageDetailContainer>
  );
};

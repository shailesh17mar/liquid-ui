import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { Loader } from "presentation/modules/shared/components/loader/loader";
import ImageEditForm from "./components/image-edit-form";
import { GetImageDetails } from "core/modules/images/usecases/get-image-details";
import { ImageFilter } from "core/modules/images/entities/";
import {
  ControlPanel,
  Canvas,
  ImageDetailContainer,
} from "./images-detail.styles";
import { useFilter, useGetImageDetails } from "./hooks";

type Props = {
  loadImageDetails: GetImageDetails;
};

type Params = {
  id: string;
};

export const ImagesDetail: React.FC<Props> = ({ loadImageDetails }: Props) => {
  const { id } = useParams() as Params;
  const [searchParams, setSearchParams] = useSearchParams();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [{ loading, error, image }] = useGetImageDetails(loadImageDetails, id);
  const [filter] = useFilter(image, searchParams);

  //update image url on filter change
  useEffect(() => {
    if (filter) {
      setImageUrl(loadImageDetails.applyFilter(id, filter));
    }
  }, [filter, id, loadImageDetails]);

  //update the search params
  const handleSubmit = (filter: ImageFilter) => {
    const { grayscale, blur, dimension } = filter;
    if (grayscale) {
      searchParams.set("grayscale", "true");
    } else {
      searchParams.delete("grayscale");
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

  if (error) throw error;
  if (loading || !imageUrl || !image) return <Loader />;
  return (
    <ImageDetailContainer>
      <Canvas>
        <Image src={imageUrl} />
      </Canvas>
      <ControlPanel>
        <ImageEditForm
          image={{ ...image, url: imageUrl }}
          filter={filter}
          onSubmit={handleSubmit}
        />
      </ControlPanel>
    </ImageDetailContainer>
  );
};

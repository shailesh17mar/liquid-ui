import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, GridItem, PaginationBar } from "./images-list.styles";
import { ImagesCard } from "./components/images-card";
import Pagination from "react-bootstrap/pagination";
import Spinner from "react-bootstrap/spinner";
import { GetImages } from "core/modules/images/usecases/get-images";
import { Image } from "core/modules/images/entities/";
import { useGetImagesList } from "./hooks/use-get-images-list";

type Props = {
  loadImagesList: GetImages;
};

export const ImagesList: React.FC<Props> = ({ loadImagesList }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
  const [{ loading, images }] = useGetImagesList(loadImagesList, page);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        images &&
        images.length > 0 && (
          <Grid>
            {images.map((image: Image) => (
              <GridItem key={image.id}>
                <ImagesCard image={image} />
              </GridItem>
            ))}
          </Grid>
        )
      )}
      <PaginationBar size="lg">
        <Pagination.Item
          disabled={page === 1}
          onClick={() =>
            setSearchParams({
              page: (page - 1) as unknown as string,
            })
          }
        >
          Prev
        </Pagination.Item>
        <Pagination.Item
          onClick={() =>
            setSearchParams({
              page: (page + 1) as unknown as string,
            })
          }
        >
          Next
        </Pagination.Item>
      </PaginationBar>
    </>
  );
};

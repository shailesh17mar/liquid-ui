import React from "react";
import Card from "react-bootstrap/Card";
import { ImageCard } from "./images-card.styles";
import { Link } from "react-router-dom";
import { Image } from "core/modules/images/entities/";

type Props = {
  image: Image;
};

export const ImagesCard: React.FC<Props> = ({ image }: Props) => {
  return (
    <ImageCard>
      <Link to={`/images/${image.id}`}>
        <Card.Img variant="top" src={image.url} />
        <Card.Body>
          <p>{image.author}</p>
        </Card.Body>
      </Link>
    </ImageCard>
  );
};

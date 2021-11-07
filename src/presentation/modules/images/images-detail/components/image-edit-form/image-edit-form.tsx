import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Image, ImageFilter } from "core/modules/images/entities/";

type Props = {
  image: Image;
  filter?: ImageFilter;
  onSubmit: (filter: ImageFilter) => void;
};

export const ImageEditForm: React.FC<Props> = ({
  image,
  filter,
  onSubmit,
}: Props) => {
  const [width, setWidth] = useState<number>(filter?.dimension?.width || image.width);
  const [height, setHeight] = useState<number>(filter?.dimension?.height ||image.height);
  const [grayscale, setGrayscale] = useState<boolean>(
    filter?.grayscale || false
  );
  const [blur, setBlur] = useState<number>(filter?.blur || 1);
  return (
    <Form>
      <a download={"download.png"} href={image.url}>
        Download
      </a>

      <Form.Group className="mb-3" controlId="blur">
        <Form.Label>Blurring</Form.Label>
        <Form.Range
          min="1"
          max="10"
          value={blur}
          onChange={(e) => {
            setBlur(e.target.value as unknown as number);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="grayscale">
        <Form.Label>Grayscaling</Form.Label>
        <Form.Check
          type={"checkbox"}
          label={`Grayscale`}
          checked={grayscale}
          onChange={(e) => {
            setGrayscale(e.target.checked);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="dimension">
        <Form.Label>Width</Form.Label>
        <Form.Control
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => {
            setWidth(e.target.value as unknown as number);
          }}
        />
        <Form.Label>Height</Form.Label>
        <Form.Control
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => {
            setHeight(e.target.value as unknown as number);
          }}
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={() => {
          onSubmit({
            grayscale,
            blur,
            dimension: {
              width,
              height,
            },
          } as ImageFilter);
        }}
      >
        Apply
      </Button>
    </Form>
  );
};

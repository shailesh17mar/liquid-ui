interface Dimension {
  width: number;
  height: number;
}

export interface ImageFilter {
  grayscale: boolean;
  blur?: number;
  dimension?: Dimension;
}

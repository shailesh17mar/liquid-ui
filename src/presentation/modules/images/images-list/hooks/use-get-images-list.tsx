import { useEffect, useReducer } from "react";
import { GetImages } from "core/modules/images/usecases/get-images";
import { Image } from "core/modules/images/entities/";

interface State {
  loading: boolean;
  error: string;
  images: Image[];
}

enum actions {
  FETCH_SUCCESSFUL = "FETCH_SUCCESSFUL",
  FETCHING = "FETCHING",
  FETCH_FAILED = "FETCH_FAILED",
}

type Action =
  | { type: "FETCHING" }
  | { type: "FETCH_SUCCESSFUL"; images: Image[] }
  | { type: "FETCH_FAILED" };

const initialState: State = {
  loading: true,
  error: "",
  images: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actions.FETCH_SUCCESSFUL:
      return {
        loading: false,
        images: action.images,
        error: "",
      };
    case actions.FETCH_FAILED:
      return {
        loading: false,
        images: [],
        error: "Something went wrong!",
      };
    default:
      return state;
  }
};

export function useGetImagesList(loadImagesList: GetImages, page: number) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadImagesList
      .load(page)
      .then((images: Image[]) => {
        dispatch({ type: actions.FETCH_SUCCESSFUL, images });
      })
      .catch((error) => {
        dispatch({ type: actions.FETCH_FAILED });
      });
  }, [page, loadImagesList]);

  return [state];
}

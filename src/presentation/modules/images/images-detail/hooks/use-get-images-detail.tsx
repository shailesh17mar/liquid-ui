import { useEffect, useReducer } from "react";
import { GetImageDetails } from "core/modules/images/usecases/get-image-details";
import { Image } from "core/modules/images/entities/";

interface State {
  loading: boolean;
  error: string;
  image?: Image;
}

enum actions {
  FETCH_SUCCESSFUL = "FETCH_SUCCESSFUL",
  FETCHING = "FETCHING",
  FETCH_FAILED = "FETCH_FAILED",
}

type Action =
  | { type: "FETCHING" }
  | { type: "FETCH_SUCCESSFUL"; image: Image }
  | { type: "FETCH_FAILED" };

const initialState: State = {
  loading: true,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actions.FETCH_SUCCESSFUL:
      return {
        loading: false,
        image: action.image,
        error: "",
      };
    case actions.FETCH_FAILED:
      return {
        loading: false,
        error: "Something went wrong!",
      };
    default:
      return state;
  }
};

export function useGetImageDetails(
  loadImageDetails: GetImageDetails,
  id: string
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadImageDetails
      .load(id)
      .then((image: Image) => {
        dispatch({ type: actions.FETCH_SUCCESSFUL, image });
      })
      .catch((error) => {
        dispatch({ type: actions.FETCH_FAILED });
      });
  }, [id, loadImageDetails]);

  return [state];
}

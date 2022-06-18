import { HomeState } from "./";
import { UI_INITIAL_STATE as InitialState } from "./HomeProvider";
import { SerializedData } from "@/interfaces/serialized-data";

type HomeActionType =
  | { type: "Data - Set ResponseData"; payload: SerializedData }
  | { type: "Loading - Set Loading"; payload: boolean }
  | { type: "Reset State"; payload: typeof InitialState };

export const homeReducer = (
  state: HomeState,
  action: HomeActionType
): HomeState => {
  switch (action.type) {
    case "Data - Set ResponseData":
      return {
        ...state,
        data: action.payload
      };

    case "Loading - Set Loading":
      return {
        ...state,
        loading: action.payload
      };

    case "Reset State":
      return {
        ...state,
        data: action.payload.data
      };

    default:
      return state;
  }
};

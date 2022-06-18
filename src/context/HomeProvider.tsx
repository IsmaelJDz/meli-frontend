import { FC, useReducer } from "react";
import { HomeContext } from "./";
import { homeReducer } from "./HomeReducer";

import { SerializedData, Author } from "@/interfaces/serialized-data";

export interface HomeState {
  data: SerializedData;
  loading: boolean;
}

interface HomeProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const UI_INITIAL_STATE: HomeState = {
  data: {
    author: {} as Author,
    categories: [],
    items: []
  },
  loading: false
};

export const HomeProvider: FC<HomeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(homeReducer, UI_INITIAL_STATE);

  const setSearchData = (products: SerializedData) => {
    dispatch({ type: "Data - Set ResponseData", payload: products });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "Loading - Set Loading", payload: loading });
  };

  const resetState = () => {
    dispatch({ type: "Reset State", payload: UI_INITIAL_STATE });
  };

  return (
    <HomeContext.Provider
      value={{
        ...state,
        setLoading,
        resetState,
        setSearchData
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

import { createContext } from "react";
import { SerializedData } from "@/interfaces/serialized-data";

interface ContextProps {
  data: SerializedData;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setSearchData: (data: any) => void;
  resetState: () => void;
}

export const HomeContext = createContext({} as ContextProps);

import { useContext } from "react";

import { HomeContext } from "@/context/HomeContext";

export function useAppContext() {
  const context = useContext(HomeContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}

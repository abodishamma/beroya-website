import { useContext } from "react";
import { CommerceContext } from "../context/commerceContext";

export function useCommerce() {
  const value = useContext(CommerceContext);
  if (!value) {
    throw new Error("useCommerce must be used inside CommerceProvider");
  }

  return value;
}

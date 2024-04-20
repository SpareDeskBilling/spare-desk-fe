import { KeyboardEvent } from "react";

export const INVALID_NUMERIC_CHARACTERS = ['e', 'E', '-', '+'];
export const removeInvalidNumericCharactersOnInput = (
  e: KeyboardEvent<HTMLDivElement>
) => {
  if (INVALID_NUMERIC_CHARACTERS.includes(e.key)) {
    if (e?.preventDefault) e.preventDefault();
    return false;
  }
  return true;
};
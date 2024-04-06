import type { LabelValuePair } from "@/types";

export const upperCaseFirstLetter = (word: string) => {
  const [firstLetter, ...rest] = word;
  const output = `${firstLetter.toUpperCase()}${rest.join('')}`;
  return output;
};

export const filterOptionOnSearch = (option: LabelValuePair) => (searchText: string) => {
  const output = option.label.toLowerCase().includes(searchText.toLowerCase());
  return output;
};
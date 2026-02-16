import { en } from "./en";

type RecursiveStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : RecursiveStringify<T[K]>;
};

export type TranslationKeys = RecursiveStringify<typeof en>;
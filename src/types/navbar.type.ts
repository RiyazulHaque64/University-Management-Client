import { ReactNode } from "react";

export type TNavItem =
  | {
      key: string;
      label: ReactNode;
      children?: TNavItem[];
    }
  | undefined;

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TItem = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TItem[];
};

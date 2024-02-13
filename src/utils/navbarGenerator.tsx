import { NavLink } from "react-router-dom";
import { TItem, TNavItem } from "../types";

export const navbarGenerator = (items: TItem[], role: string) => {
  const navbar = items.reduce((acc: TNavItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={item.path}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name as string,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);
  return navbar;
};

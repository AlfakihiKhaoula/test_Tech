import { lazy } from "react";

const Characters = lazy(() => import("../pages/Characters"));
const CharacterDetail = lazy(() => import("../pages/CharacterDetail"));
const Favorites = lazy(() => import("../pages/Favorites"));

export const routes = [
  {
    path: "/",
    component: Characters ,
  },
  {
    path: "/character/:id",
    component:CharacterDetail ,
  },
  {
    path: "/favorites",
    component: Favorites ,
  },
];

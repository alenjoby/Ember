import { createBrowserRouter } from "react-router";
import { MainCanvas } from "./components/main-canvas";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainCanvas,
  },
]);

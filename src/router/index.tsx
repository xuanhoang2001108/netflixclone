import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/HomePage";
import WatchPage from "../pages/WatchPage";

import ExploreAllPage from "../pages/ExploreAllPage";
import StartPage from "../pages/StartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/WatchPage",
    element: <WatchPage />,
  },
  {
    path: "/:movieGerne",
    element: <ExploreAllPage />,
  },
  {
    path: "/StartPage",
    element: <StartPage />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  {
    path: "/RegisterPage",
    element: <RegisterPage />,
  }
]);

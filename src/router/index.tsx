import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/HomePage";
import ExploreAllPage from "../pages/ExploreAllPage";
import StartPage from "../pages/StartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { VideoPlayer } from "../components/VideoPlayer";
import MyListPage from "../pages/MyListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
  },
  {
    path: "/RegisterPage",
    element: <RegisterPage />,
  },

  {
    path: "/HomePage",
    element: <MainLayout />,
  },
  {
    path: "/WatchPage/:movieId",
    element: <VideoPlayer />,
  },
  {
    path: "/ExploreAllPage/:moviegenre",
    element: <ExploreAllPage />,
  },
  {
    path: "/MyListPage",
    element: <MyListPage />,
  },
]);

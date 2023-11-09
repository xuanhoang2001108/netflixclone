import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/HomePage";
import ExploreAllPage from "../pages/ExploreAllPage";
import StartPage from "../pages/StartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { VideoPlayer } from "../components/VideoPlayer";
import MyListPage from "../pages/MyListPage";
import AdminPage from "../pages/AdminPage";
import UserPage from "../components/UserPage";
import RolePage from "../components/RolePage";
import PolicyPage from "../components/PolicyPage";
import PermissionSetPage from "../components/PermissionSetPage";
import CreateUser from "../components/CreateUser";
import EditUser from "../components/EditUser";
import ViewUser from "../components/ViewUser";

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
  {
    path: "/AdminPage",
    element: <AdminPage />,
    children: [
      {
        path: "UserPage",
        element: <UserPage />,
        children: [
          {
            path: "CreateUser",
            element: <CreateUser />,
          },
          { path: "EditUser", element: <EditUser /> },
          { path: "ViewUser", element: <ViewUser /> },
        ],
      },
      {
        path: "RolePage",
        element: <RolePage />,
      },
      {
        path: "PolicyPage",
        element: <PolicyPage />,
      },
      {
        path: "PermissionSetPage",
        element: <PermissionSetPage />,
      },
    ],
  },
]);

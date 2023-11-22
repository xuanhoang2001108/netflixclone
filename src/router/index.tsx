import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/HomePage";
import ExploreAllPage from "../pages/ExploreAllPage";
import StartPage from "../pages/StartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { VideoPlayer } from "../components/VideoPlayer";
import MyListPage from "../pages/MyListPage";
import AdminPage from "../pages/AdminPage";
import UserPage from "../components/Admin/UserPage/UserPage";
import RolePage from "../components/Admin/RolePage/RolePage";
import PolicyPage from "../components/Admin/PolicyPage/PolicyPage";

import CreateUser from "../components/Admin/UserPage/CreateUser";
import EditUser from "../components/Admin/UserPage/EditUser";
import ViewUser from "../components/Admin/UserPage/ViewUser";
import CreateRole from "../components/Admin/RolePage/CreateRole";
import EditRole from "../components/Admin/RolePage/EditRole";
import ViewRole from "../components/Admin/RolePage/ViewRole";
import PermissionPage from "../components/Admin/PermissionPage/PermissionPage";
import EditPermission from "../components/Admin/PermissionPage/EditPermission";
import ViewPermission from "../components/Admin/PermissionPage/ViewPermission";
import CreatePermission from "../components/Admin/PermissionPage/CreatePermission";
import CreatePolicy from "../components/Admin/PolicyPage/CreatePolicy";
import EditPolicy from "../components/Admin/PolicyPage/EditPolicy";
import ViewPolicy from "../components/Admin/PolicyPage/ViewPolicy";

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
          { path: "EditUser/:userId", element: <EditUser /> },
          { path: "ViewUser/:userId", element: <ViewUser /> },
        ],
      },
      {
        path: "RolePage",
        element: <RolePage />,
        children: [
          {
            path: "CreateRole",
            element: <CreateRole />,
          },
          { path: "EditRole/:roleId", element: <EditRole /> },
          { path: "ViewRole/:roleId", element: <ViewRole /> },
        ],
      },
      {
        path: "PolicyPage",
        element: <PolicyPage />,
        children: [
          {
            path: "CreatePolicy",
            element: <CreatePolicy />,
          },
          { path: "EditPolicy/:permissionSetId", element: <EditPolicy /> },
          { path: "ViewPolicy/:permissionSetId", element: <ViewPolicy /> },
        ],
      },
      {
        path: "PermissionPage",
        element: <PermissionPage />,
        children: [
          {
            path: "CreatePermission",
            element: <CreatePermission />,
          },
          { path: "EditPermission/:permissionId", element: <EditPermission /> },
          { path: "ViewPermission/:permissionId", element: <ViewPermission /> },
        ],
      },
    ],
  },
]);

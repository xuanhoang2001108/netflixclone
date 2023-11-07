import { useNavigate } from "react-router-dom";
import LoginLogo from "./LoginLogo";

export const StartHeader = () => {
  const storedAccessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/LoginPage");
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="absolute w-screen  flex flex-row items-center  place-content-between">
      <LoginLogo sx={{ ml: { sm: 22 }, mt: 3 }} />
      {!storedAccessToken ? (
        <button
          className="rounded-md bg-red-600 w-20 h-8 font-semibold mr-40 items-center"
          onClick={handleNavigateToLogin}
        >
          Sign In
        </button>
      ) : (
        <button
          className="rounded-md bg-red-600 w-20 h-8 font-semibold mr-40 "
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

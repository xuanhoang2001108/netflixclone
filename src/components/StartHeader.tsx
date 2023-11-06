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
    <div className="absolute flex flex-row space-y-6 space-x-[840px]">
      <LoginLogo sx={{ ml: { sm: 22 }, mt: 3 }} />
      {!storedAccessToken ? (
        <button
          className="rounded-md bg-red-600 w-20 h-8 font-semibold items-center"
          onClick={handleNavigateToLogin}
        >
          Sign In
        </button>
      ) : (
        <button
          className="rounded-md bg-red-600 w-20 h-8 font-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

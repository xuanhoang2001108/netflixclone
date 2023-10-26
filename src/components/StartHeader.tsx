import { useNavigate } from "react-router-dom";
import LoginLogo from "./LoginLogo";

export const StartHeader = () => {
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/LoginPage");
  };
  return (
    <div className="absolute flex flex-row space-y-6 space-x-[840px]">
      <LoginLogo sx={{ ml: { sm: 22 }, mt: 3 }} />
      <button
        className="rounded-md bg-red-600 w-20 h-8 font-semi-bold"
        onClick={handleNavigateToLogin}
      >
        Sign In
      </button>
    </div>
  );
};

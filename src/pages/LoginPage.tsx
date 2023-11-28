import { useNavigate } from "react-router-dom";
import LoginContainer from "../components/LoginContainer";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../store/service/getUser.service";

function LoginPage() {
  const navigate = useNavigate();

  const { data: currentUserData } = useGetCurrentUserQuery();
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (!storedAccessToken) {
      navigate("/LoginPage");
    }
    if (currentUserData?.roles?.some((role: any) => role.name === "Admin")) {
      navigate("/AdminLoginPage");
    }
  }, [navigate, currentUserData]);

  return <LoginContainer></LoginContainer>;
}

export default LoginPage;

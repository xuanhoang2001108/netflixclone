import { useNavigate } from "react-router-dom";
import LoginContainer from "../components/LoginContainer";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (!storedAccessToken) {
      navigate("/LoginPage");
    } else {
      navigate("/HomePage")
    }
  }, [navigate]);

  return <LoginContainer></LoginContainer>;
}

export default LoginPage;

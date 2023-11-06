import { useNavigate } from "react-router-dom";
import RegisterContainer from "../components/RegisterContainer";
import { useEffect } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (!storedAccessToken) {
      navigate("/RegisterPage");
    } else navigate("/HomePage");
  }, [navigate]);
  return <RegisterContainer />;
}

export default RegisterPage;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Step2Profile from "../Modal/Signup/Steps/Step2Profile";

const OAuthStep2 = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    nickName: "",
    phone: "",
    gender: "",
    job: "",
    mbti: "",
    genre: "",
  });

  // 🔥 여기 중요
  useEffect(() => {
    const name = params.get("name");
    const email = params.get("email");

    if (!name || !email) {
      // 잘못된 접근 방지
      navigate("/");
      return;
    }

    setData((prev) => ({
      ...prev,
      name,
      email,
    }));
  }, []);

  const handleDone = () => {
    navigate("/"); // 가입 완료 후 메인
  };

  return (
    <Step2Profile
      data={data}
      setData={setData}
      onDone={handleDone}
      onBack={() => navigate(-1)}
    />
  );
};

export default OAuthStep2;

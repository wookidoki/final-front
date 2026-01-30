import React, { useState, useContext } from "react";
import { FaLock, FaEnvelope, FaGoogle } from "react-icons/fa";
import BaseModal from "./BaseModal";
import { axiosPublic } from "../../services/Axios/Axios";
import { AuthContext } from "../../context/Authcontext";

import {
  Container,
  Divider,
  ErrorMessage,
  Form,
  Input,
  InputGroup,
  InputIcon,
  InputWrapper,
  Label,
  Logo,
  LogoText,
  SocialButton,
  SocialButtons,
  SignupPrompt,
  SubmitButton,
  WelcomeText,
} from "./LoginModal.styles";

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const { setAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleLogin = () => {
    console.log("구글 로그인 클릭됨");
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 입력해주세요");
      return;
    }

    try {
      const requestData = {
        memberDto: { email: formData.email },
        password: formData.password,
      };

      const response = await axiosPublic.post(
        "/api/members/login",
        requestData,
      );

      if (response.data && response.data.status === 200) {
        const { accessToken, refreshToken, memberId, role, email } =
          response.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email || formData.email);

        setAuth({
          memberId,
          email: email || formData.email,
          accesstoken: accessToken,
          refreshtoken: refreshToken,
          role,
          isAuthenticated: true,
        });

        alert("로그인에 성공했습니다!");
        onClose();
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response && err.response.status === 401) {
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        setError(
          err.response?.data?.message || "로그인 중 오류가 발생했습니다.",
        );
      }
    }
  };

  return (
    <BaseModal onClose={onClose} maxWidth="480px" hideHeader>
      <Container>
        <Logo>
          <LogoText>RE:PLAY</LogoText>
          <WelcomeText>음악으로 연결된 세상</WelcomeText>
        </Logo>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>이메일</Label>
            <InputWrapper>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label>비밀번호</Label>
            <InputWrapper>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </InputWrapper>
          </InputGroup>

          <SubmitButton type="submit">로그인</SubmitButton>
        </Form>

        <Divider>
          <span>또는</span>
        </Divider>

        <SocialButton type="button" onClick={handleGoogleLogin}>
          <FaGoogle /> Google로 계속하기
        </SocialButton>

        <SignupPrompt>
          아직 계정이 없으신가요? <a onClick={onSwitchToSignup}>회원가입</a>
        </SignupPrompt>
      </Container>
    </BaseModal>
  );
};

export default LoginModal;

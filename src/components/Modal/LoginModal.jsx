import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaApple, FaSpotify } from "react-icons/fa";
import BaseModal from "./BaseModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -1px;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
  margin-bottom: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1.1rem;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
    opacity: 0.6;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ForgotLink = styled.a`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 24px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px ${({ theme }) => theme.colors.primary}60;
  }

  &:active {
    transform: translateY(0);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  span {
    color: ${({ theme }) => theme.colors.textSub};
    font-size: 0.9rem;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;

  svg {
    font-size: 1.3rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.95rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  color: #ff4444;
  font-size: 0.9rem;
  text-align: center;
`;

const LoginModal = ({ onClose, onSwitchToSignup }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 간단한 유효성 검사
    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 입력해주세요");
      return;
    }

    // TODO: 실제 로그인 로직
    console.log("Login attempt:", formData);
    // 성공 시 모달 닫기
    onClose();
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // TODO: 소셜 로그인 로직
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

          <CheckboxGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              로그인 상태 유지
            </CheckboxLabel>
            <ForgotLink>비밀번호 찾기</ForgotLink>
          </CheckboxGroup>

          <SubmitButton type="submit">로그인</SubmitButton>
        </Form>

        <Divider>
          <span>또는</span>
        </Divider>

        <SocialButtons>
          <SocialButton type="button" onClick={() => handleSocialLogin("google")}>
            <FaGoogle />
            Google로 계속하기
          </SocialButton>
          <SocialButton type="button" onClick={() => handleSocialLogin("apple")}>
            <FaApple />
            Apple로 계속하기
          </SocialButton>
          <SocialButton type="button" onClick={() => handleSocialLogin("spotify")}>
            <FaSpotify />
            Spotify로 계속하기
          </SocialButton>
        </SocialButtons>

        <SignupPrompt>
          아직 계정이 없으신가요?{" "}
          <a onClick={onSwitchToSignup}>회원가입</a>
        </SignupPrompt>
      </Container>
    </BaseModal>
  );
};

export default LoginModal;

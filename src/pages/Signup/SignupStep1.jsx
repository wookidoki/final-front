import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope, FaLock, FaArrowRight, FaCheckCircle } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.colors.bg};
`;

const LeftSection = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="50">🎵</text></svg>');
    opacity: 0.1;
    background-size: 100px;
  }

  @media (max-width: 968px) {
    display: none;
  }
`;

const LeftContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
`;

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  font-style: italic;
  margin-bottom: 24px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.6;
  opacity: 0.9;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 6px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.border};
  border-radius: 3px;
  transition: all 0.3s ease;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 18px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1.2rem;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: ${({ theme }) => theme.colors.surface};
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

const Requirements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const Requirement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${({ $met, theme }) => ($met ? theme.colors.primary : theme.colors.textSub)};
  transition: color 0.3s ease;

  svg {
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  color: #ff4444;
  font-size: 0.95rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const Button = styled.button`
  flex: 1;
  padding: 18px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.surface};
  color: ${({ $primary, theme }) => ($primary ? "white" : theme.colors.textMain)};
  border: 2px solid ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px
      ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.border)}50;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;

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

const SignupStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  // 비밀번호 요구사항 체크
  const passwordRequirements = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  };

  const allRequirementsMet = Object.values(passwordRequirements).every((req) => req);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!formData.email || !formData.password || !formData.passwordConfirm) {
      setError("모든 필드를 입력해주세요");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식이 아닙니다");
      return;
    }

    if (!allRequirementsMet) {
      setError("비밀번호 요구사항을 충족해주세요");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }

    // Step 1 데이터 저장하고 다음 단계로
    sessionStorage.setItem("signupStep1", JSON.stringify(formData));
    navigate("/signup/step2");
  };

  return (
    <Container>
      <LeftSection>
        <LeftContent>
          <Logo>RE:PLAY</Logo>
          <Tagline>
            음악으로 연결된 세상
            <br />
            당신만의 음악 우주를 만들어보세요
          </Tagline>
        </LeftContent>
      </LeftSection>

      <RightSection>
        <FormContainer>
          <ProgressBar>
            <ProgressStep $active />
            <ProgressStep />
            <ProgressStep />
            <ProgressStep />
          </ProgressBar>

          <Title>계정 만들기</Title>
          <Subtitle>RE:PLAY에 오신 것을 환영합니다!</Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
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
            </FormGroup>

            <FormGroup>
              <Label>비밀번호</Label>
              <InputWrapper>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type="password"
                  name="password"
                  placeholder="안전한 비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputWrapper>
              <Requirements>
                <Requirement $met={passwordRequirements.length}>
                  {passwordRequirements.length ? <FaCheckCircle /> : "○"} 8자 이상
                </Requirement>
                <Requirement $met={passwordRequirements.uppercase}>
                  {passwordRequirements.uppercase ? <FaCheckCircle /> : "○"} 대문자 포함
                </Requirement>
                <Requirement $met={passwordRequirements.lowercase}>
                  {passwordRequirements.lowercase ? <FaCheckCircle /> : "○"} 소문자 포함
                </Requirement>
                <Requirement $met={passwordRequirements.number}>
                  {passwordRequirements.number ? <FaCheckCircle /> : "○"} 숫자 포함
                </Requirement>
              </Requirements>
            </FormGroup>

            <FormGroup>
              <Label>비밀번호 확인</Label>
              <InputWrapper>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type="password"
                  name="passwordConfirm"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>

            <ButtonGroup>
              <Button type="submit" $primary>
                다음
                <FaArrowRight />
              </Button>
            </ButtonGroup>
          </Form>

          <LoginLink>
            이미 계정이 있으신가요? <a onClick={() => navigate("/login")}>로그인</a>
          </LoginLink>
        </FormContainer>
      </RightSection>
    </Container>
  );
};

export default SignupStep1;

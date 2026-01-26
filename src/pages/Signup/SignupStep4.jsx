import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

  @media (max-width: 968px) {
    display: none;
  }
`;

const LeftContent = styled.div`
  text-align: center;
  color: white;
`;

const Logo = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  font-style: italic;
  margin-bottom: 24px;
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
  max-width: 580px;
  animation: ${fadeIn} 0.6s ease;
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

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMain};
  cursor: pointer;
  transition: all 0.3s ease;

  &.required {
    font-weight: 700;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  input[type="checkbox"] {
    width: 24px;
    height: 24px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const TermsLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  margin-left: 4px;

  &:hover {
    opacity: 0.8;
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

const SignupStep4 = () => {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 이전 단계 데이터가 없으면 리다이렉트
    const step1Data = sessionStorage.getItem("signupStep1");
    const step2Data = sessionStorage.getItem("signupStep2");
    const step3Data = sessionStorage.getItem("signupStep3");
    if (!step1Data || !step2Data || !step3Data) {
      navigate("/signup/step1");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setError("");
  };

  const handleBack = () => {
    navigate("/signup/step3");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 필수 약관 동의 확인
    if (!agreements.terms || !agreements.privacy) {
      setError("필수 약관에 동의해주세요");
      return;
    }

    setIsSubmitting(true);

    try {
      // 모든 단계 데이터 수집
      const step1Data = JSON.parse(sessionStorage.getItem("signupStep1"));
      const step2Data = JSON.parse(sessionStorage.getItem("signupStep2"));
      const step3Data = JSON.parse(sessionStorage.getItem("signupStep3"));

      const signupData = {
        ...step1Data,
        ...step2Data,
        ...step3Data,
        agreements,
      };

      console.log("Signup data:", signupData);

      // TODO: 실제 회원가입 API 호출
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 회원가입 완료 후 세션 스토리지 정리
      sessionStorage.removeItem("signupStep1");
      sessionStorage.removeItem("signupStep2");
      sessionStorage.removeItem("signupStep3");

      // 완료 페이지로 이동
      navigate("/signup/complete");
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <LeftSection>
        <LeftContent>
          <Logo>RE:PLAY</Logo>
          <Tagline>
            거의 다 왔어요!
            <br />
            마지막 단계입니다
          </Tagline>
        </LeftContent>
      </LeftSection>

      <RightSection>
        <FormContainer>
          <ProgressBar>
            <ProgressStep $active />
            <ProgressStep $active />
            <ProgressStep $active />
            <ProgressStep $active />
          </ProgressBar>

          <Title>약관 동의</Title>
          <Subtitle>서비스 이용을 위해 약관에 동의해주세요</Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <CheckboxGroup>
              <CheckboxLabel className="required">
                <input
                  type="checkbox"
                  name="terms"
                  checked={agreements.terms}
                  onChange={handleChange}
                />
                <span>
                  [필수] 이용약관에 동의합니다
                  <TermsLink href="#" onClick={(e) => e.preventDefault()}>
                    (보기)
                  </TermsLink>
                </span>
              </CheckboxLabel>

              <CheckboxLabel className="required">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={agreements.privacy}
                  onChange={handleChange}
                />
                <span>
                  [필수] 개인정보 처리방침에 동의합니다
                  <TermsLink href="#" onClick={(e) => e.preventDefault()}>
                    (보기)
                  </TermsLink>
                </span>
              </CheckboxLabel>

              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="marketing"
                  checked={agreements.marketing}
                  onChange={handleChange}
                />
                <span>
                  [선택] 마케팅 정보 수신에 동의합니다 (이메일, 푸시 알림)
                </span>
              </CheckboxLabel>
            </CheckboxGroup>

            <ButtonGroup>
              <Button type="button" onClick={handleBack} disabled={isSubmitting}>
                <FaArrowLeft />
                이전
              </Button>
              <Button type="submit" $primary disabled={isSubmitting}>
                {isSubmitting ? "가입 중..." : "가입 완료"}
                {!isSubmitting && <FaCheckCircle />}
              </Button>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </RightSection>
    </Container>
  );
};

export default SignupStep4;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaCalendar, FaArrowRight, FaArrowLeft } from "react-icons/fa";

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

const Select = styled.select`
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
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

const SignupStep2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    birthdate: "",
    gender: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Step 1 데이터가 없으면 Step 1로 리다이렉트
    const step1Data = sessionStorage.getItem("signupStep1");
    if (!step1Data) {
      navigate("/signup/step1");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleBack = () => {
    navigate("/signup/step1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!formData.username || !formData.birthdate || !formData.gender) {
      setError("모든 필드를 입력해주세요");
      return;
    }

    if (formData.username.length < 2 || formData.username.length > 20) {
      setError("닉네임은 2~20자 사이여야 합니다");
      return;
    }

    // 생년월일 검증 (만 14세 이상)
    const birthDate = new Date(formData.birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 14) {
      setError("만 14세 이상만 가입할 수 있습니다");
      return;
    }

    // Step 2 데이터 저장하고 다음 단계로
    sessionStorage.setItem("signupStep2", JSON.stringify(formData));
    navigate("/signup/step3");
  };

  return (
    <Container>
      <LeftSection>
        <LeftContent>
          <Logo>RE:PLAY</Logo>
          <Tagline>
            당신에 대해
            <br />
            알려주세요
          </Tagline>
        </LeftContent>
      </LeftSection>

      <RightSection>
        <FormContainer>
          <ProgressBar>
            <ProgressStep $active />
            <ProgressStep $active />
            <ProgressStep />
            <ProgressStep />
          </ProgressBar>

          <Title>프로필 정보</Title>
          <Subtitle>RE:PLAY에서 사용할 프로필을 만들어주세요</Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>닉네임</Label>
              <InputWrapper>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Input
                  type="text"
                  name="username"
                  placeholder="닉네임을 입력하세요 (2~20자)"
                  value={formData.username}
                  onChange={handleChange}
                  maxLength={20}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>생년월일</Label>
              <InputWrapper>
                <InputIcon>
                  <FaCalendar />
                </InputIcon>
                <Input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>성별</Label>
              <InputWrapper>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="other">기타</option>
                  <option value="none">선택 안 함</option>
                </Select>
              </InputWrapper>
            </FormGroup>

            <ButtonGroup>
              <Button type="button" onClick={handleBack}>
                <FaArrowLeft />
                이전
              </Button>
              <Button type="submit" $primary>
                다음
                <FaArrowRight />
              </Button>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </RightSection>
    </Container>
  );
};

export default SignupStep2;

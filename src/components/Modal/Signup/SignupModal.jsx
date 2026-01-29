import React, { useState } from "react";
import styled from "styled-components";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaMusic,
  FaCalendar,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaPhone,
  FaBriefcase,
  FaHashtag,
} from "react-icons/fa";
import BaseModal from "../BaseModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 400px;
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 6px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.border};
  border-radius: 3px;
  transition: all 0.3s ease;
`;

const StepTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
  text-align: center;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
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

const Select = styled.select`
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: ${({ theme }) => theme.colors.bg};
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

const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const GenreButton = styled.button`
  padding: 16px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.gradient : theme.colors.bg};
  border: 2px solid
    ${({ $selected, theme }) =>
      $selected ? "transparent" : theme.colors.border};
  border-radius: 12px;
  color: ${({ $selected }) => ($selected ? "white" : "inherit")};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}30;
  }

  span {
    font-size: 1.5rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSub};
  cursor: pointer;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary};
  }

  &.required {
    color: ${({ theme }) => theme.colors.textMain};
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

const Button = styled.button`
  flex: 1;
  padding: 16px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.bg};
  color: ${({ $primary }) => ($primary ? "white" : "inherit")};
  border: 2px solid
    ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px
      ${({ $primary, theme }) =>
        $primary ? theme.colors.primary : theme.colors.border}40;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessIcon = styled.div`
  font-size: 5rem;
  text-align: center;
  margin: 40px 0 20px;
`;

const SuccessMessage = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSub};
    line-height: 1.6;
  }
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  color: #ff4444;
  font-size: 0.9rem;
`;

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: 계정 정보
    memberId: "",
    email: "",
    password: "",
    passwordConfirm: "",

    // Step 2: 개인 정보
    name: "",
    nickName: "",
    gender: "",

    // Step 3: 추가 정보
    phone: "",
    job: "",
    mbti: "",

    // Step 4: 음악 취향
    favoriteGenres: [],

    // Step 5: 약관 동의
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const [error, setError] = useState("");

  const genres = [
    { id: "kpop", name: "K-POP", emoji: "🎤" },
    { id: "pop", name: "POP", emoji: "🎵" },
    { id: "hiphop", name: "HIP-HOP", emoji: "🎧" },
    { id: "rnb", name: "R&B", emoji: "🎹" },
    { id: "rock", name: "ROCK", emoji: "🎸" },
    { id: "jazz", name: "JAZZ", emoji: "🎺" },
    { id: "edm", name: "EDM", emoji: "🎛️" },
    { id: "indie", name: "INDIE", emoji: "🎼" },
    { id: "classic", name: "클래식", emoji: "🎻" },
  ];

  const mbtiTypes = [
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenreToggle = (genreId) => {
    setFormData((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genreId)
        ? prev.favoriteGenres.filter((id) => id !== genreId)
        : [...prev.favoriteGenres, genreId],
    }));
  };

  const validateStep = (currentStep) => {
    setError("");

    switch (currentStep) {
      case 1:
        const regexpId = /^#[a-zA-Z0-9]{1,20}$/;
        const regexpEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

        if (
          !formData.memberId ||
          !formData.email ||
          !formData.password ||
          !formData.passwordConfirm
        ) {
          setError("모든 필드를 입력해주세요");
          return false;
        }
        if (!regexpId.test(formData.memberId)) {
          setError("아이디는 #으로 시작하고 1~20자여야 합니다");
          return false;
        }
        if (!regexpEmail.test(formData.email)) {
          setError("올바른 이메일 형식이 아닙니다");
          return false;
        }
        if (formData.password !== formData.passwordConfirm) {
          setError("비밀번호가 일치하지 않습니다");
          return false;
        }
        if (formData.password.length < 5 || formData.password.length > 20) {
          setError("비밀번호는 5~20자여야 합니다");
          return false;
        }
        break;

      case 2:
        const regexpName = /^[가-힣]{2,5}$/;
        const regexpNickName = /^[a-zA-Z0-9가-힣]{2,10}$/;

        if (!formData.name || !formData.nickName || !formData.gender) {
          setError("모든 필드를 입력해주세요");
          return false;
        }
        if (!regexpName.test(formData.name)) {
          setError("이름은 한글 2~5글자여야 합니다");
          return false;
        }
        if (!regexpNickName.test(formData.nickName)) {
          setError("닉네임은 한글/영문/숫자 2~10글자여야 합니다");
          return false;
        }
        break;

      case 3:
        const regexpPhone = /^010-\d{4}-\d{4}$/;

        if (!formData.phone || !formData.job || !formData.mbti) {
          setError("모든 필드를 입력해주세요");
          return false;
        }
        if (!regexpPhone.test(formData.phone)) {
          setError("전화번호는 010-1234-5678 형식이어야 합니다");
          return false;
        }
        if (formData.job.trim().length < 2) {
          setError("직업을 2글자 이상 입력해주세요");
          return false;
        }
        break;

      case 4:
        if (formData.favoriteGenres.length === 0) {
          setError("최소 1개 이상의 장르를 선택해주세요");
          return false;
        }
        break;

      case 5:
        if (!formData.agreeTerms || !formData.agreePrivacy) {
          setError("필수 약관에 동의해주세요");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 5) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    }
  };

  const handleSubmit = () => {
    console.log("Signup data:", formData);
    // TODO: 실제 회원가입 API 호출
    // axiosPublic.post("/api/auth/signUp", formData)
    setStep(6); // 완료 화면으로
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <StepTitle>계정 정보</StepTitle>
            <StepDescription>
              RE:PLAY에서 사용할 계정을 만들어주세요
            </StepDescription>

            <Form>
              <InputGroup>
                <Label>회원 ID</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaHashtag />
                  </InputIcon>
                  <Input
                    type="text"
                    name="memberId"
                    placeholder="#으로 시작 (예: #user123)"
                    value={formData.memberId}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </InputGroup>

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
                    placeholder="5~20자"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>비밀번호 확인</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <Input
                    type="password"
                    name="passwordConfirm"
                    placeholder="비밀번호 재입력"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </InputGroup>
            </Form>
          </>
        );

      case 2:
        return (
          <>
            <StepTitle>개인 정보</StepTitle>
            <StepDescription>당신에 대해 알려주세요</StepDescription>

            <Form>
              <InputGroup>
                <Label>이름</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <Input
                    type="text"
                    name="name"
                    placeholder="이름 (한글 2~5글자)"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>닉네임</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <Input
                    type="text"
                    name="nickName"
                    placeholder="닉네임을 입력하세요 (2~10글자)"
                    value={formData.nickName}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>성별</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="other">기타</option>
                  </Select>
                </InputWrapper>
              </InputGroup>
            </Form>
          </>
        );

      case 3:
        return (
          <>
            <StepTitle>추가 정보</StepTitle>
            <StepDescription>추가 정보를 입력해주세요</StepDescription>

            <Form>
              <InputGroup>
                <Label>전화번호</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaPhone />
                  </InputIcon>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>직업</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaBriefcase />
                  </InputIcon>
                  <Input
                    type="text"
                    name="job"
                    placeholder="직업을 입력하세요"
                    value={formData.job}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>MBTI</Label>
                <InputWrapper>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <Select
                    name="mbti"
                    value={formData.mbti}
                    onChange={handleChange}
                  >
                    <option value="">MBTI를 선택하세요</option>
                    {mbtiTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </InputWrapper>
              </InputGroup>
            </Form>
          </>
        );

      case 4:
        return (
          <>
            <StepTitle>음악 취향</StepTitle>
            <StepDescription>
              좋아하는 장르를 선택해주세요 (중복 선택 가능)
            </StepDescription>

            <GenreGrid>
              {genres.map((genre) => (
                <GenreButton
                  key={genre.id}
                  type="button"
                  $selected={formData.favoriteGenres.includes(genre.id)}
                  onClick={() => handleGenreToggle(genre.id)}
                >
                  <span>{genre.emoji}</span>
                  {genre.name}
                </GenreButton>
              ))}
            </GenreGrid>
          </>
        );

      case 5:
        return (
          <>
            <StepTitle>약관 동의</StepTitle>
            <StepDescription>
              서비스 이용을 위해 약관에 동의해주세요
            </StepDescription>

            <CheckboxGroup>
              <CheckboxLabel className="required">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                [필수] 이용약관에 동의합니다
              </CheckboxLabel>

              <CheckboxLabel className="required">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                />
                [필수] 개인정보 처리방침에 동의합니다
              </CheckboxLabel>

              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onChange={handleChange}
                />
                [선택] 마케팅 정보 수신에 동의합니다
              </CheckboxLabel>
            </CheckboxGroup>
          </>
        );

      case 6:
        return (
          <>
            <SuccessIcon>
              <FaCheckCircle style={{ color: "#00ff88" }} />
            </SuccessIcon>
            <SuccessMessage>
              <h3>환영합니다! 🎉</h3>
              <p>
                회원가입이 완료되었습니다.
                <br />
                지금 바로 RE:PLAY를 시작해보세요!
              </p>
            </SuccessMessage>
          </>
        );
    }
  };

  return (
    <BaseModal onClose={onClose} maxWidth="550px" hideHeader>
      <Container>
        {step < 6 && (
          <ProgressBar>
            {[1, 2, 3, 4, 5].map((s) => (
              <ProgressStep key={s} $active={s <= step} />
            ))}
          </ProgressBar>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {renderStep()}

        {step < 6 && (
          <ButtonGroup>
            {step > 1 && (
              <Button type="button" onClick={handleBack}>
                <FaArrowLeft />
                이전
              </Button>
            )}
            <Button type="button" $primary onClick={handleNext}>
              {step === 5 ? "완료" : "다음"}
              {step < 5 && <FaArrowRight />}
            </Button>
          </ButtonGroup>
        )}

        {step === 6 && (
          <Button $primary onClick={onSwitchToLogin}>
            로그인하기
          </Button>
        )}
      </Container>
    </BaseModal>
  );
};

export default SignupModal;

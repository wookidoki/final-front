// SignupModal.jsx
import React, { useState } from "react";
import BaseModal from "../BaseModal";
import {
  Container,
  ProgressBar,
  ProgressStep,
  ErrorMessage,
} from "./SignupModal.styles";

import SignupStep1 from "./Steps/Step1Account";
import SignupStep2 from "./Steps/Step2Profile";
import SignupStep3 from "./Steps/Step3Extra";
import SignupStep4 from "./Steps/Step4Genres";
import SignupStep5 from "./Steps/Step5Terms";
import SignupComplete from "./Steps/Step6Complete";
import axiosInstance, { axiosPublic } from "../../../services/Axios/Axios";

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    memberId: "",
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    nickName: "",
    gender: "",
    phone: "",
    job: "",
    mbti: "",
    genre: [], // ✅ 여러개 선택 배열
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false, // ✅ 서버 DTO에 없으면 전송 X
  });

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submitSignup = async () => {
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        password: formData.password,
        memberDto: {
          memberId: formData.memberId,
          email: formData.email,
          gender: formData.gender,
          mbti: formData.mbti,
          name: formData.name,
          nickName: formData.nickName,
          phone: formData.phone,
          job: formData.job,
          genre: (formData.genre || []).join(","), // ✅ 콤마 문자열
        },
      };

      const res = await axiosPublic.post("/api/auth/signUp", payload);

      const message = res?.data?.message || "회원가입이 완료되었습니다.";
      alert(message);

      setStep(6); // ✅ Step6로 이동
    } catch (err) {
      console.log(err);

      if (err?.message === "Network Error") {
        setError("서버 네트워크 문제가 발생했습니다.");
      } else {
        setError(
          err?.response?.data?.message || "회원가입 중 오류가 발생했습니다.",
        );
      }

      // ✅ Step5에서 필드별 에러를 보여주기 위해 throw
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoLogin = () => {
    // ✅ 회원가입 모달 자동 닫기 + 로그인 모달로 전환
    onClose?.();
    onSwitchToLogin?.();
  };

  return (
    <BaseModal
      onClose={onClose}
      maxWidth="550px"
      hideHeader
      closeOnOverlayClick={false}
    >
      <Container>
        {step <= 5 && (
          <ProgressBar>
            {[1, 2, 3, 4, 5].map((n) => (
              <ProgressStep key={n} $active={n <= step} />
            ))}
          </ProgressBar>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {step === 1 && (
          <SignupStep1 data={formData} setData={setFormData} onNext={next} />
        )}
        {step === 2 && (
          <SignupStep2
            data={formData}
            setData={setFormData}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <SignupStep3
            data={formData}
            setData={setFormData}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 4 && (
          <SignupStep4
            data={formData}
            setData={setFormData}
            onNext={next}
            onBack={back}
          />
        )}

        {step === 5 && (
          <SignupStep5
            data={formData}
            setData={setFormData}
            onBack={back}
            onSubmit={submitSignup}
            isLoading={isLoading}
          />
        )}

        {step === 6 && <SignupComplete onLogin={handleGoLogin} />}
      </Container>
    </BaseModal>
  );
};

export default SignupModal;

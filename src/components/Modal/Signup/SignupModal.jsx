// SignupModal.jsx
import React, { useState } from "react";
import BaseModal from "../BaseModal";
import {
  Container,
  ProgressBar,
  ProgressStep,
  ErrorMessage,
} from "./SignupModal.styles";

import SignupStep1 from "./steps/SignupStep1";
import SignupStep2 from "./steps/SignupStep2";
import SignupStep3 from "./steps/SignupStep3";
import SignupStep4 from "./steps/SignupStep4";
import SignupStep5 from "./steps/SignupStep5";
import SignupComplete from "./steps/SignupComplete";

//  axiosPublic(공개용) import
import axiosPublic from "../../../services/Axios/AxiosPrivate";
// ↑ 경로는 본인 프로젝트 axiosPublic 실제 위치로 맞추세요

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //  폼 데이터 state (FormData 말고 그냥 객체 state)
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
    favoriteGenres: [],
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  //  여기서 요청 보냄 (Step5 완료 버튼에서 호출)
  const submitSignup = async () => {
    setError("");
    setIsLoading(true);

    try {
      // 서버가 원하는 요청 구조로 payload 구성
      // (지금은 가장 일반적인 JSON 형태)
      const payload = {
        memberId: formData.memberId,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        nickName: formData.nickName,
        gender: formData.gender,
        phone: formData.phone,
        job: formData.job,
        mbti: formData.mbti,
        favoriteGenres: formData.favoriteGenres,
        agreeMarketing: formData.agreeMarketing,
      };

      const res = await axiosPublic.post("/api/auth/signUp", payload);

      const message = res?.data?.message || "회원가입이 완료되었습니다.";
      alert(message);

      setStep(6); //  완료 화면
    } catch (err) {
      console.log(err);

      if (err?.message === "Network Error") {
        setError("서버 네트워크 문제가 발생했습니다.");
      } else {
        setError(
          err?.response?.data?.message || "회원가입 중 오류가 발생했습니다.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal onClose={onClose} maxWidth="550px" hideHeader>
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

        {/*  Step5에서 완료 버튼 누르면 submitSignup 실행 */}
        {step === 5 && (
          <SignupStep5
            data={formData}
            setData={setFormData}
            onBack={back}
            onSubmit={submitSignup}
            isLoading={isLoading}
          />
        )}

        {step === 6 && <SignupComplete onLogin={onSwitchToLogin} />}
      </Container>
    </BaseModal>
  );
};

export default SignupModal;

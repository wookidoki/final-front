import { createContext, useContext, useState } from "react";

const SignupContext = createContext();

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within SignupProvider");
  }
  return context;
};

export const SignupProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({
    // Step 1 - 계정 정보 (ID, Email, Password)
    memberId: "",
    email: "",
    password: "",
    confirmPwd: "",

    // Step 2 - 개인 정보 (이름, 생년월일, 성별)
    name: "",
    birthday: "",
    gender: "", // 성별 추가

    // Step 3 - 추가 정보 (전화번호, 직업, MBTI)
    phone: "",
    job: "", // 직업 추가
    mbti: "", // MBTI 추가

    // Step 4 - 프로필 (이미지)
    profileImage: null,
  });

  // 단일 필드 업데이트
  const updateSignupData = (field, value) => {
    setSignupData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 여러 필드 한번에 업데이트
  const updateMultipleFields = (fields) => {
    setSignupData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  // 전체 데이터 초기화 (회원가입 완료 후)
  const resetSignupData = () => {
    setSignupData({
      memberId: "",
      email: "",
      password: "",
      confirmPwd: "",
      name: "",
      birthday: "",
      gender: "",
      phone: "",
      job: "",
      mbti: "",
      profileImage: null,
    });
  };

  // 현재 단계까지 입력된 데이터가 유효한지 체크하는 함수
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return !!(
          signupData.memberId &&
          signupData.email &&
          signupData.password &&
          signupData.confirmPwd
        );
      case 2:
        return !!(signupData.name && signupData.birthday && signupData.gender);
      case 3:
        return !!(signupData.phone && signupData.job && signupData.mbti);
      case 4:
        return true; // 프로필 이미지는 선택사항
      default:
        return false;
    }
  };

  return (
    <SignupContext.Provider
      value={{
        signupData,
        updateSignupData,
        updateMultipleFields,
        resetSignupData,
        validateStep,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

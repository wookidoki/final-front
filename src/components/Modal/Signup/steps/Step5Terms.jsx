// steps/SignupStep5.jsx
import React from "react";
import {
  StepTitle,
  StepDescription,
  CheckboxGroup,
  CheckboxLabel,
  ButtonGroup,
  Button,
} from "../SignupModal.styles";
// ↑ 본인 스타일 파일 구조에 맞춰 경로 조정

const SignupStep5 = ({ data, setData, onBack, onSubmit, isLoading }) => {
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setData((prev) => ({ ...prev, [name]: checked }));
  };

  const canSubmit = data.agreeTerms && data.agreePrivacy;

  return (
    <>
      <StepTitle>약관 동의</StepTitle>
      <StepDescription>서비스 이용을 위해 약관에 동의해주세요</StepDescription>

      <CheckboxGroup>
        <CheckboxLabel className="required">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={data.agreeTerms}
            onChange={handleCheck}
          />
          [필수] 이용약관에 동의합니다
        </CheckboxLabel>

        <CheckboxLabel className="required">
          <input
            type="checkbox"
            name="agreePrivacy"
            checked={data.agreePrivacy}
            onChange={handleCheck}
          />
          [필수] 개인정보 처리방침에 동의합니다
        </CheckboxLabel>

        <CheckboxLabel>
          <input
            type="checkbox"
            name="agreeMarketing"
            checked={data.agreeMarketing}
            onChange={handleCheck}
          />
          [선택] 마케팅 정보 수신에 동의합니다
        </CheckboxLabel>
      </CheckboxGroup>

      <ButtonGroup>
        <Button type="button" onClick={onBack} disabled={isLoading}>
          이전
        </Button>

        {/* ✅ 여기서 axios 요청이 실행됨 */}
        <Button
          type="button"
          $primary
          onClick={onSubmit}
          disabled={!canSubmit || isLoading}
        >
          {isLoading ? "처리중..." : "완료"}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default SignupStep5;

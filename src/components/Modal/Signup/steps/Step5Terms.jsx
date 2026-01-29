import React from "react";
import {
  StepTitle,
  StepDescription,
  CheckboxGroup,
  CheckboxLabel,
} from "./Step5Terms";

const Step5Terms = ({ formData, setField }) => {
  return (
    <>
      <StepTitle>약관 동의</StepTitle>
      <StepDescription>서비스 이용을 위해 약관에 동의해주세요</StepDescription>

      <CheckboxGroup>
        <CheckboxLabel className="required">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => setField("agreeTerms", e.target.checked)}
          />
          [필수] 이용약관에 동의합니다
        </CheckboxLabel>

        <CheckboxLabel className="required">
          <input
            type="checkbox"
            checked={formData.agreePrivacy}
            onChange={(e) => setField("agreePrivacy", e.target.checked)}
          />
          [필수] 개인정보 처리방침에 동의합니다
        </CheckboxLabel>

        <CheckboxLabel>
          <input
            type="checkbox"
            checked={formData.agreeMarketing}
            onChange={(e) => setField("agreeMarketing", e.target.checked)}
          />
          [선택] 마케팅 정보 수신에 동의합니다
        </CheckboxLabel>
      </CheckboxGroup>
    </>
  );
};

export default Step5Terms;

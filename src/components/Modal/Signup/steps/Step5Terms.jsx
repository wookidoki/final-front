import React, { useMemo, useState } from "react";
import {
  StepWrap,
  Title,
  Desc,
  Box,
  Row,
  Small,
  LocalError,
  FieldErrors,
  FieldErrorItem,
  ButtonRow,
} from "./Step5Terms.styles";

import { ButtonGroup, Button } from "../SignupModal.styles";
import axiosInstance, { axiosPublic } from "../../../../services/Axios/Axios";

const parseFieldErrors = (err) => {
  const data = err?.response?.data;
  if (!data) return {};

  if (
    data.errors &&
    !Array.isArray(data.errors) &&
    typeof data.errors === "object"
  ) {
    return data.errors;
  }

  if (Array.isArray(data.errors)) {
    const out = {};
    data.errors.forEach((e) => {
      const field = e.field || e.name;
      const msg = e.message || e.defaultMessage;
      if (field && msg) out[field] = msg;
    });
    return out;
  }

  if (Array.isArray(data.fieldErrors)) {
    const out = {};
    data.fieldErrors.forEach((e) => {
      if (e.field && (e.defaultMessage || e.message)) {
        out[e.field] = e.defaultMessage || e.message;
      }
    });
    return out;
  }

  return {};
};

const MemberDto = {
  memberId: {},
};

const Step5Terms = ({ data, setData, onBack, onSubmit, isLoading }) => {
  const [localError, setLocalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const requiredOk = useMemo(
    () => data.agreeTerms && data.agreePrivacy,
    [data.agreeTerms, data.agreePrivacy],
  );

  const handleSubmit = async () => {
    console.log(data);
    axiosPublic
      .post(`/api/auth/signUp`, {
        memberId: data.memberId,
        email: data.email,
        gender: data.gender,
        mbti: data.mbti,
        name: data.name,
        nickName: data.nickName,
        phone: data.phone,
        genre: data.favoriteGenres,
        job: data.job,

        // LocalDTO: data.
      })
      .then((res) => {
        console.log(res);
      });
    setLocalError("");
    setFieldErrors({});

    if (!data.agreeTerms) return setLocalError("이용약관 동의는 필수입니다.");
    if (!data.agreePrivacy)
      return setLocalError("개인정보 처리방침 동의는 필수입니다.");

    try {
      await onSubmit(); //  SignupModal에서 실패 시 throw 됨
    } catch (err) {
      const parsed = parseFieldErrors(err);
      if (Object.keys(parsed).length > 0) setFieldErrors(parsed);
      setLocalError(
        err?.response?.data?.message || "회원가입 중 오류가 발생했습니다.",
      );
    }
  };

  return (
    <StepWrap>
      <div>
        <Title>약관 동의</Title>
        <Desc>필수 동의 후 가입을 완료해 주세요.</Desc>
      </div>

      <Box>
        <Row>
          <input
            type="checkbox"
            checked={data.agreeTerms}
            onChange={(e) =>
              setData((p) => ({ ...p, agreeTerms: e.target.checked }))
            }
          />
          <div>
            이용약관 동의 <b>(필수)</b>
            <Small>서비스 이용을 위해 필요합니다.</Small>
          </div>
        </Row>

        <Row>
          <input
            type="checkbox"
            checked={data.agreePrivacy}
            onChange={(e) =>
              setData((p) => ({ ...p, agreePrivacy: e.target.checked }))
            }
          />
          <div>
            개인정보 처리방침 동의 <b>(필수)</b>
            <Small>회원관리 및 서비스 제공을 위해 필요합니다.</Small>
          </div>
        </Row>

        <Row>
          <input
            type="checkbox"
            checked={data.agreeMarketing}
            onChange={(e) =>
              setData((p) => ({ ...p, agreeMarketing: e.target.checked }))
            }
          />
          <div>
            마케팅 수신 동의 <b>(선택)</b>
            <Small>이벤트/혜택 알림을 받을 수 있어요.</Small>
          </div>
        </Row>
      </Box>

      {/* ✅ 서버 Validation 에러를 필드별로 모아 보여주기 */}
      {Object.keys(fieldErrors).length > 0 && (
        <FieldErrors>
          <b>입력값을 확인해 주세요</b>
          {Object.entries(fieldErrors).map(([field, msg]) => (
            <FieldErrorItem key={field}>
              <span>{field}</span>
              <span>{msg}</span>
            </FieldErrorItem>
          ))}
        </FieldErrors>
      )}

      {localError && <LocalError>{localError}</LocalError>}

      <ButtonRow>
        <ButtonGroup>
          <Button onClick={onBack} disabled={isLoading}>
            이전
          </Button>
          <Button
            $primary
            disabled={!requiredOk || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "처리 중..." : "가입 완료"}
          </Button>
        </ButtonGroup>
      </ButtonRow>
    </StepWrap>
  );
};

export default Step5Terms;

import React, { useMemo, useState } from "react";
import {
  StepWrap,
  Title,
  Desc,
  Form,
  Field,
  Label,
  Input,
  Select,
  Hint,
  LocalError,
  Inline,
  CheckBadge,
  HintRow,
} from "./Step3Extra.styles";

import { ButtonGroup, Button } from "../SignupModal.styles";

const MBTI = [
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

const onlyDigits = (v) => (v || "").replace(/[^\d]/g, "");

const formatPhone = (v) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
};

// ✅ 백엔드 phone 정규식: ^01[0-9]-\d{3,4}-\d{4}$
// 예) 010-1234-5678, 011-123-4567도 허용
const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;

const Step3Extra = ({ data, setData, onNext, onBack }) => {
  const [localError, setLocalError] = useState("");

  const phoneState = useMemo(() => {
    const v = (data.phone || "").trim();
    if (!v) return { status: "idle", msg: "" };
    if (!phoneRegex.test(v))
      return {
        status: "invalid",
        msg: "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)",
      };
    return { status: "valid", msg: "형식이 올바릅니다." };
  }, [data.phone]);

  const jobState = useMemo(() => {
    const v = (data.job || "").trim();
    if (!v) return { status: "idle", msg: "" };
    if (v.length > 30)
      return { status: "invalid", msg: "직업은 30자 이내로 입력해 주세요." };
    return { status: "valid", msg: "" };
  }, [data.job]);

  const mbtiState = useMemo(() => {
    const v = (data.mbti || "").trim();
    if (!v) return { status: "idle", msg: "" };
    if (!MBTI.includes(v))
      return { status: "invalid", msg: "MBTI를 선택해 주세요." };
    return { status: "valid", msg: "" };
  }, [data.mbti]);

  // ✅ Step3는 전부 필수: phone/job/mbti 모두 valid여야 다음 가능
  const canGoNext = useMemo(() => {
    return (
      phoneState.status === "valid" &&
      jobState.status === "valid" &&
      mbtiState.status === "valid"
    );
  }, [phoneState.status, jobState.status, mbtiState.status]);

  const update = (key) => (e) => {
    let value = e.target.value;

    if (key === "phone") value = formatPhone(value);
    if (key === "job") value = value.slice(0, 30);

    setData((prev) => ({ ...prev, [key]: value }));
    setLocalError("");
  };

  const handleNext = () => {
    setLocalError("");

    if (!data.phone?.trim()) return setLocalError("전화번호를 입력해주세요.");
    if (phoneState.status !== "valid") return setLocalError(phoneState.msg);

    if (!data.job?.trim()) return setLocalError("직업을 입력해주세요.");
    if (jobState.status !== "valid") return setLocalError(jobState.msg);

    if (!data.mbti?.trim()) return setLocalError("mbti를 선택해주세요.");
    if (mbtiState.status !== "valid") return setLocalError(mbtiState.msg);

    onNext();
  };

  return (
    <StepWrap>
      <div>
        <Title>추가 정보</Title>
        <Desc>전화번호 / 직업 / MBTI는 필수 입력입니다.</Desc>
      </div>

      <Form>
        <Field>
          <Label>전화번호</Label>
          <Input
            value={data.phone}
            onChange={update("phone")}
            placeholder="예) 010-1234-5678"
            inputMode="numeric"
            autoComplete="tel"
          />
          <HintRow>
            <Hint>숫자만 입력해도 자동으로 하이픈이 들어갑니다.</Hint>
            {phoneState.status !== "idle" && (
              <CheckBadge $status={phoneState.status}>
                {phoneState.status === "valid" ? "OK" : "형식 오류"}
              </CheckBadge>
            )}
          </HintRow>
          {phoneState.msg && <Hint>{phoneState.msg}</Hint>}
        </Field>

        <Inline>
          <Field>
            <Label>직업</Label>
            <Input
              value={data.job}
              onChange={update("job")}
              placeholder="예) 개발자"
            />
            <HintRow>
              <Hint>최대 30자</Hint>
              {jobState.status === "invalid" && (
                <CheckBadge $status="invalid">제한</CheckBadge>
              )}
            </HintRow>
            {jobState.msg && <Hint>{jobState.msg}</Hint>}
          </Field>

          <Field>
            <Label>MBTI</Label>
            <Select value={data.mbti} onChange={update("mbti")}>
              <option value="">선택</option>
              {MBTI.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
            <HintRow>
              <Hint>필수 선택</Hint>
              {mbtiState.status !== "idle" && (
                <CheckBadge $status={mbtiState.status}>
                  {mbtiState.status === "valid" ? "OK" : "필수"}
                </CheckBadge>
              )}
            </HintRow>
            {mbtiState.msg && <Hint>{mbtiState.msg}</Hint>}
          </Field>
        </Inline>

        {localError && <LocalError>{localError}</LocalError>}
      </Form>

      <ButtonGroup>
        <Button onClick={onBack}>이전</Button>
        <Button $primary disabled={!canGoNext} onClick={handleNext}>
          다음
        </Button>
      </ButtonGroup>
    </StepWrap>
  );
};

export default Step3Extra;

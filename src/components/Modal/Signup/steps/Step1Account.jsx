import React, { useMemo, useState } from "react";
import {
  StepWrap,
  Title,
  Desc,
  Form,
  Field,
  Label,
  Input,
  HintRow,
  Hint,
  LocalError,
  Inline,
  CheckBadge,
} from "./Step1Account.styles";

import { ButtonGroup, Button } from "../SignupModal.styles";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const memberIdRegex = /^#[^\s]{1,19}$/;

const Step1Account = ({ data, setData, onNext }) => {
  const [localError, setLocalError] = useState("");

  const memberIdState = useMemo(() => {
    const v = (data.memberId || "").trim();

    if (!v) return { status: "idle", msg: "" };
    if (v.length > 20)
      return { status: "invalid", msg: "최대 20자까지 입력할 수 있어요." };
    if (!v.startsWith("#"))
      return { status: "invalid", msg: "아이디는 #로 시작해야 해요." };
    if (/\s/.test(v))
      return { status: "invalid", msg: "공백은 사용할 수 없어요." };
    if (!memberIdRegex.test(v))
      return { status: "invalid", msg: "형식이 올바르지 않습니다." };

    return { status: "valid", msg: "사용 가능한 형식입니다." };
  }, [data.memberId]);

  const emailState = useMemo(() => {
    const v = (data.email || "").trim();
    if (!v) return { status: "idle", msg: "" };
    if (!emailRegex.test(v))
      return { status: "invalid", msg: "이메일 형식이 올바르지 않습니다." };
    return { status: "valid", msg: "올바른 이메일 형식입니다." };
  }, [data.email]);

  const isValid = useMemo(() => {
    const idOk = memberIdState.status === "valid";
    const emailOk = emailState.status === "valid";
    const pwOk = (data.password || "").length >= 8;
    const pwMatch = (data.password || "") === (data.passwordConfirm || "");
    return idOk && emailOk && pwOk && pwMatch;
  }, [data, memberIdState.status, emailState.status]);

  const update = (key) => (e) => {
    let value = e.target.value;

    if (key === "memberId") value = value.slice(0, 20);

    setData((prev) => ({ ...prev, [key]: value }));
    setLocalError("");
  };

  const handleNext = () => {
    setLocalError("");

    if (!data.memberId?.trim()) return setLocalError("아이디를 입력해 주세요.");
    if (memberIdState.status !== "valid")
      return setLocalError(memberIdState.msg);

    if (!data.email?.trim()) return setLocalError("이메일을 입력해 주세요.");
    if (emailState.status !== "valid") return setLocalError(emailState.msg);

    if (!data.password) return setLocalError("비밀번호를 입력해 주세요.");
    if (data.password.length < 8)
      return setLocalError("비밀번호는 8자 이상이어야 합니다.");
    if (data.password !== data.passwordConfirm)
      return setLocalError("비밀번호 확인이 일치하지 않습니다.");

    onNext();
  };

  return (
    <StepWrap>
      <div>
        <Title>계정 만들기</Title>
        <Desc>아이디와 이메일은 형식 검증 후 다음 단계로 이동합니다.</Desc>
      </div>

      <Form>
        <Field>
          <Label>아이디</Label>
          <Input
            value={data.memberId}
            onChange={update("memberId")}
            placeholder="예) #jooyoung!!"
            autoFocus
            autoComplete="username"
          />

          <HintRow>
            <Hint>#로 시작 / 공백 금지 / 최대 20자</Hint>
            {memberIdState.status !== "idle" && (
              <CheckBadge $status={memberIdState.status}>
                {memberIdState.status === "valid" ? "OK" : "확인"}
              </CheckBadge>
            )}
          </HintRow>

          {memberIdState.msg && <Hint>{memberIdState.msg}</Hint>}
        </Field>

        {/* email */}
        <Field>
          <Label>이메일</Label>
          <Input
            value={data.email}
            onChange={update("email")}
            placeholder="예) you@example.com"
            autoComplete="email"
          />

          <HintRow>
            <Hint>이메일 형식을 확인해 주세요</Hint>
            {emailState.status !== "idle" && (
              <CheckBadge $status={emailState.status}>
                {emailState.status === "valid" ? "OK" : "형식 오류"}
              </CheckBadge>
            )}
          </HintRow>

          {emailState.msg && <Hint>{emailState.msg}</Hint>}
        </Field>

        {/* password */}
        <Inline>
          <Field>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={data.password}
              onChange={update("password")}
              placeholder="8자 이상"
              autoComplete="new-password"
            />
          </Field>

          <Field>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              value={data.passwordConfirm}
              onChange={update("passwordConfirm")}
              placeholder="한 번 더 입력"
              autoComplete="new-password"
            />
          </Field>
        </Inline>

        {localError && <LocalError>{localError}</LocalError>}
      </Form>

      <ButtonGroup>
        <Button $primary disabled={!isValid} onClick={handleNext}>
          다음
        </Button>
      </ButtonGroup>
    </StepWrap>
  );
};

export default Step1Account;

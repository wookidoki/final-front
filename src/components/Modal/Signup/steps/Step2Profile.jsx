// Step2Profile.jsx
import React, { useMemo, useState } from "react";
import {
  StepWrap,
  Title,
  Desc,
  Form,
  Section,
  Field,
  Label,
  Input,
  Select,
  Hint,
  LocalError,
  Inline,
  CheckBadge,
  HintRow,
  GenreGrid,
  GenreItem,
} from "./Step2Profile.styles";

import { ButtonGroup, Button } from "../SignupModal.styles";
import { axiosPublic } from "../../../../services/Axios/Axios";

// ================= validation =================
const nicknameRegex = /^[^\s]{2,20}$/;
const phoneRegex = /^010-\d{4}-\d{4}$/;

// ================= util =================
const formatPhone = (value = "") => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

const GENRES = [
  "KPOP",
  "POP",
  "HIPHOP",
  "RNB",
  "ROCK",
  "EDM",
  "JAZZ",
  "CLASSIC",
];

// ================= component =================
const Step2Profile = ({ data = {}, setData = () => {}, onDone, onBack }) => {
  const [localError, setLocalError] = useState("");
  const [saving, setSaving] = useState(false);

  // ---------- name ----------
  const nameState = useMemo(() => {
    const v = (data.name || "").trim();
    if (!v) return { status: "invalid", msg: "이름 정보가 없습니다." };
    return { status: "valid", msg: "" };
  }, [data.name]);

  // ---------- nickname ----------
  const nickState = useMemo(() => {
    const v = (data.nickName || "").trim();
    if (!v) return { status: "idle", msg: "" };
    if (!nicknameRegex.test(v))
      return { status: "invalid", msg: "공백 없이 2~20자" };
    return { status: "valid", msg: "사용 가능" };
  }, [data.nickName]);

  // ---------- phone ----------
  const phoneState = useMemo(() => {
    const v = (data.phone || "").trim();
    if (!v) return { status: "idle", msg: "" };
    if (!phoneRegex.test(v))
      return { status: "invalid", msg: "010-0000-0000 형식" };
    return { status: "valid", msg: "OK" };
  }, [data.phone]);

  // ---------- 전체 유효성 ----------
  const isValid =
    nameState.status === "valid" &&
    nickState.status === "valid" &&
    phoneState.status === "valid" &&
    data.gender &&
    data.job &&
    data.mbti &&
    Array.isArray(data.genres) &&
    data.genres.length > 0;

  // ---------- update ----------
  const update = (key) => (e) => {
    let value = e.target.value;
    if (key === "phone") value = formatPhone(value);
    setData((prev) => ({ ...prev, [key]: value }));
    setLocalError("");
  };

  // ---------- genre toggle ----------
  const toggleGenre = (genre) => {
    setData((prev) => {
      const current = prev.genres || [];
      return {
        ...prev,
        genres: current.includes(genre)
          ? current.filter((g) => g !== genre)
          : [...current, genre],
      };
    });
  };

  // ---------- submit ----------
  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setSaving(true);
      await axiosPublic.put(
        "/api/oauth/social/complete",
        {
          nickName: data.nickName,
          phone: data.phone,
          gender: data.gender,
          job: data.job,
          mbti: data.mbti,
          genres: data.genres, // ✅ 다중 장르
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      onDone?.();
    } catch {
      setLocalError("회원가입 완료 처리 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  // ================= render =================
  return (
    <StepWrap>
      <Form>
        <Section>
          <Title>추가 정보 입력</Title>
          <Desc>회원가입을 완료하기 위해 아래 정보를 입력해 주세요.</Desc>
        </Section>

        {/* 이름 / 이메일 */}
        <Section>
          <Inline>
            <Field>
              <Label>이름</Label>
              <Input value={data.name || ""} disabled />
            </Field>
            <Field>
              <Label>이메일</Label>
              <Input value={data.email || ""} disabled />
            </Field>
          </Inline>
        </Section>

        {/* 닉네임 / 전화번호 */}
        <Section>
          <Inline>
            <Field>
              <Label>닉네임 *</Label>
              <Input
                value={data.nickName || ""}
                onChange={update("nickName")}
                maxLength={20}
              />
              <HintRow>
                <Hint>2~20자</Hint>
                {nickState.status !== "idle" && (
                  <CheckBadge $status={nickState.status}>
                    {nickState.status === "valid" ? "OK" : "오류"}
                  </CheckBadge>
                )}
              </HintRow>
            </Field>

            <Field>
              <Label>전화번호 *</Label>
              <Input
                value={data.phone || ""}
                onChange={update("phone")}
                placeholder="010-1234-5678"
                maxLength={13}
                inputMode="numeric"
              />
            </Field>
          </Inline>
        </Section>

        {/* 성별 / 직업 */}
        <Section>
          <Inline>
            <Field>
              <Label>성별 *</Label>
              <Select value={data.gender || ""} onChange={update("gender")}>
                <option value="">선택</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="기타">기타</option>
              </Select>
            </Field>

            <Field>
              <Label>직업 *</Label>
              <Input value={data.job || ""} onChange={update("job")} />
            </Field>
          </Inline>
        </Section>

        {/* MBTI */}
        <Section>
          <Field>
            <Label>MBTI *</Label>
            <Select value={data.mbti || ""} onChange={update("mbti")}>
              <option value="">선택</option>
              {[
                "INTJ",
                "INTP",
                "ENTJ",
                "ENTP",
                "INFJ",
                "INFP",
                "ENFJ",
                "ENFP",
                "ISTJ",
                "ISFJ",
                "ESTJ",
                "ESFJ",
                "ISTP",
                "ISFP",
                "ESTP",
                "ESFP",
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </Field>
        </Section>

        {/* 장르 (다중 선택) */}
        <Section>
          <Label>선호 장르 *</Label>
          <GenreGrid>
            {GENRES.map((g) => (
              <GenreItem
                key={g}
                $active={data.genres?.includes(g)}
                onClick={() => toggleGenre(g)}
              >
                {g}
              </GenreItem>
            ))}
          </GenreGrid>
          <Hint>여러 개 선택 가능합니다</Hint>
        </Section>

        {localError && <LocalError>{localError}</LocalError>}

        <ButtonGroup>
          <Button onClick={onBack}>이전</Button>
          <Button $primary disabled={!isValid || saving} onClick={handleSubmit}>
            {saving ? "저장 중..." : "가입 완료"}
          </Button>
        </ButtonGroup>
      </Form>
    </StepWrap>
  );
};

export default Step2Profile;

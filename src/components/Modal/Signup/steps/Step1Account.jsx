import React from "react";
import { FaEnvelope, FaHashtag, FaLock } from "react-icons/fa";
import {
  StepTitle,
  StepDescription,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  InputIcon,
  Input,
} from "./Step1Account";

const Step1Account = ({ formData, setField }) => {
  return (
    <>
      <StepTitle>계정 정보</StepTitle>
      <StepDescription>RE:PLAY에서 사용할 계정을 만들어주세요</StepDescription>

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
              onChange={(e) => setField("memberId", e.target.value)}
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
              onChange={(e) => setField("email", e.target.value)}
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
              placeholder="영문+숫자 5~20자"
              value={formData.password}
              onChange={(e) => setField("password", e.target.value)}
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
              onChange={(e) => setField("passwordConfirm", e.target.value)}
            />
          </InputWrapper>
        </InputGroup>
      </Form>
    </>
  );
};

export default Step1Account;

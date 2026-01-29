// steps/Step2Profile.jsx
import React from "react";
import { FaUser } from "react-icons/fa";
import {
  StepTitle,
  StepDescription,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  InputIcon,
  Input,
  Select,
} from "./Step2Profile";

const Step2Profile = ({ formData, setField }) => {
  return (
    <>
      <StepTitle>개인 정보</StepTitle>
      <StepDescription>당신에 대해 알려주세요</StepDescription>

      <Form>
        <InputGroup>
          <Label>이름</Label>
          <InputWrapper>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="이름 (한글 2~5글자)"
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label>닉네임</Label>
          <InputWrapper>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input
              type="text"
              name="nickName"
              placeholder="닉네임 (2~10글자)"
              value={formData.nickName}
              onChange={(e) => setField("nickName", e.target.value)}
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label>성별</Label>
          <InputWrapper>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Select
              name="gender"
              value={formData.gender}
              onChange={(e) => setField("gender", e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </Select>
          </InputWrapper>
        </InputGroup>
      </Form>
    </>
  );
};

export default Step2Profile;

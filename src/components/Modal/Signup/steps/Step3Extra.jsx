// steps/Step3Extra.jsx
import React from "react";
import { FaBriefcase, FaPhone, FaUser } from "react-icons/fa";
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
} from "./Step3Extra";

const Step3Extra = ({ formData, setField, mbtiTypes }) => {
  return (
    <>
      <StepTitle>추가 정보</StepTitle>
      <StepDescription>추가 정보를 입력해주세요</StepDescription>

      <Form>
        <InputGroup>
          <Label>전화번호</Label>
          <InputWrapper>
            <InputIcon>
              <FaPhone />
            </InputIcon>
            <Input
              type="text"
              name="phone"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label>직업</Label>
          <InputWrapper>
            <InputIcon>
              <FaBriefcase />
            </InputIcon>
            <Input
              type="text"
              name="job"
              placeholder="직업을 입력하세요"
              value={formData.job}
              onChange={(e) => setField("job", e.target.value)}
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label>MBTI</Label>
          <InputWrapper>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Select
              name="mbti"
              value={formData.mbti}
              onChange={(e) => setField("mbti", e.target.value)}
            >
              <option value="">MBTI를 선택하세요</option>
              {mbtiTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </InputWrapper>
        </InputGroup>
      </Form>
    </>
  );
};

export default Step3Extra;

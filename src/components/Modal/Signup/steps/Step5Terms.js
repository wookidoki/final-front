// steps/Step5Terms.js
import styled from "styled-components";
export { StepTitle, StepDescription } from "./Step1Account";

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSub};
  cursor: pointer;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primary};
  }

  &.required {
    color: ${({ theme }) => theme.colors.textMain};
    font-weight: 600;
  }
`;

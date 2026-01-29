import styled from "styled-components";
import { spin } from "./animations";

export const FormGroup = styled.div`
  margin-bottom: ${({ $spacing }) => $spacing || "20px"};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ $hasError, theme }) =>
    $hasError ? "#ef4444" : theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? "#ef4444" : theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight || "120px"};
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;
  resize: vertical;
  line-height: 1.6;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FormCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 20px;
    height: 20px;
    accent-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  label {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textMain};
    cursor: pointer;
  }
`;

export const FormError = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #ef4444;
  margin-top: 6px;
`;

export const FormHint = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 6px;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 32px;
`;

// 로딩 스피너
export const Spinner = styled.div`
  width: ${({ $size }) => $size || "18px"};
  height: ${({ $size }) => $size || "18px"};
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

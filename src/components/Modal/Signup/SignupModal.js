// SignupModal.styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 400px;
`;

export const ProgressBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ProgressStep = styled.div`
  flex: 1;
  height: 6px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.border};
  border-radius: 3px;
  transition: all 0.3s ease;
`;

export const StepTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
  text-align: center;
`;

export const StepDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1.1rem;
  pointer-events: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
    opacity: 0.6;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const GenreButton = styled.button`
  padding: 16px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.gradient : theme.colors.bg};
  border: 2px solid
    ${({ $selected, theme }) =>
      $selected ? "transparent" : theme.colors.border};
  border-radius: 12px;
  color: ${({ $selected }) => ($selected ? "white" : "inherit")};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}30;
  }

  span {
    font-size: 1.5rem;
  }
`;

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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

export const Button = styled.button`
  flex: 1;
  padding: 16px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.bg};
  color: ${({ $primary }) => ($primary ? "white" : "inherit")};
  border: 2px solid
    ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px
      ${({ $primary, theme }) =>
        $primary ? theme.colors.primary : theme.colors.border}40;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SuccessIcon = styled.div`
  font-size: 5rem;
  text-align: center;
  margin: 40px 0 20px;
`;

export const SuccessMessage = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSub};
    line-height: 1.6;
  }
`;

export const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  color: #ff4444;
  font-size: 0.9rem;
`;

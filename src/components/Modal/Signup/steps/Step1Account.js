import styled from "styled-components";

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

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

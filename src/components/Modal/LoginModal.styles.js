// LoginModal.styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

export const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -1px;
  background: ${({ theme }) =>
    theme?.colors?.gradient || "linear-gradient(90deg,#6d5efc,#3cc6ff)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
`;

export const WelcomeText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme?.colors?.textSub || "#9aa0a6"};
  text-align: center;
  margin-bottom: 8px;
`;

export const Form = styled.form`
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
  color: ${({ theme }) => theme?.colors?.textMain || "#eaeaea"};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: ${({ theme }) => theme?.colors?.textSub || "#9aa0a6"};
  font-size: 1.1rem;
  pointer-events: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: ${({ theme }) => theme?.colors?.bg || "#111"};
  border: 2px solid ${({ theme }) => theme?.colors?.border || "#333"};
  border-radius: 12px;
  color: ${({ theme }) => theme?.colors?.textMain || "#eaeaea"};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme?.colors?.primary || "#6d5efc"};
    box-shadow: 0 0 0 3px
      ${({ theme }) => theme?.colors?.primary || "#6d5efc"}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme?.colors?.textSub || "#9aa0a6"};
    opacity: 0.6;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) =>
    theme?.colors?.gradient || "linear-gradient(90deg,#6d5efc,#3cc6ff)"};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 24px ${({ theme }) => theme?.colors?.primary || "#6d5efc"}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px
      ${({ theme }) => theme?.colors?.primary || "#6d5efc"}60;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme?.colors?.border || "#333"};
  }

  span {
    color: ${({ theme }) => theme?.colors?.textSub || "#9aa0a6"};
    font-size: 0.9rem;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SocialButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme?.colors?.bg || "#111"};
  border: 2px solid ${({ theme }) => theme?.colors?.border || "#333"};
  border-radius: 12px;
  color: ${({ theme }) => theme?.colors?.textMain || "#eaeaea"};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;

  svg {
    font-size: 1.3rem;
  }

  &:hover {
    background: ${({ theme }) => theme?.colors?.surfaceHover || "#1a1a1a"};
    border-color: ${({ theme }) => theme?.colors?.primary || "#6d5efc"};
    transform: translateY(-2px);
  }
`;

export const SignupPrompt = styled.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 24px;
  border-top: 2px solid ${({ theme }) => theme?.colors?.border || "#333"};
  color: ${({ theme }) => theme?.colors?.textSub || "#9aa0a6"};
  font-size: 0.95rem;

  a {
    color: ${({ theme }) => theme?.colors?.primary || "#6d5efc"};
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  color: #ff4444;
  font-size: 0.9rem;
  text-align: center;
`;

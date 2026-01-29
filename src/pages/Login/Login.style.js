import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg};
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
`;

export const BackgroundEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 20%, ${({ theme }) => theme.colors.primary}20 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, ${({ theme }) => theme.colors.secondary}20 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, ${({ theme }) => theme.colors.accent}10 0%, transparent 50%);
  pointer-events: none;
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 28px;
  padding: 48px 40px;
  position: relative;
  z-index: 1;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    padding: 32px 24px;
    border-radius: 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
`;

export const LogoIcon = styled.div`
  font-size: 2.5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

export const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  text-align: center;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
  margin-bottom: 32px;
`;

export const ErrorBanner = styled.div`
  padding: 12px 16px;
  background: #ff4d4f20;
  border: 1px solid #ff4d4f50;
  border-radius: 12px;
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ $hasError, theme }) =>
    $hasError ? "#ff4d4f" : theme.colors.border};
  border-radius: 14px;
  padding: 0 16px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? "#ff4d4f" : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ $hasError, theme }) =>
      $hasError ? "#ff4d4f20" : `${theme.colors.primary}20`};
  }
`;

export const InputIcon = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  margin-right: 12px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 16px 0;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const TogglePassword = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ErrorText = styled.span`
  font-size: 0.8rem;
  color: #ff4d4f;
  padding-left: 4px;
`;

export const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};

  label {
    cursor: pointer;
  }
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const ForgotPassword = styled(Link)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.primary}50;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  span {
    padding: 0 16px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $provider }) => {
    switch ($provider) {
      case "google":
        return `
          background: white;
          border: 2px solid #ddd;
          color: #333;

          &:hover {
            background: #f5f5f5;
            border-color: #ccc;
          }
        `;
      case "kakao":
        return `
          background: #FEE500;
          border: none;
          color: #191919;

          &:hover {
            background: #e6cf00;
          }
        `;
      case "naver":
        return `
          background: #03C75A;
          border: none;
          color: white;

          &:hover {
            background: #02b351;
          }
        `;
      default:
        return "";
    }
  }}

  svg {
    font-size: 1.1rem;
  }

  @media (max-width: 400px) {
    span {
      display: none;
    }
    padding: 14px 20px;
  }
`;

export const SignupLink = styled.p`
  text-align: center;
  margin-top: 28px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSub};

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

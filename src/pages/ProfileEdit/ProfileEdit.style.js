import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding: 32px 40px 100px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 20px;
`;

export const HeaderLeft = styled.div``;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const AvatarSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  height: fit-content;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 24px;
`;

export const Avatar = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: ${({ $image, theme }) =>
    $image ? `url(${$image}) center/cover no-repeat` : theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  border: 4px solid ${({ theme }) => theme.colors.border};
`;

export const AvatarOverlay = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 3px solid ${({ theme }) => theme.colors.surface};

  &:hover {
    transform: scale(1.1);
  }

  input {
    display: none;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const AvatarName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 4px;
`;

export const AvatarEmail = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 20px;
`;

export const AvatarStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StatItem = styled.div`
  text-align: center;

  span {
    display: block;
    font-size: 1.3rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 4px;
  }

  small {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FormSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
`;

export const FormTabs = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const FormTab = styled.button`
  flex: 1;
  padding: 18px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.bg : "transparent"};
  border: none;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSub};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : "transparent"};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FormContent = styled.div`
  padding: 32px;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 10px;
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
  min-height: 120px;
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;
  resize: vertical;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ErrorText = styled.span`
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

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 32px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid
    ${({ $variant, theme }) =>
      $variant === "primary" ? theme.colors.primary : theme.colors.border};
  background: ${({ $variant, theme }) =>
    $variant === "primary" ? theme.colors.gradient : "transparent"};
  color: ${({ $variant, theme }) =>
    $variant === "primary" ? "white" : theme.colors.textSub};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ $variant, theme }) =>
      $variant === "primary"
        ? `0 8px 25px ${theme.colors.primary}50`
        : "none"};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const SuccessBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #10b98120;
  border: 1px solid #10b98150;
  border-radius: 12px;
  color: #10b981;
  font-size: 0.95rem;
  margin-bottom: 24px;

  svg {
    font-size: 1.2rem;
  }
`;

export const DangerZone = styled.div`
  margin-top: 40px;
  padding: 24px;
  background: #ef444410;
  border: 2px solid #ef444430;
  border-radius: 16px;
`;

export const DangerTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #ef4444;
  margin-bottom: 8px;
`;

export const DangerText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 16px;
`;

export const DangerButton = styled.button`
  padding: 12px 20px;
  background: transparent;
  border: 2px solid #ef4444;
  border-radius: 10px;
  color: #ef4444;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

export const PasswordStrength = styled.div`
  margin-top: 8px;
`;

export const StrengthBar = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 6px;
`;

export const StrengthFill = styled.div`
  height: 100%;
  width: ${({ $strength }) => {
    switch ($strength) {
      case "weak":
        return "33%";
      case "medium":
        return "66%";
      case "strong":
        return "100%";
      default:
        return "0%";
    }
  }};
  background: ${({ $strength }) => {
    switch ($strength) {
      case "weak":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "strong":
        return "#10b981";
      default:
        return "transparent";
    }
  }};
  transition: all 0.3s ease;
`;

export const StrengthText = styled.span`
  font-size: 0.8rem;
  color: ${({ $strength }) => {
    switch ($strength) {
      case "weak":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "strong":
        return "#10b981";
      default:
        return "#6b7280";
    }
  }};
`;

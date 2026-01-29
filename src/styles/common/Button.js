import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// 기본 버튼 스타일
const buttonBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Primary 버튼
export const PrimaryButton = styled.button`
  ${buttonBase}
  padding: ${({ $size }) => $size === "sm" ? "10px 16px" : "14px 24px"};
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: ${({ $size }) => $size === "sm" ? "0.85rem" : "0.95rem"};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.primary}50;
  }
`;

// Secondary 버튼
export const SecondaryButton = styled.button`
  ${buttonBase}
  padding: ${({ $size }) => $size === "sm" ? "10px 16px" : "14px 24px"};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ $size }) => $size === "sm" ? "0.85rem" : "0.95rem"};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// 아이콘 버튼
export const IconButton = styled.button`
  width: ${({ $size }) => $size || "36px"};
  height: ${({ $size }) => $size || "36px"};
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textSub};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $variant, theme }) => {
      switch ($variant) {
        case "primary": return `${theme.colors.primary}20`;
        case "danger": return "#ef444420";
        case "warning": return "#f59e0b20";
        case "info": return "#06b6d420";
        default: return theme.colors.border;
      }
    }};
    color: ${({ $variant, theme }) => {
      switch ($variant) {
        case "primary": return theme.colors.primary;
        case "danger": return "#ef4444";
        case "warning": return "#f59e0b";
        case "info": return "#06b6d4";
        default: return theme.colors.textMain;
      }
    }};
  }
`;

// Link 버튼
export const LinkButton = styled(Link)`
  ${buttonBase}
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Danger 버튼
export const DangerButton = styled.button`
  ${buttonBase}
  padding: 12px 20px;
  background: transparent;
  border: 2px solid #ef4444;
  border-radius: 10px;
  color: #ef4444;
  font-size: 0.9rem;

  &:hover:not(:disabled) {
    background: #ef4444;
    color: white;
  }
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ $gap }) => $gap || "8px"};
  justify-content: ${({ $justify }) => $justify || "flex-start"};
`;

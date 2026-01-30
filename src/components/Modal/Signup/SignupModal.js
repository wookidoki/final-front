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
  border-radius: 3px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.border};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
`;

export const Button = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  border: none;

  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.bg};

  color: ${({ $primary }) => ($primary ? "#fff" : "inherit")};
`;

export const ErrorMessage = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  font-size: 0.9rem;
`;

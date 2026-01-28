import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ToolButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.textSub};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : `${theme.colors.primary}20`};
    color: ${({ $active, theme }) =>
      $active ? "white" : theme.colors.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 4px;
`;

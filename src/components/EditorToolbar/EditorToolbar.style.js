import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 260px;
  right: 0;
  height: 56px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 99;
  backdrop-filter: blur(10px);
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Logo = styled.div`
  font-size: 0.9rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
  font-style: italic;
`;

export const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.colors.bg};
  padding: 4px;
  border-radius: 8px;
`;

export const ToolButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary + "20" : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textMain};
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary + "30" : theme.colors.surfaceHover || theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 8px;
`;

export const ZoomDisplay = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
  min-width: 50px;
  text-align: center;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;
  }

  &:active {
    transform: translateY(0);
  }
`;

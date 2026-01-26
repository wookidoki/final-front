import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

export const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin: 0;
`;

export const LayerCount = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};
  background: ${({ theme }) => theme.colors.bg};
  padding: 4px 10px;
  border-radius: 12px;
`;

export const LayerList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }
`;

export const LayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary + "20" : "transparent"};
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary : "transparent"};
  opacity: ${({ $isHidden }) => ($isHidden ? 0.5 : 1)};

  &:hover {
    background: ${({ $isSelected, theme }) =>
      $isSelected
        ? theme.colors.primary + "30"
        : theme.colors.surfaceHover || theme.colors.bg};
  }
`;

export const LayerIcon = styled.div`
  font-size: 1rem;
  color: ${({ theme, $isHidden }) =>
    $isHidden ? theme.colors.textMuted : theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const LayerName = styled.div`
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme, $isHidden }) =>
    $isHidden ? theme.colors.textMuted : theme.colors.textMain};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LayerActions = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;

  ${LayerItem}:hover & {
    opacity: 1;
  }
`;

export const ActionButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 12px;
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  opacity: 0.5;
`;

export const EmptyText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin: 0;
`;

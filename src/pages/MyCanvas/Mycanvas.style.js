import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 상단 툴바
export const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme }) => theme.colors.surface}ee;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`;

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TopBarCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BackBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textMain};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UniverseTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PrivateBadge = styled.span`
  font-size: 0.7rem;
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.textMuted}30;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
`;

export const ToolButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.bg};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.textMain};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : `${theme.colors.primary}20`};
    color: ${({ $active, theme }) =>
      $active ? "white" : theme.colors.primary};
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
    padding: 10px;
  }
`;

export const PublishButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}50;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
    padding: 10px;
  }
`;

// 메인 캔버스 컨테이너
export const Container = styled.div`
  width: ${({ $isPreviewMode }) => ($isPreviewMode ? "100vw" : "calc(100vw - 260px)")};
  height: calc(100vh - 60px);
  margin-left: ${({ $isPreviewMode }) => ($isPreviewMode ? "0" : "260px")};
  margin-top: 60px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100vw;
    margin-left: 0;
  }
`;

// 그리드 오버레이
export const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.border}40 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.border}40 1px, transparent 1px);
  background-size: 25px 25px;
  pointer-events: none;
  z-index: 1;
`;

// 줌 인디케이터
export const ZoomIndicator = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 8px 14px;
  background: ${({ theme }) => theme.colors.surface}ee;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSub};
  z-index: 100;
`;

// 캔버스 영역 (줌 적용)
export const CanvasArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: scale(${({ $zoom }) => ($zoom || 100) / 100});
  transform-origin: center center;
`;

// 빈 상태
export const EmptyState = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
  z-index: 0;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.6;
`;

export const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 10px;
`;

export const EmptyDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 300px;
  line-height: 1.6;
`;

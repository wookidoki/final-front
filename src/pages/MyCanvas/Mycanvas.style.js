import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: calc(100vw - 260px);
  height: calc(100vh - 56px);
  /* 좌측 레이어 패널(260px)과 상단 툴바(56px) 공간 확보 */
  margin-left: 260px;
  margin-top: 56px;

  /* 젠지 감성: 테마 색상 기반 배경 */
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow: hidden;
`;

/* 그리드 오버레이 */
export const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.border} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.border} 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
`;

/* 하단 툴바는 제거 (상단 툴바로 통합) */

export const BackBtn = styled(Link)`
  position: fixed;
  top: 12px;
  left: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1.2rem;
  z-index: 200;
  opacity: 0.7;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface}cc;
  backdrop-filter: blur(10px);

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    transform: scale(1.05);
  }
`;

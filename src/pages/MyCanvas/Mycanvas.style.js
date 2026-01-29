import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 상단 바
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
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.bg};
  color: ${({ $active, theme }) => $active ? "white" : theme.colors.textMain};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) => $active ? theme.colors.primary : `${theme.colors.primary}20`};
    color: ${({ $active, theme }) => $active ? "white" : theme.colors.primary};
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
    span { display: none; }
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
    span { display: none; }
    padding: 10px;
  }
`;

// 메인 캔버스 컨테이너
export const Container = styled.div`
  width: ${({ $isPreviewMode, $hasSelection }) =>
    $isPreviewMode ? "100vw" : $hasSelection ? "calc(100vw - 620px)" : "calc(100vw - 320px)"};
  height: calc(100vh - 60px);
  margin-left: ${({ $isPreviewMode }) => $isPreviewMode ? "0" : "320px"};
  margin-top: 60px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  @media (max-width: 1400px) {
    width: ${({ $isPreviewMode, $hasSelection }) =>
      $isPreviewMode ? "100vw" : $hasSelection ? "calc(100vw - 580px)" : "calc(100vw - 280px)"};
  }

  @media (max-width: 1200px) {
    width: ${({ $isPreviewMode, $hasSelection }) =>
      $isPreviewMode ? "100vw" : $hasSelection ? "calc(100vw - 540px)" : "calc(100vw - 280px)"};
    margin-left: ${({ $isPreviewMode }) => $isPreviewMode ? "0" : "280px"};
  }

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
    linear-gradient(${({ theme }) => theme.colors.border}30 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.border}30 1px, transparent 1px);
  background-size: 40px 40px;
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
  font-size: 5rem;
  margin-bottom: 24px;
  animation: ${float} 3s ease-in-out infinite;
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
  max-width: 320px;
  line-height: 1.6;
`;

// ===== 좌측 위젯 패널 =====
export const WidgetPanel = styled.div`
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 320px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: ${({ $isPreviewMode }) => $isPreviewMode ? "none" : "flex"};
  flex-direction: column;
  z-index: 100;
  overflow: hidden;

  @media (max-width: 1200px) { width: 280px; }
  @media (max-width: 768px) { display: none; }
`;

export const PanelTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  flex-shrink: 0;
`;

export const PanelTab = styled.button`
  flex: 1;
  padding: 14px 4px;
  background: transparent;
  border: none;
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textMuted};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? theme.colors.primary : "transparent"};

  svg { font-size: 1.1rem; }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

export const PanelContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

export const PanelSection = styled.div`
  margin-bottom: 24px;

  &:last-child { margin-bottom: 0; }
`;

export const PanelSectionTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// 플레이리스트/음악 아이템
export const MediaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}50;
    background: ${({ theme }) => theme.colors.primary}10;
  }

  &:last-child { margin-bottom: 0; }
`;

export const MediaCover = styled.div`
  width: ${({ $size }) => $size || "48px"};
  height: ${({ $size }) => $size || "48px"};
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MediaInfo = styled.div`
  flex: 1;
  min-width: 0;

  h5 {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const AddBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  font-size: 0.8rem;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 10px ${({ theme }) => theme.colors.primary}50;
  }
`;

// 스티커 그리드
export const StickerCategory = styled.div`
  margin-bottom: 16px;

  &:last-child { margin-bottom: 0; }
`;

export const StickerCategoryTitle = styled.h5`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 8px;
  text-transform: capitalize;
`;

export const StickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
`;

export const StickerBtn = styled.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid transparent;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}20;
    transform: scale(1.1);
  }
`;

// 도형 그리드
export const ShapeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const ShapeBtn = styled.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ $color, theme }) => $color || theme.colors.primary};
  }
`;

// 색상 그리드
export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

export const ColorBtn = styled.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  background: ${({ $color }) => $color};
  border: 3px solid ${({ $active }) => $active ? "white" : "transparent"};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${({ $active }) => $active ? "0 0 0 2px #ff0080" : "inset 0 0 0 1px rgba(255,255,255,0.1)"};

  &:hover {
    transform: scale(1.1);
  }
`;

// 배경 프리셋
export const BackgroundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

export const BackgroundBtn = styled.button`
  height: 56px;
  border-radius: 10px;
  background: ${({ $gradient }) => $gradient};
  border: 3px solid ${({ $active, theme }) => $active ? theme.colors.primary : "transparent"};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &:hover { transform: scale(1.02); }

  span {
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.65rem;
    color: white;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    font-weight: 600;
  }
`;

// 텍스트/이미지 추가 버튼
export const AddWidgetBtn = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  margin-bottom: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }

  &:last-child { margin-bottom: 0; }
`;

// 모바일 하단 툴바
export const MobileToolbar = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 1000;
  align-items: center;
  justify-content: space-around;
  padding: 0 16px;

  @media (max-width: 768px) {
    display: ${({ $isPreviewMode }) => $isPreviewMode ? "none" : "flex"};
  }
`;

export const MobileToolBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ $active, theme }) => $active ? theme.colors.primary : "transparent"};
  border: none;
  color: ${({ $active, theme }) => $active ? "white" : theme.colors.textMain};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 1.1rem;

  span {
    font-size: 0.6rem;
    font-weight: 600;
  }
`;

// JSON 내보내기/가져오기 버튼
export const JsonButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const JsonBtn = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// ===== 우측 속성 패널 =====
export const PropertyPanel = styled.div`
  position: fixed;
  right: 0;
  top: 60px;
  bottom: 0;
  width: 300px;
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  display: ${({ $show }) => $show ? "flex" : "none"};
  flex-direction: column;
  z-index: 100;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease;

  @media (max-width: 1400px) { width: 280px; }
  @media (max-width: 1200px) { width: 260px; }
  @media (max-width: 768px) {
    position: fixed;
    bottom: 60px;
    top: auto;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    max-height: 50vh;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 20px 20px 0 0;
  }
`;

export const PropertyHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const PropertyTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h3 {
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

export const WidgetTypeBadge = styled.span`
  font-size: 0.7rem;
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  font-weight: 600;
`;

export const ClosePropertyBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

export const PropertyContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

export const PropertySection = styled.div`
  margin-bottom: 20px;

  &:last-child { margin-bottom: 0; }
`;

export const PropertySectionTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PropertyRow = styled.div`
  margin-bottom: 12px;

  &:last-child { margin-bottom: 0; }
`;

export const PropertyLabel = styled.label`
  display: block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 6px;
  font-weight: 500;
`;

export const PropertyInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.85rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const PropertyTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.85rem;
  min-height: 80px;
  resize: vertical;
  transition: all 0.2s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PropertySelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PropertyColorPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input[type="color"] {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 0;
    background: none;

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    &::-webkit-color-swatch {
      border: 2px solid ${({ theme }) => theme.colors.border};
      border-radius: 8px;
    }
  }

  span {
    flex: 1;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSub};
    font-family: monospace;
  }
`;

export const PropertySlider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  input[type="range"] {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.border};
    appearance: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
  }

  span {
    min-width: 40px;
    text-align: right;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
  }
`;

export const PropertyToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  span {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

export const ToggleSwitch = styled.label`
  position: relative;
  width: 44px;
  height: 24px;
  cursor: pointer;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    transition: 0.3s;

    &::before {
      content: "";
      position: absolute;
      width: 18px;
      height: 18px;
      background: white;
      border-radius: 50%;
      top: 3px;
      left: 3px;
      transition: 0.3s;
    }
  }

  input:checked + .slider {
    background: ${({ theme }) => theme.colors.primary};
  }

  input:checked + .slider::before {
    transform: translateX(20px);
  }
`;

export const PropertyBtnGroup = styled.div`
  display: flex;
  gap: 6px;
`;

export const PropertyBtn = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.bg};
  border: 2px solid ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  color: ${({ $active, theme }) => $active ? "white" : theme.colors.textSub};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active, theme }) => $active ? "white" : theme.colors.primary};
  }
`;

export const PropertyActions = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

export const ActionBtn = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  background: ${({ $danger, $primary, theme }) =>
    $danger ? "#ff4444" : $primary ? theme.colors.gradient : theme.colors.bg};
  border: ${({ $danger, $primary, theme }) =>
    $danger || $primary ? "none" : `2px solid ${theme.colors.border}`};
  color: ${({ $danger, $primary, theme }) =>
    $danger || $primary ? "white" : theme.colors.textSub};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const QuickColorRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`;

export const QuickColorBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${({ $color }) => $color};
  border: 2px solid ${({ $active }) => $active ? "white" : "transparent"};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${({ $active }) => $active ? "0 0 0 2px #ff0080" : "none"};

  &:hover {
    transform: scale(1.15);
  }
`;

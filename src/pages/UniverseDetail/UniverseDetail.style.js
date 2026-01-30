import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ $isFullscreen }) =>
    $isFullscreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  `}
`;

// 상단 네비게이션
export const TopNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 100;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
`;

export const BackButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface}cc;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    transform: translateX(-4px);
  }
`;

export const NavActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const NavButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface}cc;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EditButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}60;
  }
`;

// 유니버스 캔버스
export const UniverseCanvas = styled.div`
  width: 100%;
  height: ${({ $isFullscreen }) => ($isFullscreen ? "100vh" : "calc(100vh - 180px)")};
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease;
`;

export const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
`;

export const ExitFullscreenButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface}ee;
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

// 위젯 스타일
export const TextWidget = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-weight: ${({ $fontWeight }) => $fontWeight};
  color: ${({ $color }) => $color};
  white-space: pre-wrap;
  word-break: break-word;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ImageWidget = styled.div`
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

const getAnimationStyle = (animation) => {
  switch (animation) {
    case "bounce":
      return `animation: ${bounce} 1s ease-in-out infinite;`;
    case "pulse":
      return `animation: ${pulse} 1.5s ease-in-out infinite;`;
    case "spin":
      return `animation: ${spin} 3s linear infinite;`;
    case "float":
      return `animation: ${float} 2s ease-in-out infinite;`;
    default:
      return `animation: ${float} 3s ease-in-out infinite;`;
  }
};

export const StickerWidget = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  ${({ $animation }) => getAnimationStyle($animation)}
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

// 도형 위젯
export const ShapeWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: all 0.3s ease;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

// 음악 위젯
export const MusicWidget = styled.div`
  background: ${({ theme }) => theme.colors.surface}ee;
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}30;
  }
`;

export const MusicCover = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${({ $style }) => ($style === "vinyl" ? "50%" : "8px")};
  background: ${({ theme }) => theme.colors.primary}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ $style, theme }) =>
    $style === "vinyl" &&
    `
    border: 3px solid ${theme.colors.textMuted};
    box-shadow: inset 0 0 15px rgba(0,0,0,0.5);
  `}
`;

export const MusicInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MusicTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin: 0 0 2px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MusicArtist = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MusicPlayBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  svg {
    margin-left: 2px;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.primary}60;
  }
`;

export const PlaylistWidget = styled.div`
  background: ${({ theme }) => theme.colors.surface}ee;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: ${float} 4s ease-in-out infinite;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.primary}30;
  }
`;

export const PlaylistCover = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PlaylistInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-size: 0.9rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMain};
    margin: 0 0 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

export const PlayButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}60;
  }
`;

export const VideoWidget = styled.div`
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const LinkWidget = styled.div`
  background: ${({ theme }) => theme.colors.surface}ee;
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    color: ${({ theme }) => theme.colors.textMain};
    font-size: 0.9rem;
    font-weight: 600;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}20;
  }
`;

export const ProfileWidget = styled.div`
  background: ${({ theme }) => theme.colors.surface}ee;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ProfileAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileName = styled.h4`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin: 0;
`;

// 하단 정보 패널
export const InfoPanel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface}f5;
  backdrop-filter: blur(20px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  z-index: 100;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 16px 20px;
    gap: 16px;
  }
`;

export const CreatorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const CreatorAvatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  border: 3px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

export const CreatorInfo = styled.div`
  flex: 1;
  min-width: 0;

  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMain};
    margin: 0 0 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSub};
    margin: 0;

    strong {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Description = styled.p`
  font-size: 0.8rem !important;
  color: ${({ theme }) => theme.colors.textMuted} !important;
  margin-top: 6px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatsSection = styled.div`
  display: flex;
  gap: 28px;

  @media (max-width: 900px) {
    gap: 20px;
  }
`;

export const StatItem = styled.div`
  text-align: center;

  span {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 2px;
  }

  p {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0;
  }
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button`
  padding: 12px 22px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ $active, theme }) =>
    $active
      ? `
    background: ${theme.colors.primary};
    border: none;
    color: white;

    &:hover {
      background: ${theme.colors.primary}dd;
      transform: translateY(-2px);
    }
  `
      : `
    background: transparent;
    border: 2px solid ${theme.colors.border};
    color: ${theme.colors.textMain};

    &:hover {
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
    }
  `}

  @media (max-width: 600px) {
    padding: 10px 16px;
    font-size: 0.85rem;
  }
`;

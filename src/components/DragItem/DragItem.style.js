import styled, { keyframes, css } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
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

// 위젯 컨테이너
export const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  cursor: ${({ $isLocked }) => ($isLocked ? "not-allowed" : "move")};
  transition: all 0.2s ease;
  overflow: hidden;

  border: 2px solid ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : "transparent"};
  box-shadow: ${({ $isSelected, theme }) =>
    $isSelected ? `0 0 20px ${theme.colors.primary}40` : "0 4px 12px rgba(0, 0, 0, 0.15)"};

  &:hover {
    border-color: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary : `${theme.colors.secondary}80`};
  }

  ${({ $isLocked }) => $isLocked && `opacity: 0.85;`}
`;

// 미리보기 모드 컨테이너
export const PreviewContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
`;

// 잠금 배지
export const LockedBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 6px;
`;

// 텍스트 위젯
export const TextWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ $textAlign }) =>
    $textAlign === "center" ? "center" : $textAlign === "right" ? "flex-end" : "flex-start"};
  padding: ${({ $padding }) => $padding || 16}px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-weight: ${({ $fontWeight }) => $fontWeight};
  color: ${({ $color }) => $color};
  background: ${({ $bgColor }) => $bgColor || "transparent"};
  border-radius: 12px;
  word-break: break-word;
  white-space: pre-wrap;
  user-select: none;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

// 이미지 위젯
export const ImageWidget = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  overflow: hidden;
  user-select: none;
  box-shadow: ${({ $shadow }) => $shadow ? "0 8px 30px rgba(0, 0, 0, 0.3)" : "none"};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;

  span {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.9rem;
  }
`;

// 스티커 위젯
const stickerAnimation = {
  none: css``,
  bounce: css`animation: ${bounce} 1s ease-in-out infinite;`,
  pulse: css`animation: ${pulse} 1.5s ease-in-out infinite;`,
  spin: css`animation: ${spin} 3s linear infinite;`,
  float: css`animation: ${float} 2s ease-in-out infinite;`,
};

export const StickerWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  user-select: none;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  ${({ $animation }) => stickerAnimation[$animation || "float"]}
`;

// 도형 위젯
export const ShapeWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;

// 음악 위젯
export const MusicWidget = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  user-select: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MusicCover = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${({ $style }) => $style === "vinyl" ? "50%" : "8px"};
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

  ${({ $style }) => $style === "vinyl" && css`
    border: 3px solid ${({ theme }) => theme.colors.textMuted};
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

// 플레이리스트 위젯
export const PlaylistWidget = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  user-select: none;
  border: 1px solid ${({ theme }) => theme.colors.border};

  ${({ $style }) => $style === "compact" && css`
    padding: 10px 12px;
    gap: 10px;
  `}

  ${({ $style }) => $style === "minimal" && css`
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 8px;
  `}
`;

export const PlaylistCover = styled.div`
  width: ${({ $style }) => $style === "compact" ? "44px" : "56px"};
  height: ${({ $style }) => $style === "compact" ? "44px" : "56px"};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
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
`;

export const PlaylistTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PlaylistArtist = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PlaylistMeta = styled.div`
  display: flex;
  gap: 8px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  span {
    &::after {
      content: "·";
      margin-left: 8px;
    }

    &:last-child::after {
      content: "";
      margin-left: 0;
    }
  }
`;

export const PlayButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-size: 0.9rem;
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
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}60;
  }
`;

// 비디오 위젯
export const VideoWidget = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  user-select: none;

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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;

  span {
    font-size: 1.2rem;
    font-weight: 700;
    opacity: 0.6;
  }
`;

// 링크 위젯
export const LinkWidget = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

export const LinkIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  flex-shrink: 0;
`;

export const LinkContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LinkTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LinkUrl = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// 프로필 위젯
export const ProfileWidget = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  user-select: none;
`;

export const ProfileAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileName = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin: 0;
  text-align: center;
`;

export const ProfileBio = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin: 0;
  text-align: center;
  line-height: 1.4;
`;

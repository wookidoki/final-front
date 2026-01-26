import styled from "styled-components";

// 위젯 컨테이너
export const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  cursor: move;
  transition: all 0.3s ease;

  /* 선택 상태 */
  border: 2px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary : "transparent"};
  box-shadow: ${({ $isSelected, theme }) =>
    $isSelected
      ? `0 0 20px ${theme.colors.primary}40`
      : "0 2px 8px rgba(0, 0, 0, 0.1)"};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

// 텍스트 위젯
export const TextWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  color: ${({ $color }) => $color};
  font-weight: 600;
  word-break: break-word;
  user-select: none;
`;

// 이미지 위젯
export const ImageWidget = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  user-select: none;
  pointer-events: none;
`;

// 스티커 위젯
export const StickerWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  user-select: none;
`;

// 플레이리스트 위젯
export const PlaylistWidget = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  user-select: none;
`;

export const PlaylistHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`;

export const PlaylistTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin: 0;
`;

export const PlaylistArtist = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin: 0;
`;

export const PlayButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.3s ease;

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
`;

export const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  opacity: 0.6;
`;

import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px currentColor;
  }
  50% {
    box-shadow: 0 0 40px currentColor;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 24px;
  z-index: 1000;
  backdrop-filter: blur(20px);
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.3);

  /* Y2K 스타일 그라디언트 테두리 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.gradient};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
    padding: 16px;
    gap: 12px;
  }
`;

export const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const AlbumArt = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  animation: ${spin} 20s linear infinite;
  animation-play-state: running;
`;

export const TrackDetails = styled.div`
  min-width: 0;
  flex: 1;
`;

export const TrackName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
`;

export const ArtistName = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PlayerControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ControlButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : "transparent"};
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? "transparent" : theme.colors.border};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.textSub};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

export const PlayButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}50;
  animation: ${pulse} 2s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 24px ${({ theme }) => theme.colors.primary}70;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
`;

export const TimeText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  min-width: 40px;
  text-align: center;
`;

export const ProgressBarContainer = styled.div`
  flex: 1;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: visible;

  &:hover {
    height: 8px;
  }
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 3px;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}50;
`;

export const ProgressHandle = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ $progress }) => $progress}%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary}80;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${ProgressBarContainer}:hover & {
    opacity: 1;
  }
`;

export const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: end;

  @media (max-width: 768px) {
    justify-self: center;
  }
`;

export const VolumeButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

export const VolumeBarContainer = styled.div`
  width: 100px;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: visible;

  &:hover {
    height: 8px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const VolumeBar = styled.div`
  height: 100%;
  width: ${({ $volume }) => $volume}%;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 3px;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}50;
`;

export const VolumeHandle = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ $volume }) => $volume}%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary}80;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${VolumeBarContainer}:hover & {
    opacity: 1;
  }
`;

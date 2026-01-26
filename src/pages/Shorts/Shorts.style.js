import styled, { keyframes } from "styled-components";

// 애니메이션
const glitchAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

const neonPulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
  }
  50% {
    text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding-bottom: 100px;
  position: relative;
  overflow-x: hidden;

  /* 배경 애니메이션 효과 */
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 20% 50%,
      ${({ theme }) => theme.colors.primary}10 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      ${({ theme }) => theme.colors.secondary}10 0%,
      transparent 50%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const HeaderGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  opacity: 0.9;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.bg});
  }
`;

export const HeaderContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
`;

export const HeaderIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
  animation: ${float} 3s ease-in-out infinite;
`;

export const Title = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 12px;
  letter-spacing: 8px;
  font-style: italic;
  position: relative;
  animation: ${neonPulse} 2s ease-in-out infinite;

  /* 글리치 효과 */
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 #ff00de;
    clip: rect(24px, 550px, 90px, 0);
    animation: ${glitchAnimation} 3s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 #00f0ff;
    clip: rect(85px, 550px, 140px, 0);
    animation: ${glitchAnimation} 2s infinite linear alternate-reverse;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  letter-spacing: 2px;
`;

export const Content = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 60px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ShortsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }
`;

export const ShortCard = styled.div`
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  position: relative;

  /* Y2K 스타일 효과 */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: transparent;
    box-shadow: 0 16px 40px ${({ theme }) => theme.colors.primary}40,
                0 0 20px ${({ theme }) => theme.colors.primary}20;

    &::before {
      opacity: 1;
    }
  }
`;

export const ShortThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 9 / 16;
  position: relative;
  overflow: hidden;
  background: #000;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ShortCard}:hover & {
    transform: scale(1.1);
  }
`;

export const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ShortCard}:hover & {
    opacity: 1;
  }
`;

export const PlayIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}80;
  animation: ${neonPulse} 2s ease-in-out infinite;
`;

export const ViewCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
`;

export const ShortInfo = styled.div`
  padding: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

export const ShortTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ShortArtist = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ShortStats = styled.div`
  display: flex;
  gap: 12px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// 상세보기 모달
export const DetailModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
`;

export const ModalContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  gap: 30px;
  max-width: 1200px;
  width: 90%;
  max-height: 90vh;
  padding: 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 20;
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: rotate(90deg) scale(1.1);
    box-shadow: 0 0 30px ${({ theme }) => theme.colors.primary}80;
  }
`;

export const VideoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 9 / 16;
  max-height: 70vh;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: #000;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 40px ${({ theme }) => theme.colors.primary}40,
              inset 0 0 20px ${({ theme }) => theme.colors.primary}20;
`;

export const VideoPlaceholder = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const VideoPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}60;
  animation: ${neonPulse} 2s ease-in-out infinite;

  &:hover {
    transform: translate(-50%, -50%) scale(1.15);
  }
`;

export const VideoInfo = styled.div`
  color: white;
`;

export const VideoTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const VideoArtist = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 12px;
  font-weight: 600;
`;

export const MusicTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
`;

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 100px;

  @media (max-width: 1024px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.surface};
  border: 2px solid
    ${({ $active, theme }) => ($active ? "transparent" : theme.colors.border)};
  border-radius: 16px;
  color: ${({ $active }) => ($active ? "white" : "inherit")};
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ $active, theme }) =>
    $active ? `0 0 30px ${theme.colors.primary}50` : "none"};

  &:hover {
    transform: translateY(-4px) scale(1.05);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}40;
  }

  @media (max-width: 1024px) {
    flex: 1;
    min-width: 80px;
  }
`;

export const ActionLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
`;

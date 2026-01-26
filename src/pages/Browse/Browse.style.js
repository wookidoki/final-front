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
    transform: translateY(-12px);
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
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding-bottom: 100px;
  position: relative;
  overflow-x: hidden;

  /* Y2K 배경 효과 */
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 25% 45%,
      ${({ theme }) => theme.colors.primary}08 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 65%,
      ${({ theme }) => theme.colors.secondary}08 0%,
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
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

export const TabBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 30px 60px;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
    overflow-x: auto;
  }
`;

export const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.surface};
  color: ${({ $active }) => ($active ? "white" : "#a8a29e")};
  border: 2px solid
    ${({ $active, theme }) => ($active ? "transparent" : theme.colors.border)};
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}30;
  }
`;

export const RefreshButton = styled.button`
  margin-left: auto;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMain};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Content = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 60px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const TopSection = styled.div`
  margin-bottom: 60px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const TopCard = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid ${({ theme }) => theme.colors.border};

  /* Y2K 스타일 효과 */
  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: transparent;
    box-shadow: 0 20px 60px ${({ theme }) => theme.colors.primary}50,
                0 0 40px ${({ theme }) => theme.colors.primary}30;

    &::before {
      opacity: 1;
    }
  }
`;

export const RankBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ $rank }) => {
    if ($rank === 1) return "linear-gradient(135deg, #FFD700, #FFA500)";
    if ($rank === 2) return "linear-gradient(135deg, #C0C0C0, #808080)";
    if ($rank === 3) return "linear-gradient(135deg, #CD7F32, #8B4513)";
    return "#666";
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 900;
  color: white;
  z-index: 10;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5),
              0 0 30px ${({ $rank }) => {
                if ($rank === 1) return "#FFD70080";
                if ($rank === 2) return "#C0C0C080";
                if ($rank === 3) return "#CD7F3280";
                return "transparent";
              }};
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: ${neonPulse} 2s ease-in-out infinite;
`;

export const TopCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${TopCard}:hover & {
    transform: scale(1.1);
  }
`;

export const TopCardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const TopCardInfo = styled.div`
  flex: 1;
  color: white;
`;

export const TopCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.2;
`;

export const TopCardArtist = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

export const PlayButtonLarge = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}60;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}80;
  }
`;

export const ChartSection = styled.div``;

export const ChartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TrackItem = styled.div`
  display: grid;
  grid-template-columns: 50px 60px 1fr 200px 120px 100px;
  gap: 20px;
  align-items: center;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
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
    background: ${({ theme }) => theme.colors.surfaceHover || theme.colors.surface};
    border-color: transparent;
    transform: translateX(8px) scale(1.01);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}30,
                0 0 20px ${({ theme }) => theme.colors.primary}15;

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 40px 50px 1fr 80px;
    gap: 12px;
  }
`;

export const TrackRank = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  text-align: center;
`;

export const TrackAlbumArt = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 1024px) {
    width: 50px;
    height: 50px;
  }
`;

export const TrackInfo = styled.div`
  min-width: 0;
`;

export const TrackName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TrackArtist = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TrackAlbum = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const TrackGenre = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.primary}20;
  border-radius: 12px;
  text-align: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const TrackActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
`;

export const LikeButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${({ $liked, theme }) => ($liked ? theme.colors.primary : theme.colors.textSub)};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

export const PlayButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
    transform: scale(1.1);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}60;
  }
`;

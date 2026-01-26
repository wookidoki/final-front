import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

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
    text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor;
  }
  50% {
    text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow-x: hidden;
`;

// Hero Section
export const HeroSection = styled.div`
  width: 100%;
  min-height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 80px;
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  opacity: 0.15;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.bg});
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  padding: 0 40px;
`;

export const HeroIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
  animation: ${float} 3s ease-in-out infinite;
`;

export const HeroTitle = styled.h1`
  font-size: 7rem;
  font-weight: 900;
  color: white;
  margin-bottom: 20px;
  letter-spacing: 8px;
  font-style: italic;
  position: relative;
  animation: ${neonPulse} 2s ease-in-out infinite;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: ${gradientShift} 3s ease infinite;

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
    font-size: 4rem;
  }
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 40px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 40px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
  text-decoration: none;
  border-radius: 50px;
  box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}50;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.primary}70;
  }
`;

export const ExploreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 40px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMain};
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}30;
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

export const FloatingEmoji = styled.div`
  position: absolute;
  font-size: 3rem;
  opacity: 0.3;
  animation: ${float} ${({ $delay }) => 3 + $delay}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay * 0.5}s;

  &:nth-child(1) {
    top: 10%;
    left: 10%;
  }
  &:nth-child(2) {
    top: 20%;
    right: 15%;
  }
  &:nth-child(3) {
    bottom: 30%;
    left: 15%;
  }
  &:nth-child(4) {
    bottom: 20%;
    right: 20%;
  }
  &:nth-child(5) {
    top: 50%;
    left: 50%;
  }
`;

// Section
export const Section = styled.div`
  max-width: 1600px;
  margin: 0 auto 80px;
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
  }
`;

export const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSub};
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    gap: 12px;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1.1rem;
  padding: 40px 0;
`;

// Music Grid
export const MusicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
`;

export const MusicCard = styled.div`
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  position: relative;

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
    transform: translateY(-8px);
    border-color: transparent;
    box-shadow: 0 16px 40px ${({ theme }) => theme.colors.primary}40;

    &::before {
      opacity: 1;
    }
  }
`;

export const MusicCardImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${MusicCard}:hover & {
    transform: scale(1.1);
  }
`;

export const MusicCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MusicCard}:hover & {
    opacity: 1;
  }
`;

export const PlayButtonLarge = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}60;
  animation: ${neonPulse} 2s ease-in-out infinite;

  &:hover {
    transform: scale(1.15);
  }
`;

export const MusicCardInfo = styled.div`
  padding: 16px;
`;

export const MusicCardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MusicCardArtist = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Chart List
export const ChartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ChartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

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
    transform: translateX(8px);
    border-color: transparent;
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}30;

    &::before {
      opacity: 1;
    }
  }
`;

export const ChartRank = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  min-width: 40px;
  text-align: center;
`;

export const ChartAlbumArt = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

export const ChartTrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChartTrackName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChartArtistName = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChartPlayButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}50;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}70;
  }
`;

// Universe Grid
export const UniverseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const UniverseCard = styled(Link)`
  padding: 32px;
  background: ${({ $featured, theme }) =>
    $featured ? theme.colors.gradient : theme.colors.surface};
  border: 2px solid
    ${({ $featured, theme }) =>
      $featured ? "transparent" : theme.colors.border};
  border-radius: 20px;
  text-decoration: none;
  color: ${({ $featured }) => ($featured ? "white" : "inherit")};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ $featured, theme }) =>
    $featured &&
    css`
    box-shadow: 0 8px 32px ${theme.colors.primary}50;
    animation: ${neonPulse} 2s ease-in-out infinite;
  `}

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const UniverseCardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`;

export const UniverseCardContent = styled.div``;

export const UniverseCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 8px;
`;

export const UniverseCardDescription = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

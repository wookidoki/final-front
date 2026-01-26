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
    transform: translateY(-15px) rotate(3deg);
  }
`;

const rainbow = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding-bottom: 60px;
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
      circle at 30% 40%,
      ${({ theme }) => theme.colors.primary}08 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 70%,
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
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  /* 글리치 노이즈 효과 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  /* 그라디언트 페이드 */
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
  text-align: center;
  z-index: 1;
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

export const TabBar = styled.div`
  display: flex;
  gap: 12px;
  padding: 30px 60px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  position: sticky;
  top: 0;
  z-index: 10;
  overflow-x: auto;
  backdrop-filter: blur(10px);

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : "transparent"};
  color: ${({ $active }) => ($active ? "white" : "#a8a29e")};
  border: 2px solid
    ${({ $active, theme }) => ($active ? "transparent" : theme.colors.border)};
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  /* 호버시 레인보우 효과 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}30;
    border-color: ${({ theme }) => theme.colors.primary};

    &::before {
      opacity: ${({ $active }) => ($active ? 0 : 0.2)};
    }
  }
`;

export const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 60px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const FeaturedArticle = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 60px;
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
    transform: translateY(-8px);
    border-color: transparent;
    box-shadow: 0 20px 60px ${({ theme }) => theme.colors.primary}40,
                0 0 40px ${({ theme }) => theme.colors.primary}20;

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;

export const FeaturedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${FeaturedArticle}:hover & {
    transform: scale(1.08);
  }
`;

export const FeaturedContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px 50px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
  color: white;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

export const FeaturedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 800;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}50;
  animation: ${neonPulse} 2s ease-in-out infinite;
  letter-spacing: 1px;
`;

export const FeaturedTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 12px;
  line-height: 1.2;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const FeaturedSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 28px;
  font-weight: 600;
`;

export const ReadButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 24px ${({ theme }) => theme.colors.primary}50;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateX(4px) scale(1.05);
    box-shadow: 0 8px 32px ${({ theme }) => theme.colors.primary}70;

    &::before {
      left: 100%;
    }
  }
`;

export const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const ArticleCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
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
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px) rotate(1deg);
    border-color: transparent;
    box-shadow: 0 16px 48px ${({ theme }) => theme.colors.primary}35,
                0 0 30px ${({ theme }) => theme.colors.primary}20;

    &::before {
      opacity: 1;
    }
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ArticleCard}:hover & {
    transform: scale(1.12);
  }
`;

export const ArticleContent = styled.div`
  padding: 24px;
`;

export const ArticleCategory = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px ${({ theme }) => theme.colors.primary}40;
`;

export const ArticleTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 10px;
  line-height: 1.3;
`;

export const ArticleSubtitle = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 18px;
  line-height: 1.6;
`;

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
`;

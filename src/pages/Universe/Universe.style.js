import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const neonPulse = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
  }
  50% {
    text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding-bottom: 100px;
  position: relative;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 30% 20%, ${({ theme }) => theme.colors.primary}15 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, ${({ theme }) => theme.colors.secondary}15 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 320px;
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
  opacity: 0.85;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
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
  font-size: 4.5rem;
  font-weight: 900;
  color: white;
  margin-bottom: 12px;
  letter-spacing: 6px;
  animation: ${neonPulse} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
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

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 12px 20px;
  gap: 12px;
  min-width: 300px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
  }

  svg {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1.2rem;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textMain};
    font-size: 1rem;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`;

export const SortButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const SortButton = styled.button`
  padding: 12px 24px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.surface};
  border: 2px solid ${({ $active, theme }) =>
    $active ? 'transparent' : theme.colors.border};
  border-radius: 12px;
  color: ${({ $active }) => ($active ? 'white' : 'inherit')};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${({ theme }) => theme.colors.primary}30;
  }
`;

export const UniverseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const UniverseCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
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
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: transparent;
    box-shadow: 0 20px 50px ${({ theme }) => theme.colors.primary}30;

    &::before {
      opacity: 1;
    }
  }
`;

export const CardThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg,
    ${({ theme }) => theme.colors.primary}30,
    ${({ theme }) => theme.colors.secondary}30
  );
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${UniverseCard}:hover & {
    transform: scale(1.1);
  }
`;

export const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

export const LiveBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  background: #ff3b3b;
  border-radius: 8px;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${neonPulse} 1.5s ease-in-out infinite;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
  }
`;

export const CardStats = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 12px;
`;

export const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CardContent = styled.div`
  padding: 20px;
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CreatorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

export const CreatorName = styled.div`
  flex: 1;

  h4 {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 2px;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const BookmarkButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: 48px auto 0;
  padding: 16px 48px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gradient};
    border-color: transparent;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 40px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}50;
  transition: all 0.3s ease;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.primary}70;
  }

  @media (max-width: 768px) {
    bottom: 80px;
    right: 20px;
    width: 56px;
    height: 56px;
  }
`;

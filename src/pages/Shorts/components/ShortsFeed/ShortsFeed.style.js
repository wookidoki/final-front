import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  @media (min-width: 768px) {
    width: 450px;
    height: 95%;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const FeedItem = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background-color: #111;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const BottomInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 24px 20px;
  padding-right: 80px;
  color: white;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ArtistRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
`;

export const ArtistAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors?.gradient || "linear-gradient(135deg, #ff0080, #8b5cf6)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  border: 2px solid white;
`;

export const ArtistName = styled.span`
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
`;

export const FollowButton = styled.button`
  padding: 4px 12px;
  background: transparent;
  border: 1px solid white;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    color: #000;
  }
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

export const Caption = styled.p`
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  color: #ddd;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const MusicRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #ccc;
  margin-top: 6px;
`;

export const MusicIcon = styled.span`
  animation: ${float} 2s ease-in-out infinite;
`;

export const RightActions = styled.div`
  position: absolute;
  bottom: 120px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 20;
  align-items: center;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:active {
    transform: scale(0.9);
  }

  svg {
    font-size: 2rem;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));
  }
`;

export const ActionText = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

export const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 20px;

  svg {
    font-size: 4rem;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const LoadingSpinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

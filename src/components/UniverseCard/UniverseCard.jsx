import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaHeart, FaBookmark, FaUser } from "react-icons/fa";

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.primary}30;
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ $gradient }) => $gradient};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "🌌";
    font-size: 4rem;
    animation: ${float} 3s ease-in-out infinite;
    opacity: 0.6;
  }
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.9rem;
  margin-bottom: 12px;

  svg {
    font-size: 0.8rem;
  }
`;

const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
  min-height: 28px;
`;

const Hashtag = styled.span`
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.9rem;
  font-weight: 600;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.surface};
  border: 2px solid
    ${({ $active, theme }) => ($active ? "transparent" : theme.colors.border)};
  color: ${({ $active }) => ($active ? "white" : "inherit")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 0.9rem;
  }
`;

const UniverseCard = ({ universe, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);
  const [likeCount, setLikeCount] = useState(universe.likeCount);

  // 테마별 그라디언트 매핑
  const themeGradients = {
    THEME_NEON: "linear-gradient(135deg, #ff0080 0%, #7928ca 100%)",
    THEME_PASTEL: "linear-gradient(135deg, #d8b4fe 0%, #bef264 100%)",
    THEME_DARK: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    THEME_RETRO: "linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%)",
    THEME_URBAN: "linear-gradient(135deg, #434343 0%, #000000 100%)",
    THEME_ELEGANT: "linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)",
    THEME_COLORFUL: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    THEME_WARM: "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)",
    THEME_VINTAGE: "linear-gradient(135deg, #c79081 0%, #dfa579 100%)",
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    // TODO: API 호출
  };

  const handleScrap = (e) => {
    e.stopPropagation();
    setIsScrapped(!isScrapped);
    // TODO: API 호출
  };

  return (
    <Card onClick={onClick}>
      <Thumbnail $gradient={themeGradients[universe.themeCode] || themeGradients.THEME_NEON} />
      <Content>
        <Title>{universe.title}</Title>
        <Author>
          <FaUser />
          {universe.nickname}
        </Author>
        <HashtagContainer>
          {universe.hashtag.slice(0, 3).map((tag, index) => (
            <Hashtag key={index}>#{tag}</Hashtag>
          ))}
        </HashtagContainer>
        <Footer>
          <LikeCount>
            <FaHeart />
            {likeCount.toLocaleString()}
          </LikeCount>
          <Actions>
            <ActionButton $active={isLiked} onClick={handleLike} title="좋아요">
              <FaHeart />
            </ActionButton>
            <ActionButton $active={isScrapped} onClick={handleScrap} title="찜하기">
              <FaBookmark />
            </ActionButton>
          </Actions>
        </Footer>
      </Content>
    </Card>
  );
};

export default UniverseCard;

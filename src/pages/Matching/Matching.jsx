import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaHeart,
  FaTimes,
  FaStar,
  FaMusic,
  FaHeadphones,
  FaUserPlus,
  FaComment,
} from "react-icons/fa";

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 450px;
  height: 600px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.5s ease;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 50%;
  background: ${({ $image, theme }) =>
    $image ? `url(${$image})` : theme.colors.gradient};
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.surface}
    );
  }
`;

const OnlineBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: rgba(0, 255, 136, 0.9);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const CardContent = styled.div`
  padding: 32px;
  height: 50%;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  margin-bottom: 24px;
`;

const UserName = styled.h2`
  font-size: 2.2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
`;

const UserAge = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSub};
  font-weight: 600;
`;

const UserBio = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.6;
  margin-bottom: 24px;
`;

const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const GenreTag = styled.span`
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 700;
`;

const MusicStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  padding-top: 20px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const Actions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const ActionButton = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

const PassButton = styled(ActionButton)`
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
`;

const SuperLikeButton = styled(ActionButton)`
  background: linear-gradient(135deg, #4dabf7, #339af0);
`;

const LikeButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.gradient};
`;

const MatchedOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${slideIn} 0.5s ease;
`;

const MatchedCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 32px;
  padding: 60px 40px;
  text-align: center;
  max-width: 500px;
  animation: ${pulse} 0.5s ease;
`;

const MatchedIcon = styled.div`
  font-size: 6rem;
  margin-bottom: 24px;
  animation: ${pulse} 1s ease-in-out infinite;
`;

const MatchedTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
`;

const MatchedText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 40px;
  line-height: 1.6;
`;

const MatchedActions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const MatchedButton = styled.button`
  padding: 16px 32px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.bg};
  color: ${({ $primary, theme }) => ($primary ? "white" : theme.colors.textMain)};
  border: 2px solid ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px
      ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.border)}50;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 40px;
`;

const EmptyIcon = styled.div`
  font-size: 6rem;
  margin-bottom: 24px;
  opacity: 0.5;
`;

const EmptyText = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
`;

const EmptySubtext = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

// 더미 데이터
const dummyUsers = [
  {
    id: 1,
    name: "민지",
    age: 24,
    bio: "음악을 사랑하는 디자이너 🎨 콘서트 가는 걸 제일 좋아해요!",
    genres: ["K-POP", "R&B", "Indie"],
    image: "https://picsum.photos/seed/user1/400/400",
    online: true,
    matchScore: 92,
    playlists: 45,
    followers: 2341,
  },
  {
    id: 2,
    name: "준호",
    age: 26,
    bio: "힙합과 재즈를 사랑하는 프로듀서 🎵 함께 음악 얘기해요",
    genres: ["Hip-Hop", "Jazz", "Lo-fi"],
    image: "https://picsum.photos/seed/user2/400/400",
    online: true,
    matchScore: 88,
    playlists: 67,
    followers: 4523,
  },
  {
    id: 3,
    name: "수현",
    age: 23,
    bio: "락 음악 마니아 🎸 밴드 활동 중이에요!",
    genres: ["Rock", "Metal", "Punk"],
    image: "https://picsum.photos/seed/user3/400/400",
    online: false,
    matchScore: 85,
    playlists: 34,
    followers: 1876,
  },
];

const Matching = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatched, setShowMatched] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  const currentUser = users[currentIndex];

  const handleLike = () => {
    // TODO: 좋아요 로직
    console.log("Liked:", currentUser.name);
    setMatchedUser(currentUser);
    setShowMatched(true);
  };

  const handlePass = () => {
    // TODO: 패스 로직
    console.log("Passed:", currentUser.name);
    nextUser();
  };

  const handleSuperLike = () => {
    // TODO: 슈퍼 좋아요 로직
    console.log("Super liked:", currentUser.name);
    setMatchedUser(currentUser);
    setShowMatched(true);
  };

  const nextUser = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const closeMatched = () => {
    setShowMatched(false);
    setMatchedUser(null);
    nextUser();
  };

  const sendMessage = () => {
    console.log("Send message to:", matchedUser.name);
    // TODO: 메시지 보내기 로직
    closeMatched();
  };

  if (!currentUser) {
    return (
      <Container>
        <Header>
          <Title>음악 친구 매칭</Title>
          <Subtitle>음악 취향이 맞는 친구를 찾아보세요</Subtitle>
        </Header>
        <EmptyState>
          <EmptyIcon>😢</EmptyIcon>
          <EmptyText>더 이상 매칭할 사용자가 없습니다</EmptyText>
          <EmptySubtext>나중에 다시 확인해주세요!</EmptySubtext>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>음악 친구 매칭</Title>
        <Subtitle>음악 취향이 맞는 친구를 찾아보세요</Subtitle>
      </Header>

      <CardContainer>
        <Card>
          <CardImage $image={currentUser.image}>
            {currentUser.online && <OnlineBadge>온라인</OnlineBadge>}
          </CardImage>

          <CardContent>
            <UserInfo>
              <UserName>
                {currentUser.name}, <UserAge>{currentUser.age}</UserAge>
              </UserName>
            </UserInfo>

            <UserBio>{currentUser.bio}</UserBio>

            <GenreTags>
              {currentUser.genres.map((genre, index) => (
                <GenreTag key={index}>#{genre}</GenreTag>
              ))}
            </GenreTags>

            <MusicStats>
              <StatItem>
                <StatValue>{currentUser.matchScore}%</StatValue>
                <StatLabel>매칭률</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{currentUser.playlists}</StatValue>
                <StatLabel>플레이리스트</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{currentUser.followers}</StatValue>
                <StatLabel>팔로워</StatLabel>
              </StatItem>
            </MusicStats>
          </CardContent>
        </Card>
      </CardContainer>

      <Actions>
        <PassButton onClick={handlePass}>
          <FaTimes />
        </PassButton>
        <SuperLikeButton onClick={handleSuperLike}>
          <FaStar />
        </SuperLikeButton>
        <LikeButton onClick={handleLike}>
          <FaHeart />
        </LikeButton>
      </Actions>

      {showMatched && matchedUser && (
        <MatchedOverlay>
          <MatchedCard>
            <MatchedIcon>🎉</MatchedIcon>
            <MatchedTitle>매칭 성공!</MatchedTitle>
            <MatchedText>
              {matchedUser.name}님과 매칭되었습니다!
              <br />
              음악 취향이 {matchedUser.matchScore}% 일치해요
            </MatchedText>
            <MatchedActions>
              <MatchedButton $primary onClick={sendMessage}>
                <FaComment />
                메시지 보내기
              </MatchedButton>
              <MatchedButton onClick={closeMatched}>
                <FaUserPlus />
                계속 매칭하기
              </MatchedButton>
            </MatchedActions>
          </MatchedCard>
        </MatchedOverlay>
      )}
    </Container>
  );
};

export default Matching;

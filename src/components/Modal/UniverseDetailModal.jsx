import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaTimes,
  FaHeart,
  FaBookmark,
  FaShareAlt,
  FaFlag,
  FaUser,
  FaClock,
  FaEye,
} from "react-icons/fa";

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.4s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(90deg);
  }
`;

const Hero = styled.div`
  height: 350px;
  background: ${({ $gradient }) => $gradient};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 22px 22px 0 0;

  &::before {
    content: "🌌";
    font-size: 8rem;
    animation: ${float} 4s ease-in-out infinite;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.95rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  margin-bottom: 24px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
`;

const AuthorInfo = styled.div`
  flex: 1;

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 4px;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const HashtagSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Hashtag = styled.span`
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.colors.primary}40;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}30;
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
`;

const StatItem = styled.div`
  text-align: center;

  .label {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSub};
    margin-bottom: 8px;
  }

  .value {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  flex: 1;
  min-width: 140px;
  padding: 16px 24px;
  background: ${({ $primary, $active, theme }) =>
    $primary
      ? theme.colors.gradient
      : $active
      ? theme.colors.primary + "20"
      : theme.colors.surface};
  border: 2px solid
    ${({ $primary, $active, theme }) =>
      $primary ? "transparent" : $active ? theme.colors.primary : theme.colors.border};
  border-radius: 12px;
  color: ${({ $primary, $active, theme }) =>
    $primary ? "white" : $active ? theme.colors.primary : theme.colors.textMain};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px
      ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.border)}50;
  }

  svg {
    font-size: 1.1rem;
  }
`;

const ReportButton = styled.button`
  padding: 16px 24px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #ff4444;
    color: #ff4444;
    background: rgba(255, 68, 68, 0.1);
  }
`;

const UniverseDetailModal = ({ universe, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);
  const [likeCount, setLikeCount] = useState(universe.likeCount);

  // 테마별 그라디언트
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    // TODO: API 호출
  };

  const handleScrap = () => {
    setIsScrapped(!isScrapped);
    // TODO: API 호출
  };

  const handleShare = () => {
    // TODO: 공유 기능
    if (navigator.share) {
      navigator
        .share({
          title: universe.title,
          text: `${universe.nickname}님의 유니버스를 확인해보세요!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      // 클립보드 복사
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    }
  };

  const handleReport = () => {
    // TODO: 신고 모달 열기
    alert("신고 기능은 준비중입니다.");
  };

  const handleVisit = () => {
    // TODO: 실제 유니버스 페이지로 이동
    console.log("Visit universe:", universe.universeId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>

        <Hero $gradient={themeGradients[universe.themeCode] || themeGradients.THEME_NEON} />

        <Content>
          <Header>
            <Title>{universe.title}</Title>
            <Meta>
              <MetaItem>
                <FaClock />
                {formatDate(universe.createdAt)}
              </MetaItem>
              <MetaItem>
                <FaHeart />
                {likeCount.toLocaleString()} 좋아요
              </MetaItem>
            </Meta>
          </Header>

          <Author>
            <Avatar>{universe.nickname[0]}</Avatar>
            <AuthorInfo>
              <h4>{universe.nickname}</h4>
              <p>유니버스 크리에이터</p>
            </AuthorInfo>
          </Author>

          {universe.hashtag && universe.hashtag.length > 0 && (
            <HashtagSection>
              <SectionTitle>해시태그</SectionTitle>
              <HashtagContainer>
                {universe.hashtag.map((tag, index) => (
                  <Hashtag key={index}>#{tag}</Hashtag>
                ))}
              </HashtagContainer>
            </HashtagSection>
          )}

          <Stats>
            <StatItem>
              <div className="label">좋아요</div>
              <div className="value">{likeCount.toLocaleString()}</div>
            </StatItem>
            <StatItem>
              <div className="label">테마</div>
              <div className="value">{universe.themeCode.replace("THEME_", "")}</div>
            </StatItem>
          </Stats>

          <Actions>
            <ActionButton $primary onClick={handleVisit}>
              <FaEye />
              유니버스 방문하기
            </ActionButton>
            <ActionButton $active={isLiked} onClick={handleLike}>
              <FaHeart />
              {isLiked ? "좋아요 취소" : "좋아요"}
            </ActionButton>
            <ActionButton $active={isScrapped} onClick={handleScrap}>
              <FaBookmark />
              {isScrapped ? "찜 취소" : "찜하기"}
            </ActionButton>
            <ActionButton onClick={handleShare}>
              <FaShareAlt />
              공유
            </ActionButton>
          </Actions>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <ReportButton onClick={handleReport}>
              <FaFlag />
              신고하기
            </ReportButton>
          </div>
        </Content>
      </ModalContainer>
    </Overlay>
  );
};

export default UniverseDetailModal;

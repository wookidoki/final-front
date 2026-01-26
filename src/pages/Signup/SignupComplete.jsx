import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaCheckCircle, FaMusic, FaHeart } from "react-icons/fa";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  opacity: 0.1;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 600px;
  padding: 60px 40px;
  animation: ${fadeIn} 0.8s ease;
`;

const SuccessIcon = styled.div`
  font-size: 8rem;
  margin-bottom: 32px;
  animation: ${pulse} 2s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px ${({ theme }) => theme.colors.primary}50);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.8;
  margin-bottom: 48px;
`;

const FeatureCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
`;

const FeatureCard = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}30;
  }

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 12px;
    animation: ${float} 3s ease-in-out infinite;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSub};
    line-height: 1.5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 18px 40px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.surface};
  color: ${({ $primary, theme }) => ($primary ? "white" : theme.colors.textMain)};
  border: 2px solid ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ $primary, theme }) =>
    $primary ? `0 8px 24px ${theme.colors.primary}50` : "none"};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px
      ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.border)}60;
  }
`;

const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${float} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  opacity: 0.6;
`;

const SignupComplete = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 회원가입을 거치지 않고 직접 접근하면 홈으로 리다이렉트
    const hasCompletedSignup = sessionStorage.getItem("signupCompleted");
    if (!hasCompletedSignup) {
      // 임시로 허용 (개발 중)
      // navigate("/");
    }

    // 페이지 방문 기록
    sessionStorage.setItem("signupCompleted", "true");

    // 5초 후 자동으로 sessionStorage 정리
    const timer = setTimeout(() => {
      sessionStorage.removeItem("signupCompleted");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoToHome = () => {
    sessionStorage.removeItem("signupCompleted");
    navigate("/");
  };

  const handleExplore = () => {
    sessionStorage.removeItem("signupCompleted");
    navigate("/search");
  };

  // 랜덤 confetti 생성
  const confettiColors = ["#ff0080", "#d8b4fe", "#bef264", "#60a5fa", "#fbbf24"];
  const confettiElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 2,
  }));

  return (
    <Container>
      <Background />
      {confettiElements.map((conf) => (
        <Confetti
          key={conf.id}
          $color={conf.color}
          $top={conf.top}
          $left={conf.left}
          $duration={conf.duration}
          $delay={conf.delay}
        />
      ))}
      <Content>
        <SuccessIcon>🎉</SuccessIcon>

        <Title>환영합니다!</Title>

        <Message>
          RE:PLAY 가입이 완료되었습니다.
          <br />
          이제 당신만의 음악 우주를 만들어보세요!
        </Message>

        <FeatureCards>
          <FeatureCard>
            <FaMusic />
            <h3>무제한 스트리밍</h3>
            <p>수백만 곡의 음악을 자유롭게 들어보세요</p>
          </FeatureCard>

          <FeatureCard>
            <FaCheckCircle />
            <h3>나만의 플레이리스트</h3>
            <p>취향에 맞는 플레이리스트를 만들어보세요</p>
          </FeatureCard>

          <FeatureCard>
            <FaHeart />
            <h3>음악 친구 찾기</h3>
            <p>비슷한 취향의 친구들을 만나보세요</p>
          </FeatureCard>
        </FeatureCards>

        <ButtonGroup>
          <Button $primary onClick={handleGoToHome}>
            시작하기
          </Button>
          <Button onClick={handleExplore}>음악 둘러보기</Button>
        </ButtonGroup>
      </Content>
    </Container>
  );
};

export default SignupComplete;

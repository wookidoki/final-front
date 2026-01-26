import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
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

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  background-size: 200% 200%;
  animation: ${gradientShift} 3s ease infinite;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 40px;
`;

const Logo = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -2px;
  margin-bottom: 40px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LogoRE = styled.span`
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
`;

const LogoPLAY = styled.span`
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
`;

const LoaderWrapper = styled.div`
  margin-bottom: 32px;
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 6px solid ${({ theme }) => theme.colors.border};
  border-top: 6px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
`;

const MusicBars = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: flex-end;
  height: 60px;
  margin: 32px 0;
`;

const Bar = styled.div`
  width: 8px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 4px;
  height: ${({ $height }) => $height}%;
  animation: ${bounce} ${({ $delay }) => 0.6 + $delay * 0.1}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay * 0.1}s;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}50;
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
`;

const LoadingSubtext = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const DotsWrapper = styled.span`
  display: inline-block;
  width: 30px;
  text-align: left;
`;

const Dot = styled.span`
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  margin: 24px auto 0;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 3px;
  width: ${({ $progress }) => $progress}%;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}50;
`;

const LoadingPage = ({ text = "로딩중", progress = null }) => {
  const [dots, setDots] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <Logo>
          <LogoRE>RE:</LogoRE>
          <LogoPLAY>PLAY</LogoPLAY>
        </Logo>

        <LoaderWrapper>
          <Spinner />
        </LoaderWrapper>

        <MusicBars>
          {[30, 60, 40, 80, 50, 70, 35].map((height, index) => (
            <Bar key={index} $height={height} $delay={index} />
          ))}
        </MusicBars>

        <LoadingText>
          {text}
          <DotsWrapper>
            <Dot $delay={0}>.</Dot>
            <Dot $delay={0.2}>.</Dot>
            <Dot $delay={0.4}>.</Dot>
          </DotsWrapper>
        </LoadingText>

        <LoadingSubtext>잠시만 기다려주세요</LoadingSubtext>

        {progress !== null && (
          <ProgressBar>
            <ProgressFill $progress={progress} />
          </ProgressBar>
        )}
      </Content>
    </Container>
  );
};

export default LoadingPage;

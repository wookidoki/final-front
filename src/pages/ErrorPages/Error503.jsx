import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaRedo } from "react-icons/fa";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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
  padding: 40px;
`;

const IconWrapper = styled.div`
  font-size: 8rem;
  margin-bottom: 24px;
  animation: ${pulse} 2s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px ${({ theme }) => theme.colors.primary}50);
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  letter-spacing: 8px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const StatusBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 40px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const StatusLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const StatusValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LoadingDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.surface};
  color: ${({ $primary, theme }) => ($primary ? "white" : theme.colors.textMain)};
  border: 2px solid ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px
      ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.border)}50;
  }
`;

const ReloadButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMain};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.border}50;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Error503 = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container>
      <Background />
      <Content>
        <IconWrapper>😵</IconWrapper>
        <ErrorCode>503</ErrorCode>
        <Title>서비스를 이용할 수 없습니다</Title>
        <Description>
          일시적으로 서비스에 접속할 수 없습니다.
          <br />
          서버 점검 또는 과부하 상태입니다.
        </Description>

        <StatusBox>
          <StatusItem>
            <StatusLabel>서버 상태</StatusLabel>
            <StatusValue>
              점검 중
              <LoadingDot $delay={0} />
              <LoadingDot $delay={0.2} />
              <LoadingDot $delay={0.4} />
            </StatusValue>
          </StatusItem>
          <StatusItem>
            <StatusLabel>예상 복구 시간</StatusLabel>
            <StatusValue>약 30분 이내</StatusValue>
          </StatusItem>
        </StatusBox>

        <ButtonGroup>
          <Button to="/" $primary>
            <FaHome />
            홈으로 가기
          </Button>
          <ReloadButton onClick={handleReload}>
            <FaRedo />
            다시 시도
          </ReloadButton>
        </ButtonGroup>
      </Content>
    </Container>
  );
};

export default Error503;

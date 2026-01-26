import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaRedo, FaExclamationTriangle } from "react-icons/fa";

const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-3px, 3px);
  }
  40% {
    transform: translate(-3px, -3px);
  }
  60% {
    transform: translate(3px, 3px);
  }
  80% {
    transform: translate(3px, -3px);
  }
  100% {
    transform: translate(0);
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
  padding: 40px;
`;

const IconWrapper = styled.div`
  font-size: 8rem;
  margin-bottom: 24px;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px ${({ theme }) => theme.colors.primary}50);
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
  letter-spacing: 8px;
  animation: ${glitch} 2s infinite;
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary};
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
  margin-bottom: 40px;
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

const Error500 = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container>
      <Background />
      <Content>
        <IconWrapper>⚠️</IconWrapper>
        <ErrorCode>500</ErrorCode>
        <Title>서버 오류가 발생했습니다</Title>
        <Description>
          죄송합니다. 서버에 문제가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </Description>
        <ButtonGroup>
          <Button to="/" $primary>
            <FaHome />
            홈으로 가기
          </Button>
          <ReloadButton onClick={handleReload}>
            <FaRedo />
            새로고침
          </ReloadButton>
        </ButtonGroup>
      </Content>
    </Container>
  );
};

export default Error500;

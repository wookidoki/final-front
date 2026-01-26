import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaTools } from "react-icons/fa";

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
`;

const spin = keyframes`
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
  animation: ${float} 3s ease-in-out infinite;
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
  margin-bottom: 40px;
`;

const ToolIcon = styled.div`
  display: inline-block;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 20px 0;
  animation: ${spin} 3s linear infinite;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}50;
  }
`;

const Error501 = () => {
  return (
    <Container>
      <Background />
      <Content>
        <IconWrapper>🚧</IconWrapper>
        <ErrorCode>501</ErrorCode>
        <Title>구현되지 않은 기능입니다</Title>
        <Description>
          죄송합니다. 요청하신 기능은 아직 구현되지 않았습니다.
          <br />
          빠른 시일 내에 제공할 예정입니다.
        </Description>
        <ToolIcon>
          <FaTools />
        </ToolIcon>
        <div>
          <Button to="/">
            <FaHome />
            홈으로 가기
          </Button>
        </div>
      </Content>
    </Container>
  );
};

export default Error501;

import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px;
`;

const Spinner = styled.div`
  width: ${({ $size }) => $size || "48px"};
  height: ${({ $size }) => $size || "48px"};
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSub};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = ({ size, text = "로딩 중..." }) => {
  return (
    <Container>
      <Spinner $size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </Container>
  );
};

export default LoadingSpinner;

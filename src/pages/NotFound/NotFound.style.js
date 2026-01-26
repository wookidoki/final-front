import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
`;

const glitch = keyframes`
  0%, 100% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow: hidden;

  /* 노이즈 텍스처 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const Content = styled.div`
  text-align: center;
  z-index: 10;
  position: relative;
  padding: 40px;
`;

export const GlitchText = styled.h1`
  font-size: 10rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  position: relative;
  animation: ${glitch} 1s infinite;

  @media (max-width: 768px) {
    font-size: 6rem;
  }

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    animation: ${glitch} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    color: #00f0ff;
    z-index: -1;
  }

  &::after {
    animation: ${glitch} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both
      infinite;
    color: #ff0080;
    z-index: -2;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
  max-width: 500px;
  margin: 0 auto 40px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const BaseButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const HomeButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}60;
  }
`;

export const SearchButton = styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.textMain};
  border-color: ${({ theme }) => theme.colors.border};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

export const FloatingIcon = styled.div`
  position: absolute;
  font-size: 3rem;
  opacity: 0.15;
  animation: ${float} 3s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.5s;
  }
  &:nth-child(3) {
    animation-delay: 1s;
  }
  &:nth-child(4) {
    animation-delay: 1.5s;
  }
`;

import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    transparent 20%,
    transparent 60%,
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
`;

export const CenterIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.9);
  pointer-events: none;
  z-index: 15;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  animation: ${({ $show }) => ($show ? fadeIn : fadeOut)} 0.3s ease forwards;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

export const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  z-index: 25;
  transition: height 0.2s ease;
  cursor: pointer;

  &:hover {
    height: 10px;
  }
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #fe2c55;
  width: ${({ $percent }) => $percent}%;
  position: relative;
  transition: width 0.1s linear;
`;

export const ProgressThumb = styled.div`
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;

  ${ControlsContainer}:hover & {
    opacity: 1;
  }
`;

export const RangeInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 30;
  margin: 0;
`;

export const TimeDisplay = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  z-index: 20;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

export const MuteButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

import styled, { css } from "styled-components";

// ============================================
// 공통 색상 변수 (CSS Variables로도 export)
// ============================================
export const colors = {
  // 배경
  bg: "#1c1917",
  surface: "#292524",

  // 텍스트
  textMain: "#e7e5e4",
  textSub: "#a8a29e",

  // 포인트 컬러
  primary: "#ff0080",        // RE:PLAY의 PLAY 부분 - 핫핑크
  secondary: "#d8b4fe",      // 파스텔 라벤더
  accent: "#bef264",         // 파스텔 라임
  white: "#ffffff",          // RE:PLAY의 RE 부분 - 순백

  // 테두리
  border: "rgba(231, 229, 228, 0.1)",
  borderLight: "rgba(231, 229, 228, 0.2)",
};

// ============================================
// 공통 타이포그래피
// ============================================
export const typography = {
  h1: css`
    font-size: 2.5rem;
    font-weight: 900;
    line-height: 1.2;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.3;
  `,
  h3: css`
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.4;
  `,
  body: css`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
  `,
  small: css`
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
  `,
};

// ============================================
// 공통 버튼 스타일
// ============================================

// 기본 버튼 스타일
const baseButton = css`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Primary 버튼 (핑크 네온)
export const PrimaryButton = styled.button`
  ${baseButton}
  background: ${colors.primary};
  color: ${colors.white};
  box-shadow: 0 0 20px rgba(255, 0, 128, 0.3);

  &:hover:not(:disabled) {
    background: #ff1a8f;
    box-shadow: 0 0 30px rgba(255, 0, 128, 0.5);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Secondary 버튼 (라벤더)
export const SecondaryButton = styled.button`
  ${baseButton}
  background: ${colors.secondary};
  color: #1c1917;

  &:hover:not(:disabled) {
    background: #e9d5ff;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Outline 버튼
export const OutlineButton = styled.button`
  ${baseButton}
  background: transparent;
  color: ${colors.textMain};
  border: 2px solid ${colors.primary};

  &:hover:not(:disabled) {
    background: rgba(255, 0, 128, 0.1);
    box-shadow: 0 0 20px rgba(255, 0, 128, 0.2);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Ghost 버튼 (텍스트만)
export const GhostButton = styled.button`
  ${baseButton}
  background: transparent;
  color: ${colors.textMain};

  &:hover:not(:disabled) {
    background: rgba(231, 229, 228, 0.1);
    color: ${colors.primary};
  }
`;

// Small 버튼
export const SmallButton = styled(PrimaryButton)`
  padding: 8px 16px;
  font-size: 0.875rem;
`;

// Large 버튼
export const LargeButton = styled(PrimaryButton)`
  padding: 16px 32px;
  font-size: 1.125rem;
`;

// ============================================
// 공통 카드 스타일
// ============================================
export const Card = styled.div`
  background: ${colors.surface};
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.borderLight};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
`;

// 글래스모피즘 카드
export const GlassCard = styled.div`
  background: rgba(41, 37, 36, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.borderLight};
    background: rgba(41, 37, 36, 0.8);
  }
`;

// ============================================
// 공통 Input 스타일
// ============================================
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: ${colors.surface};
  border: 2px solid ${colors.border};
  border-radius: 8px;
  color: ${colors.textMain};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 10px rgba(255, 0, 128, 0.2);
  }

  &::placeholder {
    color: ${colors.textSub};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: ${colors.surface};
  border: 2px solid ${colors.border};
  border-radius: 8px;
  color: ${colors.textMain};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 10px rgba(255, 0, 128, 0.2);
  }

  &::placeholder {
    color: ${colors.textSub};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ============================================
// 공통 Badge/Tag 스타일
// ============================================
export const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 0, 128, 0.1);
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
`;

// ============================================
// 공통 애니메이션
// ============================================
export const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: fadeIn 0.5s ease-out;
`;

export const slideIn = css`
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  animation: slideIn 0.5s ease-out;
`;

export const glow = css`
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(255, 0, 128, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(255, 0, 128, 0.6);
    }
  }
  animation: glow 2s ease-in-out infinite;
`;

// ============================================
// 반응형 브레이크포인트
// ============================================
export const breakpoints = {
  mobile: "576px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1440px",
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (max-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
};

// ============================================
// 🎨 차별화 요소: Y2K / 글리치 / 네온 스타일
// ============================================

// 글리치 애니메이션 (스포티파이/바이브와 차별화)
export const glitch = css`
  position: relative;

  @keyframes glitch {
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
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    color: #00f0ff;
    z-index: -1;
  }

  &::after {
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
    color: #ff0080;
    z-index: -2;
  }
`;

// 네온 텍스트 효과
export const neonText = css`
  text-shadow:
    0 0 7px currentColor,
    0 0 10px currentColor,
    0 0 21px currentColor,
    0 0 42px currentColor,
    0 0 82px currentColor,
    0 0 92px currentColor,
    0 0 102px currentColor,
    0 0 151px currentColor;

  @keyframes neonFlicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
      text-shadow:
        0 0 7px currentColor,
        0 0 10px currentColor,
        0 0 21px currentColor,
        0 0 42px currentColor,
        0 0 82px currentColor,
        0 0 92px currentColor,
        0 0 102px currentColor,
        0 0 151px currentColor;
    }
    20%, 24%, 55% {
      text-shadow: none;
    }
  }

  animation: neonFlicker 5s infinite;
`;

// Y2K 스타일 홀로그램 그라데이션
export const holographic = css`
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #4facfe 75%,
    #00f2fe 100%
  );
  background-size: 200% 200%;

  @keyframes holographicShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  animation: holographicShift 3s ease infinite;
`;

// 크롬/메탈릭 텍스트 효과
export const chromeText = css`
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #c0c0c0 50%,
    #808080 51%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`;

// 레트로 노이즈 텍스처 배경
export const retroNoise = css`
  position: relative;

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

// 네온 박스 (카드에 적용 가능)
export const NeonBox = styled.div`
  position: relative;
  padding: 24px;
  border-radius: 12px;
  background: ${colors.surface};
  border: 2px solid ${({ $color }) => $color || colors.primary};
  box-shadow:
    0 0 10px ${({ $color }) => $color || colors.primary}40,
    inset 0 0 10px ${({ $color }) => $color || colors.primary}20;

  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 0 20px ${({ $color }) => $color || colors.primary}60,
      inset 0 0 20px ${({ $color }) => $color || colors.primary}30;
    transform: translateY(-2px);
  }
`;

// Y2K 스타일 버튼
export const Y2KButton = styled.button`
  ${baseButton}
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 30px ${({ theme }) => theme.colors.primary}40;
  }
`;

// 그라데이션 텍스트
export const GradientText = styled.span`
  background: ${({ theme, $gradient }) => $gradient || theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
`;

// 글리치 이미지 효과
export const glitchImage = css`
  position: relative;

  @keyframes glitchImage {
    0% {
      clip-path: inset(0 0 0 0);
      transform: translate(0);
    }
    20% {
      clip-path: inset(0 0 85% 0);
      transform: translate(-5px, 5px);
    }
    40% {
      clip-path: inset(85% 0 0 0);
      transform: translate(5px, -5px);
    }
    60% {
      clip-path: inset(0 85% 0 0);
      transform: translate(-5px, 0);
    }
    80% {
      clip-path: inset(0 0 0 85%);
      transform: translate(5px, 0);
    }
    100% {
      clip-path: inset(0 0 0 0);
      transform: translate(0);
    }
  }

  &:hover {
    animation: glitchImage 0.5s steps(2, start) infinite;
  }
`;

// ===== 젠지 감성 컬러 테마 세트 =====
// 사용자가 선택할 수 있는 메인 테마 색상들
export const colorThemes = {
  hotpink: {
    name: "Hot Pink",
    primary: "#ff0080",
    secondary: "#d8b4fe",
    accent: "#bef264",
    gradient: "linear-gradient(135deg, #ff0080 0%, #ff6b9d 100%)",
  },
  cyber: {
    name: "Cyber Blue",
    primary: "#00f0ff",
    secondary: "#a78bfa",
    accent: "#fbbf24",
    gradient: "linear-gradient(135deg, #00f0ff 0%, #0ea5e9 100%)",
  },
  sunset: {
    name: "Sunset",
    primary: "#ff6b35",
    secondary: "#f59e0b",
    accent: "#ec4899",
    gradient: "linear-gradient(135deg, #ff6b35 0%, #f59e0b 100%)",
  },
  lavender: {
    name: "Lavender Dream",
    primary: "#d8b4fe",
    secondary: "#c084fc",
    accent: "#60a5fa",
    gradient: "linear-gradient(135deg, #d8b4fe 0%, #c084fc 100%)",
  },
  lime: {
    name: "Neon Lime",
    primary: "#bef264",
    secondary: "#84cc16",
    accent: "#22d3ee",
    gradient: "linear-gradient(135deg, #bef264 0%, #84cc16 100%)",
  },
  mint: {
    name: "Fresh Mint",
    primary: "#5eead4",
    secondary: "#34d399",
    accent: "#a78bfa",
    gradient: "linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%)",
  },
};

// ===== 다크 모드 =====
export const createDarkTheme = (colorTheme = "hotpink", customColors = null) => {
  // 커스텀 색상이 제공되면 사용, 아니면 사전정의된 테마 사용
  const colors = customColors || colorThemes[colorTheme];

  // 커스텀 색상인 경우 그라디언트 생성
  const gradient = customColors
    ? `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)`
    : colors.gradient;

  return {
    mode: "dark",
    themeName: colorTheme,
    colors: {
      // 배경: 웜 다크 톤
      bg: "#1c1917",
      surface: "#292524",
      surfaceHover: "#32302e",

      // 텍스트
      textMain: "#e7e5e4",
      textSub: "#a8a29e",
      textMuted: "#78716c",

      // 테마 색상 적용
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      gradient: gradient,

      // 테두리
      border: "rgba(231, 229, 228, 0.1)",
      borderHover: "rgba(231, 229, 228, 0.2)",

      // 상태 색상
      success: "#22c55e",
      error: "#ef4444",
      warning: "#f59e0b",
    },
    blur: "backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);",
  };
};

// ===== 라이트 모드 =====
export const createLightTheme = (colorTheme = "hotpink", customColors = null) => {
  // 커스텀 색상이 제공되면 사용, 아니면 사전정의된 테마 사용
  const colors = customColors || colorThemes[colorTheme];

  // 커스텀 색상인 경우 그라디언트 생성
  const gradient = customColors
    ? `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)`
    : colors.gradient;

  return {
    mode: "light",
    themeName: colorTheme,
    colors: {
      // 배경: 따뜻한 베이지/크림 톤
      bg: "#fafaf9",
      surface: "#ffffff",
      surfaceHover: "#f5f5f4",

      // 텍스트
      textMain: "#1c1917",
      textSub: "#57534e",
      textMuted: "#a8a29e",

      // 테마 색상 적용 (라이트 모드에선 조금 더 진하게)
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      gradient: gradient,

      // 테두리
      border: "rgba(28, 25, 23, 0.1)",
      borderHover: "rgba(28, 25, 23, 0.2)",

      // 상태 색상
      success: "#16a34a",
      error: "#dc2626",
      warning: "#ea580c",
    },
    blur: "backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);",
  };
};

// 기본 다크 테마 (하위 호환성)
export const darkTheme = createDarkTheme("hotpink");

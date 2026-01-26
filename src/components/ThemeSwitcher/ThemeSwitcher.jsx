import React, { useState } from "react";
import { FaSun, FaMoon, FaPalette, FaPaintBrush, FaTimes, FaCheck } from "react-icons/fa";
import useUiStore from "../../store/useUiStore";
import { colorThemes } from "../../styles/theme";
import * as S from "./ThemeSwitcher.style";

const ThemeSwitcher = () => {
  const { currentMode, currentColorTheme, customColors, toggleMode, setColorTheme, setCustomColors } =
    useUiStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [tempColors, setTempColors] = useState(customColors);

  const handleCustomColorChange = (colorKey, value) => {
    setTempColors((prev) => ({
      ...prev,
      [colorKey]: value,
    }));
  };

  const handleSaveCustomColors = () => {
    setCustomColors(tempColors);
    setShowCustomizer(false);
    setIsOpen(false);
  };

  const handleCancelCustomColors = () => {
    setTempColors(customColors);
    setShowCustomizer(false);
  };

  return (
    <S.Container>
      {/* 다크/라이트 모드 토글 */}
      <S.ModeToggle onClick={toggleMode} title="테마 모드 전환">
        {currentMode === "dark" ? <FaMoon /> : <FaSun />}
      </S.ModeToggle>

      {/* 색상 테마 선택 버튼 */}
      <S.ColorButton
        onClick={() => setIsOpen(!isOpen)}
        title="색상 테마 선택"
      >
        <FaPalette />
      </S.ColorButton>

      {/* 색상 테마 팔레트 */}
      {isOpen && (
        <S.ColorPalette>
          <S.PaletteTitle>색상 테마</S.PaletteTitle>
          <S.ColorGrid>
            {Object.entries(colorThemes).map(([key, theme]) => (
              <S.ColorOption
                key={key}
                onClick={() => {
                  setColorTheme(key);
                  setIsOpen(false);
                }}
                $active={currentColorTheme === key}
                $color={theme.primary}
                title={theme.name}
              >
                <S.ColorPreview $gradient={theme.gradient} />
                <S.ColorName>{theme.name}</S.ColorName>
              </S.ColorOption>
            ))}

            {/* 커스텀 색상 옵션 */}
            <S.ColorOption
              onClick={() => setShowCustomizer(true)}
              $active={currentColorTheme === "custom"}
              $color={customColors.primary}
              title="커스텀 색상"
            >
              <S.ColorPreview
                $gradient={`linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 100%)`}
              >
                <FaPaintBrush />
              </S.ColorPreview>
              <S.ColorName>Custom</S.ColorName>
            </S.ColorOption>
          </S.ColorGrid>
        </S.ColorPalette>
      )}

      {/* 커스텀 색상 커스터마이저 모달 */}
      {showCustomizer && (
        <S.CustomizerModal>
          <S.ModalOverlay onClick={handleCancelCustomColors} />
          <S.ModalContent>
            <S.ModalHeader>
              <S.ModalTitle>
                <FaPaintBrush /> 커스텀 색상 설정
              </S.ModalTitle>
              <S.CloseButton onClick={handleCancelCustomColors}>
                <FaTimes />
              </S.CloseButton>
            </S.ModalHeader>

            <S.ColorInputGroup>
              <S.ColorInputLabel>
                <S.ColorLabelText>Primary Color</S.ColorLabelText>
                <S.ColorInputWrapper>
                  <S.ColorInput
                    type="color"
                    value={tempColors.primary}
                    onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                  />
                  <S.ColorHexInput
                    type="text"
                    value={tempColors.primary}
                    onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                    placeholder="#ff0080"
                  />
                </S.ColorInputWrapper>
              </S.ColorInputLabel>

              <S.ColorInputLabel>
                <S.ColorLabelText>Secondary Color</S.ColorLabelText>
                <S.ColorInputWrapper>
                  <S.ColorInput
                    type="color"
                    value={tempColors.secondary}
                    onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                  />
                  <S.ColorHexInput
                    type="text"
                    value={tempColors.secondary}
                    onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                    placeholder="#d8b4fe"
                  />
                </S.ColorInputWrapper>
              </S.ColorInputLabel>

              <S.ColorInputLabel>
                <S.ColorLabelText>Accent Color</S.ColorLabelText>
                <S.ColorInputWrapper>
                  <S.ColorInput
                    type="color"
                    value={tempColors.accent}
                    onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                  />
                  <S.ColorHexInput
                    type="text"
                    value={tempColors.accent}
                    onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                    placeholder="#bef264"
                  />
                </S.ColorInputWrapper>
              </S.ColorInputLabel>
            </S.ColorInputGroup>

            <S.PreviewSection>
              <S.PreviewTitle>미리보기</S.PreviewTitle>
              <S.PreviewGradient
                $gradient={`linear-gradient(135deg, ${tempColors.primary} 0%, ${tempColors.secondary} 100%)`}
              />
            </S.PreviewSection>

            <S.ModalActions>
              <S.CancelButton onClick={handleCancelCustomColors}>
                취소
              </S.CancelButton>
              <S.SaveButton onClick={handleSaveCustomColors}>
                <FaCheck /> 적용
              </S.SaveButton>
            </S.ModalActions>
          </S.ModalContent>
        </S.CustomizerModal>
      )}
    </S.Container>
  );
};

export default ThemeSwitcher;

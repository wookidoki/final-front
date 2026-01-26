import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
`;

export const ModeToggle = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const ColorButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const ColorPalette = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 320px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const PaletteTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const ColorOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : "transparent"};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary + "10" : "transparent"};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ $color }) => $color};
    transform: translateY(-2px);
  }
`;

export const ColorPreview = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${({ $gradient }) => $gradient};
  box-shadow: 0 4px 12px ${({ $gradient }) => $gradient}40;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;

  ${ColorOption}:hover & {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${({ $gradient }) => $gradient}60;
  }
`;

export const ColorName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
`;

// 커스터마이저 모달
export const CustomizerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
`;

export const ModalContent = styled.div`
  position: relative;
  z-index: 10;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalSlideUp 0.3s ease;

  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(90deg);
  }
`;

export const ColorInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
`;

export const ColorInputLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ColorLabelText = styled.label`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ColorInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ColorInput = styled.input`
  width: 80px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
  }
`;

export const ColorHexInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  font-weight: 600;
  font-family: "Courier New", monospace;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const PreviewSection = styled.div`
  margin-bottom: 28px;
`;

export const PreviewTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PreviewGradient = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 16px;
  background: ${({ $gradient }) => $gradient};
  box-shadow: 0 8px 24px ${({ $gradient }) => $gradient}40;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.textSub};
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

export const SaveButton = styled.button`
  padding: 12px 28px;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.primary}60;
  }
`;

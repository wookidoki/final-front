import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px currentColor; }
  50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding: 40px 60px 100px;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px 20px 100px;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;
`;

export const UploadContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const UploadSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  padding: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DropZone = styled.div`
  width: 100%;
  aspect-ratio: 9 / 16;
  max-height: 500px;
  border: 3px dashed ${({ theme, $hasFile }) =>
    $hasFile ? theme.colors.primary : theme.colors.border};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ theme, $hasFile }) =>
    $hasFile ? `${theme.colors.primary}10` : 'transparent'};
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }

  input {
    display: none;
  }
`;

export const DropIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.primary};
  animation: ${float} 3s ease-in-out infinite;
`;

export const DropText = styled.p`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

export const PreviewVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

export const ThumbnailPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CharCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: right;
`;

export const ThumbnailSection = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const ThumbnailOption = styled.div`
  width: 100px;
  height: 150px;
  border: 2px solid ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.05);
  }

  ${({ $selected, theme }) => $selected && `
    box-shadow: 0 0 20px ${theme.colors.primary}50;
  `}
`;

export const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CustomThumbnail = styled.div`
  width: 100px;
  height: 150px;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.textSub};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 1.5rem;
  }

  span {
    font-size: 0.7rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textSub};
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

export const SubmitButton = styled.button`
  flex: 2;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}50;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
  margin-top: 16px;
`;

export const Progress = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  width: ${({ $progress }) => $progress}%;
  transition: width 0.3s ease;
`;

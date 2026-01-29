import React, { useState } from "react";
import {
  FaTimes,
  FaPalette,
  FaImage,
  FaGlobe,
  FaLock,
  FaCheck,
  FaUpload,
} from "react-icons/fa";
import useUniverseStore from "../../store/useUniverseStore";
import * as S from "./UniverseSettingsPanel.style";

const UniverseSettingsPanel = ({ isOpen, onClose }) => {
  const {
    universe,
    setTitle,
    setDescription,
    setIsPublic,
    setBackgroundPreset,
    setBackgroundColor,
    backgroundPresets,
  } = useUniverseStore();

  const [activeTab, setActiveTab] = useState("info");
  const [customColor, setCustomColor] = useState("#1a1a2e");

  if (!isOpen) return null;

  const handleColorChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    setBackgroundColor(color);
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Panel onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>유니버스 설정</S.Title>
          <S.CloseButton onClick={onClose}>
            <FaTimes />
          </S.CloseButton>
        </S.Header>

        <S.Tabs>
          <S.Tab $active={activeTab === "info"} onClick={() => setActiveTab("info")}>
            정보
          </S.Tab>
          <S.Tab $active={activeTab === "background"} onClick={() => setActiveTab("background")}>
            배경
          </S.Tab>
          <S.Tab $active={activeTab === "publish"} onClick={() => setActiveTab("publish")}>
            공개설정
          </S.Tab>
        </S.Tabs>

        <S.Content>
          {activeTab === "info" && (
            <S.Section>
              <S.Label>유니버스 이름</S.Label>
              <S.Input
                type="text"
                value={universe.title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="나만의 유니버스 이름을 지어주세요"
                maxLength={50}
              />
              <S.CharCount>{universe.title.length}/50</S.CharCount>

              <S.Label>설명</S.Label>
              <S.TextArea
                value={universe.description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="유니버스에 대해 설명해주세요"
                maxLength={200}
                rows={4}
              />
              <S.CharCount>{universe.description.length}/200</S.CharCount>
            </S.Section>
          )}

          {activeTab === "background" && (
            <S.Section>
              <S.Label>배경 프리셋</S.Label>
              <S.PresetGrid>
                {backgroundPresets.map((preset) => (
                  <S.PresetItem
                    key={preset.id}
                    $background={preset.gradient}
                    $selected={universe.background.presetId === preset.id}
                    onClick={() => setBackgroundPreset(preset.id)}
                  >
                    {universe.background.presetId === preset.id && (
                      <S.SelectedCheck>
                        <FaCheck />
                      </S.SelectedCheck>
                    )}
                    <S.PresetName>{preset.name}</S.PresetName>
                  </S.PresetItem>
                ))}
              </S.PresetGrid>

              <S.Divider />

              <S.Label>
                <FaPalette /> 커스텀 색상
              </S.Label>
              <S.ColorPickerWrapper>
                <S.ColorInput
                  type="color"
                  value={customColor}
                  onChange={handleColorChange}
                />
                <S.ColorPreview $color={customColor}>
                  {customColor}
                </S.ColorPreview>
              </S.ColorPickerWrapper>

              <S.Divider />

              <S.Label>
                <FaImage /> 배경 이미지
              </S.Label>
              <S.UploadButton>
                <FaUpload />
                <span>이미지 업로드</span>
              </S.UploadButton>
              <S.HelpText>권장: 1920x1080px, 최대 5MB</S.HelpText>
            </S.Section>
          )}

          {activeTab === "publish" && (
            <S.Section>
              <S.Label>공개 설정</S.Label>

              <S.OptionCard
                $selected={universe.isPublic}
                onClick={() => setIsPublic(true)}
              >
                <S.OptionIcon>
                  <FaGlobe />
                </S.OptionIcon>
                <S.OptionContent>
                  <S.OptionTitle>전체 공개</S.OptionTitle>
                  <S.OptionDescription>
                    모든 사람이 내 유니버스를 볼 수 있어요
                  </S.OptionDescription>
                </S.OptionContent>
                {universe.isPublic && (
                  <S.SelectedBadge>
                    <FaCheck />
                  </S.SelectedBadge>
                )}
              </S.OptionCard>

              <S.OptionCard
                $selected={!universe.isPublic}
                onClick={() => setIsPublic(false)}
              >
                <S.OptionIcon>
                  <FaLock />
                </S.OptionIcon>
                <S.OptionContent>
                  <S.OptionTitle>비공개</S.OptionTitle>
                  <S.OptionDescription>
                    나만 볼 수 있어요
                  </S.OptionDescription>
                </S.OptionContent>
                {!universe.isPublic && (
                  <S.SelectedBadge>
                    <FaCheck />
                  </S.SelectedBadge>
                )}
              </S.OptionCard>

              <S.InfoBox>
                <strong>Tip!</strong> 유니버스를 공개하면 다른 사람들이
                좋아요와 북마크를 할 수 있어요.
              </S.InfoBox>
            </S.Section>
          )}
        </S.Content>

        <S.Footer>
          <S.SaveButton onClick={onClose}>
            <FaCheck /> 설정 완료
          </S.SaveButton>
        </S.Footer>
      </S.Panel>
    </S.Overlay>
  );
};

export default UniverseSettingsPanel;

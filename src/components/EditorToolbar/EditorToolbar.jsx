import React from "react";
import {
  FaMousePointer,
  FaFont,
  FaImage,
  FaMusic,
  FaVideo,
  FaStickyNote,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaSearchPlus,
  FaSearchMinus,
  FaSave,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import * as S from "./EditorToolbar.style";

const EditorToolbar = ({ currentTool, onToolChange, onAddWidget, onSave }) => {
  const tools = [
    { id: "select", icon: <FaMousePointer />, label: "선택 (V)" },
    { id: "text", icon: <FaFont />, label: "텍스트 (T)" },
    { id: "image", icon: <FaImage />, label: "이미지 (I)" },
    { id: "playlist", icon: <FaMusic />, label: "플레이리스트 (M)" },
    { id: "sticker", icon: <FaStickyNote />, label: "스티커 (S)" },
    { id: "video", icon: <FaVideo />, label: "동영상 (V)" },
  ];

  const handleToolClick = (toolId) => {
    onToolChange(toolId);
    // 선택 도구가 아닌 경우 위젯 추가
    if (toolId !== "select") {
      onAddWidget(toolId.toUpperCase());
      // 위젯 추가 후 다시 선택 도구로
      setTimeout(() => onToolChange("select"), 100);
    }
  };

  return (
    <S.Container>
      <S.Section>
        <S.Logo>RE:PLAY EDITOR</S.Logo>
      </S.Section>

      <S.Section>
        <S.ToolGroup>
          {tools.map((tool) => (
            <S.ToolButton
              key={tool.id}
              $active={currentTool === tool.id}
              onClick={() => handleToolClick(tool.id)}
              title={tool.label}
            >
              {tool.icon}
            </S.ToolButton>
          ))}
        </S.ToolGroup>

        <S.Divider />

        <S.ToolGroup>
          <S.ToolButton title="왼쪽 정렬">
            <FaAlignLeft />
          </S.ToolButton>
          <S.ToolButton title="가운데 정렬">
            <FaAlignCenter />
          </S.ToolButton>
          <S.ToolButton title="오른쪽 정렬">
            <FaAlignRight />
          </S.ToolButton>
        </S.ToolGroup>

        <S.Divider />

        <S.ToolGroup>
          <S.ToolButton title="실행 취소">
            <FaUndo />
          </S.ToolButton>
          <S.ToolButton title="다시 실행">
            <FaRedo />
          </S.ToolButton>
        </S.ToolGroup>
      </S.Section>

      <S.Section>
        <S.ToolGroup>
          <S.ZoomDisplay>100%</S.ZoomDisplay>
          <S.ToolButton title="축소">
            <FaSearchMinus />
          </S.ToolButton>
          <S.ToolButton title="확대">
            <FaSearchPlus />
          </S.ToolButton>
        </S.ToolGroup>

        <S.SaveButton onClick={onSave}>
          <FaSave />
          <span>저장</span>
        </S.SaveButton>
      </S.Section>
    </S.Container>
  );
};

export default EditorToolbar;

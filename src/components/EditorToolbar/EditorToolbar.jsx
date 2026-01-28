import React from "react";
import {
  FaMousePointer,
  FaFont,
  FaImage,
  FaMusic,
  FaVideo,
  FaStickyNote,
  FaUndo,
  FaRedo,
  FaSearchPlus,
  FaSearchMinus,
  FaTh,
} from "react-icons/fa";
import * as S from "./EditorToolbar.style";

const EditorToolbar = ({
  currentTool,
  onToolChange,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  showGrid,
}) => {
  const tools = [
    { id: "select", icon: <FaMousePointer />, label: "선택 (V)" },
    { id: "text", icon: <FaFont />, label: "텍스트 (T)" },
    { id: "image", icon: <FaImage />, label: "이미지 (I)" },
    { id: "playlist", icon: <FaMusic />, label: "음악 (M)" },
    { id: "sticker", icon: <FaStickyNote />, label: "스티커 (S)" },
    { id: "video", icon: <FaVideo />, label: "동영상 (V)" },
  ];

  return (
    <S.Container>
      <S.ToolGroup>
        {tools.map((tool) => (
          <S.ToolButton
            key={tool.id}
            $active={currentTool === tool.id}
            onClick={() => onToolChange(tool.id)}
            title={tool.label}
          >
            {tool.icon}
          </S.ToolButton>
        ))}
      </S.ToolGroup>

      <S.Divider />

      <S.ToolGroup>
        <S.ToolButton onClick={onUndo} title="실행 취소 (Ctrl+Z)">
          <FaUndo />
        </S.ToolButton>
        <S.ToolButton onClick={onRedo} title="다시 실행 (Ctrl+Y)">
          <FaRedo />
        </S.ToolButton>
      </S.ToolGroup>

      <S.Divider />

      <S.ToolGroup>
        <S.ToolButton onClick={onZoomOut} title="축소">
          <FaSearchMinus />
        </S.ToolButton>
        <S.ToolButton onClick={onZoomIn} title="확대">
          <FaSearchPlus />
        </S.ToolButton>
        <S.ToolButton
          $active={showGrid}
          onClick={onToggleGrid}
          title="그리드 표시"
        >
          <FaTh />
        </S.ToolButton>
      </S.ToolGroup>
    </S.Container>
  );
};

export default EditorToolbar;

import React from "react";
import {
  FaFont,
  FaImage,
  FaStickyNote,
  FaMusic,
  FaVideo,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import * as S from "./LayerPanel.style";

const LayerPanel = ({ widgets, selectedWidget, onSelectWidget, onToggleVisibility, onToggleLock }) => {
  const getWidgetIcon = (type) => {
    switch (type) {
      case "TEXT":
        return <FaFont />;
      case "IMAGE":
        return <FaImage />;
      case "PLAYLIST":
        return <FaMusic />;
      case "VIDEO":
        return <FaVideo />;
      case "STICKER":
        return <FaStickyNote />;
      default:
        return <FaStickyNote />;
    }
  };

  const getWidgetName = (widget) => {
    if (widget.data?.text) return widget.data.text.substring(0, 20);
    if (widget.data?.title) return widget.data.title;
    return `${widget.type} ${widget.id}`;
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>레이어</S.Title>
        <S.LayerCount>{widgets.length}</S.LayerCount>
      </S.Header>

      <S.LayerList>
        {widgets.length === 0 ? (
          <S.EmptyState>
            <S.EmptyIcon>📦</S.EmptyIcon>
            <S.EmptyText>위젯을 추가해보세요</S.EmptyText>
          </S.EmptyState>
        ) : (
          widgets.map((widget) => (
            <S.LayerItem
              key={widget.id}
              $isSelected={selectedWidget?.id === widget.id}
              $isHidden={widget.data?.hidden}
              onClick={() => onSelectWidget(widget)}
            >
              <S.LayerIcon $isHidden={widget.data?.hidden}>
                {getWidgetIcon(widget.type)}
              </S.LayerIcon>

              <S.LayerName $isHidden={widget.data?.hidden}>
                {getWidgetName(widget)}
              </S.LayerName>

              <S.LayerActions>
                <S.ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLock(widget.id);
                  }}
                  title={widget.data?.locked ? "잠금 해제" : "잠금"}
                >
                  {widget.data?.locked ? <FaLock /> : <FaUnlock />}
                </S.ActionButton>

                <S.ActionButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility(widget.id);
                  }}
                  title={widget.data?.hidden ? "보이기" : "숨기기"}
                >
                  {widget.data?.hidden ? <FaEyeSlash /> : <FaEye />}
                </S.ActionButton>
              </S.LayerActions>
            </S.LayerItem>
          ))
        )}
      </S.LayerList>
    </S.Container>
  );
};

export default LayerPanel;

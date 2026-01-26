import React from "react";
import { Rnd } from "react-rnd";
import { FaMusic, FaPlay, FaPause } from "react-icons/fa";
import useUiStore from "../../store/useUiStore";

// 분리한 스타일 가져오기
import * as S from "./DragItem.style";

const DraggableItem = ({ widget, isSelected, onSelect }) => {
  const { updateWidget } = useUiStore();

  const renderWidgetContent = () => {
    const opacity = widget.data?.opacity || 1;
    const rotation = widget.data?.rotation || 0;

    switch (widget.type) {
      case "TEXT":
        return (
          <S.TextWidget
            $fontSize={widget.data?.fontSize || 16}
            $color={widget.data?.color || "#ffffff"}
            style={{ opacity, transform: `rotate(${rotation}deg)` }}
          >
            {widget.data?.text || "텍스트를 입력하세요"}
          </S.TextWidget>
        );

      case "IMAGE":
        return (
          <S.ImageWidget
            src={widget.data?.url || "https://via.placeholder.com/200"}
            alt="widget"
            style={{ opacity, transform: `rotate(${rotation}deg)` }}
          />
        );

      case "STICKER":
        return (
          <S.StickerWidget
            style={{ opacity, transform: `rotate(${rotation}deg)` }}
          >
            {widget.data?.icon || "💖"}
          </S.StickerWidget>
        );

      case "PLAYLIST":
        return (
          <S.PlaylistWidget style={{ opacity, transform: `rotate(${rotation}deg)` }}>
            <S.PlaylistHeader>
              <FaMusic />
              <S.PlaylistTitle>
                {widget.data?.title || "플레이리스트"}
              </S.PlaylistTitle>
            </S.PlaylistHeader>
            <S.PlaylistArtist>
              {widget.data?.artist || "아티스트"}
            </S.PlaylistArtist>
            <S.PlayButton>
              <FaPlay />
            </S.PlayButton>
          </S.PlaylistWidget>
        );

      case "VIDEO":
        return (
          <S.VideoWidget style={{ opacity, transform: `rotate(${rotation}deg)` }}>
            <S.VideoPlaceholder>VIDEO</S.VideoPlaceholder>
          </S.VideoWidget>
        );

      default:
        return null;
    }
  };

  return (
    <Rnd
      size={{ width: widget.width, height: widget.height }}
      position={{ x: widget.x, y: widget.y }}
      onDragStop={(e, d) => {
        updateWidget(widget.id, { x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWidget(widget.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...position,
        });
      }}
      bounds="parent"
      style={{ zIndex: isSelected ? 1000 : 10 }}
    >
      <S.ItemContainer
        $isSelected={isSelected}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {renderWidgetContent()}
      </S.ItemContainer>
    </Rnd>
  );
};

export default DraggableItem;

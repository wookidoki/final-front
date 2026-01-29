import React from "react";
import { Rnd } from "react-rnd";
import { FaMusic, FaPlay, FaLink, FaUser } from "react-icons/fa";
import useUniverseStore from "../../store/useUniverseStore";
import * as S from "./DragItem.style";

const DraggableItem = ({ widget, isSelected, isPreviewMode, onSelect }) => {
  const { updateWidget, saveToHistory } = useUniverseStore();

  const handleDragStop = (e, d) => {
    if (!isPreviewMode && !widget.data?.locked) {
      updateWidget(widget.id, { x: d.x, y: d.y });
      saveToHistory();
    }
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    if (!isPreviewMode && !widget.data?.locked) {
      updateWidget(widget.id, {
        width: parseInt(ref.style.width),
        height: parseInt(ref.style.height),
        ...position,
      });
      saveToHistory();
    }
  };

  const renderWidgetContent = () => {
    const opacity = widget.data?.opacity ?? 1;
    const rotation = widget.data?.rotation || 0;
    const baseStyle = { opacity, transform: `rotate(${rotation}deg)` };

    switch (widget.type) {
      case "TEXT":
        return (
          <S.TextWidget
            $fontSize={widget.data?.fontSize || 24}
            $fontWeight={widget.data?.fontWeight || "bold"}
            $color={widget.data?.color || "#ffffff"}
            $textAlign={widget.data?.textAlign || "left"}
            style={baseStyle}
          >
            {widget.data?.text || "텍스트를 입력하세요"}
          </S.TextWidget>
        );

      case "IMAGE":
        return (
          <S.ImageWidget
            $borderRadius={widget.data?.borderRadius || 12}
            style={baseStyle}
          >
            {widget.data?.url ? (
              <img
                src={widget.data.url}
                alt={widget.data?.alt || ""}
                style={{ objectFit: widget.data?.objectFit || "cover" }}
              />
            ) : (
              <S.ImagePlaceholder>
                <span>이미지 URL을 입력하세요</span>
              </S.ImagePlaceholder>
            )}
          </S.ImageWidget>
        );

      case "STICKER":
        return (
          <S.StickerWidget style={baseStyle}>
            {widget.data?.icon || "✨"}
          </S.StickerWidget>
        );

      case "PLAYLIST":
        return (
          <S.PlaylistWidget style={baseStyle}>
            <S.PlaylistCover>
              {widget.data?.coverUrl ? (
                <img src={widget.data.coverUrl} alt="" />
              ) : (
                <FaMusic />
              )}
            </S.PlaylistCover>
            <S.PlaylistInfo>
              <S.PlaylistTitle>
                {widget.data?.title || "플레이리스트"}
              </S.PlaylistTitle>
              <S.PlaylistArtist>
                {widget.data?.artist || "아티스트"}
              </S.PlaylistArtist>
            </S.PlaylistInfo>
            <S.PlayButton>
              <FaPlay />
            </S.PlayButton>
          </S.PlaylistWidget>
        );

      case "VIDEO":
        return (
          <S.VideoWidget style={baseStyle}>
            {widget.data?.url ? (
              <video
                src={widget.data.url}
                autoPlay={widget.data?.autoplay}
                loop={widget.data?.loop}
                muted={widget.data?.muted}
              />
            ) : (
              <S.VideoPlaceholder>
                <span>VIDEO</span>
              </S.VideoPlaceholder>
            )}
          </S.VideoWidget>
        );

      case "LINK":
        return (
          <S.LinkWidget style={baseStyle}>
            <S.LinkIcon>
              <FaLink />
            </S.LinkIcon>
            <S.LinkContent>
              <S.LinkTitle>{widget.data?.title || "링크"}</S.LinkTitle>
              <S.LinkUrl>{widget.data?.url || "URL을 입력하세요"}</S.LinkUrl>
            </S.LinkContent>
          </S.LinkWidget>
        );

      case "PROFILE":
        return (
          <S.ProfileWidget style={baseStyle}>
            <S.ProfileAvatar>
              {widget.data?.avatarUrl ? (
                <img src={widget.data.avatarUrl} alt="" />
              ) : (
                <FaUser />
              )}
            </S.ProfileAvatar>
            <S.ProfileName>{widget.data?.name || "이름"}</S.ProfileName>
            <S.ProfileBio>{widget.data?.bio || "소개글"}</S.ProfileBio>
          </S.ProfileWidget>
        );

      default:
        return null;
    }
  };

  // 미리보기 모드에서는 드래그 비활성화
  if (isPreviewMode) {
    return (
      <S.PreviewContainer
        style={{
          position: "absolute",
          left: widget.x,
          top: widget.y,
          width: widget.width,
          height: widget.height,
          zIndex: widget.zIndex || 10,
        }}
      >
        {renderWidgetContent()}
      </S.PreviewContainer>
    );
  }

  return (
    <Rnd
      size={{ width: widget.width, height: widget.height }}
      position={{ x: widget.x, y: widget.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      bounds="parent"
      disableDragging={widget.data?.locked}
      enableResizing={!widget.data?.locked}
      style={{ zIndex: isSelected ? 1000 : widget.zIndex || 10 }}
    >
      <S.ItemContainer
        $isSelected={isSelected}
        $isLocked={widget.data?.locked}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {renderWidgetContent()}
        {widget.data?.locked && (
          <S.LockedBadge>🔒</S.LockedBadge>
        )}
      </S.ItemContainer>
    </Rnd>
  );
};

export default DraggableItem;

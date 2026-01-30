import React from "react";
import { Rnd } from "react-rnd";
import { FaMusic, FaPlay, FaLink, FaUser } from "react-icons/fa";
import useUniverseStore from "../../store/useUniverseStore";
import * as S from "./DragItem.style";

// 도형 렌더러
const ShapeRenderer = ({ shapeType, fillColor, strokeColor, strokeWidth, glow, glowColor }) => {
  const style = {
    width: "100%",
    height: "100%",
    filter: glow ? `drop-shadow(0 0 10px ${glowColor || fillColor})` : "none",
  };

  switch (shapeType) {
    case "circle":
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <circle cx="50" cy="50" r="45" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <rect x="5" y="5" width="90" height="90" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
    case "rounded":
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <rect x="5" y="5" width="90" height="90" rx="15" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <polygon points="50,5 95,95 5,95" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <path d="M50,88 C20,60 5,40 5,25 C5,10 20,5 35,5 C45,5 50,15 50,15 C50,15 55,5 65,5 C80,5 95,10 95,25 C95,40 80,60 50,88Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
    case "hexagon":
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <polygon points="50,5 93,27 93,73 50,95 7,73 7,27" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <polygon points="50,5 95,50 50,95 5,50" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" style={style}>
          <circle cx="50" cy="50" r="45" fill={fillColor} />
        </svg>
      );
  }
};

const DraggableItem = ({ widget, isSelected, isPreviewMode, onSelect, onUpdate, onUpdateData }) => {
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
    const baseStyle = { opacity, transform: `rotate(${rotation}deg)`, width: "100%", height: "100%" };

    switch (widget.type) {
      case "TEXT":
        return (
          <S.TextWidget
            $fontSize={widget.data?.fontSize || 24}
            $fontWeight={widget.data?.fontWeight || "bold"}
            $color={widget.data?.color || "#ffffff"}
            $textAlign={widget.data?.textAlign || "center"}
            $bgColor={widget.data?.backgroundColor || "transparent"}
            $padding={widget.data?.padding || 12}
            style={baseStyle}
          >
            {widget.data?.text || "텍스트를 입력하세요"}
          </S.TextWidget>
        );

      case "IMAGE":
        return (
          <S.ImageWidget
            $borderRadius={widget.data?.borderRadius || 12}
            $shadow={widget.data?.shadow}
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
                <span>🖼️ 이미지 URL 입력</span>
              </S.ImagePlaceholder>
            )}
          </S.ImageWidget>
        );

      case "STICKER":
        return (
          <S.StickerWidget $animation={widget.data?.animation} style={baseStyle}>
            {widget.data?.icon || "✨"}
          </S.StickerWidget>
        );

      case "SHAPE":
        return (
          <S.ShapeWidget style={baseStyle}>
            <ShapeRenderer
              shapeType={widget.data?.shapeType || "circle"}
              fillColor={widget.data?.fillColor || "#ff0080"}
              strokeColor={widget.data?.strokeColor || "transparent"}
              strokeWidth={widget.data?.strokeWidth || 0}
              glow={widget.data?.glow}
              glowColor={widget.data?.glowColor}
            />
          </S.ShapeWidget>
        );

      case "MUSIC":
        return (
          <S.MusicWidget style={baseStyle}>
            <S.MusicCover $style={widget.data?.style}>
              {widget.data?.coverUrl ? (
                <img src={widget.data.coverUrl} alt="" />
              ) : (
                <FaMusic />
              )}
            </S.MusicCover>
            <S.MusicInfo>
              <S.MusicTitle>{widget.data?.title || "노래 제목"}</S.MusicTitle>
              <S.MusicArtist>{widget.data?.artist || "아티스트"}</S.MusicArtist>
            </S.MusicInfo>
            {widget.data?.showPlayButton !== false && (
              <S.MusicPlayBtn><FaPlay /></S.MusicPlayBtn>
            )}
          </S.MusicWidget>
        );

      case "PLAYLIST":
        return (
          <S.PlaylistWidget $style={widget.data?.style} style={baseStyle}>
            <S.PlaylistCover $style={widget.data?.style}>
              {widget.data?.coverUrl ? (
                <img src={widget.data.coverUrl} alt="" />
              ) : (
                <FaMusic />
              )}
            </S.PlaylistCover>
            <S.PlaylistInfo>
              <S.PlaylistTitle>{widget.data?.title || "플레이리스트"}</S.PlaylistTitle>
              <S.PlaylistMeta>
                {widget.data?.creator && <span>{widget.data.creator}</span>}
                {widget.data?.showTrackCount !== false && widget.data?.trackCount && (
                  <span>{widget.data.trackCount}곡</span>
                )}
              </S.PlaylistMeta>
            </S.PlaylistInfo>
            <S.PlayButton><FaPlay /></S.PlayButton>
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
                <span>🎬 VIDEO</span>
              </S.VideoPlaceholder>
            )}
          </S.VideoWidget>
        );

      case "LINK":
        return (
          <S.LinkWidget style={baseStyle}>
            <S.LinkIcon><FaLink /></S.LinkIcon>
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
        return <div style={{ ...baseStyle, background: "#333", borderRadius: 8 }} />;
    }
  };

  // 미리보기 모드
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
        {widget.data?.locked && <S.LockedBadge>🔒</S.LockedBadge>}
      </S.ItemContainer>
    </Rnd>
  );
};

export default DraggableItem;

import React, { useRef, useState } from "react";
import { FaPlay, FaHeart } from "react-icons/fa";
import * as S from "./ShortCard.style";

/**
 * 숏폼 카드 컴포넌트 (그리드 뷰용)
 * @param {object} short - 숏폼 데이터
 * @param {function} onClick - 클릭 콜백
 */
const ShortCard = ({ short, onClick }) => {
  const videoRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && short.videoUrl) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const formatCount = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <S.Card
      onClick={() => onClick?.(short)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <S.Thumbnail
        src={short.thumbnailUrl || "/default-thumbnail.jpg"}
        alt={short.shortFormTitle}
      />

      {short.videoUrl && (
        <S.VideoPreview
          ref={videoRef}
          src={short.videoUrl}
          muted
          loop
          playsInline
          style={{ opacity: isHovering ? 1 : 0 }}
        />
      )}

      <S.GradientOverlay />

      <S.PlayIcon>
        <FaPlay />
      </S.PlayIcon>

      <S.Info>
        <S.Title>{short.shortFormTitle}</S.Title>
        <S.Meta>
          <S.Author>@{short.nickName || "User"}</S.Author>
          <S.Stats>
            <FaHeart />
            <span>{formatCount(short.likeCount || short.like)}</span>
          </S.Stats>
        </S.Meta>
      </S.Info>
    </S.Card>
  );
};

export default ShortCard;

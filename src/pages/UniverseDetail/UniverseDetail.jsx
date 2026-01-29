import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaFlag,
  FaPlay,
  FaMusic,
  FaUser,
  FaLink,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import * as S from "./UniverseDetail.style";

// 더미 유니버스 데이터 (실제로는 API에서 불러옴)
const universeDetailData = {
  id: 1,
  title: "Midnight Vibes Universe",
  description: "새벽 감성 가득한 나만의 공간. 힙한 음악과 함께해요 🌙",
  creator: {
    id: 1,
    name: "NightOwl_DJ",
    avatar: "N",
    followers: 1250,
  },
  likes: 2340,
  views: 12500,
  bookmarks: 890,
  isPublic: true,
  createdAt: "2024.01.15",
  background: {
    type: "preset",
    value: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b4e 100%)",
  },
  widgets: [
    {
      id: "w1",
      type: "TEXT",
      x: 80,
      y: 60,
      width: 400,
      height: 80,
      zIndex: 1,
      data: {
        text: "Welcome to my Universe ✨",
        fontSize: 32,
        fontWeight: "bold",
        color: "#ffffff",
        opacity: 1,
      },
    },
    {
      id: "w2",
      type: "IMAGE",
      x: 80,
      y: 160,
      width: 350,
      height: 250,
      zIndex: 2,
      data: {
        url: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=300&fit=crop",
        borderRadius: 16,
        opacity: 1,
      },
    },
    {
      id: "w3",
      type: "PLAYLIST",
      x: 500,
      y: 180,
      width: 280,
      height: 100,
      zIndex: 3,
      data: {
        title: "Midnight City",
        artist: "M83",
        coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
        opacity: 1,
      },
    },
    {
      id: "w4",
      type: "STICKER",
      x: 600,
      y: 80,
      width: 70,
      height: 70,
      zIndex: 4,
      data: {
        icon: "🌙",
        opacity: 1,
      },
    },
    {
      id: "w5",
      type: "TEXT",
      x: 100,
      y: 450,
      width: 320,
      height: 60,
      zIndex: 5,
      data: {
        text: "새벽 감성 가득한 공간 🌃\n힙한 음악과 함께해요",
        fontSize: 16,
        color: "#cccccc",
        opacity: 0.9,
      },
    },
    {
      id: "w6",
      type: "IMAGE",
      x: 480,
      y: 320,
      width: 280,
      height: 180,
      zIndex: 6,
      data: {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=200&fit=crop",
        borderRadius: 12,
        opacity: 1,
      },
    },
    {
      id: "w7",
      type: "STICKER",
      x: 420,
      y: 120,
      width: 50,
      height: 50,
      zIndex: 7,
      data: {
        icon: "✨",
        opacity: 1,
      },
    },
  ],
};

const UniverseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(universeDetailData.likes);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 실제로는 id로 API에서 데이터 불러오기
  useEffect(() => {
    // TODO: API 연동
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: universeDetailData.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    }
  };

  const handleReport = () => {
    if (confirm("이 유니버스를 신고하시겠습니까?")) {
      alert("신고가 접수되었습니다.");
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 배경 스타일
  const getBackgroundStyle = () => {
    const { background } = universeDetailData;
    if (background.type === "image") {
      return {
        backgroundImage: `url(${background.value})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {
      background: background.value,
    };
  };

  // 도형 SVG 렌더러
  const renderShapeSVG = (shapeType, fillColor, strokeColor, strokeWidth, glow, glowColor) => {
    const style = {
      width: "100%",
      height: "100%",
      filter: glow ? `drop-shadow(0 0 10px ${glowColor || fillColor})` : "none",
    };

    switch (shapeType) {
      case "circle":
        return <svg viewBox="0 0 100 100" style={style}><circle cx="50" cy="50" r="45" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} /></svg>;
      case "square":
        return <svg viewBox="0 0 100 100" style={style}><rect x="5" y="5" width="90" height="90" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} /></svg>;
      case "rounded":
        return <svg viewBox="0 0 100 100" style={style}><rect x="5" y="5" width="90" height="90" rx="15" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} /></svg>;
      case "triangle":
        return <svg viewBox="0 0 100 100" style={style}><polygon points="50,5 95,95 5,95" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} /></svg>;
      case "star":
        return <svg viewBox="0 0 100 100" style={style}><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} /></svg>;
      case "heart":
        return <svg viewBox="0 0 100 100" style={style}><path d="M50,88 C20,60 5,40 5,25 C5,10 20,5 35,5 C45,5 50,15 50,15 C50,15 55,5 65,5 C80,5 95,10 95,25 C95,40 80,60 50,88Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} /></svg>;
      case "hexagon":
        return <svg viewBox="0 0 100 100" style={style}><polygon points="50,5 93,27 93,73 50,95 7,73 7,27" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} /></svg>;
      case "diamond":
        return <svg viewBox="0 0 100 100" style={style}><polygon points="50,5 95,50 50,95 5,50" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} /></svg>;
      default:
        return <svg viewBox="0 0 100 100" style={style}><circle cx="50" cy="50" r="45" fill={fillColor} /></svg>;
    }
  };

  // 위젯 렌더링
  const renderWidget = (widget) => {
    const style = {
      position: "absolute",
      left: widget.x,
      top: widget.y,
      width: widget.width,
      height: widget.height,
      zIndex: widget.zIndex || 1,
      opacity: widget.data?.opacity ?? 1,
      transform: widget.data?.rotation ? `rotate(${widget.data.rotation}deg)` : undefined,
    };

    switch (widget.type) {
      case "TEXT":
        return (
          <S.TextWidget
            key={widget.id}
            style={style}
            $fontSize={widget.data?.fontSize || 16}
            $fontWeight={widget.data?.fontWeight || "normal"}
            $color={widget.data?.color || "#ffffff"}
          >
            {widget.data?.text}
          </S.TextWidget>
        );

      case "IMAGE":
        return (
          <S.ImageWidget
            key={widget.id}
            style={style}
            $borderRadius={widget.data?.borderRadius || 12}
          >
            {widget.data?.url && <img src={widget.data.url} alt={widget.data?.alt || ""} />}
          </S.ImageWidget>
        );

      case "STICKER":
        return (
          <S.StickerWidget key={widget.id} style={style} $animation={widget.data?.animation}>
            {widget.data?.icon}
          </S.StickerWidget>
        );

      case "SHAPE":
        return (
          <S.ShapeWidget key={widget.id} style={style}>
            {renderShapeSVG(
              widget.data?.shapeType || "circle",
              widget.data?.fillColor || "#ff0080",
              widget.data?.strokeColor || "transparent",
              widget.data?.strokeWidth || 0,
              widget.data?.glow,
              widget.data?.glowColor
            )}
          </S.ShapeWidget>
        );

      case "MUSIC":
        return (
          <S.MusicWidget key={widget.id} style={style}>
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
          <S.PlaylistWidget key={widget.id} style={style}>
            <S.PlaylistCover>
              {widget.data?.coverUrl ? (
                <img src={widget.data.coverUrl} alt="" />
              ) : (
                <FaMusic />
              )}
            </S.PlaylistCover>
            <S.PlaylistInfo>
              <h4>{widget.data?.title || "플레이리스트"}</h4>
              <span>
                {widget.data?.creator || ""}
                {widget.data?.showTrackCount !== false && widget.data?.trackCount && ` · ${widget.data.trackCount}곡`}
              </span>
            </S.PlaylistInfo>
            <S.PlayButton>
              <FaPlay />
            </S.PlayButton>
          </S.PlaylistWidget>
        );

      case "VIDEO":
        return (
          <S.VideoWidget key={widget.id} style={style}>
            {widget.data?.url ? (
              <video
                src={widget.data.url}
                autoPlay={widget.data?.autoplay}
                loop={widget.data?.loop}
                muted={widget.data?.muted}
              />
            ) : (
              <S.VideoPlaceholder>VIDEO</S.VideoPlaceholder>
            )}
          </S.VideoWidget>
        );

      case "LINK":
        return (
          <S.LinkWidget key={widget.id} style={style}>
            <FaLink />
            <span>{widget.data?.title || "링크"}</span>
          </S.LinkWidget>
        );

      case "PROFILE":
        return (
          <S.ProfileWidget key={widget.id} style={style}>
            <S.ProfileAvatar>
              {widget.data?.avatarUrl ? (
                <img src={widget.data.avatarUrl} alt="" />
              ) : (
                <FaUser />
              )}
            </S.ProfileAvatar>
            <S.ProfileName>{widget.data?.name || "이름"}</S.ProfileName>
          </S.ProfileWidget>
        );

      default:
        return null;
    }
  };

  return (
    <S.Container $isFullscreen={isFullscreen}>
      {/* 상단 네비게이션 */}
      {!isFullscreen && (
        <S.TopNav>
          <S.BackButton onClick={handleBack}>
            <FaArrowLeft />
          </S.BackButton>
          <S.NavActions>
            <S.NavButton onClick={toggleFullscreen}>
              <FaExpand />
            </S.NavButton>
            <S.NavButton onClick={handleReport}>
              <FaFlag />
            </S.NavButton>
          </S.NavActions>
        </S.TopNav>
      )}

      {/* 유니버스 캔버스 */}
      <S.UniverseCanvas
        $isFullscreen={isFullscreen}
        style={getBackgroundStyle()}
      >
        {/* 그리드 배경 (약하게) */}
        <S.GridOverlay />

        {/* 위젯들 렌더링 */}
        {universeDetailData.widgets.map((widget) => renderWidget(widget))}

        {/* 전체화면 종료 버튼 */}
        {isFullscreen && (
          <S.ExitFullscreenButton onClick={toggleFullscreen}>
            <FaCompress />
          </S.ExitFullscreenButton>
        )}
      </S.UniverseCanvas>

      {/* 하단 정보 패널 */}
      {!isFullscreen && (
        <S.InfoPanel>
          <S.CreatorSection>
            <S.CreatorAvatar>
              {universeDetailData.creator.avatar}
            </S.CreatorAvatar>
            <S.CreatorInfo>
              <h2>{universeDetailData.title}</h2>
              <p>
                by <strong>{universeDetailData.creator.name}</strong> · {universeDetailData.createdAt}
              </p>
              {universeDetailData.description && (
                <S.Description>{universeDetailData.description}</S.Description>
              )}
            </S.CreatorInfo>
          </S.CreatorSection>

          <S.StatsSection>
            <S.StatItem>
              <span>{likeCount.toLocaleString()}</span>
              <p>좋아요</p>
            </S.StatItem>
            <S.StatItem>
              <span>{universeDetailData.views.toLocaleString()}</span>
              <p>조회수</p>
            </S.StatItem>
            <S.StatItem>
              <span>{universeDetailData.bookmarks.toLocaleString()}</span>
              <p>찜</p>
            </S.StatItem>
          </S.StatsSection>

          <S.ActionSection>
            <S.ActionButton $active={isLiked} onClick={handleLike}>
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              좋아요
            </S.ActionButton>
            <S.ActionButton $active={isBookmarked} onClick={handleBookmark}>
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
              찜하기
            </S.ActionButton>
            <S.ActionButton onClick={handleShare}>
              <FaShare />
              공유
            </S.ActionButton>
          </S.ActionSection>
        </S.InfoPanel>
      )}
    </S.Container>
  );
};

export default UniverseDetail;

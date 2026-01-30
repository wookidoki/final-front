import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaMusic,
  FaVideo,
} from "react-icons/fa";
import VideoPlayer from "../VideoPlayer";
import CommentPanel from "../CommentPanel";
import * as S from "./ShortsFeed.style";

/**
 * 숏폼 피드 컴포넌트 (틱톡 스타일 전체화면 스크롤)
 */
const ShortsFeed = ({ shorts, loading, lastElementRef, onLike, isLiked }) => {
  const [commentTarget, setCommentTarget] = useState(null);
  // 댓글 수 로컬 관리 (API에서 commentCount가 올 수도 있고 없을 수도 있음)
  const [commentCounts, setCommentCounts] = useState({});

  const formatCount = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const getCommentCount = (short) => {
    if (commentCounts[short.shortFormId] !== undefined) {
      return commentCounts[short.shortFormId];
    }
    return short.commentCount || 0;
  };

  const handleOpenComments = (shortFormId) => {
    setCommentTarget(shortFormId);
  };

  const handleCloseComments = () => {
    setCommentTarget(null);
  };

  const handleCommentCountChange = (shortFormId) => (updater) => {
    setCommentCounts((prev) => ({
      ...prev,
      [shortFormId]:
        typeof updater === "function"
          ? updater(prev[shortFormId] ?? 0)
          : updater,
    }));
  };

  const handleShare = (short) => {
    const url = `${window.location.origin}/shorts?id=${short.shortFormId}`;
    if (navigator.share) {
      navigator.share({ title: short.shortFormTitle, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다!");
    }
  };

  if (shorts.length === 0 && !loading) {
    return (
      <S.Container>
        <S.EmptyState>
          <FaVideo />
          <p>등록된 숏폼이 없습니다</p>
        </S.EmptyState>
      </S.Container>
    );
  }

  return (
    <S.Container>
      {shorts.map((short, index) => {
        const isLast = index === shorts.length - 1;
        const liked = isLiked(short.shortFormId);

        return (
          <S.FeedItem
            key={short.shortFormId}
            ref={isLast ? lastElementRef : null}
          >
            <S.VideoWrapper>
              <VideoPlayer
                src={short.videoUrl}
                poster={short.thumbnailUrl}
                autoPlay={index === 0}
                showControls={true}
                showMuteButton={true}
                showTimeDisplay={false}
              />
            </S.VideoWrapper>

            {/* 하단 정보 */}
            <S.BottomInfo>
              <S.ArtistRow>
                <S.ArtistAvatar>
                  {(short.nickName || "U")[0].toUpperCase()}
                </S.ArtistAvatar>
                <S.ArtistName>@{short.nickName || "User"}</S.ArtistName>
                <S.FollowButton>팔로우</S.FollowButton>
              </S.ArtistRow>
              <S.Title>{short.shortFormTitle}</S.Title>
              {short.caption && <S.Caption>{short.caption}</S.Caption>}
              <S.MusicRow>
                <S.MusicIcon>
                  <FaMusic />
                </S.MusicIcon>
                <span>Original Sound</span>
              </S.MusicRow>
            </S.BottomInfo>

            {/* 우측 액션 버튼 */}
            <S.RightActions>
              <S.ActionButton onClick={() => onLike(short.shortFormId)}>
                {liked ? <FaHeart color="#fe2c55" /> : <FaRegHeart />}
                <S.ActionText>
                  {formatCount(short.likeCount || short.like)}
                </S.ActionText>
              </S.ActionButton>

              <S.ActionButton onClick={() => handleOpenComments(short.shortFormId)}>
                <FaComment />
                <S.ActionText>
                  {formatCount(getCommentCount(short))}
                </S.ActionText>
              </S.ActionButton>

              <S.ActionButton onClick={() => handleShare(short)}>
                <FaShare />
                <S.ActionText>공유</S.ActionText>
              </S.ActionButton>
            </S.RightActions>

            {/* 댓글 패널 */}
            {commentTarget === short.shortFormId && (
              <CommentPanel
                shortFormId={short.shortFormId}
                onClose={handleCloseComments}
                onCommentCountChange={handleCommentCountChange(short.shortFormId)}
              />
            )}
          </S.FeedItem>
        );
      })}

      {loading && <S.LoadingSpinner />}
    </S.Container>
  );
};

export default ShortsFeed;

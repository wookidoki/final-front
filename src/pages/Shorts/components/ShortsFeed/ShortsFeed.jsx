import React from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaMusic,
  FaVideo,
} from "react-icons/fa";
import VideoPlayer from "../VideoPlayer";
import * as S from "./ShortsFeed.style";

/**
 * 숏폼 피드 컴포넌트 (틱톡 스타일 전체화면 스크롤)
 * @param {array} shorts - 숏폼 목록
 * @param {boolean} loading - 로딩 상태
 * @param {function} lastElementRef - 마지막 요소 ref (무한 스크롤)
 * @param {function} onLike - 좋아요 콜백
 * @param {function} isLiked - 좋아요 상태 확인 함수
 */
const ShortsFeed = ({ shorts, loading, lastElementRef, onLike, isLiked }) => {
  const formatCount = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
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

              <S.ActionButton>
                <FaComment />
                <S.ActionText>
                  {formatCount(short.commentCount || 0)}
                </S.ActionText>
              </S.ActionButton>

              <S.ActionButton>
                <FaShare />
                <S.ActionText>공유</S.ActionText>
              </S.ActionButton>
            </S.RightActions>
          </S.FeedItem>
        );
      })}

      {loading && <S.LoadingSpinner />}
    </S.Container>
  );
};

export default ShortsFeed;

import React, { useState } from "react";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaTimes,
  FaMusic,
} from "react-icons/fa";
import * as S from "./Shorts.style";
import useModalStore from "../../store/useModalStore";

// 임시 데이터
const shortsData = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=700&fit=crop",
    title: "NewJeans - Super Shy 안무 커버 🐰",
    artist: "NewJeans",
    creator: "댄서민지",
    views: "1.2M",
    likes: 85000,
    comments: 1200,
    music: "Super Shy - NewJeans",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=700&fit=crop",
    title: "aespa - Spicy Dance",
    artist: "aespa",
    views: "980K",
    likes: 72000,
    comments: 980,
    music: "Spicy - aespa",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=700&fit=crop",
    title: "IVE - I AM Cover",
    artist: "IVE",
    views: "1.5M",
    likes: 95000,
    comments: 1450,
    music: "I AM - IVE",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=700&fit=crop",
    title: "LE SSERAFIM - UNFORGIVEN",
    artist: "LE SSERAFIM",
    views: "2.1M",
    likes: 120000,
    comments: 2100,
    music: "UNFORGIVEN - LE SSERAFIM",
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=700&fit=crop",
    title: "SEVENTEEN - HOT Dance",
    artist: "SEVENTEEN",
    views: "1.8M",
    likes: 105000,
    comments: 1680,
    music: "HOT - SEVENTEEN",
  },
  {
    id: 6,
    thumbnail:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=700&fit=crop",
    title: "Stray Kids - S-Class",
    artist: "Stray Kids",
    views: "2.3M",
    likes: 135000,
    comments: 2400,
    music: "S-Class - Stray Kids",
  },
  {
    id: 7,
    thumbnail:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=700&fit=crop",
    title: "(G)I-DLE - Queencard",
    artist: "(G)I-DLE",
    views: "1.6M",
    likes: 98000,
    comments: 1520,
    music: "Queencard - (G)I-DLE",
  },
  {
    id: 8,
    thumbnail:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=700&fit=crop",
    title: "ENHYPEN - Bite Me",
    artist: "ENHYPEN",
    views: "1.4M",
    likes: 88000,
    comments: 1350,
    music: "Bite Me - ENHYPEN",
  },
];

const Shorts = () => {
  const [likedVideos, setLikedVideos] = useState(new Set());
  const { openModal } = useModalStore();

  const handleLike = (id) => {
    setLikedVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleOpenDetail = (short) => {
    openModal("shortsDetail", { short });
  };

  return (
    <S.Container>
      {/* 헤더 */}
      <S.Header>
        <S.HeaderGradient />
        <S.HeaderContent>
          <S.HeaderIcon>📱</S.HeaderIcon>
          <S.Title data-text="SHORTS">SHORTS</S.Title>
          <S.Subtitle>짧고 강렬한 뮤직 비디오</S.Subtitle>
        </S.HeaderContent>
      </S.Header>

      {/* 그리드 뷰 */}
      <S.Content>
        <S.ShortsGrid>
          {shortsData.map((short) => {
            const isLiked = likedVideos.has(short.id);
            return (
              <S.ShortCard key={short.id} onClick={() => handleOpenDetail(short)}>
                <S.ShortThumbnail>
                  <S.ThumbnailImage src={short.thumbnail} alt={short.title} />
                  <S.PlayOverlay>
                    <S.PlayIcon>
                      <FaPlay />
                    </S.PlayIcon>
                  </S.PlayOverlay>
                  <S.ViewCount>{short.views} views</S.ViewCount>
                </S.ShortThumbnail>
                <S.ShortInfo>
                  <S.ShortTitle>{short.title}</S.ShortTitle>
                  <S.ShortArtist>{short.artist}</S.ShortArtist>
                  <S.ShortStats>
                    <S.StatItem>
                      <FaHeart /> {(short.likes / 1000).toFixed(1)}K
                    </S.StatItem>
                    <S.StatItem>
                      <FaComment /> {short.comments}
                    </S.StatItem>
                  </S.ShortStats>
                </S.ShortInfo>
              </S.ShortCard>
            );
          })}
        </S.ShortsGrid>
      </S.Content>

      {/* 상세 보기 모달 */}
      {selectedShort && (
        <S.DetailModal>
          <S.ModalOverlay onClick={handleCloseDetail} />
          <S.ModalContent>
            <S.CloseButton onClick={handleCloseDetail}>
              <FaTimes />
            </S.CloseButton>

            <S.VideoSection>
              <S.VideoContainer>
                <S.VideoPlaceholder src={selectedShort.thumbnail} alt={selectedShort.title} />
                <S.VideoPlayButton>
                  <FaPlay />
                </S.VideoPlayButton>
              </S.VideoContainer>

              <S.VideoInfo>
                <S.VideoTitle>{selectedShort.title}</S.VideoTitle>
                <S.VideoArtist>{selectedShort.artist}</S.VideoArtist>
                <S.MusicTag>
                  <FaMusic /> {selectedShort.music}
                </S.MusicTag>
              </S.VideoInfo>
            </S.VideoSection>

            <S.ActionSection>
              <S.ActionButton
                $active={likedVideos.has(selectedShort.id)}
                onClick={() => handleLike(selectedShort.id)}
              >
                {likedVideos.has(selectedShort.id) ? <FaHeart /> : <FaRegHeart />}
                <S.ActionLabel>{(selectedShort.likes / 1000).toFixed(1)}K</S.ActionLabel>
              </S.ActionButton>

              <S.ActionButton>
                <FaComment />
                <S.ActionLabel>{selectedShort.comments}</S.ActionLabel>
              </S.ActionButton>

              <S.ActionButton>
                <FaShare />
                <S.ActionLabel>Share</S.ActionLabel>
              </S.ActionButton>
            </S.ActionSection>
          </S.ModalContent>
        </S.DetailModal>
      )}
    </S.Container>
  );
};

export default Shorts;

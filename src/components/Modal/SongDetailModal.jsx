import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaRegHeart,
  FaPlus,
  FaShare,
  FaMusic,
  FaClock,
  FaCalendar,
} from "react-icons/fa";
import BaseModal from "./BaseModal";
import usePlayerStore from "../../store/usePlayerStore";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const HeroSection = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AlbumArtContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const AlbumArt = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  border: 3px solid ${({ theme }) => theme.colors.border};
  animation: ${({ $isPlaying }) => ($isPlaying ? spin : "none")} 20s linear infinite;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  ${AlbumArtContainer}:hover & {
    opacity: 1;
  }
`;

const PlayButton = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 24px ${({ theme }) => theme.colors.primary}60;

  &:hover {
    transform: scale(1.1);
  }
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const ArtistName = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSub};
  font-weight: 600;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const TrackMeta = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.9rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.bg};
  color: ${({ $primary }) => ($primary ? "white" : "inherit")};
  border: 2px solid ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px
      ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.border)}50;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Section = styled.div`
  padding-top: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LyricsList = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  max-height: 300px;
  overflow-y: auto;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSub};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const RelatedTracks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RelatedTrackItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}30;
  }
`;

const RelatedAlbumArt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
`;

const RelatedTrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const RelatedTrackName = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RelatedArtistName = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SongDetailModal = ({ track, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isTrackPlaying = isCurrentTrack && isPlaying;

  const handlePlayClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  // 더미 가사 데이터
  const lyrics = `어쩌면 우리 모두 다
같은 꿈을 꾸고 있었나봐
밤하늘 가득 찬 별빛처럼
반짝이는 순간들

Every moment feels like magic
하루 끝에 만나는 멜로디
마음을 담은 리듬 위로
춤추는 나의 감정들

We're all dancing in the moonlight
손을 잡고 함께 노래해
이 순간이 영원하길
RE:PLAY 우리의 시간`;

  // 더미 연관 곡 데이터
  const relatedTracks = [
    {
      id: 101,
      name: "Neon Dreams",
      artist: "Digital Youth",
      albumArt: "https://picsum.photos/seed/related1/300/300",
    },
    {
      id: 102,
      name: "Cyber Love",
      artist: "Tech Hearts",
      albumArt: "https://picsum.photos/seed/related2/300/300",
    },
    {
      id: 103,
      name: "Virtual Paradise",
      artist: "Pixel Beats",
      albumArt: "https://picsum.photos/seed/related3/300/300",
    },
  ];

  return (
    <BaseModal onClose={onClose} maxWidth="700px" hideHeader>
      <Container>
        <HeroSection>
          <AlbumArtContainer>
            <AlbumArt src={track.albumArt} alt={track.name} $isPlaying={isTrackPlaying} />
            <PlayOverlay onClick={handlePlayClick}>
              <PlayButton>{isTrackPlaying ? <FaPause /> : <FaPlay />}</PlayButton>
            </PlayOverlay>
          </AlbumArtContainer>

          <TrackInfo>
            <TrackTitle>{track.name}</TrackTitle>
            <ArtistName>{track.artist}</ArtistName>

            <TrackMeta>
              <MetaItem>
                <FaMusic />
                <span>{track.genre || "Pop"}</span>
              </MetaItem>
              <MetaItem>
                <FaClock />
                <span>{track.duration || "3:24"}</span>
              </MetaItem>
              <MetaItem>
                <FaCalendar />
                <span>{track.releaseDate || "2024"}</span>
              </MetaItem>
            </TrackMeta>

            <ActionButtons>
              <ActionButton $primary onClick={handlePlayClick}>
                {isTrackPlaying ? <FaPause /> : <FaPlay />}
                {isTrackPlaying ? "일시정지" : "재생"}
              </ActionButton>
              <ActionButton onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? <FaHeart /> : <FaRegHeart />}
                {isLiked ? "좋아요 취소" : "좋아요"}
              </ActionButton>
              <ActionButton>
                <FaPlus />
                재생목록
              </ActionButton>
              <ActionButton>
                <FaShare />
                공유
              </ActionButton>
            </ActionButtons>
          </TrackInfo>
        </HeroSection>

        <Section>
          <SectionTitle>
            <FaMusic />
            가사
          </SectionTitle>
          <LyricsList>{lyrics}</LyricsList>
        </Section>

        <Section>
          <SectionTitle>
            <FaMusic />
            비슷한 곡
          </SectionTitle>
          <RelatedTracks>
            {relatedTracks.map((relatedTrack) => (
              <RelatedTrackItem key={relatedTrack.id}>
                <RelatedAlbumArt src={relatedTrack.albumArt} alt={relatedTrack.name} />
                <RelatedTrackInfo>
                  <RelatedTrackName>{relatedTrack.name}</RelatedTrackName>
                  <RelatedArtistName>{relatedTrack.artist}</RelatedArtistName>
                </RelatedTrackInfo>
                <ActionButton onClick={() => playTrack(relatedTrack)}>
                  <FaPlay />
                </ActionButton>
              </RelatedTrackItem>
            ))}
          </RelatedTracks>
        </Section>
      </Container>
    </BaseModal>
  );
};

export default SongDetailModal;

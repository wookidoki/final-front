import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaMicrophone,
} from "react-icons/fa";
import BaseModal from "./BaseModal";
import usePlayerStore from "../../store/usePlayerStore";
import { searchApi } from "../../services/api/searchApi";

// --- 스타일 컴포넌트 정의 (에러 해결 핵심) ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const HeroSection = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImageContainer = styled.div`
  flex-shrink: 0;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border: 4px solid ${({ theme }) => theme.colors.primary};
`;

const ArtistInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ArtistName = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 12px;
`;

const ArtistStats = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSub};
    text-transform: uppercase;
  }

  .value {
    font-size: 1.1rem;
    font-weight: 700;
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
  padding: 10px 20px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.gradient : theme.colors.bg};
  color: ${({ $primary }) => ($primary ? "white" : "inherit")};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
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

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

const TrackThumb = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 6px;
`;

const TrackName = styled.span`
  flex: 1;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.textSub};
  font-weight: 600;
`;

// --- 컴포넌트 로직 ---
const ArtistDetailModal = ({ artist, onClose }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playTrack } = usePlayerStore();

  useEffect(() => {
    const fetchArtistData = async () => {
      setLoading(true);
      try {
        // 응답 구조에 맞게 데이터를 가져옵니다.
        const data = await searchApi.getArtistDetail(artist.id);
        setDetails(data);
      } catch (error) {
        console.error("아티스트 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    if (artist?.id) fetchArtistData();
  }, [artist?.id]);

  if (loading) {
    return (
      <BaseModal onClose={onClose} maxWidth="700px" hideHeader>
        <LoadingWrapper>정보를 불러오는 중입니다...</LoadingWrapper>
      </BaseModal>
    );
  }

  // JSON 응답 필드 매핑
  const artistData = details || {};
  const topSongs = artistData.topSongs || [];

  return (
    <BaseModal onClose={onClose} maxWidth="700px" hideHeader>
      <Container>
        <HeroSection>
          <div>
            <ProfileImage 
              src={artistData.singerImgUrl || "https://via.placeholder.com/200"} 
              alt={artistData.apiSingerName} 
            />
          </div>

          <div style={{ flex: 1 }}>
            <ArtistName>{artistData.apiSingerName}</ArtistName>
            
            <ArtistStats>
              <StatItem>
                <span className="label">장르</span>
                <span className="value">{artistData.singerGenre || "장르 정보 없음"}</span>
              </StatItem>
              <StatItem>
                <span className="label">아티스트 ID</span>
                <span className="value">{artistData.apiSingerId}</span>
              </StatItem>
            </ArtistStats>

            <div style={{ display: 'flex', gap: '12px' }}>
              <ActionButton $primary onClick={() => setIsFollowed(!isFollowed)}>
                {isFollowed ? <FaHeart /> : <FaRegHeart />}
                {isFollowed ? "팔로잉" : "팔로우"}
              </ActionButton>
              <ActionButton><FaShare /> 공유</ActionButton>
            </div>
          </div>
        </HeroSection>

        <Section>
          <SectionTitle><FaMicrophone /> 대표 인기 곡</SectionTitle>
          <TrackList>
            {topSongs.map((song) => (
              <TrackItem key={song.trackId}>
                <TrackThumb src={song.coverImgUrl} alt={song.title} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <TrackName>{song.title}</TrackName>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{song.album}</span>
                </div>
                <ActionButton onClick={() => playTrack({
                  ...song,
                  id: song.trackId,
                  name: song.title,
                  albumArt: song.coverImgUrl
                })}>
                  <FaPlay size={12} />
                </ActionButton>
              </TrackItem>
            ))}
          </TrackList>
        </Section>
      </Container>
    </BaseModal>
  );
};

export default ArtistDetailModal;


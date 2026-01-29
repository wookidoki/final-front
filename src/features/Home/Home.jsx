import React, { useState, useEffect } from "react";
import { FaFire, FaPlay, FaMagic,FaMusic, FaChartLine, FaArrowRight } from "react-icons/fa";
import * as S from "./Home_style";

import { searchApi } from "../../services/api/searchApi"; 

import usePlayerStore from "../../store/usePlayerStore";
import useModalStore from "../../store/useModalStore";

const Home = () => {
  const [newTracks, setNewTracks] = useState([]);
  const [chartPreview, setChartPreview] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack } = usePlayerStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    loadHomeData();
  }, []);

const loadHomeData = async () => {
    setLoading(true);
    try {
        
        const [newMusic, topChart] = await Promise.all([
            searchApi.getNewTracks(),
            searchApi.getTopMusic() 
        ]);

        setNewTracks(newMusic); 
        setChartPreview(topChart); 
    } catch (error) {
        console.error("로드 실패:", error);
    } finally {
        setLoading(false);
    }
};

    const handlePlay = async (track) => {
      let toPlay = { id: track.id, name: track.name, artist: track.artist, albumArt: track.albumArt, previewUrl: track.previewUrl || "", ...track };
      if (!toPlay.previewUrl) {
        try {
          const detail = await searchApi.getTrackDetail(toPlay.id);
          toPlay = { id: detail.trackId, name: detail.title, artist: detail.artistName, albumArt: detail.coverImgUrl, previewUrl: detail.previewUrl || "", ...detail };
        } catch (err) {
          console.error("상세 정보 로드 실패:", err);
          return;
        }
      }
      const playlist = newTracks.map(t => ({ ...t, previewUrl: t.previewUrl || "" }));
      playTrack(toPlay, playlist);
    };
    
    const handleTrackClick = (track) => {
      openModal("songDetail", { track });
    };

  return (
    <S.Container>
      {/* Hero Section */}
      <S.HeroSection>
        <S.HeroBackground />
        <S.HeroContent>
          <S.HeroIcon>🎵</S.HeroIcon>
          <S.HeroTitle data-text="RE:PLAY">RE:PLAY</S.HeroTitle>
          <S.HeroSubtitle>
            지루한 추천은 그만. 너만의 음악 우주를 만들어봐.
          </S.HeroSubtitle>
          <S.HeroDescription>
            좋아하는 음악, 스티커, 사진으로 꾸미는 나만의 플레이리스트 페이지
          </S.HeroDescription>

          <S.HeroButtons>
            <S.CreateButton to="/my-universe">
              <FaMagic /> 마이 유니버스 만들기
            </S.CreateButton>
            <S.ExploreButton to="/search">
              <FaMusic /> 음악 둘러보기
            </S.ExploreButton>
          </S.HeroButtons>
        </S.HeroContent>

        <S.FloatingElements>
          <S.FloatingEmoji $delay={0}>🎸</S.FloatingEmoji>
          <S.FloatingEmoji $delay={1}>🎹</S.FloatingEmoji>
          <S.FloatingEmoji $delay={2}>🎤</S.FloatingEmoji>
          <S.FloatingEmoji $delay={3}>🎧</S.FloatingEmoji>
          <S.FloatingEmoji $delay={4}>🎵</S.FloatingEmoji>
        </S.FloatingElements>
      </S.HeroSection>


      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>
            <FaFire color="#ff4d4d" /> 방금 올라온 신곡
          </S.SectionTitle>
          <S.ViewAllLink to="/search">
            전체 보기 <FaArrowRight />
          </S.ViewAllLink>
        </S.SectionHeader>

        {loading ? (
          <S.LoadingText>음악을 불러오는 중...</S.LoadingText>
        ) : (
          <S.MusicGrid>
            {newTracks.map((track, index) => (
              <S.MusicCard key={`new-track-${track.id || index}`} onClick={() => handleTrackClick(track)}>
                <S.MusicCardImage src={track.albumArt} alt={track.name} />
                <S.MusicCardOverlay>
                  <S.PlayButtonLarge
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(track);
                    }}
                  >
                    <FaPlay />
                  </S.PlayButtonLarge>
                </S.MusicCardOverlay>
                <S.MusicCardInfo>
                  <S.MusicCardTitle>{track.name}</S.MusicCardTitle>
                  <S.MusicCardArtist>{track.artist}</S.MusicCardArtist>
                </S.MusicCardInfo>
              </S.MusicCard>
            ))}
          </S.MusicGrid>
        )}
      </S.Section>

      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>
            <FaChartLine /> 인기 차트 TOP 5
          </S.SectionTitle>
          <S.ViewAllLink to="/search">
            전체 차트 <FaArrowRight />
          </S.ViewAllLink>
        </S.SectionHeader>

        {loading ? (
          <S.LoadingText>차트를 불러오는 중...</S.LoadingText>
        ) : (
          <S.ChartList>
            {chartPreview.map((track, index) => (
              <S.ChartItem key={`top-chart-${track.id || index}`} onClick={() => handleTrackClick(track)}>
                <S.ChartRank>{index + 1}</S.ChartRank>
                <S.ChartAlbumArt src={track.albumArt} alt={track.name} />
                <S.ChartTrackInfo>
                  <S.ChartTrackName>{track.name}</S.ChartTrackName>
                  <S.ChartArtistName>{track.artist}</S.ChartArtistName>
                </S.ChartTrackInfo>
                <S.ChartPlayButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(track);
                  }}
                >
                  <FaPlay />
                </S.ChartPlayButton>
              </S.ChartItem>
            ))}
          </S.ChartList>
        )}
      </S.Section>

      {/* Universe Explore Section */}
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>
            <FaMagic /> 유니버스 탐험
          </S.SectionTitle>
        </S.SectionHeader>

        <S.UniverseGrid>
          <S.UniverseCard to="/my-universe" $featured>
            <S.UniverseCardContent>
              <S.UniverseCardTitle>나만의 유니버스</S.UniverseCardTitle>
              <S.UniverseCardDescription>
                지금 바로 만들어보세요 →
              </S.UniverseCardDescription>
            </S.UniverseCardContent>
          </S.UniverseCard>

          <S.UniverseCard>
            <S.UniverseCardIcon>☁️</S.UniverseCardIcon>
            <S.UniverseCardContent>
              <S.UniverseCardTitle>Lo-Fi Room</S.UniverseCardTitle>
              <S.UniverseCardDescription>@chill_guy</S.UniverseCardDescription>
            </S.UniverseCardContent>
          </S.UniverseCard>

          <S.UniverseCard>
            <S.UniverseCardIcon>🎸</S.UniverseCardIcon>
            <S.UniverseCardContent>
              <S.UniverseCardTitle>Rock Spirit</S.UniverseCardTitle>
              <S.UniverseCardDescription>@band_master</S.UniverseCardDescription>
            </S.UniverseCardContent>
          </S.UniverseCard>

          <S.UniverseCard>
            <S.UniverseCardIcon>🎧</S.UniverseCardIcon>
            <S.UniverseCardContent>
              <S.UniverseCardTitle>Study With Me</S.UniverseCardTitle>
              <S.UniverseCardDescription>@exam_D-10</S.UniverseCardDescription>
            </S.UniverseCardContent>
          </S.UniverseCard>
        </S.UniverseGrid>
      </S.Section>
    </S.Container>
  );
};

export default Home;

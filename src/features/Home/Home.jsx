import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFire,
  FaPlay,
  FaMagic,
  FaChartLine,
  FaMusic,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import * as S from "./Home_style";
import { getTrendingMusic, getChartData, formatTrack } from "../../services/itunesApi";
import usePlayerStore from "../../store/usePlayerStore";
import useModalStore from "../../store/useModalStore";

const Home = () => {
  const [trendingTracks, setTrendingTracks] = useState([]);
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
      const [trending, charts] = await Promise.all([
        getTrendingMusic(),
        getChartData(),
      ]);

      setTrendingTracks(trending.slice(0, 6));
      // 차트에서 상위 5곡 추출
      setChartPreview([...charts.kpop.slice(0, 5)]);
    } catch (error) {
      console.error("Failed to load home data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (track) => {
    const formattedTrack = formatTrack(track);
    const playlist = trendingTracks.map((t) => formatTrack(t));
    playTrack(formattedTrack, playlist);
  };

  const handleTrackClick = (track) => {
    const formattedTrack = formatTrack(track);
    openModal("songDetail", { track: formattedTrack });
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

      {/* Trending Music Section */}
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>
            <FaFire /> 지금 핫한 음악
          </S.SectionTitle>
          <S.ViewAllLink to="/search">
            전체 보기 <FaArrowRight />
          </S.ViewAllLink>
        </S.SectionHeader>

        {loading ? (
          <S.LoadingText>음악을 불러오는 중...</S.LoadingText>
        ) : (
          <S.MusicGrid>
            {trendingTracks.map((track) => {
              const formatted = formatTrack(track);
              return (
                <S.MusicCard key={formatted.id} onClick={() => handleTrackClick(track)}>
                  <S.MusicCardImage src={formatted.albumArt} alt={formatted.name} />
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
                    <S.MusicCardTitle>{formatted.name}</S.MusicCardTitle>
                    <S.MusicCardArtist>{formatted.artist}</S.MusicCardArtist>
                  </S.MusicCardInfo>
                </S.MusicCard>
              );
            })}
          </S.MusicGrid>
        )}
      </S.Section>

      {/* Chart Preview Section */}
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
            {chartPreview.map((track, index) => {
              const formatted = formatTrack(track);
              return (
                <S.ChartItem key={formatted.id} onClick={() => handleTrackClick(track)}>
                  <S.ChartRank>{index + 1}</S.ChartRank>
                  <S.ChartAlbumArt src={formatted.albumArt} alt={formatted.name} />
                  <S.ChartTrackInfo>
                    <S.ChartTrackName>{formatted.name}</S.ChartTrackName>
                    <S.ChartArtistName>{formatted.artist}</S.ChartArtistName>
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
              );
            })}
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

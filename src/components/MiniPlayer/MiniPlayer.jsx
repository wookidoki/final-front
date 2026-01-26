import React, { useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeMute,
  FaRandom,
  FaRedo,
} from "react-icons/fa";
import usePlayerStore from "../../store/usePlayerStore";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import * as S from "./MiniPlayer.style";

const MiniPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    progress,
    duration,
    isRepeat,
    isShuffle,
    togglePlay,
    playNext,
    playPrevious,
    setVolume,
    toggleMute,
    seekTo,
    toggleRepeat,
    toggleShuffle,
  } = usePlayerStore();

  // 오디오 플레이어 훅 사용 (실제 재생 제어)
  useAudioPlayer();

  // 현재 트랙이 없으면 플레이어 숨김
  if (!currentTrack) {
    return null;
  }

  // 시간 포맷팅 (초 -> MM:SS)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 진행바 클릭 핸들러
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  // 볼륨바 클릭 핸들러
  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVolume = x / rect.width;
    setVolume(newVolume);
  };

  const progressPercentage = duration ? (progress / duration) * 100 : 0;
  const volumePercentage = (isMuted ? 0 : volume) * 100;

  return (
    <S.Container>
      {/* 왼쪽: 현재 재생 중인 트랙 정보 */}
      <S.TrackInfo>
        <S.AlbumArt src={currentTrack.albumArt} alt={currentTrack.name} />
        <S.TrackDetails>
          <S.TrackName>{currentTrack.name}</S.TrackName>
          <S.ArtistName>{currentTrack.artist}</S.ArtistName>
        </S.TrackDetails>
      </S.TrackInfo>

      {/* 중앙: 재생 컨트롤 */}
      <S.PlayerControls>
        <S.ControlButtons>
          <S.ControlButton onClick={toggleShuffle} $active={isShuffle} title="셔플">
            <FaRandom />
          </S.ControlButton>

          <S.ControlButton onClick={playPrevious} title="이전 곡">
            <FaStepBackward />
          </S.ControlButton>

          <S.PlayButton onClick={togglePlay} title={isPlaying ? "일시정지" : "재생"}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </S.PlayButton>

          <S.ControlButton onClick={playNext} title="다음 곡">
            <FaStepForward />
          </S.ControlButton>

          <S.ControlButton onClick={toggleRepeat} $active={isRepeat} title="반복">
            <FaRedo />
          </S.ControlButton>
        </S.ControlButtons>

        {/* 진행바 */}
        <S.ProgressSection>
          <S.TimeText>{formatTime(progress)}</S.TimeText>
          <S.ProgressBarContainer onClick={handleProgressClick}>
            <S.ProgressBar $progress={progressPercentage} />
            <S.ProgressHandle $progress={progressPercentage} />
          </S.ProgressBarContainer>
          <S.TimeText>{formatTime(duration)}</S.TimeText>
        </S.ProgressSection>
      </S.PlayerControls>

      {/* 오른쪽: 볼륨 컨트롤 */}
      <S.VolumeControl>
        <S.VolumeButton onClick={toggleMute}>
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </S.VolumeButton>
        <S.VolumeBarContainer onClick={handleVolumeClick}>
          <S.VolumeBar $volume={volumePercentage} />
          <S.VolumeHandle $volume={volumePercentage} />
        </S.VolumeBarContainer>
      </S.VolumeControl>
    </S.Container>
  );
};

export default MiniPlayer;

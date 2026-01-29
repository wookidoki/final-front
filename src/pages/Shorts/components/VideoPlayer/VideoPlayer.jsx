import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useVideoPlayer } from "../../hooks";
import * as S from "./VideoPlayer.style";

/**
 * 비디오 플레이어 컴포넌트
 * @param {string} src - 비디오 URL
 * @param {string} poster - 썸네일 URL
 * @param {boolean} autoPlay - 자동 재생 여부
 * @param {boolean} showControls - 컨트롤 표시 여부
 * @param {boolean} showMuteButton - 음소거 버튼 표시 여부
 * @param {boolean} showTimeDisplay - 시간 표시 여부
 * @param {function} onPlay - 재생 시작 콜백
 * @param {function} onPause - 일시정지 콜백
 */
const VideoPlayer = forwardRef(
  (
    {
      src,
      poster,
      autoPlay = true,
      showControls = true,
      showMuteButton = true,
      showTimeDisplay = true,
      onPlay,
      onPause,
    },
    ref
  ) => {
    const {
      videoRef,
      isPlaying,
      progress,
      currentTime,
      duration,
      isMuted,
      showPlayIcon,
      togglePlay,
      play,
      pause,
      toggleMute,
      handleTimeUpdate,
      handleSeek,
      handleLoadedMetadata,
      formatTime,
    } = useVideoPlayer();

    // 외부에서 제어할 수 있도록 메서드 노출
    useImperativeHandle(ref, () => ({
      play,
      pause,
      togglePlay,
      toggleMute,
      isPlaying,
      isMuted,
    }));

    // 재생/일시정지 콜백
    useEffect(() => {
      if (isPlaying && onPlay) onPlay();
      if (!isPlaying && onPause) onPause();
    }, [isPlaying, onPlay, onPause]);

    const handleVideoClick = () => {
      togglePlay();
    };

    const handleSeekChange = (e) => {
      handleSeek(Number(e.target.value));
    };

    // 비디오가 없으면 썸네일만 표시
    if (!src) {
      return (
        <S.Container>
          <S.Thumbnail src={poster} alt="thumbnail" />
          <S.GradientOverlay />
        </S.Container>
      );
    }

    return (
      <S.Container>
        <S.Video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          muted={isMuted}
          playsInline
          autoPlay={autoPlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handleVideoClick}
        />

        <S.GradientOverlay />

        {/* 중앙 재생/일시정지 아이콘 */}
        <S.CenterIcon $show={showPlayIcon} $visible={!isPlaying || showPlayIcon}>
          {isPlaying ? <FaPlay /> : <FaPause />}
        </S.CenterIcon>

        {/* 음소거 버튼 */}
        {showMuteButton && (
          <S.MuteButton onClick={toggleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </S.MuteButton>
        )}

        {/* 시간 표시 */}
        {showTimeDisplay && duration > 0 && (
          <S.TimeDisplay>
            {formatTime(currentTime)} / {formatTime(duration)}
          </S.TimeDisplay>
        )}

        {/* 하단 진행 바 */}
        {showControls && (
          <S.ControlsContainer>
            <S.ProgressBar $percent={progress}>
              <S.ProgressThumb />
            </S.ProgressBar>
            <S.RangeInput
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeekChange}
            />
          </S.ControlsContainer>
        )}
      </S.Container>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;

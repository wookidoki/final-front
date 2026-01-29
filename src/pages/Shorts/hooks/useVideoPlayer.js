import { useState, useRef, useCallback, useEffect } from "react";

/**
 * 비디오 플레이어 훅
 */
const useVideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  // 재생/일시정지 토글
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPlayIcon(true);
    } else {
      videoRef.current.play().catch(() => {
        // 자동재생 정책으로 실패 시 무시
      });
      setIsPlaying(true);
      setShowPlayIcon(true);
      setTimeout(() => setShowPlayIcon(false), 800);
    }
  }, [isPlaying]);

  // 재생
  const play = useCallback(() => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // 일시정지
  const pause = useCallback(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  // 음소거 토글
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  // 시간 업데이트 핸들러
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    setCurrentTime(current);
    setDuration(total || 0);
    setProgress(total ? (current / total) * 100 : 0);
  }, []);

  // 진행 바 시크
  const handleSeek = useCallback(
    (percent) => {
      if (!videoRef.current || !duration) return;

      const newTime = (percent / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(percent);
    },
    [duration]
  );

  // 비디오 로드 시 메타데이터 설정
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  }, []);

  // 비디오 종료 핸들러
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  }, []);

  // 시간 포맷팅 (mm:ss)
  const formatTime = useCallback((time) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  }, []);

  // 리셋
  const reset = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setShowPlayIcon(false);
  }, []);

  return {
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
    handleEnded,
    formatTime,
    reset,
  };
};

export default useVideoPlayer;

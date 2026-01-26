import { useEffect, useRef } from "react";
import usePlayerStore from "../store/usePlayerStore";

/**
 * HTML5 Audio API를 사용한 오디오 플레이어 훅
 */
const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    progress,
    setProgress,
    setDuration,
    playNext,
    pause,
  } = usePlayerStore();

  // 오디오 객체 초기화
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    // 오디오 이벤트 리스너
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      // 곡이 끝나면 다음 곡 재생
      playNext();
    };

    const handleError = (e) => {
      console.error("Audio playback error:", e);
      pause();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [setDuration, setProgress, playNext, pause]);

  // 트랙 변경 시 오디오 소스 업데이트
  useEffect(() => {
    if (!audioRef.current || !currentTrack?.previewUrl) return;

    const audio = audioRef.current;
    audio.src = currentTrack.previewUrl;
    audio.load();

    // 자동 재생
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
  }, [currentTrack]);

  // 재생/일시정지 상태 변경
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // 볼륨 변경
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // 진행도 수동 변경 (seekTo 사용 시)
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // 사용자가 수동으로 변경한 경우에만 적용 (1초 이상 차이날 때)
    if (Math.abs(audio.currentTime - progress) > 1) {
      audio.currentTime = progress;
    }
  }, [progress]);

  return audioRef;
};

export default useAudioPlayer;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlayerStore = create(
  persist(
    (set, get) => ({
      // ===== 재생 상태 =====
      currentTrack: null, // 현재 재생 중인 트랙
      playlist: [], // 재생 목록
      currentIndex: -1, // 현재 재생 중인 인덱스
      isPlaying: false, // 재생 중 여부
      volume: 0.7, // 볼륨 (0~1)
      isMuted: false, // 음소거 여부
      progress: 0, // 현재 재생 위치 (초)
      duration: 0, // 전체 재생 시간 (초)
      isRepeat: false, // 반복 재생
      isShuffle: false, // 셔플 재생

      // ===== 재생 제어 함수 =====
      // 트랙 재생
      playTrack: (track, playlist = null) => {
        const currentPlaylist = playlist || get().playlist;

        // 재생 목록이 제공되면 업데이트
        if (playlist) {
          set({ playlist });
        }

        // 현재 트랙의 인덱스 찾기
        const index = currentPlaylist.findIndex((t) => t.id === track.id);

        set({
          currentTrack: track,
          currentIndex: index >= 0 ? index : 0,
          isPlaying: true,
          progress: 0,
        });
      },

      // 재생/일시정지 토글
      togglePlay: () => {
        set({ isPlaying: !get().isPlaying });
      },

      // 재생 정지
      pause: () => {
        set({ isPlaying: false });
      },

      // 재생 시작
      play: () => {
        set({ isPlaying: true });
      },

      // 다음 곡
      playNext: () => {
        const { playlist, currentIndex, isRepeat, isShuffle } = get();

        if (playlist.length === 0) return;

        let nextIndex;

        if (isShuffle) {
          // 셔플: 랜덤 인덱스
          nextIndex = Math.floor(Math.random() * playlist.length);
        } else if (isRepeat) {
          // 반복: 현재 곡 유지
          nextIndex = currentIndex;
        } else {
          // 일반: 다음 곡
          nextIndex = (currentIndex + 1) % playlist.length;
        }

        set({
          currentTrack: playlist[nextIndex],
          currentIndex: nextIndex,
          progress: 0,
        });
      },

      // 이전 곡
      playPrevious: () => {
        const { playlist, currentIndex } = get();

        if (playlist.length === 0) return;

        const prevIndex =
          currentIndex - 1 < 0 ? playlist.length - 1 : currentIndex - 1;

        set({
          currentTrack: playlist[prevIndex],
          currentIndex: prevIndex,
          progress: 0,
        });
      },

      // 볼륨 설정
      setVolume: (volume) => {
        set({ volume: Math.max(0, Math.min(1, volume)) });
      },

      // 음소거 토글
      toggleMute: () => {
        set({ isMuted: !get().isMuted });
      },

      // 진행도 설정
      setProgress: (progress) => {
        set({ progress });
      },

      // 재생 시간 설정
      setDuration: (duration) => {
        set({ duration });
      },

      // 특정 위치로 이동 (초)
      seekTo: (time) => {
        set({ progress: time });
      },

      // 반복 재생 토글
      toggleRepeat: () => {
        set({ isRepeat: !get().isRepeat });
      },

      // 셔플 재생 토글
      toggleShuffle: () => {
        set({ isShuffle: !get().isShuffle });
      },

      // 재생 목록 설정
      setPlaylist: (playlist) => {
        set({ playlist });
      },

      // 재생 목록에 추가
      addToPlaylist: (track) => {
        const { playlist } = get();
        // 중복 체크
        if (!playlist.find((t) => t.id === track.id)) {
          set({ playlist: [...playlist, track] });
        }
      },

      // 재생 목록에서 제거
      removeFromPlaylist: (trackId) => {
        const { playlist, currentTrack } = get();
        const newPlaylist = playlist.filter((t) => t.id !== trackId);

        // 현재 재생 중인 트랙이 제거된 경우
        if (currentTrack?.id === trackId) {
          set({
            playlist: newPlaylist,
            currentTrack: null,
            currentIndex: -1,
            isPlaying: false,
          });
        } else {
          set({ playlist: newPlaylist });
        }
      },

      // 재생 목록 초기화
      clearPlaylist: () => {
        set({
          playlist: [],
          currentTrack: null,
          currentIndex: -1,
          isPlaying: false,
        });
      },
    }),
    {
      name: "music-genz-player", // localStorage 키
      // 볼륨, 반복, 셔플 설정만 persist
      partialize: (state) => ({
        volume: state.volume,
        isRepeat: state.isRepeat,
        isShuffle: state.isShuffle,
      }),
    }
  )
);

export default usePlayerStore;

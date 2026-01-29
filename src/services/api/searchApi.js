import axiosInstance from "../Axios/Axios";

// 백엔드 MusicDTO 필드를 UI 필드로 변환하는 함수
const formatBackendTrack = (track) => ({
  id: track.trackId,
  name: track.title,
  artist: track.artistName, // track.artistName (String)
  albumArt: track.coverImgUrl?.replace("100x100", "300x300"), // track.coverImgUrl (String)
});

export const searchApi = {
  // 통합 검색
  search: async (keyword, category) => {
    const response = await axiosInstance.get(`/api/search`, {
      params: { keyword, category },
    });
    // 검색 결과도 UI 규격에 맞게 변환해서 반환하면 좋습니다.
    return response.data.data.map((track) => formatBackendTrack(track));
  },

  // 가수 상세 정보
  getArtistDetail: async (artistId) => {
    const response = await axiosInstance.get(`/api/artist/${artistId}`);
    return response.data.data;
  },

  // 노래 상세 정보 및 가사
  getTrackDetail: async (trackId) => {
    const response = await axiosInstance.get(`/api/music/${trackId}`);
    return response.data.data;
  },

  // [수정] 최신노래 목록: 가져오자마자 포맷 적용
  getNewTracks: async () => {
    const response = await axiosInstance.get(`/api/music/new`);
    const tracks = response.data.data;
    return tracks.map((track) => formatBackendTrack(track));
  },

  // [추가] 인기 차트 TOP 5: 새로 만든 백엔드 엔드포인트 연결
  getTopMusic: async () => {
    const response = await axiosInstance.get(`/api/music/top-music`);
    const tracks = response.data.data;
    return tracks.map((track) => formatBackendTrack(track));
  },
};

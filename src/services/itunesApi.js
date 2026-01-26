// iTunes Search API 연동 서비스
const ITUNES_API_BASE = "https://itunes.apple.com";
const CORS_PROXY = "https://api.allorigins.win/raw?url="; // CORS 우회용

/**
 * iTunes API 검색
 * @param {string} term - 검색어
 * @param {string} country - 국가 코드 (기본: KR)
 * @param {number} limit - 결과 개수 (기본: 50)
 */
export const searchMusic = async (term, country = "KR", limit = 50) => {
  try {
    const url = `${ITUNES_API_BASE}/search?term=${encodeURIComponent(
      term
    )}&country=${country}&media=music&limit=${limit}`;

    const response = await fetch(CORS_PROXY + encodeURIComponent(url));
    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error("iTunes API Error:", error);
    return [];
  }
};

/**
 * 장르별 인기 음악 검색
 */
export const getTopByGenre = async (genre, limit = 20) => {
  const genreQueries = {
    kpop: "kpop",
    pop: "pop hits",
    hiphop: "hip hop",
    rock: "rock",
    jazz: "jazz",
    electronic: "electronic dance",
    rnb: "r&b",
  };

  const query = genreQueries[genre] || genre;
  return await searchMusic(query, "KR", limit);
};

/**
 * 아티스트로 검색
 */
export const searchByArtist = async (artist, limit = 20) => {
  return await searchMusic(artist, "KR", limit);
};

/**
 * 트렌딩 음악 (인기 검색어로 시뮬레이션)
 */
export const getTrendingMusic = async () => {
  const trendingKeywords = [
    "NewJeans",
    "aespa",
    "IVE",
    "LE SSERAFIM",
    "SEVENTEEN",
  ];

  const randomKeyword =
    trendingKeywords[Math.floor(Math.random() * trendingKeywords.length)];
  return await searchMusic(randomKeyword, "KR", 20);
};

/**
 * 차트용 데이터 가져오기
 */
export const getChartData = async () => {
  try {
    const [kpop, pop, hiphop] = await Promise.all([
      getTopByGenre("kpop", 15),
      getTopByGenre("pop", 15),
      getTopByGenre("hiphop", 15),
    ]);

    return {
      kpop,
      pop,
      hiphop,
    };
  } catch (error) {
    console.error("Chart Data Error:", error);
    return {
      kpop: [],
      pop: [],
      hiphop: [],
    };
  }
};

/**
 * 트랙 정보 포맷팅
 */
export const formatTrack = (track) => {
  return {
    id: track.trackId,
    name: track.trackName,
    artist: track.artistName,
    album: track.collectionName,
    albumArt: track.artworkUrl100?.replace("100x100", "300x300"), // 고화질 이미지
    albumArtSmall: track.artworkUrl60,
    previewUrl: track.previewUrl,
    duration: track.trackTimeMillis,
    releaseDate: track.releaseDate,
    genre: track.primaryGenreName,
    price: track.trackPrice,
    currency: track.currency,
  };
};

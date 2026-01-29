import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { searchApi } from "../../services/api/searchApi";
import { FaPlay, FaSearch } from "react-icons/fa";
import * as S from "../../features/Home/Home_style";
import usePlayerStore from "../../store/usePlayerStore";
import useModalStore from "../../store/useModalStore";

const SearchResultPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const keyword = queryParams.get("keyword") || "";
  const category = queryParams.get("category") || "song";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef();
  const isFetching = useRef(false); // [핵심] 중복 요청 및 깜빡임 방지

  const { playTrack } = usePlayerStore();
  const { openModal } = useModalStore();

  const formatItem = (item) => {
    const isSong = category === 'song';
    return {
      id: isSong ? item.trackId : item.apiSingerId,
      name: isSong ? item.title : item.apiSingerName,
      artist: isSong ? item.artistName : (item.singerGenre || "아티스트"),
      albumArt: isSong ? item.coverImgUrl : item.singerImgUrl,
      previewUrl: item.previewUrl || "",
      ...item
    };
  };

  const fetchResults = useCallback(async (pageNum, isFirstLoad = false) => {
    if (isFetching.current) return;
    
    isFetching.current = true;
    setLoading(true);

    try {
      const data = await searchApi.search(keyword, category, pageNum);
      
      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setResults((prev) => {
          const isSong = category === 'song';
          const newItems = data.filter((item) => {
            const currentId = isSong ? item.trackId : item.apiSingerId;
            return !prev.some((p) => (isSong ? p.trackId : p.apiSingerId) === currentId);
          });
          return isFirstLoad ? data : [...prev, ...newItems];
        });
        // 데이터가 요청한 단위(예: 15개)보다 적게 오면 다음 페이지가 없다고 판단
        if (data.length < 15) setHasMore(false);
      }
    } catch (error) {
      console.error("로드 실패:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [keyword, category]); // hasMore를 의존성에서 제거

  // 2. 검색어(keyword)나 카테고리가 바뀔 때만 초기화 및 첫 로드
  useEffect(() => {
    setResults([]);      // 이전 결과 초기화
    setPage(1);         // 페이지 초기화
    setHasMore(true);   // 추가 로드 가능 여부 초기화
    isFetching.current = false;

    fetchResults(1, true); // 첫 페이지 로드
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, category]); // fetchResults를 의존성에서 빼거나, useCallback을 완벽히 잡아야 함

  // 3. 무한 스크롤(Intersection Observer) 부분은 유지하되 안정성 강화
  const lastElementRef = useCallback((node) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isFetching.current) {
        setPage(prev => {
          const next = prev + 1;
          fetchResults(next);
          return next;
        });
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchResults]);

  return (
    <S.Container>
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>
            <FaSearch /> "{keyword}" {category === 'song' ? '노래' : '아티스트'} 검색 결과
          </S.SectionTitle>
        </S.SectionHeader>

        <S.MusicGrid>
          {results.map((item, index) => {
            const formatted = formatItem(item);
            return (
              <S.MusicCard 
                key={`${formatted.id}-${index}`} 
                ref={index === results.length - 1 ? lastElementRef : null}
                // [수정 포인트] 카테고리에 따라 다른 모달 오픈
                onClick={() => {
                  if (category === 'artist') {
                    // 아티스트 상세 모달 오픈 (데이터는 formatted 또는 item 전달)
                    openModal("artistDetail", { artist: formatted });
                  } else {
                    // 기존 노래 상세 모달 오픈
                    openModal("songDetail", { track: formatted });
                  }
                }}
              >
                {/* 아티스트일 경우 이미지 원형 스타일 적용을 고민해볼 수 있습니다 */}
                <S.MusicCardImage 
                  src={formatted.albumArt || "https://via.placeholder.com/200"} 
                  alt={formatted.name} 
                  style={category === 'artist' ? { borderRadius: '50%' } : {}}
                />
                
                <S.MusicCardOverlay>
                  <S.PlayButtonLarge onClick={(e) => {
                    e.stopPropagation();
                    // 아티스트 카드에서는 바로 재생보다는 상세 진입이 일반적이나, 
                    // 필요시 아티스트의 대표곡을 재생하는 로직을 연결할 수 있습니다.
                    playTrack(formatted, results.map(r => formatItem(r)));
                  }}>
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

        {loading && <S.LoadingText>결과를 불러오는 중입니다...</S.LoadingText>}
        {!hasMore && results.length > 0 && (
          <S.LoadingText style={{ opacity: 0.5 }}>마지막 결과입니다.</S.LoadingText>
        )}
      </S.Section>
    </S.Container>
  );
};

export default SearchResultPage;
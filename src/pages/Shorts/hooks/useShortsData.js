import { useState, useRef, useCallback, useEffect } from "react";
import api from "../../../api/axios";

/**
 * 숏폼 데이터 로딩 훅
 * @param {string} keyword - 검색 키워드 (빈 문자열이면 전체 목록)
 */
const useShortsData = (keyword = "") => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [nextCursorId, setNextCursorId] = useState(null);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const observer = useRef();

  // 키워드 변경 시 리셋
  useEffect(() => {
    setShorts([]);
    setNextCursorId(null);
    setHasNext(true);
  }, [keyword]);

  // 숏폼 데이터 로드
  const fetchShorts = useCallback(
    async (cursorId = null) => {
      if (loading) return;

      try {
        setLoading(true);
        const params = { size: 10, sort: "latest" };
        if (cursorId) params.lastShortFormId = cursorId;

        let endpoint = "/shortforms";
        if (keyword && keyword.trim() !== "") {
          endpoint = "/shortforms/search";
          params.keyword = keyword;
          params.condition = "all";
        }

        const response = await api.get(endpoint, { params });
        const resultData = response.data.data;
        const newShorts = resultData.content || [];
        const pagination = resultData.pagination || {};

        if (newShorts.length === 0) {
          if (!cursorId) setShorts([]);
          setHasNext(false);
          return;
        }

        setShorts((prev) => {
          if (!cursorId) return newShorts;
          const uniqueNewShorts = newShorts.filter(
            (item) =>
              !prev.some((prevItem) => prevItem.shortFormId === item.shortFormId)
          );
          return [...prev, ...uniqueNewShorts];
        });

        setHasNext(pagination.hasNext ?? false);
        setNextCursorId(pagination.lastShortFormId ?? null);
      } catch (error) {
        console.error("숏폼 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    },
    [keyword, loading]
  );

  // 초기 로드
  useEffect(() => {
    fetchShorts(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  // 다음 페이지 로드
  const loadMore = useCallback(() => {
    if (hasNext && !loading && nextCursorId) {
      fetchShorts(nextCursorId);
    }
  }, [hasNext, loading, nextCursorId, fetchShorts]);

  // 무한 스크롤을 위한 ref 콜백
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNext) {
            loadMore();
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasNext, loadMore]
  );

  // 좋아요 토글
  const toggleLike = useCallback(async (shortFormId) => {
    const isLiked = likedVideos.has(shortFormId);

    setLikedVideos((prev) => {
      const newSet = new Set(prev);
      if (isLiked) newSet.delete(shortFormId);
      else newSet.add(shortFormId);
      return newSet;
    });

    // 숏폼 목록에서 좋아요 수 업데이트
    setShorts((prev) =>
      prev.map((short) =>
        short.shortFormId === shortFormId
          ? {
              ...short,
              likeCount: isLiked
                ? (short.likeCount || 1) - 1
                : (short.likeCount || 0) + 1,
            }
          : short
      )
    );

    try {
      if (isLiked) {
        await api.delete(`/shortforms/${shortFormId}/like`);
      } else {
        await api.post(`/shortforms/${shortFormId}/like`);
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      // 실패 시 롤백
      setLikedVideos((prev) => {
        const newSet = new Set(prev);
        if (isLiked) newSet.add(shortFormId);
        else newSet.delete(shortFormId);
        return newSet;
      });
    }
  }, [likedVideos]);

  // 좋아요 상태 확인
  const isLiked = useCallback(
    (shortFormId) => likedVideos.has(shortFormId),
    [likedVideos]
  );

  return {
    shorts,
    loading,
    hasNext,
    lastElementRef,
    loadMore,
    toggleLike,
    isLiked,
    refetch: () => fetchShorts(null),
  };
};

export default useShortsData;

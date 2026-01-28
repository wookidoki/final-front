import React, { useState, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { SearchBar, ShortsFeed, ShortsGrid } from "./components";
import { useShortsData } from "./hooks";
import * as S from "./Shorts.style";

/**
 * 숏폼 메인 페이지
 * - 검색 없을 때: 틱톡 스타일 전체화면 피드
 * - 검색 시: 그리드 형태로 검색 결과 표시
 */
const Shorts = () => {
  // 검색 키워드 상태
  const [searchKeyword, setSearchKeyword] = useState("");
  // 그리드에서 선택한 숏폼 (뷰어용)
  const [selectedShort, setSelectedShort] = useState(null);

  // 데이터 훅 사용
  const {
    shorts,
    loading,
    lastElementRef,
    toggleLike,
    isLiked,
  } = useShortsData(searchKeyword);

  // 검색 실행
  const handleSearch = useCallback((keyword) => {
    setSearchKeyword(keyword);
  }, []);

  // 검색 초기화 (전체 보기)
  const handleClearSearch = useCallback(() => {
    setSearchKeyword("");
  }, []);

  // 그리드에서 숏폼 클릭
  const handleShortClick = useCallback((short) => {
    setSelectedShort(short);
  }, []);

  // 뷰어 닫기
  const handleCloseViewer = useCallback(() => {
    setSelectedShort(null);
  }, []);

  // 검색 중인지 여부
  const isSearchMode = searchKeyword.trim() !== "";

  return (
    <S.Container>
      {/* 검색창 */}
      <S.SearchWrapper>
        <SearchBar
          onSearch={handleSearch}
          placeholder="관심있는 숏폼 검색"
        />
      </S.SearchWrapper>

      {/* 컨텐츠 영역 */}
      <S.ContentArea $hasSearch={isSearchMode}>
        {isSearchMode ? (
          // 검색 모드: 그리드 뷰
          <ShortsGrid
            shorts={shorts}
            keyword={searchKeyword}
            loading={loading}
            lastElementRef={lastElementRef}
            onShortClick={handleShortClick}
            onBack={handleClearSearch}
          />
        ) : (
          // 일반 모드: 피드 뷰 (틱톡 스타일)
          <ShortsFeed
            shorts={shorts}
            loading={loading}
            lastElementRef={lastElementRef}
            onLike={toggleLike}
            isLiked={isLiked}
          />
        )}
      </S.ContentArea>

      {/* 숏폼 뷰어 모달 (그리드에서 클릭 시) */}
      {selectedShort && (
        <S.ViewerModal onClick={handleCloseViewer}>
          <S.ViewerClose onClick={handleCloseViewer}>
            <FaTimes />
          </S.ViewerClose>
          <S.ViewerContent onClick={(e) => e.stopPropagation()}>
            <ShortsFeed
              shorts={[selectedShort]}
              loading={false}
              lastElementRef={null}
              onLike={toggleLike}
              isLiked={isLiked}
            />
          </S.ViewerContent>
        </S.ViewerModal>
      )}
    </S.Container>
  );
};

export default Shorts;

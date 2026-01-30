import React, { useState, useCallback, useEffect } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchBar, ShortsFeed, ShortsGrid } from "./components";
import { useShortsData } from "./hooks";
import axiosInstance from "../../services/Axios/Axios";
import * as S from "./Shorts.style";

const Shorts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 검색 키워드 상태
  const [searchKeyword, setSearchKeyword] = useState("");
  // 그리드에서 선택한 숏폼 (뷰어용)
  const [selectedShort, setSelectedShort] = useState(null);

  // 데이터 훅 사용
  const { shorts, loading, lastElementRef, toggleLike, isLiked } =
    useShortsData(searchKeyword);

  // 특정 숏폼으로
  useEffect(() => {
    const shortFormId = location.state?.shortFormId;
    if (!shortFormId) return;

    const fetchAndOpen = async () => {
      try {
        const res = await axiosInstance.get(`/api/shortforms/${shortFormId}`);
        const data = res.data?.data;
        if (data) {
          setSelectedShort(data);
        }
      } catch (err) {
        console.error("숏폼 상세 조회 실패:", err);
      }
    };
    fetchAndOpen();

    // state 소비 후 정리 (뒤로가기 시 재열림 방지)
    window.history.replaceState({}, "");
  }, [location.state]);

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

  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = useCallback(() => {
    navigate("/shorts/upload");
  }, [navigate]);

  // 검색 중인지 여부
  const isSearchMode = searchKeyword.trim() !== "";

  return (
    <S.Container>
      {/* 검색창 */}
      <S.SearchWrapper>
        <SearchBar onSearch={handleSearch} placeholder="관심있는 숏폼 검색" />
      </S.SearchWrapper>

      {/* 컨텐츠 영역 */}
      <S.ContentArea $hasSearch={isSearchMode}>
        {isSearchMode ? (
          <ShortsGrid
            shorts={shorts}
            keyword={searchKeyword}
            loading={loading}
            lastElementRef={lastElementRef}
            onShortClick={handleShortClick}
            onBack={handleClearSearch}
          />
        ) : (
          <ShortsFeed
            shorts={shorts}
            loading={loading}
            lastElementRef={lastElementRef}
            onLike={toggleLike}
            isLiked={isLiked}
          />
        )}
      </S.ContentArea>

      {/* 등록 버튼: 모달 조건문 밖(항상 보이게)에 배치 */}
      <S.UploadButton onClick={handleUploadClick} aria-label="숏폼 등록">
        <FaPlus />
      </S.UploadButton>

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

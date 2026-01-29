import React from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import ShortCard from "../ShortCard";
import * as S from "./ShortsGrid.style";

/**
 * 숏폼 그리드 컴포넌트 (검색 결과용)
 * @param {array} shorts - 숏폼 목록
 * @param {string} keyword - 검색 키워드
 * @param {boolean} loading - 로딩 상태
 * @param {function} lastElementRef - 마지막 요소 ref (무한 스크롤)
 * @param {function} onShortClick - 숏폼 클릭 콜백
 * @param {function} onBack - 뒤로가기 콜백
 */
const ShortsGrid = ({
  shorts,
  keyword,
  loading,
  lastElementRef,
  onShortClick,
  onBack,
}) => {
  if (shorts.length === 0 && !loading) {
    return (
      <S.Container>
        <S.Header>
          <S.ResultInfo>
            <S.ResultText>
              <strong>'{keyword}'</strong> 검색 결과
            </S.ResultText>
            <S.BackButton onClick={onBack}>
              <FaArrowLeft />
              전체 보기
            </S.BackButton>
          </S.ResultInfo>
        </S.Header>
        <S.EmptyState>
          <FaSearch />
          <h3>검색 결과가 없습니다</h3>
          <p>다른 키워드로 검색해보세요</p>
        </S.EmptyState>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.ResultInfo>
          <S.ResultText>
            <strong>'{keyword}'</strong> 검색 결과 ({shorts.length}개)
          </S.ResultText>
          <S.BackButton onClick={onBack}>
            <FaArrowLeft />
            전체 보기
          </S.BackButton>
        </S.ResultInfo>
      </S.Header>

      <S.Grid>
        {shorts.map((short, index) => {
          const isLast = index === shorts.length - 1;

          return (
            <div key={short.shortFormId} ref={isLast ? lastElementRef : null}>
              <ShortCard short={short} onClick={onShortClick} />
            </div>
          );
        })}

        {loading && (
          <S.LoadingContainer>
            <S.LoadingSpinner />
          </S.LoadingContainer>
        )}
      </S.Grid>
    </S.Container>
  );
};

export default ShortsGrid;

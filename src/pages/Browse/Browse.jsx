import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaFire, FaClock, FaFilter } from "react-icons/fa";
import styled from "styled-components";
import UniverseCard from "../../components/UniverseCard/UniverseCard";
import { mockUniverses, searchUniverses, sortUniverses, paginateUniverses } from "../../data/mockUniverses";
import useModalStore from "../../store/useModalStore";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px 14px 48px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 56px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1.1rem;
  pointer-events: none;
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Select = styled.select`
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SortButton = styled.button`
  padding: 14px 24px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.surface};
  border: 2px solid
    ${({ $active, theme }) => ($active ? "transparent" : theme.colors.border)};
  border-radius: 12px;
  color: ${({ $active }) => ($active ? "white" : "inherit")};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSub};
  }

  span:last-child {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingMore = styled.div`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: ${({ theme }) => theme.colors.textSub};

  svg {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.textMain};
  }

  p {
    font-size: 1rem;
  }
`;

const Browse = () => {
  const [keyword, setKeyword] = useState("");
  const [searchCondition, setSearchCondition] = useState("all");
  const [sortType, setSortType] = useState("latest");
  const [displayedUniverses, setDisplayedUniverses] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUniverseId, setLastUniverseId] = useState(null);

  const observerTarget = useRef(null);
  const { openModal } = useModalStore();

  // 초기 로드 및 검색/정렬 변경 시
  useEffect(() => {
    loadUniverses(true);
  }, [keyword, searchCondition, sortType]);

  const loadUniverses = useCallback(
    (reset = false) => {
      setIsLoading(true);

      // 검색 및 정렬
      let filtered = keyword ? searchUniverses(keyword, searchCondition) : mockUniverses;
      filtered = sortUniverses(filtered, sortType);

      // 페이지네이션
      const currentLastId = reset ? null : lastUniverseId;
      const result = paginateUniverses(filtered, currentLastId, 12);

      if (reset) {
        setDisplayedUniverses(result.content);
      } else {
        setDisplayedUniverses((prev) => [...prev, ...result.content]);
      }

      setHasMore(result.hasNext);
      setLastUniverseId(result.lastUniverseId);
      setIsLoading(false);
    },
    [keyword, searchCondition, sortType, lastUniverseId]
  );

  // 무한 스크롤 관찰자
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadUniverses(false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadUniverses]);

  const handleUniverseClick = (universe) => {
    openModal("universeDetail", { universe });
  };

  const totalUniverses = mockUniverses.length;
  const totalLikes = mockUniverses.reduce((sum, u) => sum + u.likeCount, 0);

  return (
    <Container>
      <Header>
        <Title>유니버스 둘러보기</Title>
        <Subtitle>다른 사람들이 만든 음악 유니버스를 탐험해보세요</Subtitle>
      </Header>

      <Stats>
        <StatItem>
          <span>전체 유니버스</span>
          <span>{totalUniverses.toLocaleString()}</span>
        </StatItem>
        <StatItem>
          <span>총 좋아요</span>
          <span>{totalLikes.toLocaleString()}</span>
        </StatItem>
        <StatItem>
          <span>표시 중</span>
          <span>{displayedUniverses.length}</span>
        </StatItem>
      </Stats>

      <Controls>
        <SearchContainer>
          <SearchWrapper>
            <SearchIconWrapper>
              <FaSearch />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="유니버스 검색... (제목, 닉네임, 해시태그)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </SearchWrapper>
          <Select value={searchCondition} onChange={(e) => setSearchCondition(e.target.value)}>
            <option value="all">전체 검색</option>
            <option value="title">제목</option>
            <option value="nickname">닉네임</option>
            <option value="hashtag">해시태그</option>
          </Select>
        </SearchContainer>

        <FilterGroup>
          <SortButton $active={sortType === "latest"} onClick={() => setSortType("latest")}>
            <FaClock /> 최신순
          </SortButton>
          <SortButton $active={sortType === "popular"} onClick={() => setSortType("popular")}>
            <FaFire /> 인기순
          </SortButton>
        </FilterGroup>
      </Controls>

      {displayedUniverses.length > 0 ? (
        <>
          <Grid>
            {displayedUniverses.map((universe) => (
              <UniverseCard
                key={universe.universeId}
                universe={universe}
                onClick={() => handleUniverseClick(universe)}
              />
            ))}
          </Grid>

          {hasMore && (
            <LoadingMore ref={observerTarget}>
              {isLoading ? "로딩 중..." : "스크롤하여 더 보기"}
            </LoadingMore>
          )}
        </>
      ) : (
        <EmptyState>
          <FaSearch />
          <h3>검색 결과가 없습니다</h3>
          <p>다른 키워드로 검색해보세요</p>
        </EmptyState>
      )}
    </Container>
  );
};

export default Browse;

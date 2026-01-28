import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaBookmark, FaRegBookmark, FaEye, FaPlus } from "react-icons/fa";
import * as S from "./Universe.style";

// 더미 데이터
const universeData = [
  {
    id: 1,
    title: "Midnight Vibes Universe 🌙",
    thumbnail: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=400&fit=crop",
    creator: {
      name: "NightOwl_DJ",
      avatar: "N",
    },
    likes: 2340,
    views: 12500,
    isLive: true,
    createdAt: "2시간 전",
  },
  {
    id: 2,
    title: "Summer Beach Party 🏖️",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    creator: {
      name: "BeachLover",
      avatar: "B",
    },
    likes: 1890,
    views: 8900,
    isLive: false,
    createdAt: "5시간 전",
  },
  {
    id: 3,
    title: "K-Pop Aesthetic Space ✨",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
    creator: {
      name: "KpopStan",
      avatar: "K",
    },
    likes: 5670,
    views: 25000,
    isLive: true,
    createdAt: "1일 전",
  },
  {
    id: 4,
    title: "Lo-Fi Study Room 📚",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    creator: {
      name: "StudyWithMe",
      avatar: "S",
    },
    likes: 3450,
    views: 18000,
    isLive: false,
    createdAt: "2일 전",
  },
  {
    id: 5,
    title: "Retro Gaming Zone 🎮",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    creator: {
      name: "RetroGamer",
      avatar: "R",
    },
    likes: 2100,
    views: 9500,
    isLive: false,
    createdAt: "3일 전",
  },
  {
    id: 6,
    title: "Chill Jazz Cafe ☕",
    thumbnail: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop",
    creator: {
      name: "JazzMaster",
      avatar: "J",
    },
    likes: 4200,
    views: 21000,
    isLive: true,
    createdAt: "4일 전",
  },
];

const Universe = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCardClick = (id) => {
    navigate(`/universe/${id}`);
  };

  const handleCreateClick = () => {
    navigate("/my-universe");
  };

  // 검색 필터링
  const filteredData = universeData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 정렬
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    return 0; // latest는 기본 순서 유지
  });

  return (
    <S.Container>
      {/* 헤더 */}
      <S.Header>
        <S.HeaderGradient />
        <S.HeaderContent>
          <S.HeaderIcon>🌌</S.HeaderIcon>
          <S.Title>UNIVERSE</S.Title>
          <S.Subtitle>다른 사람들의 유니버스를 탐험해보세요</S.Subtitle>
        </S.HeaderContent>
      </S.Header>

      <S.Content>
        {/* 필터/검색 섹션 */}
        <S.FilterSection>
          <S.SearchBox>
            <FaSearch />
            <input
              type="text"
              placeholder="유니버스 또는 크리에이터 검색..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </S.SearchBox>

          <S.SortButtons>
            <S.SortButton
              $active={sortBy === "latest"}
              onClick={() => setSortBy("latest")}
            >
              최신순
            </S.SortButton>
            <S.SortButton
              $active={sortBy === "popular"}
              onClick={() => setSortBy("popular")}
            >
              인기순
            </S.SortButton>
          </S.SortButtons>
        </S.FilterSection>

        {/* 유니버스 그리드 */}
        <S.UniverseGrid>
          {sortedData.map((universe) => (
            <S.UniverseCard
              key={universe.id}
              onClick={() => handleCardClick(universe.id)}
            >
              <S.CardThumbnail>
                <S.ThumbnailImage src={universe.thumbnail} alt={universe.title} />
                <S.ThumbnailOverlay />
                {universe.isLive && <S.LiveBadge>LIVE</S.LiveBadge>}
                <S.CardStats>
                  <S.StatBadge>
                    <FaHeart /> {(universe.likes / 1000).toFixed(1)}K
                  </S.StatBadge>
                  <S.StatBadge>
                    <FaEye /> {(universe.views / 1000).toFixed(1)}K
                  </S.StatBadge>
                </S.CardStats>
              </S.CardThumbnail>

              <S.CardContent>
                <S.CardTitle>{universe.title}</S.CardTitle>
                <S.CreatorInfo>
                  <S.CreatorAvatar>{universe.creator.avatar}</S.CreatorAvatar>
                  <S.CreatorName>
                    <h4>{universe.creator.name}</h4>
                    <span>{universe.createdAt}</span>
                  </S.CreatorName>
                  <S.BookmarkButton
                    $active={bookmarkedItems.has(universe.id)}
                    onClick={(e) => handleBookmark(e, universe.id)}
                  >
                    {bookmarkedItems.has(universe.id) ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </S.BookmarkButton>
                </S.CreatorInfo>
              </S.CardContent>
            </S.UniverseCard>
          ))}
        </S.UniverseGrid>

        {/* 더보기 버튼 */}
        <S.LoadMoreButton>더 많은 유니버스 보기</S.LoadMoreButton>
      </S.Content>

      {/* 플로팅 생성 버튼 */}
      <S.FloatingButton onClick={handleCreateClick}>
        <FaPlus />
      </S.FloatingButton>
    </S.Container>
  );
};

export default Universe;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaBookmark, FaRegBookmark, FaEye, FaPlus, FaEdit, FaMusic, FaGamepad, FaPalette, FaBook, FaMoon, FaFire, FaSignInAlt } from "react-icons/fa";
import * as S from "./Universe.style";
import { AuthContext } from "../../context/Authcontext";
import useModalStore from "../../store/useModalStore";

// 카테고리 데이터
const CATEGORIES = [
  { id: "all", label: "전체", icon: <FaFire /> },
  { id: "music", label: "음악", icon: <FaMusic /> },
  { id: "art", label: "예술", icon: <FaPalette /> },
  { id: "gaming", label: "게임", icon: <FaGamepad /> },
  { id: "study", label: "공부", icon: <FaBook /> },
  { id: "mood", label: "감성", icon: <FaMoon /> },
];

// 내 유니버스 더미 데이터
const myUniverseData = {
  id: 1,
  title: "Midnight Vibes Universe",
  description: "새벽 감성 가득한 나만의 공간",
  background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b4e 100%)",
  widgetCount: 12,
  likes: 2340,
  views: 12500,
  isPublic: true,
  updatedAt: "2시간 전",
};

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
  const { auth } = useContext(AuthContext);
  const { openModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBookmark = (e, id) => {
    e.stopPropagation();
    if (!auth.isAuthenticated) {
      openModal("login");
      return;
    }
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
    if (!auth.isAuthenticated) {
      openModal("login");
      return;
    }
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
        {/* 내 유니버스 배너 - 로그인 시에만 표시 */}
        {auth.isAuthenticated ? (
          <S.MyUniverseBanner>
            <S.MyUniversePreview style={{ background: myUniverseData.background }}>
              <S.MyUniverseOverlay />
              <S.MyUniversePreviewContent>
                <S.MyUniverseSticker>🌙</S.MyUniverseSticker>
                <S.MyUniverseSticker style={{ top: "20%", right: "15%", fontSize: "1.5rem" }}>✨</S.MyUniverseSticker>
                <S.MyUniverseSticker style={{ bottom: "25%", left: "20%", fontSize: "1.8rem" }}>💜</S.MyUniverseSticker>
              </S.MyUniversePreviewContent>
            </S.MyUniversePreview>
            <S.MyUniverseInfo>
              <S.MyUniverseLabel>나의 유니버스</S.MyUniverseLabel>
              <S.MyUniverseName>{myUniverseData.title}</S.MyUniverseName>
              <S.MyUniverseDesc>{myUniverseData.description}</S.MyUniverseDesc>
              <S.MyUniverseStats>
                <span><FaHeart /> {myUniverseData.likes.toLocaleString()}</span>
                <span><FaEye /> {myUniverseData.views.toLocaleString()}</span>
                <span>위젯 {myUniverseData.widgetCount}개</span>
                <span>{myUniverseData.updatedAt} 수정</span>
              </S.MyUniverseStats>
              <S.MyUniverseActions>
                <S.MyUniverseEditBtn onClick={() => navigate(`/my-universe`)}>
                  <FaEdit /> 편집하기
                </S.MyUniverseEditBtn>
                <S.MyUniverseViewBtn onClick={() => navigate(`/universe/${myUniverseData.id}`)}>
                  <FaEye /> 보기
                </S.MyUniverseViewBtn>
              </S.MyUniverseActions>
            </S.MyUniverseInfo>
          </S.MyUniverseBanner>
        ) : (
          <S.MyUniverseBanner onClick={() => openModal("login")} style={{ cursor: "pointer" }}>
            <S.MyUniversePreview style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
              <S.MyUniverseOverlay />
              <S.MyUniversePreviewContent>
                <S.MyUniverseSticker>🌌</S.MyUniverseSticker>
                <S.MyUniverseSticker style={{ top: "20%", right: "15%", fontSize: "1.5rem" }}>✨</S.MyUniverseSticker>
              </S.MyUniversePreviewContent>
            </S.MyUniversePreview>
            <S.MyUniverseInfo>
              <S.MyUniverseLabel>나만의 유니버스를 만들어보세요</S.MyUniverseLabel>
              <S.MyUniverseName>로그인하고 시작하기</S.MyUniverseName>
              <S.MyUniverseDesc>로그인하면 나만의 유니버스를 꾸미고 다른 사람들과 공유할 수 있어요</S.MyUniverseDesc>
              <S.MyUniverseActions>
                <S.MyUniverseEditBtn onClick={(e) => { e.stopPropagation(); openModal("login"); }}>
                  <FaSignInAlt /> 로그인하기
                </S.MyUniverseEditBtn>
              </S.MyUniverseActions>
            </S.MyUniverseInfo>
          </S.MyUniverseBanner>
        )}

        {/* 카테고리 탭 */}
        <S.CategoryTabs>
          {CATEGORIES.map((cat) => (
            <S.CategoryTab
              key={cat.id}
              $active={category === cat.id}
              onClick={() => setCategory(cat.id)}
            >
              {cat.icon} {cat.label}
            </S.CategoryTab>
          ))}
        </S.CategoryTabs>

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

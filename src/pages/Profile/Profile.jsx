import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPen,
  FaShareAlt,
  FaHeart,
  FaVideo,
  FaGlobe,
  FaBookmark,
  FaComment,
  FaEye,
  FaPlay,
} from "react-icons/fa";
import * as S from "./Profile.style";

// 더미 데이터
const myShortformsData = [
  {
    id: 1,
    title: "NewJeans - Super Shy 커버 🐰",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    likes: 1250,
    views: 5600,
    createdAt: "3일 전",
  },
  {
    id: 2,
    title: "aespa - Spicy Dance",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=600&fit=crop",
    likes: 890,
    views: 3200,
    createdAt: "1주 전",
  },
];

const myUniversesData = [
  {
    id: 1,
    title: "Midnight Vibes Space 🌙",
    thumbnail: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=400&fit=crop",
    likes: 340,
    views: 1500,
    createdAt: "2일 전",
  },
];

const likedShortformsData = [
  {
    id: 3,
    title: "IVE - I AM Cover",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop",
    likes: 2100,
    views: 8900,
    creator: "DancerKim",
  },
  {
    id: 4,
    title: "LE SSERAFIM - UNFORGIVEN",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop",
    likes: 3500,
    views: 15000,
    creator: "KpopDancer",
  },
];

const bookmarkedUniversesData = [
  {
    id: 2,
    title: "K-Pop Aesthetic Space ✨",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
    likes: 5670,
    creator: "KpopStan",
  },
  {
    id: 3,
    title: "Lo-Fi Study Room 📚",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    likes: 3450,
    creator: "StudyWithMe",
  },
];

const myCommentsData = [
  {
    id: 1,
    targetType: "SHORTFORM",
    targetTitle: "NewJeans - Super Shy 커버",
    content: "와 진짜 춤 너무 잘 추신다!! 저도 배우고 싶어요 🔥",
    createdAt: "2시간 전",
  },
  {
    id: 2,
    targetType: "SHORTFORM",
    targetTitle: "aespa - Spicy Dance",
    content: "에스파 느낌 제대로네요 ㅋㅋ",
    createdAt: "1일 전",
  },
  {
    id: 3,
    targetType: "SHORTFORM",
    targetTitle: "IVE - I AM Cover",
    content: "퀄리티 미쳤다... 프로 아니세요?",
    createdAt: "3일 전",
  },
];

const TABS = [
  { id: "myShortforms", label: "내 숏폼", icon: FaVideo, count: 2 },
  { id: "myUniverses", label: "내 유니버스", icon: FaGlobe, count: 1 },
  { id: "likedShortforms", label: "좋아요한 숏폼", icon: FaHeart, count: 2 },
  { id: "bookmarkedUniverses", label: "찜한 유니버스", icon: FaBookmark, count: 2 },
  { id: "myComments", label: "내 댓글", icon: FaComment, count: 3 },
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myShortforms");

  const handleCardClick = (type, id) => {
    if (type === "shortform") {
      navigate(`/shorts`);
    } else if (type === "universe") {
      navigate(`/universe/${id}`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "myShortforms":
        return myShortformsData.length > 0 ? (
          <S.ContentGrid>
            {myShortformsData.map((item) => (
              <S.ContentCard key={item.id} onClick={() => handleCardClick("shortform", item.id)}>
                <S.CardThumbnail $ratio="9 / 16">
                  <img src={item.thumbnail} alt={item.title} />
                  <S.CardBadge>숏폼</S.CardBadge>
                </S.CardThumbnail>
                <S.CardInfo>
                  <h3>{item.title}</h3>
                  <p>{item.createdAt}</p>
                  <S.CardStats>
                    <S.CardStat><FaHeart /> {item.likes}</S.CardStat>
                    <S.CardStat><FaEye /> {item.views}</S.CardStat>
                  </S.CardStats>
                </S.CardInfo>
              </S.ContentCard>
            ))}
          </S.ContentGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>📹</S.EmptyIcon>
            <S.EmptyTitle>아직 업로드한 숏폼이 없어요</S.EmptyTitle>
            <S.EmptyDescription>첫 번째 숏폼을 만들어보세요!</S.EmptyDescription>
            <S.EmptyButton to="/shorts/upload">숏폼 만들기</S.EmptyButton>
          </S.EmptyState>
        );

      case "myUniverses":
        return myUniversesData.length > 0 ? (
          <S.ContentGrid>
            {myUniversesData.map((item) => (
              <S.ContentCard key={item.id} onClick={() => handleCardClick("universe", item.id)}>
                <S.CardThumbnail>
                  <img src={item.thumbnail} alt={item.title} />
                  <S.CardBadge>유니버스</S.CardBadge>
                </S.CardThumbnail>
                <S.CardInfo>
                  <h3>{item.title}</h3>
                  <p>{item.createdAt}</p>
                  <S.CardStats>
                    <S.CardStat><FaHeart /> {item.likes}</S.CardStat>
                    <S.CardStat><FaEye /> {item.views}</S.CardStat>
                  </S.CardStats>
                </S.CardInfo>
              </S.ContentCard>
            ))}
          </S.ContentGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>🌌</S.EmptyIcon>
            <S.EmptyTitle>아직 만든 유니버스가 없어요</S.EmptyTitle>
            <S.EmptyDescription>나만의 유니버스를 꾸며보세요!</S.EmptyDescription>
            <S.EmptyButton to="/my-universe">유니버스 만들기</S.EmptyButton>
          </S.EmptyState>
        );

      case "likedShortforms":
        return likedShortformsData.length > 0 ? (
          <S.ContentGrid>
            {likedShortformsData.map((item) => (
              <S.ContentCard key={item.id} onClick={() => handleCardClick("shortform", item.id)}>
                <S.CardThumbnail $ratio="9 / 16">
                  <img src={item.thumbnail} alt={item.title} />
                </S.CardThumbnail>
                <S.CardInfo>
                  <h3>{item.title}</h3>
                  <p>by {item.creator}</p>
                  <S.CardStats>
                    <S.CardStat><FaHeart /> {item.likes}</S.CardStat>
                    <S.CardStat><FaEye /> {item.views}</S.CardStat>
                  </S.CardStats>
                </S.CardInfo>
              </S.ContentCard>
            ))}
          </S.ContentGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>💜</S.EmptyIcon>
            <S.EmptyTitle>좋아요한 숏폼이 없어요</S.EmptyTitle>
            <S.EmptyDescription>마음에 드는 숏폼에 좋아요를 눌러보세요!</S.EmptyDescription>
            <S.EmptyButton to="/shorts">숏폼 둘러보기</S.EmptyButton>
          </S.EmptyState>
        );

      case "bookmarkedUniverses":
        return bookmarkedUniversesData.length > 0 ? (
          <S.ContentGrid>
            {bookmarkedUniversesData.map((item) => (
              <S.ContentCard key={item.id} onClick={() => handleCardClick("universe", item.id)}>
                <S.CardThumbnail>
                  <img src={item.thumbnail} alt={item.title} />
                </S.CardThumbnail>
                <S.CardInfo>
                  <h3>{item.title}</h3>
                  <p>by {item.creator}</p>
                  <S.CardStats>
                    <S.CardStat><FaHeart /> {item.likes}</S.CardStat>
                  </S.CardStats>
                </S.CardInfo>
              </S.ContentCard>
            ))}
          </S.ContentGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>⭐</S.EmptyIcon>
            <S.EmptyTitle>찜한 유니버스가 없어요</S.EmptyTitle>
            <S.EmptyDescription>마음에 드는 유니버스를 찜해보세요!</S.EmptyDescription>
            <S.EmptyButton to="/universe">유니버스 둘러보기</S.EmptyButton>
          </S.EmptyState>
        );

      case "myComments":
        return myCommentsData.length > 0 ? (
          <S.CommentList>
            {myCommentsData.map((comment) => (
              <S.CommentItem key={comment.id}>
                <S.CommentHeader>
                  <S.CommentTarget>
                    {comment.targetType === "SHORTFORM" ? <FaVideo /> : <FaGlobe />}
                    <span>{comment.targetTitle}</span>에 남긴 댓글
                  </S.CommentTarget>
                  <S.CommentDate>{comment.createdAt}</S.CommentDate>
                </S.CommentHeader>
                <S.CommentContent>{comment.content}</S.CommentContent>
              </S.CommentItem>
            ))}
          </S.CommentList>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>💬</S.EmptyIcon>
            <S.EmptyTitle>작성한 댓글이 없어요</S.EmptyTitle>
            <S.EmptyDescription>숏폼에 댓글을 남겨보세요!</S.EmptyDescription>
            <S.EmptyButton to="/shorts">숏폼 둘러보기</S.EmptyButton>
          </S.EmptyState>
        );

      default:
        return null;
    }
  };

  return (
    <S.Container>
      {/* 프로필 헤더 */}
      <S.ProfileHeader>
        <S.Avatar>GZ</S.Avatar>
        <S.UserInfo>
          <h1>
            GenZ_Maker
            <S.Tag>🎵 Music Lover</S.Tag>
            <S.Tag>🎨 Creator</S.Tag>
          </h1>
          <p>
            새벽 감성 플리 모으는 중. 힙하지 않으면 안 듣습니다. 팔로우 환영! 👋
          </p>
          <S.Stats>
            <div>
              1.2k <span>Followers</span>
            </div>
            <div>
              89 <span>Following</span>
            </div>
            <div>
              <FaHeart color="#ff0080" /> 4.5k <span>Likes</span>
            </div>
          </S.Stats>
        </S.UserInfo>

        <S.ActionButtons>
          <S.EditButton to="/my-universe">
            <FaPen /> 유니버스 꾸미기
          </S.EditButton>
          <S.ShareButton>
            <FaShareAlt /> 공유
          </S.ShareButton>
        </S.ActionButtons>
      </S.ProfileHeader>

      {/* 탭 섹션 */}
      <S.TabSection>
        <S.TabList>
          {TABS.map((tab) => (
            <S.Tab
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon />
              {tab.label}
              <S.TabCount>{tab.count}</S.TabCount>
            </S.Tab>
          ))}
        </S.TabList>

        <S.TabContent>
          {renderTabContent()}
        </S.TabContent>
      </S.TabSection>
    </S.Container>
  );
};

export default Profile;

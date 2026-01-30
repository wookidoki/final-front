import React, { useState, useContext, useEffect } from "react";
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
} from "react-icons/fa";
import * as S from "./Profile.style";
import useShortsData from "../Shorts/hooks/useShortsData";
import axiosInstance from "../../services/Axios/Axios";
import { AuthContext } from "../../context/Authcontext";

const Profile = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("myShortforms");

  // --- 내 숏폼 (GET /api/shortforms/me) ---
  const { shorts: myShorts, loading: shortsLoading } = useShortsData(
    "",
    "/api/shortforms/me",
  );

  // --- 좋아요한 숏폼 (GET /api/shortforms/me/likes) ---
  const { shorts: likedShorts, loading: likedShortsLoading } = useShortsData(
    "",
    "/api/shortforms/me/likes",
  );

  // --- 찜한 유니버스 (GET /api/universes/me/bookmarks) ---
  const [bookmarkedUniverses, setBookmarkedUniverses] = useState([]);
  const [bookmarkedLoading, setBookmarkedLoading] = useState(false);

  useEffect(() => {
    const fetchBookmarkedUniverses = async () => {
      try {
        setBookmarkedLoading(true);
        const response = await axiosInstance.get(
          "/api/universes/me/bookmarks",
          {
            params: { size: 20 },
          },
        );
        const data = response.data?.data;
        setBookmarkedUniverses(data?.content || []);
      } catch (error) {
        console.error("찜한 유니버스 로딩 실패:", error);
      } finally {
        setBookmarkedLoading(false);
      }
    };
    if (auth.isAuthenticated) fetchBookmarkedUniverses();
  }, [auth.isAuthenticated]);

  // --- 내 댓글 (GET /api/shortforms/me/comments) ---
  const [myComments, setMyComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    const fetchMyComments = async () => {
      try {
        setCommentsLoading(true);
        const response = await axiosInstance.get(
          "/api/shortforms/me/comments",
          {
            params: { size: 20 },
          },
        );
        const data = response.data?.data;
        setMyComments(data?.content || []);
      } catch (error) {
        console.error("내 댓글 로딩 실패:", error);
      } finally {
        setCommentsLoading(false);
      }
    };
    if (auth.isAuthenticated) fetchMyComments();
  }, [auth.isAuthenticated]);

  // --- 유틸 함수 ---
  const getInitials = () => {
    if (auth.memberName) return auth.memberName.substring(0, 2).toUpperCase();
    if (auth.email) return auth.email.substring(0, 2).toUpperCase();
    return "GZ";
  };

  const getDisplayName = () => {
    if (auth.memberName) return auth.memberName;
    if (auth.email) return auth.email.split("@")[0];
    return "User";
  };

  // --- 탭 목록 ---
  const TABS = [
    {
      id: "myShortforms",
      label: "내 숏폼",
      icon: FaVideo,
      count: myShorts.length,
    },
    {
      id: "myUniverses",
      label: "내 유니버스",
      icon: FaGlobe,
      count: "-",
    },
    {
      id: "likedShortforms",
      label: "좋아요한 숏폼",
      icon: FaHeart,
      count: likedShorts.length,
    },
    {
      id: "bookmarkedUniverses",
      label: "찜한 유니버스",
      icon: FaBookmark,
      count: bookmarkedUniverses.length,
    },
    {
      id: "myComments",
      label: "내 댓글",
      icon: FaComment,
      count: myComments.length,
    },
  ];

  const handleCardClick = (type, id) => {
    if (type === "shortform") {
      navigate(`/shorts`);
    } else if (type === "universe") {
      navigate(`/universe/${id}`);
    }
  };

  // --- 로딩 컴포넌트 ---
  const renderLoading = () => (
    <S.EmptyState>
      <S.EmptyTitle>로딩 중...</S.EmptyTitle>
    </S.EmptyState>
  );

  // --- 탭 콘텐츠 렌더링 ---
  const renderTabContent = () => {
    switch (activeTab) {
      case "myShortforms":
        if (shortsLoading && myShorts.length === 0) return renderLoading();

        return myShorts.length > 0 ? (
          <S.ContentGrid>
            {myShorts.map((item) => (
              <S.ContentCard
                key={item.shortFormId}
                onClick={() => handleCardClick("shortform", item.shortFormId)}
              >
                <S.CardThumbnail $ratio="9 / 16">
                  <img src={item.thumbnailUrl} alt={item.shortFormTitle} />
                  <S.CardBadge>숏폼</S.CardBadge>
                </S.CardThumbnail>
                <S.CardInfo>
                  <h3>{item.shortFormTitle}</h3>
                  <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  <S.CardStats>
                    <S.CardStat>
                      <FaHeart /> {item.like || 0}
                    </S.CardStat>
                  </S.CardStats>
                </S.CardInfo>
              </S.ContentCard>
            ))}
          </S.ContentGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>📹</S.EmptyIcon>
            <S.EmptyTitle>아직 업로드한 숏폼이 없어요</S.EmptyTitle>
            <S.EmptyDescription>
              첫 번째 숏폼을 만들어보세요!
            </S.EmptyDescription>
            <S.EmptyButton to="/shorts/upload">숏폼 만들기</S.EmptyButton>
          </S.EmptyState>
        );

      // === 백엔드 API 미구현 === (고민해야함)
      case "myUniverses":
        return (
          <S.EmptyState>
            <S.EmptyIcon>🌌</S.EmptyIcon>
            <S.EmptyTitle>미구현</S.EmptyTitle>
            <S.EmptyDescription>
              내 유니버스 목록 API가 아직 준비되지 않았습니다.
            </S.EmptyDescription>
            <S.EmptyButton to="/my-universe">유니버스 만들기</S.EmptyButton>
          </S.EmptyState>
        );

      // 좋아요한 숏폼
      case "likedShortforms":
        if (likedShortsLoading && likedShorts.length === 0)
          return renderLoading();

        return likedShorts.length > 0 ? (
          <S.ContentGrid>
            {likedShorts.map((item) => (
              <S.ContentCard
                key={item.shortFormId}
                onClick={() => handleCardClick("shortform", item.shortFormId)}
              >
                <S.CardThumbnail $ratio="9 / 16">
                  <img src={item.thumbnailUrl} alt={item.shortFormTitle} />
                </S.CardThumbnail>
                <S.CardInfo>
                  <h3>{item.shortFormTitle}</h3>
                  <p>by {item.nickName}</p>
                  <S.CardStats>
                    <S.CardStat>
                      <FaHeart /> {item.like || 0}
                    </S.CardStat>
                  </S.CardStats>
                </S.CardInfo>
              </S.ContentCard>
            ))}
          </S.ContentGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>💜</S.EmptyIcon>
            <S.EmptyTitle>좋아요한 숏폼이 없어요</S.EmptyTitle>
            <S.EmptyDescription>
              마음에 드는 숏폼에 좋아요를 눌러보세요!
            </S.EmptyDescription>
            <S.EmptyButton to="/shorts">숏폼 둘러보기</S.EmptyButton>
          </S.EmptyState>
        );

      // ========== 찜한 유니버스  ==========
      case "bookmarkedUniverses":
        if (bookmarkedLoading && bookmarkedUniverses.length === 0)
          return renderLoading();

        return bookmarkedUniverses.length > 0 ? (
          <S.ContentGrid>
            {bookmarkedUniverses.map((item) => (
              <S.ContentCard
                key={item.universeId}
                onClick={() => handleCardClick("universe", item.universeId)}
              >
                <S.CardThumbnail>
                  {item.thumbnailUrl ? (
                    <img src={item.thumbnailUrl} alt={item.title} />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                      }}
                    >
                      🌌
                    </div>
                  )}
                  <S.CardBadge>유니버스</S.CardBadge>
                </S.CardThumbnail>
                <S.CardInfo>
                  <h3>{item.title}</h3>
                  <p>by {item.nickName}</p>
                  <S.CardStats>
                    <S.CardStat>
                      <FaHeart /> {item.like || 0}
                    </S.CardStat>
                    <S.CardStat>
                      <FaBookmark /> {item.bookmark || 0}
                    </S.CardStat>
                  </S.CardStats>
                </S.CardInfo>
              </S.ContentCard>
            ))}
          </S.ContentGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>⭐</S.EmptyIcon>
            <S.EmptyTitle>찜한 유니버스가 없어요</S.EmptyTitle>
            <S.EmptyDescription>
              마음에 드는 유니버스를 찜해보세요!
            </S.EmptyDescription>
            <S.EmptyButton to="/universe">유니버스 둘러보기</S.EmptyButton>
          </S.EmptyState>
        );

      // ========== 내 댓글  ==========
      case "myComments":
        if (commentsLoading && myComments.length === 0) return renderLoading();

        return myComments.length > 0 ? (
          <S.CommentList>
            {myComments.map((comment) => (
              <S.CommentItem key={comment.commentId}>
                <S.CommentHeader>
                  <S.CommentTarget>
                    {comment.targetType === "SHORTFORM" ? (
                      <FaVideo />
                    ) : (
                      <FaGlobe />
                    )}
                    <span>
                      {comment.targetType === "SHORTFORM" ? "숏폼" : "유니버스"}{" "}
                      #{comment.targetId}
                    </span>
                    에 남긴 댓글
                  </S.CommentTarget>
                  <S.CommentDate>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </S.CommentDate>
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
        <S.Avatar>{getInitials()}</S.Avatar>
        <S.UserInfo>
          <h1>
            {getDisplayName()}
            <S.Tag>🎵 Music Lover</S.Tag>
            <S.Tag>🎨 Creator</S.Tag>
          </h1>
          <p>{auth.email || "나만의 음악 세상을 만들어보세요"}</p>
          <S.Stats>
            <div>
              - <span>Followers</span>
            </div>
            <div>
              - <span>Following</span>
            </div>
            <div>
              <FaHeart color="#ff0080" /> - <span>Likes</span>
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

        <S.TabContent>{renderTabContent()}</S.TabContent>
      </S.TabSection>
    </S.Container>
  );
};

export default Profile;

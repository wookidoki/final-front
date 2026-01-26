import React, { useState } from "react";
import styled from "styled-components";
import { FaBullhorn, FaSearch, FaChevronRight, FaClock } from "react-icons/fa";
import useModalStore from "../../store/useModalStore";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  padding: 40px 60px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 40px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const SearchBar = styled.div`
  max-width: 1200px;
  margin: 0 auto 32px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSub};
    opacity: 0.6;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1.2rem;
  pointer-events: none;
`;

const NoticeList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NoticeItem = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 24px 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${({ $important, theme }) =>
    $important &&
    `
    border-color: ${theme.colors.primary};
    background: linear-gradient(to right, ${theme.colors.surface}, ${theme.colors.primary}10);
  `}

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateX(8px);
    border-color: transparent;
    box-shadow: 0 8px 24px ${({ theme }) => theme.colors.primary}30;

    &::before {
      opacity: 1;
    }
  }
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const NoticeBadge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  background: ${({ $type, theme }) => {
    switch ($type) {
      case "important":
        return theme.colors.gradient;
      case "event":
        return "#fbbf24";
      case "update":
        return "#60a5fa";
      default:
        return theme.colors.border;
    }
  }};
  color: ${({ $type }) => ($type === "normal" ? "inherit" : "white")};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
`;

const NoticeDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.9rem;
`;

const NoticeTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NoticePreview = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ArrowIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  transition: transform 0.3s ease;

  ${NoticeItem}:hover & {
    transform: translateX(4px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: ${({ theme }) => theme.colors.textSub};
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

// 더미 데이터
const dummyNotices = [
  {
    id: 1,
    type: "important",
    badge: "중요",
    title: "RE:PLAY 서비스 이용약관 개정 안내",
    preview:
      "안녕하세요, RE:PLAY입니다. 서비스 이용약관이 2024년 1월 25일부로 개정됩니다. 주요 변경사항을 확인해주세요.",
    date: "2024.01.18",
  },
  {
    id: 2,
    type: "event",
    badge: "이벤트",
    title: "🎉 신규 가입 이벤트! 프리미엄 1개월 무료",
    preview:
      "RE:PLAY에 새로 가입한 회원님들께 프리미엄 멤버십 1개월을 무료로 제공합니다. 지금 바로 가입하고 혜택을 받아보세요!",
    date: "2024.01.17",
  },
  {
    id: 3,
    type: "update",
    badge: "업데이트",
    title: "v2.5.0 업데이트 - 새로운 기능 추가",
    preview:
      "음악 추천 알고리즘 개선, 플레이리스트 공유 기능, 다크모드 커스터마이징 등 다양한 신규 기능이 추가되었습니다.",
    date: "2024.01.15",
  },
  {
    id: 4,
    type: "normal",
    badge: "공지",
    title: "정기 서버 점검 안내 (1/20 02:00-04:00)",
    preview:
      "안정적인 서비스 제공을 위해 정기 서버 점검을 실시합니다. 점검 시간 동안 서비스 이용이 일시 중단됩니다.",
    date: "2024.01.14",
  },
  {
    id: 5,
    type: "normal",
    badge: "공지",
    title: "개인정보 처리방침 변경 안내",
    preview: "개인정보 보호를 위한 정책이 강화됩니다. 변경된 개인정보 처리방침을 확인해주세요.",
    date: "2024.01.12",
  },
  {
    id: 6,
    type: "update",
    badge: "업데이트",
    title: "모바일 앱 업데이트 (v2.4.8)",
    preview: "버그 수정 및 성능 개선이 이루어졌습니다. 앱스토어에서 업데이트해주세요.",
    date: "2024.01.10",
  },
  {
    id: 7,
    type: "normal",
    badge: "공지",
    title: "연말연시 고객센터 운영 안내",
    preview: "연말연시 기간 동안 고객센터 운영시간이 변경됩니다.",
    date: "2023.12.28",
  },
];

const Notice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { openModal } = useModalStore();

  const filteredNotices = dummyNotices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNoticeClick = (notice) => {
    openModal("noticeDetail", { notice });
  };

  return (
    <Container>
      <Header>
        <Title>
          <FaBullhorn />
          공지사항
        </Title>
        <Subtitle>RE:PLAY의 새로운 소식을 확인하세요</Subtitle>
      </Header>

      <SearchBar>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="공지사항 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>

      <NoticeList>
        {filteredNotices.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyText>검색 결과가 없습니다</EmptyText>
          </EmptyState>
        ) : (
          filteredNotices.map((notice) => (
            <NoticeItem
              key={notice.id}
              $important={notice.type === "important"}
              onClick={() => handleNoticeClick(notice)}
            >
              <NoticeHeader>
                <NoticeBadge $type={notice.type}>{notice.badge}</NoticeBadge>
                <NoticeDate>
                  <FaClock />
                  {notice.date}
                </NoticeDate>
              </NoticeHeader>
              <NoticeTitle>
                {notice.title}
                <ArrowIcon>
                  <FaChevronRight />
                </ArrowIcon>
              </NoticeTitle>
              <NoticePreview>{notice.preview}</NoticePreview>
            </NoticeItem>
          ))
        )}
      </NoticeList>
    </Container>
  );
};

export default Notice;

import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaThumbtack,
  FaBell,
  FaEye,
  FaCalendar,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import * as S from "./AdminNotices.style";

// 더미 데이터
const dummyNotices = [
  {
    id: 1,
    title: "서비스 이용약관 개정 안내",
    content:
      "안녕하세요, RE:PLAY입니다. 서비스 이용약관이 2024년 2월 1일부터 일부 개정됩니다. 주요 변경 사항은 개인정보 처리 방침 및 콘텐츠 이용 정책에 관한 내용입니다.",
    isPinned: true,
    views: 1250,
    createdAt: "2024.01.18",
    author: "관리자",
  },
  {
    id: 2,
    title: "신규 가입 이벤트! - 첫 구독 50% 할인",
    content:
      "RE:PLAY에 오신 것을 환영합니다! 신규 가입자를 위한 특별 이벤트를 진행합니다. 첫 달 프리미엄 구독을 50% 할인된 가격으로 이용해보세요.",
    isPinned: true,
    views: 3420,
    createdAt: "2024.01.17",
    author: "관리자",
  },
  {
    id: 3,
    title: "v2.5.0 업데이트 안내 - 새로운 기능 추가",
    content:
      "RE:PLAY v2.5.0 업데이트가 적용되었습니다. 이번 업데이트에서는 유니버스 꾸미기 기능이 대폭 개선되었고, 새로운 스티커와 배경이 추가되었습니다.",
    isPinned: false,
    views: 2100,
    createdAt: "2024.01.15",
    author: "개발팀",
  },
  {
    id: 4,
    title: "서버 점검 안내 (1/20 새벽 2시~4시)",
    content:
      "서비스 안정화를 위한 정기 점검이 예정되어 있습니다. 점검 시간 동안에는 서비스 이용이 일시적으로 제한됩니다. 양해 부탁드립니다.",
    isPinned: false,
    views: 890,
    createdAt: "2024.01.14",
    author: "운영팀",
  },
  {
    id: 5,
    title: "커뮤니티 가이드라인 안내",
    content:
      "RE:PLAY 커뮤니티를 건강하게 유지하기 위한 가이드라인을 안내드립니다. 모든 사용자가 즐겁게 이용할 수 있도록 서로 존중하는 문화를 만들어 주세요.",
    isPinned: false,
    views: 1560,
    createdAt: "2024.01.10",
    author: "관리자",
  },
];

const AdminNotices = () => {
  const [notices, setNotices] = useState(dummyNotices);
  const [filteredNotices, setFilteredNotices] = useState(dummyNotices);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPinned: false,
  });

  const itemsPerPage = 5;

  useEffect(() => {
    // TODO: API 연동
    // fetchNotices();
  }, []);

  useEffect(() => {
    let filtered = notices;

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 타입 필터
    if (filterType === "pinned") {
      filtered = filtered.filter((n) => n.isPinned);
    }

    // 고정 공지를 먼저 표시
    filtered = [...filtered].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

    setFilteredNotices(filtered);
    setCurrentPage(1);
  }, [searchQuery, filterType, notices]);

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData({ title: "", content: "", isPinned: false });
    setIsModalOpen(true);
  };

  const openEditModal = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      isPinned: notice.isPinned,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (editingNotice) {
      // 수정
      setNotices(
        notices.map((n) =>
          n.id === editingNotice.id ? { ...n, ...formData } : n
        )
      );
    } else {
      // 새로 생성
      const newNotice = {
        id: Date.now(),
        ...formData,
        views: 0,
        createdAt: new Date().toLocaleDateString("ko-KR").replace(/\./g, "."),
        author: "관리자",
      };
      setNotices([newNotice, ...notices]);
    }

    setIsModalOpen(false);
    setFormData({ title: "", content: "", isPinned: false });
  };

  const handleDelete = (noticeId) => {
    if (window.confirm("정말 이 공지사항을 삭제하시겠습니까?")) {
      // TODO: API 연동
      setNotices(notices.filter((n) => n.id !== noticeId));
    }
  };

  const togglePin = (noticeId) => {
    setNotices(
      notices.map((n) =>
        n.id === noticeId ? { ...n, isPinned: !n.isPinned } : n
      )
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <S.Title>공지사항 관리</S.Title>
          <S.Subtitle>전체 {notices.length}개의 공지사항</S.Subtitle>
        </S.HeaderLeft>
        <S.HeaderRight>
          <S.BackButton to="/admin">
            <FaArrowLeft />
            대시보드
          </S.BackButton>
          <S.AddButton onClick={openCreateModal}>
            <FaPlus />
            새 공지사항
          </S.AddButton>
        </S.HeaderRight>
      </S.Header>

      <S.FilterSection>
        <S.SearchBox>
          <FaSearch />
          <S.SearchInput
            type="text"
            placeholder="제목 또는 내용으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </S.SearchBox>

        <S.FilterGroup>
          <S.FilterSelect
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">모든 공지</option>
            <option value="pinned">고정 공지만</option>
          </S.FilterSelect>
        </S.FilterGroup>
      </S.FilterSection>

      {paginatedNotices.length > 0 ? (
        <>
          <S.NoticeList>
            {paginatedNotices.map((notice) => (
              <S.NoticeCard key={notice.id}>
                <S.NoticeHeader>
                  <S.NoticeInfo>
                    <S.NoticeTitleRow>
                      <S.NoticeTitle>{notice.title}</S.NoticeTitle>
                      {notice.isPinned && (
                        <S.PinnedBadge>
                          <FaThumbtack /> 고정
                        </S.PinnedBadge>
                      )}
                    </S.NoticeTitleRow>
                    <S.NoticeMeta>
                      <span>
                        <FaCalendar /> {notice.createdAt}
                      </span>
                      <span>
                        <FaEye /> {notice.views.toLocaleString()}
                      </span>
                      <span>작성자: {notice.author}</span>
                    </S.NoticeMeta>
                  </S.NoticeInfo>
                  <S.NoticeActions>
                    <S.ActionButton
                      $variant="pin"
                      title={notice.isPinned ? "고정 해제" : "상단 고정"}
                      onClick={() => togglePin(notice.id)}
                    >
                      <FaThumbtack />
                    </S.ActionButton>
                    <S.ActionButton
                      $variant="edit"
                      title="수정"
                      onClick={() => openEditModal(notice)}
                    >
                      <FaEdit />
                    </S.ActionButton>
                    <S.ActionButton
                      $variant="delete"
                      title="삭제"
                      onClick={() => handleDelete(notice.id)}
                    >
                      <FaTrash />
                    </S.ActionButton>
                  </S.NoticeActions>
                </S.NoticeHeader>
                <S.NoticeContent>{notice.content}</S.NoticeContent>
              </S.NoticeCard>
            ))}
          </S.NoticeList>

          {totalPages > 1 && (
            <S.Pagination>
              <S.PageButton
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </S.PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <S.PageButton
                    key={page}
                    $active={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </S.PageButton>
                )
              )}
              <S.PageButton
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </S.PageButton>
            </S.Pagination>
          )}
        </>
      ) : (
        <S.EmptyState>
          <FaBell />
          <p>공지사항이 없습니다</p>
          <S.AddButton onClick={openCreateModal}>
            <FaPlus />
            첫 공지사항 작성하기
          </S.AddButton>
        </S.EmptyState>
      )}

      {/* 공지사항 작성/수정 모달 */}
      {isModalOpen && (
        <S.Modal onClick={() => setIsModalOpen(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>
                {editingNotice ? "공지사항 수정" : "새 공지사항 작성"}
              </S.ModalTitle>
              <S.ModalClose onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </S.ModalClose>
            </S.ModalHeader>
            <S.ModalBody>
              <S.FormGroup>
                <S.FormLabel>제목</S.FormLabel>
                <S.FormInput
                  type="text"
                  placeholder="공지사항 제목을 입력하세요"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.FormLabel>내용</S.FormLabel>
                <S.FormTextarea
                  placeholder="공지사항 내용을 입력하세요"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.FormCheckbox>
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={formData.isPinned}
                    onChange={(e) =>
                      setFormData({ ...formData, isPinned: e.target.checked })
                    }
                  />
                  <label htmlFor="isPinned">상단에 고정하기</label>
                </S.FormCheckbox>
              </S.FormGroup>
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalButton onClick={() => setIsModalOpen(false)}>
                취소
              </S.ModalButton>
              <S.ModalButton $variant="primary" onClick={handleSave}>
                {editingNotice ? "수정" : "등록"}
              </S.ModalButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
};

export default AdminNotices;

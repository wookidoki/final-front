import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaThumbtack, FaBell, FaEye, FaCalendar } from "react-icons/fa";
import { SearchBar, Pagination, Modal } from "../../../components/common";
import {
  PageContainer, PageHeader, PageHeaderLeft, PageHeaderRight, PageTitle, PageSubtitle, BackButton,
} from "../../../styles/common/PageLayout";
import { FilterSection, FilterGroup, FilterSelect } from "../../../styles/common/Filter";
import { IconButton, PrimaryButton, SecondaryButton } from "../../../styles/common/Button";
import { PinnedBadge } from "../../../styles/common/Badge";
import { FormGroup, FormLabel, FormInput, FormTextarea, FormCheckbox } from "../../../styles/common/Form";
import { EmptyState } from "../../../styles/common/EmptyState";
import * as S from "./AdminNotices.style";

const dummyNotices = [
  { id: 1, title: "서비스 이용약관 개정 안내", content: "안녕하세요, RE:PLAY입니다. 서비스 이용약관이 2024년 2월 1일부터 일부 개정됩니다.", isPinned: true, views: 1250, createdAt: "2024.01.18", author: "관리자" },
  { id: 2, title: "신규 가입 이벤트! - 첫 구독 50% 할인", content: "RE:PLAY에 오신 것을 환영합니다! 신규 가입자를 위한 특별 이벤트를 진행합니다.", isPinned: true, views: 3420, createdAt: "2024.01.17", author: "관리자" },
  { id: 3, title: "v2.5.0 업데이트 안내", content: "RE:PLAY v2.5.0 업데이트가 적용되었습니다.", isPinned: false, views: 2100, createdAt: "2024.01.15", author: "개발팀" },
];

const AdminNotices = () => {
  const [notices, setNotices] = useState(dummyNotices);
  const [filteredNotices, setFilteredNotices] = useState(dummyNotices);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", isPinned: false });

  const itemsPerPage = 5;

  useEffect(() => {
    let filtered = notices;
    if (searchQuery) {
      filtered = filtered.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (filterType === "pinned") filtered = filtered.filter(n => n.isPinned);
    filtered = [...filtered].sort((a, b) => (a.isPinned && !b.isPinned ? -1 : !a.isPinned && b.isPinned ? 1 : 0));
    setFilteredNotices(filtered);
    setCurrentPage(1);
  }, [searchQuery, filterType, notices]);

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const paginatedNotices = filteredNotices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openCreateModal = () => { setEditingNotice(null); setFormData({ title: "", content: "", isPinned: false }); setIsModalOpen(true); };
  const openEditModal = (notice) => { setEditingNotice(notice); setFormData({ title: notice.title, content: notice.content, isPinned: notice.isPinned }); setIsModalOpen(true); };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) { alert("제목과 내용을 입력해주세요."); return; }
    if (editingNotice) {
      setNotices(notices.map(n => n.id === editingNotice.id ? { ...n, ...formData } : n));
    } else {
      setNotices([{ id: Date.now(), ...formData, views: 0, createdAt: new Date().toLocaleDateString("ko-KR"), author: "관리자" }, ...notices]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => { if (window.confirm("정말 삭제하시겠습니까?")) setNotices(notices.filter(n => n.id !== id)); };
  const togglePin = (id) => { setNotices(notices.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n)); };

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>공지사항 관리</PageTitle>
          <PageSubtitle>전체 {notices.length}개의 공지사항</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight>
          <BackButton to="/admin"><FaArrowLeft /> 대시보드</BackButton>
          <PrimaryButton onClick={openCreateModal}><FaPlus /> 새 공지사항</PrimaryButton>
        </PageHeaderRight>
      </PageHeader>

      <FilterSection>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="제목 또는 내용으로 검색..." />
        <FilterGroup>
          <FilterSelect value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">모든 공지</option>
            <option value="pinned">고정 공지만</option>
          </FilterSelect>
        </FilterGroup>
      </FilterSection>

      {paginatedNotices.length > 0 ? (
        <>
          <S.NoticeList>
            {paginatedNotices.map(notice => (
              <S.NoticeCard key={notice.id}>
                <S.NoticeHeader>
                  <S.NoticeInfo>
                    <S.NoticeTitleRow>
                      <S.NoticeTitle>{notice.title}</S.NoticeTitle>
                      {notice.isPinned && <PinnedBadge><FaThumbtack /> 고정</PinnedBadge>}
                    </S.NoticeTitleRow>
                    <S.NoticeMeta>
                      <span><FaCalendar /> {notice.createdAt}</span>
                      <span><FaEye /> {notice.views.toLocaleString()}</span>
                      <span>작성자: {notice.author}</span>
                    </S.NoticeMeta>
                  </S.NoticeInfo>
                  <S.NoticeActions>
                    <IconButton $variant="warning" onClick={() => togglePin(notice.id)}><FaThumbtack /></IconButton>
                    <IconButton $variant="primary" onClick={() => openEditModal(notice)}><FaEdit /></IconButton>
                    <IconButton $variant="danger" onClick={() => handleDelete(notice.id)}><FaTrash /></IconButton>
                  </S.NoticeActions>
                </S.NoticeHeader>
                <S.NoticeContent>{notice.content}</S.NoticeContent>
              </S.NoticeCard>
            ))}
          </S.NoticeList>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} borderTop={false} padding="32px 0" />
        </>
      ) : (
        <EmptyState $withBg><FaBell /><p>공지사항이 없습니다</p><PrimaryButton onClick={openCreateModal}><FaPlus /> 첫 공지사항 작성하기</PrimaryButton></EmptyState>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingNotice ? "공지사항 수정" : "새 공지사항 작성"} size="lg"
        footer={<><SecondaryButton onClick={() => setIsModalOpen(false)}>취소</SecondaryButton><PrimaryButton onClick={handleSave}>{editingNotice ? "수정" : "등록"}</PrimaryButton></>}>
        <FormGroup>
          <FormLabel>제목</FormLabel>
          <FormInput placeholder="공지사항 제목을 입력하세요" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <FormLabel>내용</FormLabel>
          <FormTextarea $minHeight="200px" placeholder="공지사항 내용을 입력하세요" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <FormCheckbox>
            <input type="checkbox" id="isPinned" checked={formData.isPinned} onChange={e => setFormData({...formData, isPinned: e.target.checked})} />
            <label htmlFor="isPinned">상단에 고정하기</label>
          </FormCheckbox>
        </FormGroup>
      </Modal>
    </PageContainer>
  );
};

export default AdminNotices;

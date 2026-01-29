import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import * as S from "./AdminMembers.style";

// 더미 데이터
const dummyMembers = [
  {
    id: 1,
    name: "GenZ_Maker",
    email: "genz@email.com",
    role: "user",
    status: "active",
    joinDate: "2024.01.18",
    lastLogin: "2024.01.18 14:30",
  },
  {
    id: 2,
    name: "MusicLover",
    email: "music@email.com",
    role: "user",
    status: "active",
    joinDate: "2024.01.18",
    lastLogin: "2024.01.18 12:15",
  },
  {
    id: 3,
    name: "AdminUser",
    email: "admin@replay.com",
    role: "admin",
    status: "active",
    joinDate: "2024.01.01",
    lastLogin: "2024.01.18 15:00",
  },
  {
    id: 4,
    name: "NightOwl",
    email: "night@email.com",
    role: "user",
    status: "inactive",
    joinDate: "2024.01.17",
    lastLogin: "2024.01.10 23:45",
  },
  {
    id: 5,
    name: "DancerKim",
    email: "dancer@email.com",
    role: "user",
    status: "suspended",
    joinDate: "2024.01.15",
    lastLogin: "2024.01.14 18:20",
  },
  {
    id: 6,
    name: "KpopStan",
    email: "kpop@email.com",
    role: "user",
    status: "active",
    joinDate: "2024.01.14",
    lastLogin: "2024.01.18 11:00",
  },
  {
    id: 7,
    name: "BeatMaker",
    email: "beat@email.com",
    role: "user",
    status: "active",
    joinDate: "2024.01.13",
    lastLogin: "2024.01.17 20:30",
  },
  {
    id: 8,
    name: "SingerLee",
    email: "singer@email.com",
    role: "user",
    status: "active",
    joinDate: "2024.01.12",
    lastLogin: "2024.01.18 09:15",
  },
];

const AdminMembers = () => {
  const [members, setMembers] = useState(dummyMembers);
  const [filteredMembers, setFilteredMembers] = useState(dummyMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    // TODO: API 연동
    // fetchMembers();
  }, []);

  useEffect(() => {
    let filtered = members;

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 상태 필터
    if (statusFilter !== "all") {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }

    // 역할 필터
    if (roleFilter !== "all") {
      filtered = filtered.filter((m) => m.role === roleFilter);
    }

    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, roleFilter, members]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (member) => {
    setSelectedMember({ ...member });
    setIsModalOpen(true);
  };

  const handleDelete = (memberId) => {
    if (window.confirm("정말 이 회원을 삭제하시겠습니까?")) {
      // TODO: API 연동
      setMembers(members.filter((m) => m.id !== memberId));
    }
  };

  const handleSave = () => {
    // TODO: API 연동
    setMembers(
      members.map((m) => (m.id === selectedMember.id ? selectedMember : m))
    );
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "활성";
      case "inactive":
        return "비활성";
      case "suspended":
        return "정지";
      default:
        return status;
    }
  };

  const getRoleText = (role) => {
    return role === "admin" ? "관리자" : "일반회원";
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <S.Title>회원 관리</S.Title>
          <S.Subtitle>
            전체 회원 {members.length}명 | 검색 결과 {filteredMembers.length}명
          </S.Subtitle>
        </S.HeaderLeft>
        <S.HeaderRight>
          <S.BackButton to="/admin">
            <FaArrowLeft />
            대시보드
          </S.BackButton>
        </S.HeaderRight>
      </S.Header>

      <S.FilterSection>
        <S.SearchBox>
          <FaSearch />
          <S.SearchInput
            type="text"
            placeholder="이름 또는 이메일로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </S.SearchBox>

        <S.FilterGroup>
          <S.FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="suspended">정지</option>
          </S.FilterSelect>

          <S.FilterSelect
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">모든 역할</option>
            <option value="admin">관리자</option>
            <option value="user">일반회원</option>
          </S.FilterSelect>
        </S.FilterGroup>
      </S.FilterSection>

      <S.TableCard>
        {paginatedMembers.length > 0 ? (
          <>
            <S.Table>
              <S.TableHeader>
                <tr>
                  <S.TableHeaderCell>회원 정보</S.TableHeaderCell>
                  <S.TableHeaderCell>역할</S.TableHeaderCell>
                  <S.TableHeaderCell>상태</S.TableHeaderCell>
                  <S.TableHeaderCell>가입일</S.TableHeaderCell>
                  <S.TableHeaderCell>최근 접속</S.TableHeaderCell>
                  <S.TableHeaderCell>관리</S.TableHeaderCell>
                </tr>
              </S.TableHeader>
              <S.TableBody>
                {paginatedMembers.map((member) => (
                  <S.TableRow key={member.id}>
                    <S.TableCell>
                      <S.MemberInfo>
                        <S.MemberAvatar>{member.name[0]}</S.MemberAvatar>
                        <S.MemberDetails>
                          <S.MemberName>{member.name}</S.MemberName>
                          <S.MemberEmail>{member.email}</S.MemberEmail>
                        </S.MemberDetails>
                      </S.MemberInfo>
                    </S.TableCell>
                    <S.TableCell>
                      <S.RoleBadge $role={member.role}>
                        {getRoleText(member.role)}
                      </S.RoleBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.StatusBadge $status={member.status}>
                        {getStatusText(member.status)}
                      </S.StatusBadge>
                    </S.TableCell>
                    <S.TableCell>
                      <S.DateText>{member.joinDate}</S.DateText>
                    </S.TableCell>
                    <S.TableCell>
                      <S.DateText>{member.lastLogin}</S.DateText>
                    </S.TableCell>
                    <S.TableCell>
                      <S.ActionButtons>
                        <S.ActionButton
                          $variant="view"
                          title="상세보기"
                          onClick={() => handleEdit(member)}
                        >
                          <FaEye />
                        </S.ActionButton>
                        <S.ActionButton
                          $variant="edit"
                          title="수정"
                          onClick={() => handleEdit(member)}
                        >
                          <FaEdit />
                        </S.ActionButton>
                        <S.ActionButton
                          $variant="delete"
                          title="삭제"
                          onClick={() => handleDelete(member.id)}
                        >
                          <FaTrash />
                        </S.ActionButton>
                      </S.ActionButtons>
                    </S.TableCell>
                  </S.TableRow>
                ))}
              </S.TableBody>
            </S.Table>

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
            <FaUsers />
            <p>검색 결과가 없습니다</p>
          </S.EmptyState>
        )}
      </S.TableCard>

      {/* 회원 수정 모달 */}
      {isModalOpen && selectedMember && (
        <S.Modal onClick={() => setIsModalOpen(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>회원 정보 수정</S.ModalTitle>
              <S.ModalClose onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </S.ModalClose>
            </S.ModalHeader>
            <S.ModalBody>
              <S.FormGroup>
                <S.FormLabel>이름</S.FormLabel>
                <S.FormInput
                  type="text"
                  value={selectedMember.name}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, name: e.target.value })
                  }
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.FormLabel>이메일</S.FormLabel>
                <S.FormInput
                  type="email"
                  value={selectedMember.email}
                  disabled
                />
              </S.FormGroup>
              <S.FormGroup>
                <S.FormLabel>역할</S.FormLabel>
                <S.FormSelect
                  value={selectedMember.role}
                  onChange={(e) =>
                    setSelectedMember({ ...selectedMember, role: e.target.value })
                  }
                >
                  <option value="user">일반회원</option>
                  <option value="admin">관리자</option>
                </S.FormSelect>
              </S.FormGroup>
              <S.FormGroup>
                <S.FormLabel>상태</S.FormLabel>
                <S.FormSelect
                  value={selectedMember.status}
                  onChange={(e) =>
                    setSelectedMember({
                      ...selectedMember,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="suspended">정지</option>
                </S.FormSelect>
              </S.FormGroup>
            </S.ModalBody>
            <S.ModalFooter>
              <S.ModalButton onClick={() => setIsModalOpen(false)}>
                취소
              </S.ModalButton>
              <S.ModalButton $variant="primary" onClick={handleSave}>
                저장
              </S.ModalButton>
            </S.ModalFooter>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
};

export default AdminMembers;

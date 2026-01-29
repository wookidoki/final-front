import React, { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft, FaEdit, FaTrash, FaEye, FaUsers } from "react-icons/fa";
import { SearchBar, Pagination, Modal } from "../../../components/common";
import {
  PageContainer,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageTitle,
  PageSubtitle,
  BackButton,
} from "../../../styles/common/PageLayout";
import {
  TableCard,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableActions,
} from "../../../styles/common/Table";
import { FilterSection, FilterGroup, FilterSelect } from "../../../styles/common/Filter";
import { IconButton, PrimaryButton, SecondaryButton } from "../../../styles/common/Button";
import { StatusBadge, RoleBadge } from "../../../styles/common/Badge";
import { Avatar, AvatarGroup, AvatarInfo, AvatarName, AvatarSubtext } from "../../../styles/common/Avatar";
import { FormGroup, FormLabel, FormInput, FormSelect } from "../../../styles/common/Form";
import { EmptyState } from "../../../styles/common/EmptyState";
import * as S from "./AdminMembers.style";

const dummyMembers = [
  { id: 1, name: "GenZ_Maker", email: "genz@email.com", role: "user", status: "active", joinDate: "2024.01.18", lastLogin: "2024.01.18 14:30" },
  { id: 2, name: "MusicLover", email: "music@email.com", role: "user", status: "active", joinDate: "2024.01.18", lastLogin: "2024.01.18 12:15" },
  { id: 3, name: "AdminUser", email: "admin@replay.com", role: "admin", status: "active", joinDate: "2024.01.01", lastLogin: "2024.01.18 15:00" },
  { id: 4, name: "NightOwl", email: "night@email.com", role: "user", status: "inactive", joinDate: "2024.01.17", lastLogin: "2024.01.10 23:45" },
  { id: 5, name: "DancerKim", email: "dancer@email.com", role: "user", status: "suspended", joinDate: "2024.01.15", lastLogin: "2024.01.14 18:20" },
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
    let filtered = members;
    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== "all") filtered = filtered.filter(m => m.status === statusFilter);
    if (roleFilter !== "all") filtered = filtered.filter(m => m.role === roleFilter);
    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, roleFilter, members]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleEdit = (member) => {
    setSelectedMember({ ...member });
    setIsModalOpen(true);
  };

  const handleDelete = (memberId) => {
    if (window.confirm("정말 이 회원을 삭제하시겠습니까?")) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const handleSave = () => {
    setMembers(members.map(m => m.id === selectedMember.id ? selectedMember : m));
    setIsModalOpen(false);
  };

  const getStatusText = (status) => ({ active: "활성", inactive: "비활성", suspended: "정지" }[status] || status);
  const getRoleText = (role) => role === "admin" ? "관리자" : "일반회원";

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>회원 관리</PageTitle>
          <PageSubtitle>전체 {members.length}명 | 검색 결과 {filteredMembers.length}명</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight>
          <BackButton to="/admin"><FaArrowLeft /> 대시보드</BackButton>
        </PageHeaderRight>
      </PageHeader>

      <FilterSection>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="이름 또는 이메일로 검색..."
        />
        <FilterGroup>
          <FilterSelect value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="suspended">정지</option>
          </FilterSelect>
          <FilterSelect value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="all">모든 역할</option>
            <option value="admin">관리자</option>
            <option value="user">일반회원</option>
          </FilterSelect>
        </FilterGroup>
      </FilterSection>

      <TableCard>
        {paginatedMembers.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>회원 정보</TableHeaderCell>
                  <TableHeaderCell>역할</TableHeaderCell>
                  <TableHeaderCell>상태</TableHeaderCell>
                  <TableHeaderCell>가입일</TableHeaderCell>
                  <TableHeaderCell>최근 접속</TableHeaderCell>
                  <TableHeaderCell>관리</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {paginatedMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <AvatarGroup>
                        <Avatar>{member.name[0]}</Avatar>
                        <AvatarInfo>
                          <AvatarName>{member.name}</AvatarName>
                          <AvatarSubtext>{member.email}</AvatarSubtext>
                        </AvatarInfo>
                      </AvatarGroup>
                    </TableCell>
                    <TableCell><RoleBadge $isAdmin={member.role === "admin"}>{getRoleText(member.role)}</RoleBadge></TableCell>
                    <TableCell><StatusBadge $status={member.status}>{getStatusText(member.status)}</StatusBadge></TableCell>
                    <TableCell><S.DateText>{member.joinDate}</S.DateText></TableCell>
                    <TableCell><S.DateText>{member.lastLogin}</S.DateText></TableCell>
                    <TableCell>
                      <TableActions>
                        <IconButton $variant="info" onClick={() => handleEdit(member)}><FaEye /></IconButton>
                        <IconButton $variant="primary" onClick={() => handleEdit(member)}><FaEdit /></IconButton>
                        <IconButton $variant="danger" onClick={() => handleDelete(member.id)}><FaTrash /></IconButton>
                      </TableActions>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        ) : (
          <EmptyState><FaUsers /><p>검색 결과가 없습니다</p></EmptyState>
        )}
      </TableCard>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="회원 정보 수정"
        footer={
          <>
            <SecondaryButton onClick={() => setIsModalOpen(false)}>취소</SecondaryButton>
            <PrimaryButton onClick={handleSave}>저장</PrimaryButton>
          </>
        }
      >
        {selectedMember && (
          <>
            <FormGroup>
              <FormLabel>이름</FormLabel>
              <FormInput value={selectedMember.name} onChange={e => setSelectedMember({...selectedMember, name: e.target.value})} />
            </FormGroup>
            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <FormInput value={selectedMember.email} disabled />
            </FormGroup>
            <FormGroup>
              <FormLabel>역할</FormLabel>
              <FormSelect value={selectedMember.role} onChange={e => setSelectedMember({...selectedMember, role: e.target.value})}>
                <option value="user">일반회원</option>
                <option value="admin">관리자</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>상태</FormLabel>
              <FormSelect value={selectedMember.status} onChange={e => setSelectedMember({...selectedMember, status: e.target.value})}>
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
                <option value="suspended">정지</option>
              </FormSelect>
            </FormGroup>
          </>
        )}
      </Modal>
    </PageContainer>
  );
};

export default AdminMembers;

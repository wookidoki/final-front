import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaMusic,
  FaGlobe,
  FaVideo,
  FaChartLine,
  FaUserPlus,
  FaEye,
  FaHeart,
  FaBell,
  FaCog,
} from "react-icons/fa";
import * as S from "./AdminDashboard.style";

// 더미 데이터
const dashboardData = {
  summary: {
    totalMembers: 12450,
    newMembersToday: 156,
    totalUniverses: 3420,
    totalShortforms: 8930,
    activeUsers: 2340,
    totalLikes: 125600,
  },
  memberStats: {
    active: 85,
    inactive: 10,
    suspended: 5,
  },
  recentMembers: [
    { id: 1, name: "GenZ_Maker", email: "genz@email.com", joinDate: "2024.01.18", status: "active" },
    { id: 2, name: "MusicLover", email: "music@email.com", joinDate: "2024.01.18", status: "active" },
    { id: 3, name: "NightOwl", email: "night@email.com", joinDate: "2024.01.17", status: "active" },
    { id: 4, name: "DancerKim", email: "dancer@email.com", joinDate: "2024.01.17", status: "pending" },
    { id: 5, name: "KpopStan", email: "kpop@email.com", joinDate: "2024.01.16", status: "active" },
  ],
  recentNotices: [
    { id: 1, title: "서비스 이용약관 개정 안내", date: "2024.01.18", views: 1250 },
    { id: 2, title: "신규 가입 이벤트!", date: "2024.01.17", views: 3420 },
    { id: 3, title: "v2.5.0 업데이트 안내", date: "2024.01.15", views: 2100 },
  ],
};

const AdminDashboard = () => {
  const [data, setData] = useState(dashboardData);

  useEffect(() => {
    // TODO: API 연동
    // fetchDashboardData();
  }, []);

  const statCards = [
    {
      icon: <FaUsers />,
      label: "전체 회원",
      value: data.summary.totalMembers.toLocaleString(),
      change: `+${data.summary.newMembersToday} 오늘`,
      color: "#ff0080",
    },
    {
      icon: <FaGlobe />,
      label: "유니버스",
      value: data.summary.totalUniverses.toLocaleString(),
      change: "+48 이번주",
      color: "#8b5cf6",
    },
    {
      icon: <FaVideo />,
      label: "숏폼",
      value: data.summary.totalShortforms.toLocaleString(),
      change: "+127 이번주",
      color: "#06b6d4",
    },
    {
      icon: <FaEye />,
      label: "활성 사용자",
      value: data.summary.activeUsers.toLocaleString(),
      change: "현재 접속 중",
      color: "#10b981",
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <S.Title>관리자 대시보드</S.Title>
          <S.Subtitle>RE:PLAY 서비스 현황을 확인하세요</S.Subtitle>
        </S.HeaderLeft>
        <S.HeaderRight>
          <S.HeaderButton to="/admin/notices">
            <FaBell />
            공지 관리
          </S.HeaderButton>
          <S.HeaderButton to="/admin/settings">
            <FaCog />
            설정
          </S.HeaderButton>
        </S.HeaderRight>
      </S.Header>

      {/* 통계 카드 */}
      <S.StatsGrid>
        {statCards.map((stat, index) => (
          <S.StatCard key={index} $color={stat.color}>
            <S.StatIcon $color={stat.color}>{stat.icon}</S.StatIcon>
            <S.StatContent>
              <S.StatValue>{stat.value}</S.StatValue>
              <S.StatLabel>{stat.label}</S.StatLabel>
              <S.StatChange>{stat.change}</S.StatChange>
            </S.StatContent>
          </S.StatCard>
        ))}
      </S.StatsGrid>

      <S.ContentGrid>
        {/* 회원 상태 비율 */}
        <S.Card>
          <S.CardHeader>
            <S.CardTitle>
              <FaChartLine /> 회원 상태 비율
            </S.CardTitle>
          </S.CardHeader>
          <S.CardContent>
            <S.ChartContainer>
              <S.DonutChart>
                <S.DonutSegment
                  $percent={data.memberStats.active}
                  $color="#10b981"
                  $offset={0}
                />
                <S.DonutSegment
                  $percent={data.memberStats.inactive}
                  $color="#f59e0b"
                  $offset={data.memberStats.active}
                />
                <S.DonutSegment
                  $percent={data.memberStats.suspended}
                  $color="#ef4444"
                  $offset={data.memberStats.active + data.memberStats.inactive}
                />
                <S.DonutCenter>
                  <span>{data.summary.totalMembers.toLocaleString()}</span>
                  <small>전체 회원</small>
                </S.DonutCenter>
              </S.DonutChart>
              <S.ChartLegend>
                <S.LegendItem>
                  <S.LegendDot $color="#10b981" />
                  <span>활성 ({data.memberStats.active}%)</span>
                </S.LegendItem>
                <S.LegendItem>
                  <S.LegendDot $color="#f59e0b" />
                  <span>비활성 ({data.memberStats.inactive}%)</span>
                </S.LegendItem>
                <S.LegendItem>
                  <S.LegendDot $color="#ef4444" />
                  <span>정지 ({data.memberStats.suspended}%)</span>
                </S.LegendItem>
              </S.ChartLegend>
            </S.ChartContainer>
          </S.CardContent>
        </S.Card>

        {/* 최근 가입 회원 */}
        <S.Card>
          <S.CardHeader>
            <S.CardTitle>
              <FaUserPlus /> 최근 가입 회원
            </S.CardTitle>
            <S.CardLink to="/admin/members">전체보기</S.CardLink>
          </S.CardHeader>
          <S.CardContent>
            <S.MemberList>
              {data.recentMembers.map((member) => (
                <S.MemberItem key={member.id}>
                  <S.MemberAvatar>{member.name[0]}</S.MemberAvatar>
                  <S.MemberInfo>
                    <S.MemberName>{member.name}</S.MemberName>
                    <S.MemberEmail>{member.email}</S.MemberEmail>
                  </S.MemberInfo>
                  <S.MemberMeta>
                    <S.MemberDate>{member.joinDate}</S.MemberDate>
                    <S.MemberStatus $status={member.status}>
                      {member.status === "active" ? "활성" : "대기"}
                    </S.MemberStatus>
                  </S.MemberMeta>
                </S.MemberItem>
              ))}
            </S.MemberList>
          </S.CardContent>
        </S.Card>

        {/* 최근 공지사항 */}
        <S.Card>
          <S.CardHeader>
            <S.CardTitle>
              <FaBell /> 최근 공지사항
            </S.CardTitle>
            <S.CardLink to="/admin/notices">전체보기</S.CardLink>
          </S.CardHeader>
          <S.CardContent>
            <S.NoticeList>
              {data.recentNotices.map((notice) => (
                <S.NoticeItem key={notice.id}>
                  <S.NoticeTitle>{notice.title}</S.NoticeTitle>
                  <S.NoticeMeta>
                    <span>{notice.date}</span>
                    <span><FaEye /> {notice.views}</span>
                  </S.NoticeMeta>
                </S.NoticeItem>
              ))}
            </S.NoticeList>
            <S.AddButton to="/admin/notices/new">
              + 새 공지사항 작성
            </S.AddButton>
          </S.CardContent>
        </S.Card>

        {/* 빠른 액션 */}
        <S.Card>
          <S.CardHeader>
            <S.CardTitle>빠른 액션</S.CardTitle>
          </S.CardHeader>
          <S.CardContent>
            <S.QuickActions>
              <S.QuickActionButton to="/admin/members">
                <FaUsers />
                <span>회원 관리</span>
              </S.QuickActionButton>
              <S.QuickActionButton to="/admin/notices">
                <FaBell />
                <span>공지 관리</span>
              </S.QuickActionButton>
              <S.QuickActionButton to="/admin/reports">
                <FaChartLine />
                <span>신고 관리</span>
              </S.QuickActionButton>
              <S.QuickActionButton to="/admin/settings">
                <FaCog />
                <span>설정</span>
              </S.QuickActionButton>
            </S.QuickActions>
          </S.CardContent>
        </S.Card>
      </S.ContentGrid>
    </S.Container>
  );
};

export default AdminDashboard;

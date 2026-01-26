import React, { useState } from "react";
import styled from "styled-components";
import { FaBell, FaMusic, FaHeart, FaComment, FaUserPlus, FaCrown } from "react-icons/fa";
import BaseModal from "./BaseModal";

const TabBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button`
  padding: 12px 24px;
  background: none;
  border: none;
  color: ${({ $active, theme }) => ($active ? theme.colors.textMain : theme.colors.textSub)};
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? "700" : "600")};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  ${({ $active, theme }) =>
    $active &&
    `
    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${theme.colors.gradient};
    }
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NotificationItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: ${({ $read, theme }) => ($read ? theme.colors.bg : theme.colors.surface)};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${({ $read }) =>
    !$read &&
    `
    &::before {
      content: "";
      position: absolute;
      top: 16px;
      right: 16px;
      width: 8px;
      height: 8px;
      background: #ff0080;
      border-radius: 50%;
      box-shadow: 0 0 10px #ff0080;
    }
  `}

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}30;
  }
`;

const NotificationIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 4px;
`;

const NotificationMessage = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NotificationTime = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSub};
  opacity: 0.7;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.textSub};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// 더미 데이터
const dummyNotifications = {
  all: [
    {
      id: 1,
      type: "like",
      icon: <FaHeart />,
      title: "새로운 좋아요",
      message: "user123님이 당신의 플레이리스트를 좋아합니다",
      time: "5분 전",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      icon: <FaComment />,
      title: "새 댓글",
      message: "cool_music님이 댓글을 남겼습니다: '완전 좋아요!'",
      time: "1시간 전",
      read: false,
    },
    {
      id: 3,
      type: "follow",
      icon: <FaUserPlus />,
      title: "새 팔로워",
      message: "melody_lover님이 당신을 팔로우하기 시작했습니다",
      time: "3시간 전",
      read: true,
    },
    {
      id: 4,
      type: "music",
      icon: <FaMusic />,
      title: "새 음악 추천",
      message: "당신의 취향에 맞는 새로운 곡이 추가되었습니다",
      time: "1일 전",
      read: true,
    },
    {
      id: 5,
      type: "premium",
      icon: <FaCrown />,
      title: "프리미엄 혜택",
      message: "프리미엄 멤버십 특별 할인 이벤트가 시작되었습니다",
      time: "2일 전",
      read: true,
    },
  ],
  activity: [
    {
      id: 1,
      type: "like",
      icon: <FaHeart />,
      title: "새로운 좋아요",
      message: "user123님이 당신의 플레이리스트를 좋아합니다",
      time: "5분 전",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      icon: <FaComment />,
      title: "새 댓글",
      message: "cool_music님이 댓글을 남겼습니다: '완전 좋아요!'",
      time: "1시간 전",
      read: false,
    },
    {
      id: 3,
      type: "follow",
      icon: <FaUserPlus />,
      title: "새 팔로워",
      message: "melody_lover님이 당신을 팔로우하기 시작했습니다",
      time: "3시간 전",
      read: true,
    },
  ],
  system: [
    {
      id: 4,
      type: "music",
      icon: <FaMusic />,
      title: "새 음악 추천",
      message: "당신의 취향에 맞는 새로운 곡이 추가되었습니다",
      time: "1일 전",
      read: true,
    },
    {
      id: 5,
      type: "premium",
      icon: <FaCrown />,
      title: "프리미엄 혜택",
      message: "프리미엄 멤버십 특별 할인 이벤트가 시작되었습니다",
      time: "2일 전",
      read: true,
    },
  ],
};

const NotificationModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(dummyNotifications);

  const currentNotifications = notifications[activeTab] || [];

  const handleMarkAllRead = () => {
    setNotifications((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((notif) => ({ ...notif, read: true })),
    }));
  };

  const handleClearAll = () => {
    setNotifications((prev) => ({
      ...prev,
      [activeTab]: [],
    }));
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
    }));
  };

  return (
    <BaseModal title="알림" icon={<FaBell />} onClose={onClose} maxWidth="600px">
      <TabBar>
        <Tab $active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          전체
        </Tab>
        <Tab $active={activeTab === "activity"} onClick={() => setActiveTab("activity")}>
          활동
        </Tab>
        <Tab $active={activeTab === "system"} onClick={() => setActiveTab("system")}>
          시스템
        </Tab>
      </TabBar>

      {currentNotifications.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🔔</EmptyIcon>
          <EmptyText>알림이 없습니다</EmptyText>
        </EmptyState>
      ) : (
        <>
          <NotificationList>
            {currentNotifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                $read={notif.read}
                onClick={() => handleNotificationClick(notif.id)}
              >
                <NotificationIcon>{notif.icon}</NotificationIcon>
                <NotificationContent>
                  <NotificationTitle>{notif.title}</NotificationTitle>
                  <NotificationMessage>{notif.message}</NotificationMessage>
                  <NotificationTime>{notif.time}</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))}
          </NotificationList>

          <ActionButtons>
            <ActionButton onClick={handleMarkAllRead}>모두 읽음</ActionButton>
            <ActionButton onClick={handleClearAll}>전체 삭제</ActionButton>
          </ActionButtons>
        </>
      )}
    </BaseModal>
  );
};

export default NotificationModal;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  FaHome,
  FaSearch,
  FaRecordVinyl,
  FaUser,
  FaNewspaper,
  FaVideo,
  FaBell,
  FaSignInAlt,
} from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import MiniPlayer from "../MiniPlayer/MiniPlayer";
import useModalStore from "../../store/useModalStore";
import Search from "../Search/Search";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textMain};
`;

const Sidebar = styled.nav`
  width: 250px;
  height: 100vh;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  /* 오른쪽 테두리를 부드러운 갈색 톤으로 */
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors.bg};
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 50px;
  font-style: italic;
  letter-spacing: -1px;
`;

const LogoRE = styled.span`
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const LogoPLAY = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textMain : theme.colors.textSub};
  text-decoration: none;
  padding: 10px 0;
  transition: all 0.3s ease;

  /* 호버 시 파스텔톤으로 이동 */
  &:hover {
    color: ${({ theme }) => theme.colors.secondary}; /* 라벤더색 */
    transform: translateX(8px);
    text-shadow: 0 0 8px rgba(216, 180, 254, 0.5);
  }
`;

const Content = styled.main`
  margin-left: 250px;
  flex: 1;
  position: relative;
  padding-bottom: 120px; /* 미니 플레이어 높이만큼 여유 공간 */
`;

const TopBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  height: 70px;
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 30px;
  gap: 16px;
  z-index: 90;
`;

const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMain};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.primary}50;
`;

const ContentWrapper = styled.div`
  padding-top: 70px;
`;

const SearchCenterWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const { openModal } = useModalStore();

  return (
    <Container>
      <Sidebar>
        <Logo>
          <LogoRE>RE:</LogoRE>
          <LogoPLAY>PLAY</LogoPLAY>
        </Logo>
        <Menu>
          <MenuItem to="/" $active={path === "/"}>
            <FaHome /> 홈
          </MenuItem>
          <MenuItem to="/search" $active={path === "/search"}>
            <FaSearch /> 둘러보기
          </MenuItem>
          <MenuItem to="/magazine" $active={path === "/magazine"}>
            <FaNewspaper /> 매거진
          </MenuItem>
          <MenuItem to="/shorts" $active={path === "/shorts"}>
            <FaVideo /> 숏폼
          </MenuItem>
          <MenuItem to="/my-universe" $active={path === "/my-universe"}>
            <FaRecordVinyl /> 마이 유니버스
          </MenuItem>
          <MenuItem to="/profile" $active={path === "/profile"}>
            <FaUser /> 프로필
          </MenuItem>
        </Menu>
      </Sidebar>
      <Content>
        <TopBar>
          <div style={{ minWidth: '250px' }} />
          <SearchCenterWrapper>
            <Search />
          </SearchCenterWrapper>
         
          <ThemeSwitcher />
          <IconButton onClick={() => openModal("notification")}>
            <FaBell />
            <NotificationBadge>3</NotificationBadge>
          </IconButton>
          <IconButton onClick={() => openModal("login")}>
            <FaSignInAlt />
          </IconButton>
        </TopBar>
        <ContentWrapper>{children}</ContentWrapper>
      </Content>
      <MiniPlayer />
    </Container>
  );
};

export default Layout;

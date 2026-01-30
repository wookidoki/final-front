import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  FaHome,
  FaSearch,
  FaRecordVinyl,
  FaUser,
  FaNewspaper,
  FaVideo,
  FaBell,
  FaSignInAlt,
  FaSignOutAlt,
  FaCrown,
  FaLock
} from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import MiniPlayer from "../MiniPlayer/MiniPlayer";
import useModalStore from "../../store/useModalStore";
import Search from "../Search/Search";
import { AuthContext } from "../../context/Authcontext";

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

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px ${({ theme }) => theme?.colors?.primary || '#ff0080'}30; }
  50% { box-shadow: 0 0 16px ${({ theme }) => theme?.colors?.primary || '#ff0080'}50; }
`;

const UserProfileArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 14px 6px 6px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
`;

const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px ${({ theme }) => theme.colors.primary}60;
  }

  &:active {
    transform: translateY(0);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff4444;
    color: #ff4444;
    background: rgba(255, 68, 68, 0.1);
  }
`;

const SidebarBottom = styled.div`
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SidebarUserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SidebarUserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
`;

const SidebarUserInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMain};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSub};
  }
`;

const SidebarLoginBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px ${({ theme }) => theme.colors.primary}60;
  }
`;

const SidebarLoginText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
  margin-top: 12px;
  line-height: 1.4;
`;

const MenuLockIcon = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSub};
  opacity: 0.5;
`;

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const { openModal } = useModalStore();
  const {auth, logout} = useContext(AuthContext);

  const getInitials = () => {
    if (auth.memberName) return auth.memberName.charAt(0).toUpperCase();
    if (auth.email) return auth.email.charAt(0).toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    if (auth.memberName) return auth.memberName;
    if (auth.email) return auth.email.split("@")[0];
    return "User";
  };

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
          {auth.isAuthenticated ? (
            <>
              <MenuItem to="/my-universe" $active={path === "/my-universe"}>
                <FaRecordVinyl /> 마이 유니버스
              </MenuItem>
              <MenuItem to="/profile" $active={path === "/profile"}>
                <FaUser /> 프로필
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem as="button" onClick={() => openModal("login")} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                <FaRecordVinyl /> 마이 유니버스 <MenuLockIcon><FaLock /></MenuLockIcon>
              </MenuItem>
              <MenuItem as="button" onClick={() => openModal("login")} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                <FaUser /> 프로필 <MenuLockIcon><FaLock /></MenuLockIcon>
              </MenuItem>
            </>
          )}
        </Menu>

        <SidebarBottom>
          {auth.isAuthenticated ? (
            <SidebarUserCard>
              <SidebarUserAvatar>{getInitials()}</SidebarUserAvatar>
              <SidebarUserInfo>
                <h4>{getDisplayName()}</h4>
                <span>{auth.email}</span>
              </SidebarUserInfo>
            </SidebarUserCard>
          ) : (
            <>
              <SidebarLoginBtn onClick={() => openModal("login")}>
                <FaSignInAlt /> 로그인
              </SidebarLoginBtn>
              <SidebarLoginText>
                로그인하고 더 많은 기능을 이용하세요
              </SidebarLoginText>
            </>
          )}
        </SidebarBottom>
      </Sidebar>
      <Content>
        <TopBar>
          <div style={{ minWidth: '250px' }} />
          <SearchCenterWrapper>
            <Search />
          </SearchCenterWrapper>

          <ThemeSwitcher />

          {auth.isAuthenticated ? (
            <>
              <IconButton onClick={() => openModal("notification")}>
                <FaBell />
                <NotificationBadge>3</NotificationBadge>
              </IconButton>
              <UserProfileArea onClick={() => {}}>
                <UserAvatar>{getInitials()}</UserAvatar>
                <UserName>{getDisplayName()}</UserName>
              </UserProfileArea>
              <LogoutButton onClick={logout}>
                <FaSignOutAlt /> 로그아웃
              </LogoutButton>
            </>
          ) : (
            <LoginButton onClick={() => openModal("login")}>
              <FaSignInAlt /> 로그인
            </LoginButton>
          )}
        </TopBar>
        <ContentWrapper>{children}</ContentWrapper>
      </Content>
      <MiniPlayer />
    </Container>
  );
};

export default Layout;

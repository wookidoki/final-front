import styled from "styled-components";
import { Link } from "react-router-dom"; // Link 스타일링을 위해 필요

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 60px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textMain};
`;

// --- 상단 프로필 헤더 ---
export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}66;
`;

export const UserInfo = styled.div`
  flex: 1;
  h1 {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  p {
    color: ${({ theme }) => theme.colors.textSub};
    font-size: 1.1rem;
    max-width: 500px;
  }
`;

export const Tag = styled.span`
  font-size: 0.9rem;
  padding: 5px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: normal;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

// 편집 페이지로 가는 버튼 (styled(Link))
export const EditButton = styled(Link)`
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ShareButton = styled.button`
  padding: 12px 24px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMain};
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

// --- 내 유니버스 미리보기 ---
export const PreviewSection = styled.div`
  margin-top: 40px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.accent};
`;

export const CanvasPreview = styled.div`
  width: 100%;
  height: 400px;
  background: radial-gradient(circle at 50% 50%, #2a2522 0%, #1c1917 100%);
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* 미리보기용 가짜 위젯 */
  .dummy-widget {
    position: absolute;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 16px;
  }
`;

export const Stats = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    font-weight: bold;

    span {
      color: ${({ theme }) => theme.colors.textSub};
      font-weight: normal;
      font-size: 1rem;
    }
  }
`;

import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px currentColor; }
  50% { box-shadow: 0 0 40px currentColor; }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 60px 100px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textMain};

  @media (max-width: 768px) {
    padding: 20px 20px 100px;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 0 30px ${({ theme }) => theme.colors.primary}50;
  border: 4px solid ${({ theme }) => theme.colors.border};
`;

export const UserInfo = styled.div`
  flex: 1;

  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      justify-content: center;
      font-size: 1.8rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSub};
    font-size: 1rem;
    max-width: 500px;
    line-height: 1.6;
  }
`;

export const Tag = styled.span`
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary}20;
  border: 1px solid ${({ theme }) => theme.colors.primary}50;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const Stats = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: bold;

    span {
      color: ${({ theme }) => theme.colors.textSub};
      font-weight: normal;
      font-size: 0.9rem;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const EditButton = styled(Link)`
  padding: 14px 28px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border-radius: 14px;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}60;
  }
`;

export const ShareButton = styled.button`
  padding: 14px 28px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMain};
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/* 탭 섹션 */
export const TabSection = styled.div`
  margin-top: 40px;
`;

export const TabList = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled.button`
  padding: 16px 24px;
  background: transparent;
  border: none;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textMuted};
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${({ $active, theme }) =>
      $active ? theme.colors.gradient : 'transparent'};
    border-radius: 3px 3px 0 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 1.1rem;
  }
`;

export const TabCount = styled.span`
  font-size: 0.8rem;
  padding: 2px 8px;
  background: ${({ theme }) => theme.colors.primary}20;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const TabContent = styled.div`
  padding: 32px 0;
  min-height: 400px;
`;

/* 콘텐츠 그리드 */
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const ContentCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const CardThumbnail = styled.div`
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio || '16 / 10'};
  background: ${({ theme }) => theme.colors.bg};
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 8px;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const CardInfo = styled.div`
  padding: 16px;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const CardStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardStat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/* 댓글 리스트 */
export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentItem = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}50;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const CommentTarget = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

export const CommentDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CommentContent = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMain};
  line-height: 1.6;
`;

/* 빈 상태 */
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 8px;
`;

export const EmptyDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 24px;
`;

export const EmptyButton = styled(Link)`
  padding: 14px 32px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.primary}50;
  }
`;

/* 기존 유니버스 미리보기 섹션 */
export const PreviewSection = styled.div`
  margin-top: 40px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CanvasPreview = styled.div`
  width: 100%;
  height: 400px;
  background: radial-gradient(circle at 50% 50%,
    ${({ theme }) => theme.colors.primary}10 0%,
    ${({ theme }) => theme.colors.bg} 100%
  );
  border-radius: 24px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .dummy-widget {
    position: absolute;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    backdrop-filter: blur(5px);
    border-radius: 16px;
  }
`;

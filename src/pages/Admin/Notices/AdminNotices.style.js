import styled from "styled-components";

// 페이지 전용 스타일만 정의

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoticeCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}50;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const NoticeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const NoticeInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NoticeTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const NoticeTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMain};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NoticeMeta = styled.div`
  display: flex;
  gap: 20px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const NoticeContent = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const NoticeActions = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 20px;
`;

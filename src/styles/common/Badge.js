import styled from "styled-components";

// 상태 뱃지
export const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $status }) => {
    switch ($status) {
      case "active": return "#10b98120";
      case "inactive": return "#f59e0b20";
      case "suspended": return "#ef444420";
      case "pending": return "#6b728020";
      default: return "#6b728020";
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case "active": return "#10b981";
      case "inactive": return "#f59e0b";
      case "suspended": return "#ef4444";
      case "pending": return "#6b7280";
      default: return "#6b7280";
    }
  }};
`;

// 역할 뱃지
export const RoleBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $isAdmin, theme }) =>
    $isAdmin ? `${theme.colors.primary}20` : "#6b728020"};
  color: ${({ $isAdmin, theme }) =>
    $isAdmin ? theme.colors.primary : "#6b7280"};
`;

// 고정 뱃지
export const PinnedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`;

// 일반 뱃지
export const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $color }) => $color ? `${$color}20` : "#6b728020"};
  color: ${({ $color }) => $color || "#6b7280"};
`;

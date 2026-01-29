import styled from "styled-components";

export const TableCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.bg};
`;

export const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSub};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    text-align: center;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}08;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  vertical-align: middle;

  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    text-align: center;
  }
`;

export const TableActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

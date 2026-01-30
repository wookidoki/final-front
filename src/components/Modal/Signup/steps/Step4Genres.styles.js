import styled from "styled-components";

export const StepWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 360px;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 900;
  margin: 0;
`;

export const Desc = styled.p`
  margin: 6px 0 0;
  font-size: 0.95rem;
  opacity: 0.75;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Chip = styled.button`
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gradient : theme.colors.bg};
  color: ${({ $active }) => ($active ? "#fff" : "inherit")};
  cursor: pointer;
  font-weight: 900;
`;

export const Hint = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const LocalError = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  font-size: 0.9rem;
  font-weight: 700;
`;

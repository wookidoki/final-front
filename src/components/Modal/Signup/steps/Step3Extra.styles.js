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

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 800;
`;

export const Input = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: inherit;
  outline: none;

  &:focus {
    border-color: rgba(255, 255, 255, 0.35);
  }
`;

export const Select = styled.select`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: inherit;
  outline: none;

  &:focus {
    border-color: rgba(255, 255, 255, 0.35);
  }
`;

export const HintRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const Hint = styled.div`
  font-size: 0.85rem;
  opacity: 0.7;
  line-height: 1.25;
`;

export const LocalError = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  font-size: 0.9rem;
  font-weight: 700;
`;

export const Inline = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const CheckBadge = styled.div`
  flex-shrink: 0;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 900;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.04);

  ${({ $status }) =>
    $status === "valid" &&
    `
    border-color: rgba(0, 255, 170, 0.35);
    background: rgba(0, 255, 170, 0.08);
  `}

  ${({ $status }) =>
    $status === "invalid" &&
    `
    border-color: rgba(255, 68, 68, 0.35);
    background: rgba(255, 68, 68, 0.08);
  `}
`;

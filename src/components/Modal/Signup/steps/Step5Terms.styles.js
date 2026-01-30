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

export const Box = styled.div`
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Row = styled.label`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  cursor: pointer;
  font-weight: 800;

  input {
    margin-top: 3px;
  }
`;

export const Small = styled.div`
  font-size: 0.9rem;
  opacity: 0.75;
  font-weight: 600;
  line-height: 1.35;
  margin-top: 4px;
`;

export const LocalError = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  font-size: 0.9rem;
  font-weight: 800;
`;

export const FieldErrors = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 68, 68, 0.35);
  background: rgba(255, 68, 68, 0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldErrorItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.9rem;

  span:first-child {
    opacity: 0.8;
    font-weight: 900;
  }

  span:last-child {
    text-align: right;
    font-weight: 700;
  }
`;

export const ButtonRow = styled.div`
  margin-top: auto;
`;

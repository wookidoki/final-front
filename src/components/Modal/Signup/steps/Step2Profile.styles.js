import styled from "styled-components";

export const StepWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 720px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 40px;
  border-radius: 16px;
`;

export const Section = styled.section`
  margin-bottom: 28px;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Desc = styled.p`
  color: ${({ theme }) => theme.colors.textSub};
  margin-bottom: 16px;
`;

export const Inline = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textMain};
`;

export const Select = styled.select`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
`;

export const Hint = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

export const HintRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CheckBadge = styled.span`
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 6px;
  color: white;
  background: ${({ $status }) => ($status === "valid" ? "#22c55e" : "#ef4444")};
`;

export const LocalError = styled.p`
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 8px;
`;

export const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 10px;
  margin-top: 12px;
`;

export const GenreItem = styled.button`
  padding: 10px 0;
  border-radius: 999px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.bg};
  color: ${({ $active }) => ($active ? "#fff" : "inherit")};
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

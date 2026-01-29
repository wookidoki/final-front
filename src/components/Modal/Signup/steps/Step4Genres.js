// steps/Step4Genres.js
import styled from "styled-components";
export { StepTitle, StepDescription } from "./Step1Account";

export const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const GenreButton = styled.button`
  padding: 16px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.gradient : theme.colors.bg};
  border: 2px solid
    ${({ $selected, theme }) =>
      $selected ? "transparent" : theme.colors.border};
  border-radius: 12px;
  color: ${({ $selected }) => ($selected ? "white" : "inherit")};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.primary}30;
  }

  span {
    font-size: 1.5rem;
  }
`;

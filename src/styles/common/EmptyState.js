import styled from "styled-components";

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ $padding }) => $padding || "60px 20px"};
  color: ${({ theme }) => theme.colors.textMuted};
  ${({ $withBg, theme }) => $withBg && `
    background: ${theme.colors.surface};
    border: 2px solid ${theme.colors.border};
    border-radius: 20px;
  `}

  svg {
    font-size: 3rem;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

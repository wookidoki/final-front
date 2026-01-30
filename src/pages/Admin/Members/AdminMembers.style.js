import styled from "styled-components";

// 페이지 전용 스타일만 정의 (공통 스타일은 styles/common에서 import)

export const DateText = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

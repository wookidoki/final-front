// steps/Step6Complete.js
import styled from "styled-components";

export const SuccessIcon = styled.div`
  font-size: 5rem;
  text-align: center;
  margin: 40px 0 20px;
`;

export const SuccessMessage = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.textMain};
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSub};
    line-height: 1.6;
  }
`;

export const LoginBtnWrap = styled.div`
  display: flex;
`;
